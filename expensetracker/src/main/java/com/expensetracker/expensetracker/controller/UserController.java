package com.expensetracker.expensetracker.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Budget;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.entity.YearlyBudget;
import com.expensetracker.expensetracker.forms.BudgetForm;
import com.expensetracker.expensetracker.services.BillService;
import com.expensetracker.expensetracker.services.BudgetService;
import com.expensetracker.expensetracker.services.UserServices;
import com.expensetracker.expensetracker.services.YearlyBudgetService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServices userServices;

    @Autowired
    private BillService billService;

    @Autowired
    private HttpSession session;

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private YearlyBudgetService yearlyBudgetService;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @RequestMapping("/dashboard")
    public String dashboard(){
        System.out.println("This is dashboard...............");

        return "user/dashboard";
    }

    @RequestMapping("/profile")
    public String profile(HttpSession session, Model model){
        System.out.println("This is profile page");

        String email = session.getAttribute("email").toString();
        Users user = userServices.findByEmail(email).orElseThrow(null);

        model.addAttribute("user",user);


        return "user/profile";
    }


    @RequestMapping("/bills")
    public String Bills(Model model){
        System.out.println("This is bills page.............");

        Users user = (Users) session.getAttribute("user");

        List<Bills>bills = billService.findByUser(user);

        model.addAttribute("bills", bills);

        return "user/bills";
    }

    @RequestMapping("/report")
    public String reports(){
        System.out.println("In reports page.........");

        
        return "user/reports";
    }


    @RequestMapping("/budget")
    public String budget(Model model){
        System.out.println("In budget page.........");
        model.addAttribute("budgetForm", new BudgetForm());
        
        return "user/budget";
    }


    //set budget

    @RequestMapping(value = "/setbudget",method = RequestMethod.POST)
    public String setBudget(@ModelAttribute("budgetForm") BudgetForm budgetForm){
        System.out.println("In budgetForm page.........");

        System.out.println("Month : " + budgetForm.getMonth());

        Budget budget = Budget.builder()
        .income(budgetForm.getIncome())
        .budget(budgetForm.getBudget())
        .liveBudget(budgetForm.getBudget())
        .goal(budgetForm.getGoal())
        .month(budgetForm.getMonth())
        .year(budgetForm.getYear())
        .monthYear(budgetForm.getMonth() + budgetForm.getYear())
        .remainder(budgetForm.getRemainder()).build();


        budgetService.save(budget);
        
        return "redirect:/user/budget";
    }



    @RequestMapping("/allreports")
    public String allReports(){

        System.out.println("IN All report page...............");
        return "/user/allreports.html";
    }

    @RequestMapping("/rough")
    public String rough(){
        return "/user/rough";
    }

    // This is for managing yearly budget and monthly budget
    @ModelAttribute
    public void yearlyBudget(HttpSession session){

        YearlyBudget checkYearlyBudget =(YearlyBudget) session.getAttribute("yearlyBudget");

        if(checkYearlyBudget != null){
            System.out.println("Found session...............");
            return;
        }
        else{
            String year = Integer.toString(LocalDateTime.now().getYear());
            YearlyBudget yearlyBudget = yearlyBudgetService.findByUserAndYear(year)
            .orElseGet(() -> {
                YearlyBudget newYearlyBudget = new YearlyBudget();
                yearlyBudgetService.save(newYearlyBudget);
                return newYearlyBudget;
            });
            System.out.println("Creating session................");

        session.setAttribute("yearlyBudget",yearlyBudget);
        }
    }
   
}
