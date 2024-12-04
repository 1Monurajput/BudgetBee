package com.expensetracker.expensetracker.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expensetracker.entity.Users;

@Repository
public interface UserRepo extends JpaRepository<Users,String> {

}
