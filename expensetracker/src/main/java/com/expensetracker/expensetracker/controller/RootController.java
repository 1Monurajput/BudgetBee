package com.expensetracker.expensetracker.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.services.UserServices;


import jakarta.servlet.http.HttpSession;

@ControllerAdvice
public class RootController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserServices userServices;

    @ModelAttribute
    public void loggedInUserInformation(Authentication authentication, HttpSession session, Model model){
        
        if(authentication == null){
            return;
        }
        String loggedInUserEmail = null;

        // to check any user is logged in or not.
        model.addAttribute("LoggedIn", "true");

        if(authentication.getPrincipal() instanceof OAuth2User){
            loggedInUserEmail = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
            System.out.println("loggedin By Gmail");
        }
        else{
            loggedInUserEmail = authentication.getName();
            System.out.println("logged in by form");
        }

        System.out.println("LoggedInUser email: " + loggedInUserEmail);

        Users user = userServices.findByEmail(loggedInUserEmail).orElseThrow(null);
        String loggedInUserName = user.getName();
        String loggedInUserProfilePic = user.getProfilePicture();

        session.setAttribute("email", loggedInUserEmail);
        session.setAttribute("user_name", loggedInUserName);
        session.setAttribute("user_profilePicture", loggedInUserProfilePic);
        session.setAttribute("user",user);


        System.out.println(session.getAttribute("email"));
    }



}
