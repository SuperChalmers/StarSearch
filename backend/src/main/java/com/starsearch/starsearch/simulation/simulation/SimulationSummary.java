package com.starsearch.starsearch.simulation.simulation;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class SimulationSummary {
    @NonNull private int sizeOfRegion;
    @NonNull private int numberOfSafeSquares;
    @NonNull private int numberOfExploredSafeSquares;
    @NonNull private int numberOfCompleteTurnsTaken;
}
