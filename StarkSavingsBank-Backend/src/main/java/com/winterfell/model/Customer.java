package com.winterfell.model;

import com.winterfell.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "customer")
@Getter @Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private long customerId;

    @Column(name = "name")
    @Size(min = 5, max = 100, message = "Size must be between 5 to 100 characters")
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Number")
    @Column(name = "mobile_number")
    private String mobileNumber;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pwd;

    @Enumerated(value = EnumType.STRING)
    private Role role;


    @Column(name = "create_dt")
    private Date createDate;
}
