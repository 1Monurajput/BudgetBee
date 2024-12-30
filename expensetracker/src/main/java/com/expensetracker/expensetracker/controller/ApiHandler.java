package com.expensetracker.expensetracker.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.GetExchange;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.helper.NotFoundException;
import com.expensetracker.expensetracker.services.BillService;
import com.expensetracker.expensetracker.services.ImageService;
import com.expensetracker.expensetracker.services.UserServices;

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
        bill.setDate(date);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy");
        String newTime = LocalDateTime.now().format(formatter);

        bill.setTime(newTime);

        if (image != null && !image.isEmpty()) {
            String fileUrl = imageService.uploadImg(image, UUID.randomUUID().toString());
            bill.setBillAttachement(fileUrl);
        }

        try {
            billService.saveBill(bill);
            System.out.println("Bill saved Successfully");
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
        // remove user from bill
        // save bill

        Users user = (Users) session.getAttribute("user");

        Bills bill = billService.findById(billId)
                .orElseThrow(() -> new NotFoundException("Bill with this id not found"));

        System.out.println(bill.getBillId() + " : " + bill.getTitle());

        user.getBills().remove(bill);
        bill.setUser(null);
        billService.saveBill(bill);
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



            Bills bill = billService.findById(billId).orElseThrow(() -> new NotFoundException("Bill not found with this id"));

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

            if(image != null && !image.isEmpty()){
                String imgUrl = bill.getBillAttachement();
                imageService.replaceImg(image, imgUrl);
            }


            billService.updateBill(bill);

            return ResponseEntity.ok("Successfully update");
    }


    @GetExchange("/bills/data")
    public ResponseEntity<List> billFilter(){
        System.out.println("In bill filter api");

        List<Bills>bills = new ArrayList<>();
        Users user = (Users) session.getAttribute("user");
        bills = billService.findByUser(user);

        for(int i = 0;i<bills.size();i++){
            System.out.println(bills.get(i).getBillId());
        }

        return ResponseEntity.ok(bills);
    }
}
