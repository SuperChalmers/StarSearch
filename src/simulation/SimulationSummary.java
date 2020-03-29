package simulation;

import lombok.*;

@Getter
@Builder
@RequiredArgsConstructor
public class SimulationSummary {
    @NonNull private int sizeOfRegion;
    @NonNull private int numberOfSafeSquares;
    @NonNull private int numberOfExploredSafeSquares;
    @NonNull private int numberOfCompleteTurnsTaken;
}
