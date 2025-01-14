package com.expensetracker.expensetracker.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.entity.YearlyBudget;
import java.util.*;

@Repository
public interface YearlyBudgetRepo extends JpaRepository<YearlyBudget,String> {

    Optional<YearlyBudget> findByUserAndYear(Users user, String year);

    List<YearlyBudget> findAllByUser(Users user);
}
