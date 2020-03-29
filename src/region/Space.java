package region;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import utils.Coordinates;

@Data
@Builder
public class Space {
    @NonNull private Coordinates coordinates;
    @NonNull private Contents contents;
    private Boolean drone = false;
    private Boolean isExplored = false;
    private Boolean isKnown = false;
}
