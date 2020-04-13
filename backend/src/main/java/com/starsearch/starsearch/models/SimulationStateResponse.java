package com.starsearch.starsearch.models;

import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.region.Region;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class SimulationStateResponse {
    private final int height;
    private final int width;
    private final List<Drone> drones;
    private final List<Space> spaceMap;
    private final int turnsTaken;

    public static SimulationStateResponse createResponseFromSimulationSystem(SimulationSystem simulation) {
        Region region = simulation.getRegion();
        return SimulationStateResponse.builder()
                .height(region.getMaxHeight())
                .width(region.getMaxWidth())
                .spaceMap(new ArrayList<>(region.getSpaceMap().values()))
                .drones(simulation.getDrones())
                .turnsTaken(simulation.getTurnCounter())
                .build();
    }
}
