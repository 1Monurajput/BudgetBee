package com.expensetracker.expensetracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
public class Users {

    @Id
    public String userId;
    @Column(nullable = false)

    public String name;
    @Column(unique = true,nullable = false)
    public String email;
    @Column(nullable = false)
    public String password;
    public String phone;
    public String profilePicutre;
}
