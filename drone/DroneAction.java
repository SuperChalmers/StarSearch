package drone;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import utils.Coordinates;

@Data
@Builder
@RequiredArgsConstructor
public class DroneAction {
    @NonNull private Coordinates coordinates;
    @NonNull private Action action;
    @NonNull private Orientation orientation;
}
