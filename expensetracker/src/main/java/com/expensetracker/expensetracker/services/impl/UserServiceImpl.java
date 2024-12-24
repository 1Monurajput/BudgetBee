package com.expensetracker.expensetracker.services.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.repos.UserRepo;
import com.expensetracker.expensetracker.services.UserServices;

@Service
public class UserServiceImpl implements UserServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users save(Users user) {
        String userId = UUID.randomUUID().toString();
        user.setUserId(userId);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public Optional<Users> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public void update(String email,String name, String phone,String fileUrl) {
        
        Users user = userRepo.findByEmail(email).orElseThrow(null);
        user.setName(name);
        user.setPhone(phone);
        if(fileUrl !=null && !fileUrl.isEmpty()){
            user.setProfilePicture(fileUrl);
        }
        userRepo.save(user);

    }

}
