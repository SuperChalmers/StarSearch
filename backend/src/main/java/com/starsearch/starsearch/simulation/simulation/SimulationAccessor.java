package com.starsearch.starsearch.simulation.simulation;

import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SimulationAccessor {
    @NonNull private SimulationSystem simulationSystem;

    public Space checkCoordinates(Coordinates coordinates) {
        return simulationSystem.checkCoordinates(coordinates);
    }
}
