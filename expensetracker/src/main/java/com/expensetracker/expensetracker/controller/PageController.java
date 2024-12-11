package com.expensetracker.expensetracker.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.forms.UserForm;
import com.expensetracker.expensetracker.services.UserServices;

import jakarta.servlet.http.HttpSession;

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
    public String registration(@ModelAttribute("userForm") UserForm userForm, Model model,HttpSession session){
        System.out.println("Doing Registration............");
        
        if(userServices.existsByEmail(userForm.getEmail())){
            System.out.println("Email already Registered");
            model.addAttribute("emailError","Email already exists!");
            return "register";
        }
        

        // fetch
        Users user = new Users();
        user.setName(userForm.getName());
        user.setEmail(userForm.getEmail());
        user.setPhone(userForm.getPhone());
        user.setPassword(userForm.getPassword());

        user.setRegistrationDateTime(LocalDateTime.now());
        user.setLastLogin(LocalDateTime.now());


        // validate 



        // save
        userServices.save(user);
        // msg
        session.setAttribute("registeredSuccessfully", "You registered Successfully.");

        // redirection
        return "redirect:register";
    }
}
