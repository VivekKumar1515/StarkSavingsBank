package com.winterfell.controller;

import com.winterfell.model.Card;
import com.winterfell.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CardsController {

    private final CardRepository cardRepository;

    @RequestMapping(path = "myCards", method = RequestMethod.GET)
    private List<Card> getCardDetails(@RequestParam(name = "id") long id) {
        List<Card> cards = cardRepository.findByCustomerId(id);

        return cards != null? cards : Collections.emptyList();
    }
}
