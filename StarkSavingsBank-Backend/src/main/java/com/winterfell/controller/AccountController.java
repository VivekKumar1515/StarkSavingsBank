package com.winterfell.controller;

import com.winterfell.model.Accounts;
import com.winterfell.repository.AccountRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.actuate.endpoint.annotation.WriteOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Tag(name = "Accounts API", description = "Get accounts")
public class AccountController {
    private final AccountRepository accountRepository;

    @Operation(method = "GET", description = "fetch account detail using Id", parameters = {@Parameter(name = "id", allowEmptyValue = false, description = "Customer Id")})
    @RequestMapping(value = "/myAccount", method = RequestMethod.GET)
    private Accounts getAccountDetails(@RequestParam(name = "id") long id) {
        Optional<Accounts> accountsOptional = accountRepository.findByCustomerId(id);
        return accountsOptional.orElse(null);
    }
}
