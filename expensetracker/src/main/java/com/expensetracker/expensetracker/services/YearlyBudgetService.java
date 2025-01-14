package com.expensetracker.expensetracker.services;


import java.util.Optional;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.entity.YearlyBudget;
import java.util.*;

public interface YearlyBudgetService {

    void save(YearlyBudget yearlyBudget);

    Optional<YearlyBudget> findByUserAndYear(String year);

    void update(YearlyBudget yearlyBudget);

    String getMonthlyBudgetId(String year);
    String getMonthlyBudgetId(String month,String year);

    List<YearlyBudget> findAllByUser(Users user);
}
