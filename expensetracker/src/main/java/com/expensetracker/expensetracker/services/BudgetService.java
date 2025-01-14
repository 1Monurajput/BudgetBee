package com.expensetracker.expensetracker.services;

import com.expensetracker.expensetracker.entity.Budget;
import com.expensetracker.expensetracker.entity.Users;
import java.util.*;

public interface BudgetService {
    void save(Budget budget);

    Optional<Budget> findById(String id);

    void update(Budget budget);
}
