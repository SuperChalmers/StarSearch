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

    @GetMapping(value="/simulations")
    public GetSavedSimulationsResponse getSavedSimulations() {
        final String SAVE_FILE_DIRECTORY = ".\\testScenarios"; //TODO change to real save file directory
        final File[] saveDirectory = new File(SAVE_FILE_DIRECTORY).listFiles();
        final List<String> savedSimulations = Arrays.stream(saveDirectory).map(file -> prepCSVString(file.getName())).collect(Collectors.toList());
        return GetSavedSimulationsResponse.builder()
                .simulations(savedSimulations)
                .build();
    }

    public String prepCSVString(String csvString) {
        return csvString.replace(".csv", "");
    }
}
