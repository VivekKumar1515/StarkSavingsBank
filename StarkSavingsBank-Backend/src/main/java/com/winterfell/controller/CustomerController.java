package com.winterfell.controller;

import com.winterfell.enums.Role;
import com.winterfell.model.Customer;
import com.winterfell.repository.CustomerRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@Slf4j
public class CustomerController {
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    private ResponseEntity<String> registerUser(@RequestBody @Valid Customer customer) {
        /*
        * TODO
        *  - Check if the entry for the customer already exists in the database
        *  - If it does not then encode password, set the role as customer, set the creation date
        */

        if(!customerRepository.existsByEmail(customer.getEmail())) {
            customer.setPwd(passwordEncoder.encode(customer.getPwd()));
            customer.setRole(Role.CUSTOMER);
            customer.setCreateDate(new Date(System.currentTimeMillis()));

            try {

                customerRepository.save(customer);
                return ResponseEntity.status(HttpStatus.CREATED).body("Registration Successful");
            } catch (Exception e) {
                log.error("Registration failed in {}: {}. Exception: {}", getClass().getName(), e.getMessage(), e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration Failed, try again later");
            }

        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already registered");
    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    private Customer getUserDetails(Authentication authentication) {
        Optional<Customer> customerFromDB = customerRepository.findByEmail(authentication.getName());
        return customerFromDB.orElse(null);
    }
}
