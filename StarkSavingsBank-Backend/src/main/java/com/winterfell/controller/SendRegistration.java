package com.winterfell.controller;

import com.winterfell.Service.EmailService;
import com.winterfell.constants.ApplicationConstants;
import com.winterfell.model.EmailResetRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.sql.Date;

@Controller
@RequiredArgsConstructor
public class SendRegistration {
    private final EmailService emailService;
    private final Environment environment;

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
        if(mailStatus) {
            return ResponseEntity.status(HttpStatus.OK).body("Registration mail sent successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration mail not send!");
        }
    }
}
