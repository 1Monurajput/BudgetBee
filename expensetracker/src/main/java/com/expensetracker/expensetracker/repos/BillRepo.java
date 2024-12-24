package com.expensetracker.expensetracker.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;

@Repository
public interface BillRepo extends JpaRepository<Bills,String> {

    List<Bills> findByUser(Users user);
}
