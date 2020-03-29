package utils;

import drone.Orientation;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@Data
@Builder
@RequiredArgsConstructor
public class Coordinates {
    @NonNull private Integer width;
    @NonNull private Integer height;

    public Coordinates getAdjacentCoordinates(Orientation orientation) {
        Coordinates delta = OrientationCoordinateOffsets.getOffset(orientation);
        return Coordinates.builder().width(width + delta.getWidth()).height(height + delta.getHeight()).build();
    }

    @Override
    public boolean equals(Object object) {
        if (object.getClass() != this.getClass()) {
            return false;
        }
        Coordinates coordinates = (Coordinates) object;
        return this.getWidth().equals(coordinates.getWidth()) && this.getHeight().equals(coordinates.getHeight());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.width, this.height);
    }

    public Coordinates plus(Coordinates toAdd) {
        return Coordinates.builder()
                .width(this.width + toAdd.getWidth())
                .height(this.height + toAdd.getHeight())
                .build();
    }

    public Coordinates subtract(Coordinates toSubtract) {
        return Coordinates.builder()
                .width(this.width - toSubtract.getWidth())
                .height(this.height - toSubtract.getHeight())
                .build();
    }

}
