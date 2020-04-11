package com.starsearch.starsearch.controllers;

import com.starsearch.starsearch.models.CreateSimulationRequest;
import com.starsearch.starsearch.models.SimulationStateResponse;
import com.starsearch.starsearch.simulation.FileProcessor;
import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.region.Region;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.simulation.SimulationSummary;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class SimulationController {

    private SimulationSystem simulationSystem = null; //Must be initialized by one of the create routes

    @PostMapping(value="/test")
    public void testHook(@RequestBody final String filename) throws FileNotFoundException {
        simulationSystem = FileProcessor.createSimulation(filename);
        SimulationSummary summary = simulationSystem.runSimulation();
        System.out.println(String.valueOf(summary.getSizeOfRegion()) + ","
                + String.valueOf(summary.getNumberOfSafeSquares()) + ","
                + String.valueOf(summary.getNumberOfExploredSafeSquares())
                + "," + String.valueOf(summary.getNumberOfCompleteTurnsTaken()));
    }

    @PostMapping(value="/simulation", consumes = "application/json", produces = "application/json")
    public SimulationStateResponse createSimulation(@RequestBody CreateSimulationRequest request) throws FileNotFoundException {
        return createSimulationFromFile(request.getScenarioFile());
    }

    @GetMapping(value="/simulation")
    public SimulationStateResponse loadSimulation(@RequestParam final String saveFileName) throws FileNotFoundException {
        final String SAVE_FILE_DIRECTORY = ".\\testScenarios\\"; //TODO change to real save file directory
        return createSimulationFromFile(SAVE_FILE_DIRECTORY + saveFileName + ".csv");
    }

    @GetMapping(value = "/simulation/next")
    public SimulationStateResponse nextTurn() {
        try {
            return simulationSystem.nextTurn();
        } catch (NullPointerException e) {
            throw new RuntimeException("Simulation has not been created yet.", e);
        }
    }

    @GetMapping(value = "/simulation/stop")
    public void stopSimulation() {
        try {
            simulationSystem.stop();
        } catch (NullPointerException e) {
            throw new RuntimeException("Simulation has not been created yet.", e);
        }
    }

    private SimulationStateResponse createSimulationFromFile(final String scenarioFile) throws FileNotFoundException {
        //TODO fuel handling
        simulationSystem = FileProcessor.createSimulation(scenarioFile);
        return SimulationStateResponse.createResponseFromSimulationSystem(simulationSystem);
    }
}
