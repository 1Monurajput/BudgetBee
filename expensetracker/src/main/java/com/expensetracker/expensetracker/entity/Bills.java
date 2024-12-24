package com.expensetracker.expensetracker.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
@NoArgsConstructor
@AllArgsConstructor
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
    private LocalDateTime time;
    private String billAttachement;

    @ManyToOne
    @JsonIgnore
    private Users user;

}
//     @JsonIgnore