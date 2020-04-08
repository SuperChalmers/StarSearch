package com.starsearch.starsearch.simulation.simulation;

import com.starsearch.starsearch.simulation.drone.Action;
import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.drone.DroneAction;
import com.starsearch.starsearch.simulation.region.Contents;
import com.starsearch.starsearch.simulation.region.Region;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import com.starsearch.starsearch.simulation.utils.MoveResult;
import com.starsearch.starsearch.simulation.utils.OrientationCoordinateOffsets;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Iterator;
import java.util.List;
import java.io.FileWriter;
import java.io.File;

@Builder
@RequiredArgsConstructor
public class SimulationSystem {

    @Getter
    @NonNull
    private Region region;

    @NonNull private Integer maxTurns;
    @NonNull private Integer turnCounter;
    @NonNull private Integer maxSpaceExplorable;
    @NonNull private Integer spaceExplored;

    @Getter
    @NonNull private List<Drone> drones;
    @NonNull private Integer chargeRate;
    @NonNull private Integer gallonsPerThrust;
    @NonNull private Integer gallonsPerSteer;
    @NonNull private Integer gallonsPerScan;
    @NonNull private Integer gallonsPerPass;

    @NonNull private Integer saveTurn;  // which turn to stop and save automatically
    @NonNull private List<Coordinates> suns; //Data storage to save location of suns so we don't have to parse space
    @NonNull private Integer fileVersion;

    private static final String DELIMITER = ",";


    public SimulationSummary runSimulation() {
        SimulationAccessor simulationAccessor = new SimulationAccessor(this);
        do {
            for (Iterator<Drone> iterator = drones.iterator(); iterator.hasNext();) {
                Drone drone = iterator.next();
                if (drone.getToDelete() || drone.getFuel()<=0) {
                    iterator.remove();
                    continue;
                }
                DroneAction action = drone.act(simulationAccessor);
                if (!checkFuel(action, drone)) continue;
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
                if (droneCloseToSun(drone)){
                    drone.charge(chargeRate);
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

    private boolean checkFuel(DroneAction action, Drone drone){
        if (action.getAction().equals(Action.SCAN)) {
            return drone.checkFuel(gallonsPerScan);
        } else if (actionIsThrust(action.getAction())) {
            return drone.checkFuel(gallonsPerThrust);
        } else if (Action.STEER.equals(action.getAction())) {
            return drone.checkFuel(gallonsPerSteer);
        } else if (Action.PASS.equals(action.getAction())) {
            return drone.checkFuel(gallonsPerPass);
        } else {
            return true;
        }
    }

    private boolean droneCloseToSun(Drone drone) {
        List<Space> neighborSpaces = region.scanAroundCoordinates(drone.getCoordinates());
        for(Space neighborSpace : neighborSpaces){
            if (neighborSpace.getContents().equals(Contents.SUN)) return true;
        }
        return false;
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

    public void writeSimulation(String writeFilename) throws Exception{
        try {
            final File file = new File(writeFilename);
            FileWriter fr = null;
            fr = new FileWriter(file);
            fr.write(String.valueOf(region.getMaxWidth()) + System.lineSeparator());  //write the width of the region
            fr.write(String.valueOf(region.getMaxHeight()) + System.lineSeparator()); //write the height of the region
            fr.write(String.valueOf(drones.size()) + System.lineSeparator()); //write the number of drones
            for (Iterator<Drone> iterator = drones.iterator(); iterator.hasNext();) { //start writing the drone lines. each is a single line
                Drone drone = iterator.next();
                fr.write(String.valueOf(drone.getCoordinates().getWidth()) + DELIMITER); //write the x location
                fr.write(String.valueOf(drone.getCoordinates().getHeight()) + DELIMITER); //write the y location
                fr.write(OrientationCoordinateOffsets.getDirectionFromOrientation(drone.getOrientation()) + DELIMITER); //write the orientation
                fr.write(String.valueOf(drone.getStrategy())); //write the strategy
                fr.write(System.lineSeparator()); //finished writing the drone line
            }
            fr.write(String.valueOf(region.getNumberOfSuns()) + System.lineSeparator());
            for(Iterator<Coordinates> iterator = suns.iterator(); iterator.hasNext();){
                Coordinates sun = iterator.next();
                fr.write(String.valueOf(sun.getWidth()) + DELIMITER + String.valueOf(sun.getHeight()) + System.lineSeparator()); //write the sun location
            }
            fr.write(String.valueOf(maxTurns) + System.lineSeparator()); //write max turns
            //fr.write(String.valueOf(saveTurn) + System.lineSeparator()); //write the save turn 
            //fr.write(String.valueOf(turnCounter) + System.lineSeparator()); //write the current turn
            fr.close(); //close the file now that we're done

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } 

    }
}
