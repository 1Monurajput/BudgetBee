package com.expensetracker.expensetracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/dashboard")
    public String dashboard(){
        System.out.println("This is dashboard...............");



        return "user/dashboard";
    }
}
