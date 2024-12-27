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
import com.expensetracker.expensetracker.repos.UserRepo;
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

        for(int i = 0;i<bills.size();i++){
            System.out.println(bills.get(i).getBillId() + " : " + bills.get(i).getTitle());
        }

        model.addAttribute("bills", bills);

        return "user/bills";
    }



   
}
