package com.winterfell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.winterfell.enums.CardType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Setter @Getter
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    @JsonIgnore
    private long cardId;

    @Column(name = "card_number")
    private String cardNumber;

    @JsonIgnore
    private long customerId;

    @Column(name = "card_type")
    @Enumerated(value = EnumType.STRING)
    private CardType cardType;

    @Column(name = "total_limit")
    private long totalLimit;

    @Column(name = "amount_used")
    private long amountUsed;

    @JsonIgnore
    @Column(name = "create_dt")
    private Date createDate;
}
