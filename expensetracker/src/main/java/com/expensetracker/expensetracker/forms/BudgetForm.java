package com.expensetracker.expensetracker.forms;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetForm {

    private double income;
    private double budget;
    private double goal;
    private String month;
    private String year;
    private String remainder;
}
