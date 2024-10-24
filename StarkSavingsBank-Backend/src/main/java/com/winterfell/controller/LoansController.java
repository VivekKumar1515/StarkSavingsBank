package com.winterfell.controller;

import com.winterfell.model.Loan;
import com.winterfell.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class LoansController {

    private final LoanRepository loanRepository;

    @RequestMapping(path = "myLoans", method = RequestMethod.GET)
    private List<Loan> getLoanDetails(@RequestParam(name = "id") long id) {
        List<Loan> loans = loanRepository.findByCustomerIdOrderByStartDateDesc(id);
        return loans != null? loans : Collections.emptyList();
    }
}
