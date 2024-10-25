package com.winterfell.model;

import com.winterfell.enums.AccountType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Setter @Getter
@Table(name = "accounts")
public class Accounts {

    private long customerId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_number")
    private long accountNumber;

    @Column(name = "branch_address")
    private String branchAddress;

    @Column(name = "account_type")
    @Enumerated(value = EnumType.STRING)
    private AccountType accountType;

    @Column(name = "create_dt")
    private Date createDate;
}
