package com.winterfell.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.winterfell.enums.LoanType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter @Getter
@Table(name = "loan")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_number")
    private long loanNumber;

    private long customerId;

    @Column(name = "start_dt")
    private Date startDate;

    @Column(name = "loan_type")
    @Enumerated(value = EnumType.STRING)
    private LoanType loanType;

    @Column(name = "total_loan")
    private long totalLoan;

    @Column(name = "amount_paid")
    private long amountPaid;

    @Column(name = "outstanding_amount")
    private long outstandingAmount;

    @Column(name = "create_dt")
    @JsonProperty(value = "startDt")
    private java.sql.Date createDate;
}
