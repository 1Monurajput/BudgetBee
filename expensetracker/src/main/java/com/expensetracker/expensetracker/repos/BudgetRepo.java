package com.expensetracker.expensetracker.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expensetracker.entity.Budget;
import com.expensetracker.expensetracker.entity.Users;
import java.util.*;

@Repository
public interface BudgetRepo extends JpaRepository<Budget,String> {

    List<Budget> findByUserAndYear(Users user,String year);
    Optional<Budget> findByMonthAndYearAndUser(String month,String year,Users user);
}
