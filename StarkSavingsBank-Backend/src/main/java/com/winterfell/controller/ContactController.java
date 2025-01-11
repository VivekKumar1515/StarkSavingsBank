package com.winterfell.controller;

import com.winterfell.model.Contact;
import com.winterfell.repository.ContactRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name =  "Contacts API", description = "POST contacts")
public class ContactController {
    private final ContactRepository contactRepository;

    @RequestMapping(path = "/contact", method = RequestMethod.POST)
    @Operation(method = "POST", description = "Create a new contact message", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "contact message object", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Contact.class)), required = true))
    private ResponseEntity<Contact> saveMessage(@RequestBody @Valid Contact contact) {
        contact.setCreateDate(Date.valueOf(LocalDate.now()));

        Contact savedContact = contactRepository.save(contact);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedContact);
    }
}
