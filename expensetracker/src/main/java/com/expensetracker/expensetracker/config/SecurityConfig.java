package com.expensetracker.expensetracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.expensetracker.expensetracker.services.impl.SecurityCustomUserDetailsService;

@Configuration
public class SecurityConfig {

    @Autowired
    private SecurityCustomUserDetailsService userDetailsService;

    @Autowired
    private OAuthAuthentication oAuthAuthentication;

    

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
         DaoAuthenticationProvider daoAuthenticationProvider =new DaoAuthenticationProvider();

         daoAuthenticationProvider.setUserDetailsService(userDetailsService);
         daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());

         return daoAuthenticationProvider;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity.authorizeHttpRequests(authorize ->{
            authorize.requestMatchers("/user/**").authenticated()
            .anyRequest().permitAll();
        });

        httpSecurity.csrf(csrf-> csrf.disable()); // disable for post problem api

        httpSecurity.formLogin(formLogin ->{
            formLogin.loginPage("/login")
            .loginProcessingUrl("/authenticating")
            .defaultSuccessUrl("/user/dashboard")
            .usernameParameter("email")
            .passwordParameter("password");
        });

        // Oauth configuration

        // httpSecurity.oauth2Login(Customizer.withDefaults());

        httpSecurity.oauth2Login(oauth ->{
            oauth.loginPage("/login");
            oauth.successHandler(oAuthAuthentication);
        });


        httpSecurity.logout(logoutForm -> {
            logoutForm.logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // Allow GET requests for logout
                      .logoutSuccessUrl("/login") // Redirect to login page after logout
                      .invalidateHttpSession(true) // Invalidate session
                      .clearAuthentication(true) // Clear authentication
                      .deleteCookies("JSESSIONID"); // Delete session cookie
        });


        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}

