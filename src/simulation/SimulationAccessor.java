package simulation;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import region.Space;
import utils.Coordinates;

@RequiredArgsConstructor
public class SimulationAccessor {
    @NonNull private SimulationSystem simulationSystem;

    public Space checkCoordinates(Coordinates coordinates) {
        return simulationSystem.checkCoordinates(coordinates);
    }
}
