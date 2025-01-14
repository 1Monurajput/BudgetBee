package com.expensetracker.expensetracker.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {

    @Id
    private String budgetId;
    private double income;
    private double budget;
    private double liveBudget;
    private double expense;
    private double goal;
    private double unrecodedExpense;
    private String month;
    private String year;
    private String monthYear;
    private String time;
    private String remainder;
    private double totalExpense;
    private double totalSaving;
    private boolean reachedGoal;


    @ManyToOne
    @JsonIgnore
    private Users user;

    @ManyToOne
    @JsonIgnore
    private YearlyBudget yearlyBudget;

    @OneToMany(mappedBy = "budget",cascade = CascadeType.ALL,fetch = FetchType.EAGER,orphanRemoval = true)
    private List<Bills> bills = new ArrayList<>();
}
