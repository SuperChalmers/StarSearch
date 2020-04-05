package com.starsearch.starsearch.simulation.utils;

import com.starsearch.starsearch.simulation.region.Space;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
public class MoveResult {
    @NonNull private Space space;
    @NonNull private boolean newlyExplored;
    @NonNull private boolean crash;
}
