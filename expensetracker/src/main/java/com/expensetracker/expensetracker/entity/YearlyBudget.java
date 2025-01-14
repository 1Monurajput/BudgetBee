package com.expensetracker.expensetracker.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class YearlyBudget {

    @Id
    private String yearlyBudgetId;

    private String jan;
    private String feb;
    private String march;
    private String april;
    private String may;
    private String june;
    private String july;
    private String aug;
    private String sep;
    private String oct;
    private String nov;
    private String december;

    private double totalSaving;
    private double totalExpense;
    private double totalIncome;
    private double totalBudget;
    private String time; 
    private String year;

    @ManyToOne
    @JsonIgnore
    private Users user;

    @OneToMany(mappedBy = "yearlyBudget", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Budget> budget = new ArrayList<>();

}
