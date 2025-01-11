package com.winterfell.controller;

import com.winterfell.model.Loan;
import com.winterfell.repository.LoanRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Loans API", description = "Get loans")
public class LoansController {

    private final LoanRepository loanRepository;

    @Operation(method = "GET", description = "fetch the loan detail using Id", parameters = {@Parameter(description = "Customer Id", name = "id")})
    @RequestMapping(path = "myLoans", method = RequestMethod.GET)
    private List<Loan> getLoanDetails(@RequestParam(name = "id") long id) {
        List<Loan> loans = loanRepository.findByCustomerIdOrderByStartDateDesc(id);
        return loans != null? loans : Collections.emptyList();
    }
}
