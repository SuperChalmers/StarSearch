package com.starsearch.starsearch.simulation.drone;

import com.starsearch.starsearch.simulation.region.Contents;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.simulation.SimulationAccessor;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import com.starsearch.starsearch.simulation.utils.OrientationCoordinateOffsets;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@RequiredArgsConstructor
public class Drone {

    @NonNull private String droneID;
    @NonNull private Orientation orientation;
    @NonNull private Coordinates coordinates;
    @NonNull private Boolean toDelete;
    @NonNull private Integer strategy;
    @NonNull private Integer fuel;

    public DroneAction act(SimulationAccessor simulationAccessor) {
        if (strategy == 0) {
            return getRandomAction();
        } else if (strategy == 1) {
            return getIntelligentAction(simulationAccessor);
        }
        return DroneAction.builder().action(Action.PASS).build();
    }

    public boolean checkFuel(int fuelNeeded){
        if (fuel-fuelNeeded<0) return false;
        fuel -= fuelNeeded;
        return true;
    }

    public void charge(int fuelCharged){
        fuel += fuelCharged;
    }

    private DroneAction getRandomAction() {
        return DroneAction.builder()
                .orientation(orientation)
                .coordinates(coordinates)
                .action(Action.getRandomAction()) //Catch-all if no other action is allowed
                .build();
    }

    private DroneAction getIntelligentAction(SimulationAccessor simulationAccessor) {
        DroneAction droneAction = DroneAction.builder()
                .orientation(orientation)
                .coordinates(coordinates)
                .action(Action.PASS) //Catch-all if no other action is allowed
                .build();
        List<Space> adjacentSpaces = checkAdjacentCoordinates(simulationAccessor);
        for (Space space : adjacentSpaces) { //checkCoordinates around location to see if all are known
            if (!space.getIsKnown()) { //If no, scan
                droneAction.setAction(Action.SCAN);
                return droneAction;
            }
        }

        Coordinates delta = OrientationCoordinateOffsets.getOffset(orientation);
        if (isSafe(simulationAccessor, coordinates.plus(delta))) { //Check coordinate in current orientation for safety
            if (isSafe(simulationAccessor, coordinates.plus(delta).plus(delta))) { //If yes, check coordinate in curr_or + 1 space
                if (isSafe(simulationAccessor, coordinates.plus(delta).plus(delta).plus(delta))) { //If yes, check coordinate in curr_or +2 space
                    //If yes, thrust 3
                    droneAction.setAction(Action.THRUST3);
                    return droneAction;
                }
                droneAction.setAction(Action.THRUST2);
                return droneAction;
            }
            droneAction.setAction(Action.THRUST1);
            return droneAction;
        }

        for (Space space : adjacentSpaces) { //If no, steer towards first safe known space
            if (isSafe(space)) {
                orientation = findNewOrientation(coordinates, space.getCoordinates());
                droneAction.setAction(Action.STEER);
                return droneAction;
            }
        }
        return droneAction;
    }

    private List<Space> checkAdjacentCoordinates(SimulationAccessor simulationAccessor) {
        List<Space> adjacentSpaces = new ArrayList<>();
        for (Orientation orientation : Orientation.values()) {
            Coordinates toCheck = coordinates.getAdjacentCoordinates(orientation);
            adjacentSpaces.add(simulationAccessor.checkCoordinates(toCheck));
        }
        return adjacentSpaces;
    }

    private Boolean isSafe(SimulationAccessor simulationAccessor, Coordinates toCheck) {
        return isSafe(simulationAccessor.checkCoordinates(toCheck));
    }

    private Boolean isSafe(Space space) {
        return (space.getContents() == Contents.STARS || space.getContents() == Contents.EMPTY) && !space.getDrone();
    }

    private Orientation findNewOrientation(Coordinates current, Coordinates desired) {
        Coordinates delta = desired.subtract(current);
        return OrientationCoordinateOffsets.getOrientationFromCoordinates(delta);
    }
}