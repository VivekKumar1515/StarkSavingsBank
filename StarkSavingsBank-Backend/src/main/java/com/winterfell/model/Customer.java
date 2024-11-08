package com.winterfell.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.winterfell.Annotations.FieldsMatchValidator;
import com.winterfell.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter @Setter
@FieldsMatchValidator(
        field = "pwd",
        matchField = "confirmPwd"
)
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    @JsonProperty(value = "id")
    private long customerId;

    @Column(name = "name")
    @Size(min = 5, max = 100, message = "Size must be between 5 to 100 characters")
    private String name;

    @Email
    private String email;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "house_affiliation")
    private String houseAffiliation;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pwd;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String confirmPwd;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @Column(name = "create_dt")
    private Date createDate;

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Authorities> authorities;
}
