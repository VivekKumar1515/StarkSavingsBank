package com.winterfell.controller;

import com.winterfell.Service.EmailService;
import com.winterfell.constants.ApplicationConstants;
import com.winterfell.enums.Role;
import com.winterfell.model.Authorities;
import com.winterfell.model.Customer;
import com.winterfell.model.EmailResetRequest;
import com.winterfell.repository.AuthoritiesRepository;
import com.winterfell.repository.CustomerRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Slf4j
public class SendRegistration {
    private final EmailService emailService;
    private final Environment environment;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthoritiesRepository authoritiesRepository;

    public String generateRegistrationJwt(String email) {
        if(environment != null) {
                String secret = environment.getProperty("JWT_SECRET_KEY", ApplicationConstants.JWT_SECRET_DEFAULT);
                SecretKey jwtSecret = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
                String jwtToken = Jwts.builder().setIssuer("Stark Savings Bank").setIssuedAt(new java.util.Date()).setSubject("Registration Link Token").setExpiration(new Date(new java.util.Date().getTime() + 3000000)).claim("username", email).claim("authorities", "REGISTRATION").signWith(jwtSecret).compact();

                return jwtToken;
        } else {
            throw new RuntimeException("Environment not created");
        }
    }

    @RequestMapping(path = "/send-registration", method = RequestMethod.POST)
    public ResponseEntity<String> sendRegistrationLink(@RequestBody EmailResetRequest email) {
        String link = ApplicationConstants.SEND_REGISTRATION_URL + "?token=" + generateRegistrationJwt(email.email());
        boolean mailStatus = emailService.sendRegistrationLink(email.email(), link);
        if (mailStatus) {
            return ResponseEntity.status(HttpStatus.OK).body("Registration mail sent successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration mail not send!");
        }
    }

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    private ResponseEntity<String> registerUser(@RequestBody @Valid Customer customer) {
        if(!customerRepository.existsByEmail(customer.getEmail())) {
            if(customer.getPwd().equals(customer.getConfirmPwd())) {
                customer.setPwd(passwordEncoder.encode(customer.getPwd()));
                customer.setRole(Role.CUSTOMER);
                customer.setCreateDate(new Date(System.currentTimeMillis()));

                try {
                    Customer savedCustomer = customerRepository.save(customer);
                    List<String> authorities = List.of("VIEWACCOUNT", "VIEWCARDS", "VIEWLOANS", "VIEWBALANCE");
                    Set<Authorities> authoritiesSet = authorities.stream().map(authority -> {
                        Authorities appAuthority = new Authorities();
                        appAuthority.setName(authority);
                        appAuthority.setCustomer(savedCustomer);
                        return appAuthority;
                    }).collect(Collectors.toSet());
                    try {
                        authoritiesRepository.saveAll(authoritiesSet);
                    } catch (Exception e) {
                        log.error("Authorities are not saved in the database");
                        throw e;
                    }
                    return ResponseEntity.status(HttpStatus.CREATED).body("Registration Successful");
                } catch (Exception e) {
                    log.error("Registration failed in {}: {}. Exception: {}", getClass().getName(), e.getMessage(), e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration Failed, try again later");
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password and Confirm password are not same!");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already registered");
    }
}
