package com.winterfell.controller;

import com.winterfell.model.Accounts;
import com.winterfell.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AccountController {
    private final AccountRepository accountRepository;

    @RequestMapping(value = "/myAccount", method = RequestMethod.GET)
    private Accounts getAccountDetails(@RequestParam(name = "id") long id) {
        Optional<Accounts> accountsOptional = accountRepository.findByCustomerId(id);
        return accountsOptional.orElse(null);
    }
}
