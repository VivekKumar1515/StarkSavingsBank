package com.winterfell.controller;

import com.winterfell.model.AccountTransactions;
import com.winterfell.repository.AccountTransactionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Balance API", description = "Get balance")
public class BalanceController {

    private final AccountTransactionRepository transactionRepository;

    @Operation(method = "GET", description = "fetch balance details using Customer Id", parameters = {@Parameter(name = "id", allowEmptyValue = false, description = "Customer Id")})
    @RequestMapping(value = "/myBalance", method = RequestMethod.GET)
    private List<AccountTransactions> getBalanceDetails (@RequestParam(name = "id") long id) {
        List<AccountTransactions> transactions = transactionRepository.findByCustomerIdOrderByTransactionDate(id);

        return transactions != null? transactions.reversed() : Collections.emptyList();
    }

}
