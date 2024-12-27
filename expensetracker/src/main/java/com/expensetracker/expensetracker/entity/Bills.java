package com.expensetracker.expensetracker.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Bills {

    @Id
    private String billId;
    private String title;
    private double rate;
    private String method;
    private String currency;
    private String status;
    private String date;
    private String description;
    private String categories;

    private String dueDate;
    private String biller;
    private String billerPhone;
    private String time;
    private String billAttachement;


    @ManyToOne
    private Users user;

}
