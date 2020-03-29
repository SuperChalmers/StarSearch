package utils;

import drone.Orientation;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class OrientationCoordinateOffsets {
    private static Map<Orientation, Coordinates> orientationToCoordinatesMap;
    static {
        orientationToCoordinatesMap = new HashMap<>();
        orientationToCoordinatesMap.put(Orientation.N, new Coordinates(0, 1));
        orientationToCoordinatesMap.put(Orientation.NE, new Coordinates(1, 1));
        orientationToCoordinatesMap.put(Orientation.E, new Coordinates(1, 0));
        orientationToCoordinatesMap.put(Orientation.SE, new Coordinates(1, -1));
        orientationToCoordinatesMap.put(Orientation.S, new Coordinates(0, -1));
        orientationToCoordinatesMap.put(Orientation.SW, new Coordinates(-1, -1));
        orientationToCoordinatesMap.put(Orientation.W, new Coordinates(-1, 0));
        orientationToCoordinatesMap.put(Orientation.NW, new Coordinates(-1, 1));
        orientationToCoordinatesMap = Collections.unmodifiableMap(orientationToCoordinatesMap);
    }

    public static Coordinates getOffset(Orientation orientation) {
        return orientationToCoordinatesMap.get(orientation);
    }

    private static Map<Coordinates, Orientation> coordinatesToOrientationMap;
    static {
        coordinatesToOrientationMap = new HashMap<>();
        coordinatesToOrientationMap.put(new Coordinates(0, 1), Orientation.N);
        coordinatesToOrientationMap.put(new Coordinates(1, 1), Orientation.NE);
        coordinatesToOrientationMap.put(new Coordinates(1, 0), Orientation.E);
        coordinatesToOrientationMap.put(new Coordinates(1, -1), Orientation.SE);
        coordinatesToOrientationMap.put(new Coordinates(0, -1), Orientation.S);
        coordinatesToOrientationMap.put(new Coordinates(-1, -1), Orientation.SW);
        coordinatesToOrientationMap.put(new Coordinates(-1, 0), Orientation.W);
        coordinatesToOrientationMap.put(new Coordinates(-1, 1), Orientation.NW);
        coordinatesToOrientationMap = Collections.unmodifiableMap(coordinatesToOrientationMap);
    }

    public static Orientation getOrientationFromCoordinates(Coordinates delta) {
        return coordinatesToOrientationMap.get(delta);
    }

    private static Map<String, Orientation> directionToOrientationMap;
    static {
        directionToOrientationMap = new HashMap<>();
        directionToOrientationMap.put("north", Orientation.N);
        directionToOrientationMap.put("northeast", Orientation.NE);
        directionToOrientationMap.put("east", Orientation.E);
        directionToOrientationMap.put("southeast", Orientation.SE);
        directionToOrientationMap.put("south", Orientation.S);
        directionToOrientationMap.put("southwest", Orientation.SW);
        directionToOrientationMap.put("west", Orientation.W);
        directionToOrientationMap.put("northwest", Orientation.NW);
        directionToOrientationMap = Collections.unmodifiableMap(directionToOrientationMap);
    }

    public static Orientation getOrientationFromDirection(String direction) {
        return directionToOrientationMap.get(direction);
    }

    private static Map<Orientation, String> orientationToDirectionMap;
    static {
        orientationToDirectionMap = new HashMap<>();
        orientationToDirectionMap.put(Orientation.N, "north");
        orientationToDirectionMap.put(Orientation.NE, "northeast");
        orientationToDirectionMap.put(Orientation.E, "east");
        orientationToDirectionMap.put(Orientation.SE, "southeast");
        orientationToDirectionMap.put(Orientation.S, "south");
        orientationToDirectionMap.put(Orientation.SW, "southwest");
        orientationToDirectionMap.put(Orientation.W, "west");
        orientationToDirectionMap.put(Orientation.NW, "northwest");
        orientationToDirectionMap = Collections.unmodifiableMap(orientationToDirectionMap);
    }

    public static String getDirectionFromOrientation(Orientation orientation) {
        return orientationToDirectionMap.get(orientation);
    }
}
