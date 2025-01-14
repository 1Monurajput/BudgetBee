package com.expensetracker.expensetracker.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;

@Repository
public interface BillRepo extends JpaRepository<Bills,String> {

    @Query("SELECT b FROM Bills b WHERE b.user = :user ORDER BY b.timeStamp DESC")
    List<Bills> findByUser(Users user);
    

    @Query("SELECT b FROM Bills b WHERE b.month = :month AND b.year = :year AND b.user= :user ORDER BY b.timeStamp DESC")
    List<Bills> findByMonthAndYearAndUser(String month,String year,Users user);

    // select * from bills where month="jan" && year='2025' && user_user_id="3cd6320b-80c9-4b16-a09b-272d9396084a" order by time_stamp desc;
}
