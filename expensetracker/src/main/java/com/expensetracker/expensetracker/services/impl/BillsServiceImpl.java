package com.expensetracker.expensetracker.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.repos.BillRepo;
import com.expensetracker.expensetracker.services.BillService;

import jakarta.servlet.http.HttpSession;

@Service
public class BillsServiceImpl implements BillService {

  @Autowired
  private BillRepo billRepo;

  @Autowired
  private HttpSession session;

  @Override
  public Bills saveBill(Bills bill) {
    bill.setBillId(UUID.randomUUID().toString());

    Users user = (Users) session.getAttribute("user");
    bill.setUser(user);
    return billRepo.save(bill);
  }

  @Override
  public List<Bills> findByUser(Users user) {
    return billRepo.findByUser(user);
  }

  @Override
  public void deleteById(String id) {
    System.out.println("in implementation");
    billRepo.deleteById(id);
  }

  @Override
  public Optional<Bills> findById(String id) {

    return billRepo.findById(id);
  }

  @Override
  public void updateBill(Bills bill) {
    billRepo.save(bill);
  }

}
