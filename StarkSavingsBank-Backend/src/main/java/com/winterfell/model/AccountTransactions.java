package com.winterfell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.winterfell.enums.TransactionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter @Setter
@Table(name = "account_transactions")
public class AccountTransactions {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "transaction_id")
    @JsonIgnore
    private String transactionId;

    @JsonIgnore
    private long accountNumber;

    @JsonIgnore
    private long customerId;

    @Column(name = "transaction_dt")
    @JsonProperty(value = "transactionDt")
    private Date transactionDate;

    @Column(name = "transaction_summary")
    private String transactionSummary;

    @Column(name = "transaction_type")
    @Enumerated(value = EnumType.STRING)
    private TransactionType transactionType;

    @Column(name = "transaction_amt")
    @JsonProperty(value = "transactionAmount")
    private long transactionAmount;

    @Column(name = "closing_balance")
    private long closingBalance;

    @Column(name = "create_dt")
    @JsonProperty
    private Date createDate;
}
