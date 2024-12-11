package com.expensetracker.expensetracker.services;

import java.util.Optional;

import com.expensetracker.expensetracker.entity.Users;

public interface UserServices {
    
    Users save(Users user);
    boolean existsByEmail(String email);
    Optional<Users>findByEmail(String email);
}
