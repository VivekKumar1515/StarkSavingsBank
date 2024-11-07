package com.winterfell.controller;

import com.winterfell.Service.EmailService;
import com.winterfell.constants.ApplicationConstants;
import com.winterfell.model.Customer;
import com.winterfell.model.PasswordResetRequest;
import com.winterfell.repository.CustomerRepository;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class PasswordResetController {
    private final CustomerRepository customerRepository;
    private final Environment environment;
    private final EmailService emailService;

    public String generateJwt() {
        String secretKey = environment.getProperty("SECRET_KEY", ApplicationConstants.JWT_SECRET_DEFAULT);
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        String jwt = Jwts.builder().setIssuer("Stark Savings Bank").setIssuedAt(new Date()).setSubject("Forgot Password Auth Token").setExpiration(new Date(new Date().getTime() + 3000000)).signWith(key).compact();
        return jwt;
    }

    @RequestMapping(path = "/password-forgot")
    public ResponseEntity<String> passwordReset(@RequestBody() PasswordResetRequest resetRequest) {
        String emailToVerify = resetRequest.email().trim().toLowerCase().strip();
            if(customerRepository.existsByEmail(emailToVerify)) {
                String jwt = generateJwt();
                String link = environment.getProperty("Password_RESET_URL", ApplicationConstants.PASSWORD_RESET_URL) + "?token=" + jwt;
                boolean mailStatus = emailService.sendResetLink(emailToVerify, link);

                if(mailStatus) {
                    return ResponseEntity.status(HttpStatus.OK).body("Person has been redirect sucessfully to link: " + link);
                }
            }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email doesn't exist, please register.");
    }
}
