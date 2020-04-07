package com.starsearch.starsearch.controllers;

import com.starsearch.starsearch.models.CreateSimulationRequest;
import com.starsearch.starsearch.models.SimulationStateResponse;
import com.starsearch.starsearch.simulation.FileProcessor;
import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.region.Region;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class SimulationController {

    @PostMapping(value="/simulation", consumes = "application/json", produces = "application/json")
    public SimulationStateResponse createSimulation(@RequestBody CreateSimulationRequest request) throws FileNotFoundException {
        return createSimulationFromFile(request.getScenarioFile());

    }

    @GetMapping(value="/simulation")
    public SimulationStateResponse loadSimulation(@RequestParam final String SIMULATION_ID) throws FileNotFoundException {
        final String saveFile = "C:\\Users\\Achinthya\\Documents\\CS6310-A6\\backend\\testScenarios\\scenario0.csv";//TODO find local file given simulation ID
        return createSimulationFromFile(saveFile);
    }

    private SimulationStateResponse createSimulationFromFile(final String scenarioFile) throws FileNotFoundException {
        //TODO fuel handling
        SimulationSystem simulationSystem = FileProcessor.createSimulation(scenarioFile);
        Region region = simulationSystem.getRegion();
        return SimulationStateResponse.builder()
                .height(region.getMaxHeight())
                .width(region.getMaxWidth())
                .spaceMap(new ArrayList<>(region.getSpaceMap().values()))
                .drones(simulationSystem.getDrones())
                .build();
    }
}
