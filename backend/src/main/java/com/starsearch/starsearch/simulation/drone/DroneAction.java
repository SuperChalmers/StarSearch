package com.starsearch.starsearch.simulation.drone;

import com.starsearch.starsearch.simulation.utils.Coordinates;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
public class DroneAction {
    @NonNull private Coordinates coordinates;
    @NonNull private Action action;
    @NonNull private Orientation orientation;
}
