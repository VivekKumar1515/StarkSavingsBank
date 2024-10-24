package com.winterfell.controller;

import com.winterfell.model.Contact;
import com.winterfell.repository.ContactRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequiredArgsConstructor
public class ContactController {
    private final ContactRepository contactRepository;

    @RequestMapping(path = "/contact", method = RequestMethod.POST)
    private ResponseEntity<String> saveMessage(@RequestBody @Valid Contact contact) {
        contact.setCreateDate(new Date(System.currentTimeMillis()));

        contactRepository.save(contact);

        return ResponseEntity.status(HttpStatus.CREATED).body("Message has been sent ❤");
    }
}
