package com.expensetracker.expensetracker.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.GetExchange;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Budget;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.entity.YearlyBudget;
import com.expensetracker.expensetracker.helper.NotFoundException;
import com.expensetracker.expensetracker.services.BillService;
import com.expensetracker.expensetracker.services.BudgetService;
import com.expensetracker.expensetracker.services.ImageService;
import com.expensetracker.expensetracker.services.UserServices;
import com.expensetracker.expensetracker.services.YearlyBudgetService;

import java.util.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/api")
public class ApiHandler {

    @Autowired
    private UserServices userServices;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageService imageService;

    @Autowired
    private BillService billService;

    @Autowired
    private HttpSession session;

    @Autowired
    private YearlyBudgetService yearlyBudgetService;

    @Autowired
    private BudgetService budgetService;

    // durign login time check: email is available or password is correct or not
    @PostMapping(value = "/checkEmail")
    public String checkEmail(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String pass = requestBody.get("pass");

        if (userServices.existsByEmail(email)) {

            Users user = userServices.findByEmail(email).orElseThrow(null);
            if (passwordEncoder.matches(pass, user.getPassword())) {
                return "{\"msg\" : \"done\"}";
            } else {
                return "{\"msg\" : \"password\"}";
            }
        }
        return "{\"msg\": \"email\"}";
    }

    // for fetch data
    @PostMapping(value = "/getUserData")
    public ResponseEntity<Users> userData(@RequestBody Map<String, String> requestBody) {

        String email = requestBody.get("email");

        Users user = userServices.findByEmail(email).orElseThrow(null);
        // making some changes for security purpose
        Users user2 = Users.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .emailVerified(user.isEmailVerified())
                .phoneVerified(user.isPhoneVerified())
                .profilePicture(user.getProfilePicture()).build();
        user.setPassword("abc");
        return ResponseEntity.ok(user2);
    }

    // for update data
    @PutMapping(value = "/update")
    public void updateUser(@RequestParam("name") String newName, @RequestParam("phone") String newPhone,
            @RequestParam("email") String email, @RequestParam(value = "file", required = false) MultipartFile pic) {

        String fileName = UUID.randomUUID().toString();

        String fileUrl = null;
        if (pic != null && !pic.isEmpty()) {
            fileUrl = imageService.uploadImg(pic, fileName);
        }

        userServices.update(email, newName, newPhone, fileUrl);
        System.out.println("Update successfully...................................");
    }

    // This is for adding bills in to the database
    // save bill
    @PostMapping(value = "/addbill")
    public ResponseEntity<String> addBill(@RequestParam("name") String name,
            @RequestParam("rate") double rate,
            @RequestParam("method") String method,
            @RequestParam("currency") String currency,
            @RequestParam("status") String status,
            @RequestParam("description") String description,
            @RequestParam("categories") String categories,
            @RequestParam("dueDate") String dueDate,
            @RequestParam("biller") String biller,
            @RequestParam("billerPhone") String billerPhone,
            @RequestParam("date") String date,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        System.out.println("Add bill Api...........");

        Bills bill = new Bills();
        bill.setTitle(name);
        bill.setRate(rate);
        bill.setMethod(method);
        bill.setCurrency(currency);
        bill.setStatus(status);
        bill.setDescription(description);
        bill.setCategories(categories);
        bill.setDueDate(dueDate);
        bill.setBiller(biller);
        bill.setBillerPhone(billerPhone);

        if(date.isEmpty()){
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String newDate = LocalDateTime.now().format(dateFormatter);
            bill.setDate(newDate);
        }
        else{
            bill.setDate(date);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy");
        String newTime = LocalDateTime.now().format(formatter);

        bill.setTime(newTime);

        // bill month and year and budget object
        String year = Integer.toString(LocalDateTime.now().getYear());
        int monthNumber = LocalDateTime.now().getMonthValue();
        String monthArray[] ={"jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"};
        String month = monthArray[monthNumber-1];

        System.out.println(month);
        System.out.println(month);
        bill.setMonth(month);
        bill.setYear(year);

        if (image != null && !image.isEmpty()) {
            String fileUrl = imageService.uploadImg(image, UUID.randomUUID().toString());
            bill.setBillAttachement(fileUrl);
        }

        try {
            billService.saveBill(bill);
            System.out.println("Bill saved Successfully");

            //managing budget here
            String budgetId = yearlyBudgetService.getMonthlyBudgetId(year);
            Budget budget = budgetService.findById(budgetId).orElseThrow(() -> new NotFoundException());

            bill.setBudget(budget);
            budget.getBills().add(bill);

            double expense = budget.getExpense();
            budget.setExpense(expense + bill.getRate());

            double liveBudget = budget.getLiveBudget();
            budget.setLiveBudget(liveBudget - bill.getRate());

            budgetService.update(budget);
            
            return ResponseEntity.ok("{\"msg\" : \"Saved\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"msg\" : \"Error\"}");
        }
    }

    // Delete bill api
    @DeleteMapping("/bill/delete")
    public void deleteBill(@RequestParam String billId) {

        System.out.println("IN deleting bill api");
        System.out.println(billId);

        // fetch user list
        // remove from user list
        // remove user null from bill
        // save bill

        Users user = (Users) session.getAttribute("user");

        Bills bill = billService.findById(billId)
                .orElseThrow(() -> new NotFoundException("Bill with this id not found"));

        System.out.println(bill.getBillId() + " : " + bill.getTitle());
        System.out.println(bill.getBillId() + " : " + bill.getTitle());

        Budget budget = bill.getBudget();
        System.out.println("in delte api ...........");
        System.out.println(budget.getBudgetId());

        double expense = budget.getExpense();
        budget.setExpense(expense - bill.getRate());

        double liveBudget = budget.getLiveBudget();
        budget.setLiveBudget(liveBudget + bill.getRate());

        

        user.getBills().remove(bill);
        bill.setUser(null);

        budget.getBills().remove(bill);
        bill.setBudget(null);
        billService.saveBill(bill);
        budgetService.update(budget);



        System.out.println("Successfully removed from database");
    }

    @PutMapping("/bill/update")
    public ResponseEntity<String> updateBill(
            @RequestParam("name") String name,
            @RequestParam("rate") String rate,
            @RequestParam("method") String method,
            @RequestParam("currency") String currency,
            @RequestParam("status") String status,
            @RequestParam("description") String description,
            @RequestParam("categories") String categories,
            @RequestParam("dueDate") String dueDate,
            @RequestParam("biller") String biller,
            @RequestParam("billerPhone") String billerPhone,
            @RequestParam("date") String billDate,
            @RequestParam("id") String billId,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        System.out.println("in bill update api : " + name);

        Bills bill = billService.findById(billId)
                .orElseThrow(() -> new NotFoundException("Bill not found with this id"));

        bill.setTitle(name);
        bill.setRate(Double.parseDouble(rate));
        bill.setMethod(method);
        bill.setCurrency(currency);
        bill.setStatus(status);
        bill.setDescription(description);
        bill.setCategories(categories);
        bill.setDueDate(dueDate);
        bill.setBiller(biller);
        bill.setBillerPhone(billerPhone);
        bill.setDate(billDate);

        if (image != null && !image.isEmpty()) {
            String imgUrl = bill.getBillAttachement();
            imageService.replaceImg(image, imgUrl);
        }

        billService.updateBill(bill);

        return ResponseEntity.ok("Successfully update");
    }


    @GetExchange("/monthly_bill")
    public ResponseEntity<List> billFilter(@RequestParam("month") String month, @RequestParam("year") String year) {
        System.out.println("In bill filter api........." + month+year);
        System.out.println("In bill filter api........." + month+year);

        List<Bills> bills = new ArrayList<>();

        bills =  billService.findByMonthAndYearAndUser(month,year);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("/monthly")
    public ResponseEntity<String> checkMonthlyExist() {

        System.out.println("in monthlyCheckExist");
        String year = Integer.toString(LocalDateTime.now().getYear());

        YearlyBudget yearlyBudget = yearlyBudgetService.findByUserAndYear(year)
                .orElseThrow(() -> new NotFoundException("Resource not found"));

        String monthData = null;
        int currentMonth = LocalDateTime.now().getMonthValue();

        switch (currentMonth) {
            case 1:
                monthData = yearlyBudget.getJan();
                break;

            case 2:
                monthData = yearlyBudget.getFeb();
                break;

            case 3:
                monthData = yearlyBudget.getMarch();
                break;

            case 4:
                monthData = yearlyBudget.getApril();
                break;
            case 5:
                monthData = yearlyBudget.getMay();
                break;
            case 6:
                monthData = yearlyBudget.getJune();
                break;
            case 7:
                monthData = yearlyBudget.getJuly();
                break;
            case 8:
                monthData = yearlyBudget.getAug();
                break;
            case 9:
                monthData = yearlyBudget.getSep();
                break;
            case 10:
                monthData = yearlyBudget.getOct();
                break;
            case 11:
                monthData = yearlyBudget.getNov();
                break;
            case 12:
                monthData = yearlyBudget.getDecember();
                break;
            default:
                break;
        }

        if (monthData != null) {
            return ResponseEntity.ok("{\"msg\" : \"found\"}");
        }
        return ResponseEntity.ok("{\"msg\" : \"Nothing found\"}");
    }


    @GetMapping("/monthlybudget")
    public ResponseEntity<Budget> monthlyBudget() {
        String year = Integer.toString(LocalDateTime.now().getYear());
        String budgetId = yearlyBudgetService.getMonthlyBudgetId(year);

        Budget budget = budgetService.findById(budgetId).orElseThrow(() -> new NotFoundException("Resource not found"));
        return ResponseEntity.ok(budget);
    }


    @GetMapping("/reportMonthAndYear")
    public ResponseEntity<Map<String,List<String>>> monthAndYearData(){
        System.out.println("Month and year data");

        Users user = (Users) session.getAttribute("user");
        List<YearlyBudget> yBudget = yearlyBudgetService.findAllByUser(user);

        Map<String,List<String>>data = new LinkedHashMap<>();

        for(int i = 0;i<yBudget.size();i++){
            YearlyBudget yBudget2 = yBudget.get(i);
            String year = yBudget2.getYear();
            data.putIfAbsent(year,new ArrayList<>());

            if(yBudget2.getJan() != null && !yBudget2.getJan().isEmpty()){
                data.get(year).add("Jan");
            }
            if(yBudget2.getFeb() != null && !yBudget2.getFeb().isEmpty()){
                data.get(year).add("Feb");
            }
            if(yBudget2.getMarch() != null && !yBudget2.getMarch().isEmpty()){
                data.get(year).add("Mar");
            }
            if(yBudget2.getApril() != null && !yBudget2.getApril().isEmpty()){
                data.get(year).add("April");
            }
            if(yBudget2.getMay() != null && !yBudget2.getMay().isEmpty()){
                data.get(year).add("May");
            }
            if(yBudget2.getJune() != null && !yBudget2.getJune().isEmpty()){
                data.get(year).add("June");
            }
            if(yBudget2.getJuly() != null && yBudget2.getJuly().isEmpty()){
                data.get(year).add("July");
            }
            if(yBudget2.getAug() != null && !yBudget2.getAug().isEmpty()){
                data.get(year).add("Aug");
            }
            if(yBudget2.getSep() != null && !yBudget2.getSep().isEmpty()){
                data.get(year).add("Sep");
            }
            if(yBudget2.getOct() != null && !yBudget2.getOct().isEmpty()){
                data.get(year).add("Oct");
            }
            if(yBudget2.getNov() != null && !yBudget2.getNov().isEmpty()){
                data.get(year).add("Nov");
            }
            if(yBudget2.getDecember() != null && !yBudget2.getDecember().isEmpty()){
                data.get(year).add("Dec");
            }
        }

        return ResponseEntity.ok(data);
    }

    @GetMapping("/monthly_yearly_data")
    public ResponseEntity<Budget> budgetFromMonthAndYear(@RequestParam("month") String month,@RequestParam("year") String year){

        String budgetId = yearlyBudgetService.getMonthlyBudgetId(month,year);

        Budget budget = budgetService.findById(budgetId).orElseThrow(() -> new NotFoundException("Resource not found"));
        return ResponseEntity.ok(budget);
    }

    @GetMapping("/allYealyData")
    public ResponseEntity<List<YearlyBudget>> allYearlyData(){
        Users user = (Users) session.getAttribute("user");
        List<YearlyBudget>list = new ArrayList<>();

        list = yearlyBudgetService.findAllByUser(user);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/goal_data")
    public ResponseEntity<Map<String,List<Double>>> goalData(
        @RequestParam("year") String year
    ){
        Map<String,List<Double>> map = new LinkedHashMap<>();

        YearlyBudget yearlyBudget = yearlyBudgetService.findByUserAndYear(year).orElseThrow(() -> new NotFoundException("Resource not found"));

        processGoalData(map,"Jan",yearlyBudget.getJan());
        processGoalData(map, "Feb", yearlyBudget.getFeb());
        processGoalData(map, "March", yearlyBudget.getMarch());
        processGoalData(map, "April", yearlyBudget.getApril());
        processGoalData(map, "May", yearlyBudget.getMay());
        processGoalData(map, "June", yearlyBudget.getJune());
        processGoalData(map, "July", yearlyBudget.getJuly());
        processGoalData(map, "Aug", yearlyBudget.getAug());
        processGoalData(map, "Sep", yearlyBudget.getSep());
        processGoalData(map, "Oct", yearlyBudget.getOct());
        processGoalData(map, "Nov", yearlyBudget.getNov());
        processGoalData(map, "Dec", yearlyBudget.getDecember());


        return ResponseEntity.ok(map);
    }


    public void processGoalData(Map<String,List<Double>> map , String month,String id){

        
        if(id != null && !id.isEmpty()){
            
            Budget budget = budgetService.findById(id).orElseThrow(null);

            if(budget != null){
                List<Double> list = new ArrayList<>();
                list.add(budget.getGoal());
                list.add(budget.getLiveBudget());

                map.put(month,list);
            }
        }
    }

}
