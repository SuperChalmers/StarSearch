package com.starsearch.starsearch.controllers;

import com.starsearch.starsearch.models.GetSavedSimulationsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GetSavedSimulationsController {

    private static final String SAVE_FOLDER = "/SaveSim/";
    private static final String SAVE_NAME = "savesim.csv";

    @GetMapping(value="/simulations")
    public GetSavedSimulationsResponse getSavedSimulations() {
        final String current = System.getProperty("user.dir");
        final File[] saveDirectory = new File(current + SAVE_FOLDER + SAVE_NAME).listFiles();
        final List<String> savedSimulations = Arrays.stream(saveDirectory).map(file -> prepCSVString(file.getName())).collect(Collectors.toList());
        return GetSavedSimulationsResponse.builder() //TODO what should this return
                .simulations(savedSimulations)
                .build();
    }

    public String prepCSVString(String csvString) {
        return csvString.replace(".csv", "");
    }
}
