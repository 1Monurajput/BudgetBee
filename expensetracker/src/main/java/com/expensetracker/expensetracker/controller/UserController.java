package com.expensetracker.expensetracker.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.repos.BillRepo;
import com.expensetracker.expensetracker.services.BillService;
import com.expensetracker.expensetracker.services.UserServices;

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
    private BillRepo billRepo;
    
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


        System.out.println("before deletion......... ..........................: " + bills.get(0).getBillId());
        // billRepo.deleteById("4ffa2f52-cff1-48b9-85fc-62adb8488b58");
       Bills bill2 =  billRepo.findById("7cdf8681-2ff9-4808-ac92-17be7249aecf").orElseThrow(null);

       System.out.println(bill2.getBillId());
       billRepo.deleteById(bill2.getBillId());

       System.out.println(bill2.getTitle());
        System.out.println("after deletion...............");


        

        if(bills.size() >0){
            model.addAttribute("bills", bills);
        }
        return "user/bills";
    }
   
}
