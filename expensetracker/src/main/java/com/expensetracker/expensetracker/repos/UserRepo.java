package com.expensetracker.expensetracker.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expensetracker.entity.Users;



@Repository
public interface UserRepo extends JpaRepository<Users,String> {

    Optional<Users> findByEmail(String email);
    boolean existsByEmail(String email);
}
