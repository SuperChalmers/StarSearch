package simulation;

import drone.Action;
import drone.Drone;
import drone.DroneAction;
import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import region.Contents;
import region.Region;
import region.Space;
import utils.Coordinates;
import utils.MoveResult;
import utils.OrientationCoordinateOffsets;

import java.util.Iterator;
import java.util.List;

@Builder
@RequiredArgsConstructor
public class SimulationSystem {

    @NonNull private Region region;
    @NonNull private Integer maxTurns;
    @NonNull private Integer turnCounter;
    @NonNull private Integer maxSpaceExplorable;
    @NonNull private Integer spaceExplored;
    @NonNull private List<Drone> drones;

    public SimulationSummary runSimulation() {
        SimulationAccessor simulationAccessor = new SimulationAccessor(this);
        do {
            for (Iterator<Drone> iterator = drones.iterator(); iterator.hasNext();) {
                Drone drone = iterator.next();
                if (drone.getToDelete()) {
                    iterator.remove();
                    continue;
                }
                DroneAction action = drone.act(simulationAccessor);
                System.out.print(drone.getDroneID());
                if (action.getAction().equals(Action.SCAN)) {
                    System.out.print(",scan");
                    region.scanAroundCoordinates(action.getCoordinates());
                } else if (actionIsThrust(action.getAction())) {
                    handleThrust(drone, action);
                } else if (Action.STEER.equals(action.getAction())) {
                    System.out.print(",steer," + OrientationCoordinateOffsets.getDirectionFromOrientation(drone.getOrientation()));
                    System.out.println("\nok");
                } else if (Action.PASS.equals(action.getAction())) {
                    System.out.print(",pass");
                    System.out.println("\nok");
                } else {
                    System.out.println("crash"); //Crash for invalid command, steer with invalid direction, etc.
                }
            }
        } while (simulationIsNotOver());
        return SimulationSummary.builder()
                .numberOfCompleteTurnsTaken(turnCounter)
                .numberOfExploredSafeSquares(spaceExplored)
                .numberOfSafeSquares(maxSpaceExplorable)
                .sizeOfRegion(region.getMaxHeight() * region.getMaxWidth())
                .build();
    }

    private void handleThrust(Drone drone, DroneAction action) {
        int spacesToThrust = getThrustDistance(action.getAction());
        System.out.print(",thrust," + spacesToThrust);
        for (spacesToThrust = getThrustDistance(action.getAction()); spacesToThrust > 0; spacesToThrust--) {
            MoveResult moveResult = region.moveEntity(action.getCoordinates(), action.getOrientation());
            Space newSpace = moveResult.getSpace();
            if (moveResult.isNewlyExplored()) {
                spaceExplored++;
            }
            if (moveResult.isCrash()) {
                System.out.println("\ncrash");
                drone.setToDelete(true); //If drone dies, delete it and go to the next loop iteration
                handleCollision(newSpace.getCoordinates()); //Deletes other drone in case of collision
                return;
            } else {
                //Update coordinates of Drone (and resultingly where any remaining thrusts are taken for the action)
                drone.setCoordinates(newSpace.getCoordinates());
                action.setCoordinates(newSpace.getCoordinates());
                newSpace.setContents(Contents.EMPTY);
            }
        }
        System.out.println("\nok"); //Drone hasn't crashed
    }

    private void handleCollision(Coordinates coordinates) {
        for (Drone drone : drones) {
            if (drone.getCoordinates().equals(coordinates)) {
                drone.setToDelete(true); //Delete drone currently at collision spot (got moved into)
            }
        }
    }

    private Boolean simulationIsNotOver() {
        //Simulation is over (this returns true if): no more drones, max turns, all space explored
        turnCounter++;
        //System.out.println("\n" + turnCounter);
        return drones.size() > 0 && turnCounter <= maxTurns && spaceExplored < maxSpaceExplorable;
    }

    private Boolean actionIsThrust(Action action) {
        return (Action.THRUST1.equals(action)) || (Action.THRUST2.equals(action)) || (Action.THRUST3.equals(action));
    }

    private int getThrustDistance(Action action) {
        if (Action.THRUST1.equals(action)) {
            return 1;
        } else if (Action.THRUST2.equals(action)) {
            return 2;
        } else if (Action.THRUST3.equals(action)) {
            return 3;
        }
        return 0;
    }

    public Space checkCoordinates(Coordinates coordinates) {
        Space space = region.getSpace(coordinates);
        if (space.getIsKnown()) {
            return space;
        }
        //If space is not known, return an unknown contents space
        return Space.builder()
                .isKnown(false)
                .isExplored(false)
                .coordinates(coordinates)
                .contents(Contents.UNKNOWN)
                .drone(false)
                .build();
    }
}