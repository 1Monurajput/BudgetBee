package com.expensetracker.expensetracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.forms.UserForm;
import com.expensetracker.expensetracker.services.UserServices;

@Controller
public class PageController {

    @Autowired
    private UserServices userServices;


    @RequestMapping("/home")
    public String home(){
        System.out.println("This is home page........");
        return "home";
    }

    
    @RequestMapping("/login")
    public String login(){
        System.out.println("This is login page........");
        return "login";
    }
    


    @RequestMapping("/register")
    public String register(Model model){
        System.out.println("This is register page........");

        model.addAttribute("userForm", new UserForm());
        return "register";
    }



    @RequestMapping("/registration")
    public String registration(@ModelAttribute("userForm") UserForm userForm){
        System.out.println("Doing Registration............");
        // fetch
        Users user = Users.builder()
        .name(userForm.getName())
        .email(userForm.getEmail())
        .phone(userForm.getPhone())
        .password(userForm.getPassword())
        .build();


        // validate 

        // suave
        userServices.save(user);
        // msg

        // redirection
        return "redirect:register";
    }
}
