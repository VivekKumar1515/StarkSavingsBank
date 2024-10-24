package com.winterfell.controller;

import com.winterfell.model.AccountTransactions;
import com.winterfell.repository.AccountTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BalanceController {

    private final AccountTransactionRepository transactionRepository;

    @RequestMapping(value = "/myBalance", method = RequestMethod.GET)
    private List<AccountTransactions> getBalanceDetails (@RequestParam(name = "id") long id) {
        List<AccountTransactions> transactions = transactionRepository.findByCustomerIdOrderByTransactionDate(id);

        return transactions != null? transactions : Collections.emptyList();
    }

}
