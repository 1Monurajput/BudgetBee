package com.expensetracker.expensetracker.services.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.repos.UserRepo;
import com.expensetracker.expensetracker.services.UserServices;

@Service
public class UserServiceImpl implements UserServices {

    @Autowired
    private UserRepo userRepo;

    @Override
    public Users save(Users user) {
        String userId = UUID.randomUUID().toString();
        user.setUserId(userId);
        return userRepo.save(user);
    }

}
