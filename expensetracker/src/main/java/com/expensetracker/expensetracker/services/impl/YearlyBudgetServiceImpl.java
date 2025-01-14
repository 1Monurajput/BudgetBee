package com.expensetracker.expensetracker.services.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.entity.YearlyBudget;
import com.expensetracker.expensetracker.helper.NotFoundException;
import com.expensetracker.expensetracker.repos.YearlyBudgetRepo;
import com.expensetracker.expensetracker.services.YearlyBudgetService;

import jakarta.servlet.http.HttpSession;
import java.util.*;

@Service
public class YearlyBudgetServiceImpl implements YearlyBudgetService {

    @Autowired
    private HttpSession session;

    @Autowired
    private YearlyBudgetRepo yearlyBudgetRepo;

    @Override
    public void save(YearlyBudget yearlyBudget) {
        String id = UUID.randomUUID().toString();

        yearlyBudget.setYearlyBudgetId(id);
        yearlyBudget.setTime(LocalDateTime.now().toString());

        yearlyBudget.setYear(Integer.toString(LocalDateTime.now().getYear()));

        yearlyBudget.setUser((Users) session.getAttribute("user"));
        
        System.out.println("in side yearlybudget impl.......................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        yearlyBudgetRepo.save(yearlyBudget);
    }

    @Override
    public Optional<YearlyBudget> findByUserAndYear(String year) {
        Users user = (Users) session.getAttribute("user");

        return yearlyBudgetRepo.findByUserAndYear(user,year);
    }

    @Override
    public void update(YearlyBudget yearlyBudget) {
        yearlyBudgetRepo.save(yearlyBudget);
    }

    @Override
    public String getMonthlyBudgetId(String year) {
        YearlyBudget yearlyBudget = findByUserAndYear(year).orElseThrow(() -> new NotFoundException("Resource not found"));
        String budgetId = null;
        int month = LocalDateTime.now().getMonthValue();
        switch (month) {
            case 1:
                budgetId = yearlyBudget.getJan();
                break;
            case 2:
                budgetId = yearlyBudget.getFeb();
                break;
            case 3:
                budgetId = yearlyBudget.getMarch();
                break;
            case 4:
                budgetId = yearlyBudget.getApril();
                break;
            case 5:
                budgetId = yearlyBudget.getMay();
                break;
            case 6:
                budgetId = yearlyBudget.getJune();
                break;
            case 7:
                budgetId = yearlyBudget.getJuly();
                break;
            case 8:
                budgetId = yearlyBudget.getAug();
                break;
            case 9:
                budgetId = yearlyBudget.getSep();
                break;
            case 10:
                budgetId = yearlyBudget.getOct();
                break;
            case 11:
                budgetId = yearlyBudget.getNov();
                break;
            case 12:
                budgetId = yearlyBudget.getDecember();
                break;
            default:
                break;
        }
        
        return budgetId;
    
    }

    @Override
    public List<YearlyBudget> findAllByUser(Users user) {
        return yearlyBudgetRepo.findAllByUser(user);
    }

    @Override
    public String getMonthlyBudgetId(String month, String year) {
        YearlyBudget yearlyBudget = findByUserAndYear(year).orElseThrow(() -> new NotFoundException("Resource not found"));
        String budgetId = null;
        Map<String,Integer> monthMap = new HashMap<>();
        monthMap.put("jan", 1);
        monthMap.put("feb", 2);
        monthMap.put("mar", 3);
        monthMap.put("april", 4);
        monthMap.put("may", 5);
        monthMap.put("june", 6);
        monthMap.put("july", 7);
        monthMap.put("aug", 8);
        monthMap.put("sep", 9);
        monthMap.put("oct", 10);
        monthMap.put("nov", 11);
        monthMap.put("dec", 12);
        int monthNumber = monthMap.get(month);
        switch (monthNumber) {
            case 1:
                budgetId = yearlyBudget.getJan();
                break;
            case 2:
                budgetId = yearlyBudget.getFeb();
                break;
            case 3:
                budgetId = yearlyBudget.getMarch();
                break;
            case 4:
                budgetId = yearlyBudget.getApril();
                break;
            case 5:
                budgetId = yearlyBudget.getMay();
                break;
            case 6:
                budgetId = yearlyBudget.getJune();
                break;
            case 7:
                budgetId = yearlyBudget.getJuly();
                break;
            case 8:
                budgetId = yearlyBudget.getAug();
                break;
            case 9:
                budgetId = yearlyBudget.getSep();
                break;
            case 10:
                budgetId = yearlyBudget.getOct();
                break;
            case 11:
                budgetId = yearlyBudget.getNov();
                break;
            case 12:
                budgetId = yearlyBudget.getDecember();
                break;
            default:
                break;
        }
        
        return budgetId;
    }


}
