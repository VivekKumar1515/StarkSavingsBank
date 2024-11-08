package com.winterfell.controller;

import com.winterfell.Service.EmailService;
import com.winterfell.constants.ApplicationConstants;
import com.winterfell.model.EmailResetRequest;
import com.winterfell.model.ResetRequestDTO;
import com.winterfell.repository.CustomerRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PasswordResetController {
    private final CustomerRepository customerRepository;
    private final Environment environment;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public String generateJwt(String email) {
        String secretKey = environment.getProperty("SECRET_KEY", ApplicationConstants.JWT_SECRET_DEFAULT);
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        String jwt = Jwts.builder().setIssuer("Stark Savings Bank").setIssuedAt(new Date()).setSubject("Forgot Password Auth Token").claim("username", email).claim("authorities", "RESET-PASSWORD").setExpiration(new Date(new Date().getTime() + 3000000)).signWith(key).compact();
        return jwt;
    }

    @RequestMapping(path = "/password-forgot")
    public ResponseEntity<String> sendResetPasswordMail(@RequestBody() EmailResetRequest resetRequest) {
        String emailToVerify = resetRequest.email().trim().toLowerCase().strip();
            if(customerRepository.existsByEmail(emailToVerify)) {
                String jwt = generateJwt(emailToVerify);
                String link = environment.getProperty("Password_RESET_URL", ApplicationConstants.PASSWORD_RESET_URL) + "?token=" + jwt;
                boolean mailStatus = emailService.sendResetLink(emailToVerify, link);

                if(mailStatus) {
                    return ResponseEntity.status(HttpStatus.OK).body("Person has been redirect sucessfully to link: " + link);
                }
            }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email doesn't exist, please register.");
    }


    @RequestMapping(path = "/reset-password", method = RequestMethod.POST)
    public ResponseEntity<String>  resetPassword(@RequestBody @Validated ResetRequestDTO requestObject, Authentication authentication) {
        try {
            String encryptedPassword = passwordEncoder.encode(requestObject.password());
            int response = customerRepository.updatePassword(authentication.getName().toLowerCase(), encryptedPassword);

            if(response == 1) {
                log.info("The password was successfully updated for user with email : " + authentication.getName());
                return ResponseEntity.status(HttpStatus.CREATED).body("Password updated successfully");
            } else {
                log.info("The Password row was not updated in the database");
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Password was not updated");
            }
        } catch (Exception e) {
            log.error("Exception occurred in {} due to {}", this.getClass().getName(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Password not updated");
        }
    }
}
