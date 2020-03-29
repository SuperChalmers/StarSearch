package utils;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import region.Space;

@Data
@Builder
@RequiredArgsConstructor
public class MoveResult {
    @NonNull private Space space;
    @NonNull private boolean newlyExplored;
    @NonNull private boolean crash;
}
