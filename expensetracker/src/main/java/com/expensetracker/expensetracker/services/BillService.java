package com.expensetracker.expensetracker.services;

import java.util.List;
import java.util.Optional;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;

public interface BillService {
    Bills saveBill(Bills bill);
    List<Bills> findByUser(Users user);

    void deleteById(String id);

    Optional<Bills>findById(String id);

    void updateBill(Bills bill);

    List<Bills> findByMonthAndYearAndUser(String month,String year);

}
