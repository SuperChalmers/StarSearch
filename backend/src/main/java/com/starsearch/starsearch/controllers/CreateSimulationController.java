package com.starsearch.starsearch.controllers;

import com.starsearch.starsearch.models.CreateSimulationRequest;
import com.starsearch.starsearch.models.CreateSimulationResponse;
import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class CreateSimulationController {

    @PostMapping(value="/simulation", consumes = "application/json", produces = "application/json")
    public CreateSimulationResponse createSimulation(@RequestBody CreateSimulationRequest request) {
        return CreateSimulationResponse.builder()
                .height(request.getSecondsDelay())
                .width(1)
                .suns(new ArrayList<Coordinates>())
                .drones(new ArrayList<Drone>())
                .build();
    }
}
