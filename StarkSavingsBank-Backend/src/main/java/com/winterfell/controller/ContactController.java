package com.winterfell.controller;

import com.winterfell.model.Contact;
import com.winterfell.repository.ContactRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class ContactController {
    private final ContactRepository contactRepository;

    @RequestMapping(path = "/contact", method = RequestMethod.POST)
    private ResponseEntity<Contact> saveMessage(@RequestBody @Valid Contact contact) {
        contact.setCreateDate(Date.valueOf(LocalDate.now()));

        Contact savedContact = contactRepository.save(contact);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }
}
