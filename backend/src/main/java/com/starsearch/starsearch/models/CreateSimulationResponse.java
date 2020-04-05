package com.starsearch.starsearch.models;

import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateSimulationResponse {
    private final int height;
    private final int width;
    private final List<Drone> drones;
    private final List<Coordinates> suns;
}
