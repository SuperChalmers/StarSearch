package com.starsearch.starsearch.simulation.region;

import com.starsearch.starsearch.simulation.utils.Coordinates;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
public class Space {
    @NonNull private Coordinates coordinates;
    @NonNull private Contents contents;
    private Boolean drone = false;
    private Boolean isExplored = false;
    private Boolean isKnown = false;
}
