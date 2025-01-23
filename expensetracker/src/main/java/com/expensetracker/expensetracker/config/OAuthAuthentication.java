package com.expensetracker.expensetracker.config;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.expensetracker.expensetracker.entity.Provider;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.repos.UserRepo;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuthAuthentication implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepo userRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        logger.info("This is google authentication.....  loginnnnnnnnnnnn");

        DefaultOAuth2User user = (DefaultOAuth2User) authentication.getPrincipal();
        String email = user.getAttribute("email").toString();
        if(userRepo.existsByEmail(email) == false){

            String name = user.getAttribute("name").toString();
            String profilePicture = user.getAttribute("picture").toString();
            String providerId = user.getAttribute("sub").toString();

            // user 2 is fetching user entity
            Users user2 = new Users();

            user2.setUserId(UUID.randomUUID().toString());
            user2.setEmail(email);
            user2.setEmailVerified(true);
            user2.setName(name);
            user2.setPassword("password");
            user2.setProfilePicture(profilePicture);
            user2.setProvider(Provider.GOOGLE);
            user2.setProviderId(providerId);
            user2.setRegistrationDateTime(LocalDateTime.now());
            user2.setLastLogin(LocalDateTime.now());

            //save user in the database
            userRepo.save(user2);

            logger.info("Authenticated user successfully saved in the database");
        }
        else{
            logger.info("Authenticated user is already exists");
        }


        new DefaultRedirectStrategy().sendRedirect(request, response, "/user/dashboard");
    }

}
