package com.expensetracker.expensetracker.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.expensetracker.entity.Budget;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.entity.YearlyBudget;
import com.expensetracker.expensetracker.helper.NotFoundException;
import com.expensetracker.expensetracker.repos.BudgetRepo;
import com.expensetracker.expensetracker.services.BudgetService;
import com.expensetracker.expensetracker.services.YearlyBudgetService;

import jakarta.servlet.http.HttpSession;

@Service
public class budgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepo budgetRepo;

    @Autowired
    private HttpSession session;

    @Autowired
    private YearlyBudgetService yearlyBudgetService;

    @Override
    public void save(Budget budget) {
        String id = UUID.randomUUID().toString();

        budget.setBudgetId(id);
        String time = LocalDateTime.now().toString();
        budget.setTime(time);
        
        budget.setUser((Users) session.getAttribute("user"));

        //yearly budget
        String year = budget.getYear();
        YearlyBudget yearlyBudget = yearlyBudgetService.findByUserAndYear(year).orElseThrow(() -> new NotFoundException("Resource not found"));

        budget.setYearlyBudget(yearlyBudget);

        System.out.println("in impl..........................");

        Budget budget2 = budgetRepo.save(budget);
        String newId = budget2.getBudgetId();

        int currentMonth = LocalDateTime.now().getMonthValue();

        switch (currentMonth) {
            case 1:
                yearlyBudget.setJan(newId);
                break;

            case 2:
                yearlyBudget.setFeb(newId);
                break;

            case 3:
                yearlyBudget.setMarch(newId);
                break;

            case 4:
                yearlyBudget.setApril(newId);
                break;
            case 5:
                yearlyBudget.setMay(newId);
                break;
            case 6:
                yearlyBudget.setJune(newId);
                break;
            case 7:
                yearlyBudget.setJuly(newId);
                break;
            case 8:
                yearlyBudget.setAug(newId);
                break;
            case 9:
                yearlyBudget.setSep(newId);
                break;
            case 10:
                yearlyBudget.setOct(newId);
                break;
            case 11:
                yearlyBudget.setNov(newId);
                break;
            case 12:
                yearlyBudget.setDecember(newId);
                break;
            default:
                break;
        }

        yearlyBudgetService.update(yearlyBudget);
    }

    @Override
    public Optional<Budget> findById(String id) {
        return budgetRepo.findById(id);
    }

    @Override
    public void update(Budget budget) {
        budgetRepo.save(budget);
    }

    @Override
    public Optional<Budget> findByMonthAndYearAndUser(String month, String year) {
        Users user = (Users) session.getAttribute("user");
        return budgetRepo.findByMonthAndYearAndUser(month,year,user);
    }

}
