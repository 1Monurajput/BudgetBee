package com.expensetracker.expensetracker.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.services.UserServices;

@RestController
@RequestMapping(value="/api")
public class ApiHandler {

    @Autowired
    private UserServices userServices;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(value="/checkEmail")
    public String checkEmail(@RequestBody Map<String,String>requestBody){
        String email = requestBody.get("email");
        String pass = requestBody.get("pass");
        
        if(userServices.existsByEmail(email)){

            Users user = userServices.findByEmail(email).orElseThrow(null); 
            if(passwordEncoder.matches(pass, user.getPassword())){
                return "{\"msg\" : \"done\"}";
            }
            else{
                return "{\"msg\" : \"password\"}";
            }
        }
        return "{\"msg\": \"email\"}";
    }
}
