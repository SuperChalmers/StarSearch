package com.starsearch.starsearch.controllers;

import com.starsearch.starsearch.models.GetSavedSimulationsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GetSavedSimulationsController {

    @GetMapping(value="/simulations")
    public GetSavedSimulationsResponse getSavedSimulations() {
        final Map<String, String> savedSimulations = new HashMap<>();
        savedSimulations.put("test", "testFile"); //TODO scrape save directory for save files
        return GetSavedSimulationsResponse.builder()
                .simulations(savedSimulations)
                .build();

    }
}
