package com.winterfell.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Setter
@Getter
public class Contact {
    @Id
    @Column(name = "contact_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String contactId;

    @Column(name = "contact_name")
    private String contactName;

    @Email
    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "subject")
    @Size(min = 5, max = 100, message = "Size must be between 5 to 100 characters")
    private String subject;

    @Size(min = 5, max = 200, message = "Size must be between 5 to 200 characters")
    private String message;

    @Column(name = "create_dt")
    private Date createDate;
}
