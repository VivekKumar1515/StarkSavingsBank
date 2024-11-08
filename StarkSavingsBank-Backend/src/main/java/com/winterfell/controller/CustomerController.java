package com.winterfell.controller;

import com.winterfell.config.StarkSavingsBankUserandPasswordAuthenticationProvider;
import com.winterfell.constants.ApplicationConstants;
import com.winterfell.enums.Role;
import com.winterfell.model.Customer;
import com.winterfell.model.LoginRequestDTO;
import com.winterfell.model.LoginResponseDTO;
import com.winterfell.repository.CustomerRepository;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@Slf4j
public class CustomerController {
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;
    private final AuthenticationManager authenticationManager;
    private final Environment environment;

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    private ResponseEntity<String> registerUser(@RequestBody @Valid Customer customer) {
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

    @RequestMapping(path = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<LoginResponseDTO> loginApi(@RequestBody LoginRequestDTO loginRequest) {
        String jwt = "";
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
        Authentication authenticationResponse = authenticationManager.authenticate(authentication);

        if(authenticationResponse != null && authenticationResponse.isAuthenticated()) {
            if(environment != null) {
                String secret = environment.getProperty(ApplicationConstants.JWT_SECRET_KEY, ApplicationConstants.JWT_SECRET_DEFAULT);
                SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
                jwt = Jwts.builder().setIssuer("Stark Savings Bank").setSubject("JWT Token").claim("username", authenticationResponse.getName()).claim("authorities", authenticationResponse.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","))).setExpiration(new java.util.Date(new java.util.Date().getTime() + 30000000)).setIssuedAt(new java.util.Date()).signWith(secretKey).compact();
            }
        }

        return ResponseEntity.status(HttpStatus.OK).header(ApplicationConstants.JWT_HEADER, jwt).body(new LoginResponseDTO(HttpStatus.OK.getReasonPhrase(), jwt));
    }
}
