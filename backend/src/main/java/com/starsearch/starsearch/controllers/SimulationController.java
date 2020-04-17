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
    public void testHook(@RequestBody final String filename) throws FileNotFoundException, Exception {
        simulationSystem = FileProcessor.createSimulation(filename);
        SimulationSummary summary = simulationSystem.runSimulation(null, false);
        System.out.println((summary.getSizeOfRegion()) + ","
                + (summary.getNumberOfSafeSquares()) + ","
                + (summary.getNumberOfExploredSafeSquares())
                + "," + (summary.getNumberOfCompleteTurnsTaken()));
    }

    @PostMapping(value="/simulation", consumes = "application/json", produces = "application/json")
    public SimulationStateResponse createSimulation(@RequestBody CreateSimulationRequest request) throws FileNotFoundException {
        return createSimulationFromFile(request.getScenarioFile(), request.getChargeRate(), request.getFuel(),
                request.getGallonsPerThrust(), request.getGallonsPerSteer(), request.getGallonsPerScan(),
                request.getGallonsPerPass());
    }

    @GetMapping(value="/simulation")
    public SimulationStateResponse loadSimulation() throws FileNotFoundException {
        final String current = System.getProperty("user.dir");
        // Remove '/backend' from the path.
//        String projectRoot = current.substring(0, current.length() - 8);
        final String SAVE_FOLDER = "/SaveSim/";
        final String SAVE_NAME = "savesim.csv";
        return createSimulationFromFile(current + SAVE_FOLDER + SAVE_NAME);
    }

    @GetMapping(value = "/simulation/next")
    public SimulationStateResponse nextTurn() {
        try {
            return simulationSystem.nextTurn();
        } catch (NullPointerException e) {
            throw new RuntimeException("Simulation has not been created yet.", e);
        }
    }

    @GetMapping(value = "/simulation/fast-forward")
    public SimulationStateResponse fastForwardSimulation() throws Exception {
        try {
            return simulationSystem.fastForward();
        } catch (NullPointerException e) {
            throw new RuntimeException("Simulation has not been created yet.", e);
        }
    }

    @GetMapping(value = "/simulation/stop")
    public void stopSimulation() throws Exception {
        try {
            simulationSystem.stop();
        } catch (NullPointerException e) {
            throw new RuntimeException("Simulation has not been created yet.", e);
        }
    }

    private SimulationStateResponse createSimulationFromFile(final String scenarioFile) throws FileNotFoundException {
        simulationSystem = FileProcessor.createSimulation(scenarioFile);
        return SimulationStateResponse.createResponseFromSimulationSystem(simulationSystem);
    }

    private SimulationStateResponse createSimulationFromFile(final String scenarioFile, final int chargeRate,
                                                             final int initialFuel, final int gallonsPerThrust,
                                                             final int gallonsPerSteer, final int gallonsPerScan,
                                                             final int gallonsPerPass) throws FileNotFoundException {
        final String current = System.getProperty("user.dir");
        simulationSystem = FileProcessor.createSimulation(current + "/testScenarios/" + scenarioFile, chargeRate,
                initialFuel, gallonsPerThrust, gallonsPerSteer, gallonsPerScan, gallonsPerPass);
        return SimulationStateResponse.createResponseFromSimulationSystem(simulationSystem);
    }
}
