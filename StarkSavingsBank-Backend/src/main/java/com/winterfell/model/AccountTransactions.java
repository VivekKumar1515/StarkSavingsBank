package com.winterfell.model;

import com.winterfell.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "account_transactions")
public class AccountTransactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private String transactionId;

    private long accountNumber;

    private long customerId;

    @Column(name = "transaction_dt")
    private Date transactionDate;

    @Column(name = "transaction_summary")
    private String transactionSummary;

    @Column(name = "transaction_type")
    @Enumerated(value = EnumType.STRING)
    private TransactionType transactionType;

    @Column(name = "transaction_amt")
    private long transactionAmount;

    @Column(name = "closing_balance")
    private long closingBalance;

    @Column(name = "create_dt")
    private Date createDate;
}
