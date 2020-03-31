package region;

import drone.Orientation;
import lombok.Data;
import lombok.NonNull;
import utils.Coordinates;
import utils.MoveResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class Region {
    private Map<Coordinates, Space> spaceMap;
    @NonNull private Integer maxWidth;
    @NonNull private Integer maxHeight;
    private Integer numberOfSuns = 0;

    public Region(int maxWidth, int maxHeight) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.spaceMap = new HashMap<>();
        for (int i = 0; i < maxWidth; i++) {
            for (int j = 0; j < maxHeight; j++) {
                Coordinates coordinates = new Coordinates(i, j);
                Space space = Space.builder()
                        .contents(Contents.STARS)
                        .coordinates(coordinates)
                        .drone(false)
                        .isExplored(false)
                        .isKnown(false)
                        .build();
                spaceMap.put(coordinates, space);
            }
        }
    }

    public List<Space> scanAroundCoordinates(Coordinates coordinates) {
        List<Space> scanResults = new ArrayList<>();
        StringBuilder scanString = new StringBuilder("\n");
        //Parse through orientation enum (Starts at N and goes CW). Get space at each space adjacent to drone Space
        for (Orientation orientation : Orientation.values()) {
            Space space = getSpace(coordinates.getAdjacentCoordinates(orientation));
            scanResults.add(space);
            space.setIsKnown(true);
            if (space.getDrone()) {
                scanString.append("drone,");
            } else {
                scanString.append(space.getContents() + ",");
            }
        }
        System.out.println(scanString.toString().substring(0, scanString.length() - 1).toLowerCase());
        return scanResults;
    }

    public MoveResult moveEntity(Coordinates coordinates, Orientation orientation) {
        Space newSpace = getSpace(coordinates.getAdjacentCoordinates(orientation));
        boolean newlyExplored = false;
        boolean crash = newSpace.getDrone() || newSpace.getContents().equals(Contents.SUN); //If new space already has a drone, then it is a crash
        if (!newSpace.getIsExplored() && spaceExplorable(newSpace)) { //If the new space is unexplored and is explorable
            newSpace.setIsKnown(true);
            newSpace.setIsExplored(true);
            newSpace.setDrone(true);
            newlyExplored = true;
        } else if (newSpace.getContents().equals(Contents.EMPTY)) {
            newSpace.setDrone(true); //Track drone if it has gone to an already visited space
        } else if (newSpace.getContents().equals(Contents.BARRIER)) {
            return MoveResult.builder().space(getSpace(coordinates)).newlyExplored(false).crash(crash).build();
        }
        getSpace(coordinates).setDrone(false); //Drone has left old space
        return MoveResult.builder().space(newSpace).newlyExplored(newlyExplored).crash(crash).build();
    }

    public Space getSpace(Coordinates coordinates) {
        if (coordinatesOutOfBounds(coordinates) && spaceMap.get(coordinates) == null) {
            Space barrierSpace = Space.builder()
                    .contents(Contents.BARRIER)
                    .coordinates(coordinates)
                    .isExplored(false)
                    .isKnown(false)
                    .drone(false)
                    .build();
            spaceMap.put(coordinates, barrierSpace);
        } //If out of bounds, return barrier space
        return spaceMap.get(coordinates); //Else, return valid space
    }

    private Boolean spaceExplorable(Space space) {
        return space.getContents() == Contents.STARS;
    }

    private Boolean coordinatesOutOfBounds(Coordinates coordinates) {
        return coordinates.getHeight() >= maxHeight || coordinates.getHeight() < 0 || coordinates.getWidth() >= maxWidth || coordinates.getWidth() < 0;
    }
}
