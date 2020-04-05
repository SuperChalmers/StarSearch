package com.starsearch.starsearch.controllers;

import com.starsearch.starsearch.models.CreateSimulationRequest;
import com.starsearch.starsearch.models.CreateSimulationResponse;
import com.starsearch.starsearch.simulation.FileProcessor;
import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.region.Region;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.ArrayList;

@RestController
public class CreateSimulationController {

    @PostMapping(value="/simulation", consumes = "application/json", produces = "application/json")
    public CreateSimulationResponse createSimulation(@RequestBody CreateSimulationRequest request) throws FileNotFoundException {
        SimulationSystem simulationSystem = FileProcessor.createSimulation(request.getScenarioFile());
        Region region = simulationSystem.getRegion();
        //TODO return info response below
        return CreateSimulationResponse.builder()
                .height(region.getMaxHeight())
                .width(region.getMaxWidth())
                .suns(new ArrayList<Coordinates>())
                .drones(new ArrayList<Drone>())
                .build();
    }
}
