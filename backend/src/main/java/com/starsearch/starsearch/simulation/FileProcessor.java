package com.starsearch.starsearch.simulation;

import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.drone.Orientation;
import com.starsearch.starsearch.simulation.region.Contents;
import com.starsearch.starsearch.simulation.region.Region;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import com.starsearch.starsearch.simulation.utils.OrientationCoordinateOffsets;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class FileProcessor {

    private static final String DELIMITER = ",";

    public static SimulationSystem createSimulation(String testFileName) throws FileNotFoundException {

        try {
            Scanner inputFile = new Scanner(new File(testFileName));
            Region region = createRegion(inputFile);
            //todo:fuel need to pass the below values from the frontend.
            int chargeRate = 2, initialFuel = 10, gallonsPerThrust = 3, gallonsPerSteer = 2, gallonsPerScan = 1, gallonsPerPass = 0;
            List<Drone> drones = createDrones(inputFile, region, initialFuel);
            List<Coordinates> suns = createSuns(inputFile, region);

            String[] tokens = inputFile.nextLine().split(DELIMITER);
            int turnLimit = Integer.parseInt(tokens[0]);
            
            tokens = inputFile.nextLine().split(DELIMITER);  //get the value for the save turn
            int saveTurn = Integer.parseInt(tokens[0]); //allocate the save turn value
            tokens = inputFile.nextLine().split(DELIMITER);  //get the value for the current turn (in case it was saved from a previous run)
            int currentTurn = Integer.parseInt(tokens[0]);

            inputFile.close();
            return SimulationSystem.builder()
                    .drones(drones)
                    .maxSpaceExplorable(region.getSpaceMap().size() - region.getNumberOfSuns())
                    .maxTurns(turnLimit)
                    .region(region)
                    .spaceExplored(drones.size())
                    .turnCounter(0)
                    .chargeRate(chargeRate)
                    .gallonsPerThrust(gallonsPerThrust)
                    .gallonsPerSteer(gallonsPerSteer)
                    .gallonsPerScan(gallonsPerScan)
                    .gallonsPerPass(gallonsPerPass)
                    .turnCounter(currentTurn)
                    .saveTurn(saveTurn)
                    .suns(suns)
                    .build();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            throw e;
        }
    }

    private static Region createRegion(Scanner inputFile) {
        String[] tokens = inputFile.nextLine().split(DELIMITER);
        int maxWidth = Integer.parseInt(tokens[0]);
        tokens = inputFile.nextLine().split(DELIMITER);
        int maxHeight = Integer.parseInt(tokens[0]);
        return new Region(maxWidth, maxHeight);
    }

    private static List<Drone> createDrones(Scanner inputFile, Region region, int initialFuel) {
        List<Drone> drones = new ArrayList<>();
        String[] tokens = inputFile.nextLine().split(DELIMITER);
        int numberOfDrones = Integer.parseInt(tokens[0]);
        for (int k = 0; k < numberOfDrones; k++) {
            tokens = inputFile.nextLine().split(DELIMITER);
            int droneX = Integer.parseInt(tokens[0]);
            int droneY = Integer.parseInt(tokens[1]);
            Orientation orientation = OrientationCoordinateOffsets.getOrientationFromDirection(tokens[2]);
            Coordinates coordinates = new Coordinates(droneX, droneY);
            drones.add(Drone.builder()
                    .coordinates(coordinates)
                    .orientation(orientation)
                    .droneID("d" + k)
                    .toDelete(false)
                    .strategy(Integer.parseInt(tokens[3]))
                    .fuel(initialFuel)
                    .build());

            Space droneSpace = region.getSpace(coordinates);
            droneSpace.setIsExplored(true);
            droneSpace.setIsKnown(true);
            droneSpace.setContents(Contents.EMPTY);
            droneSpace.setDrone(true);
        }
        return drones;
    }

    private static List<Coordinates> createSuns(Scanner inputFile, Region region) {
        List<Coordinates> suns = new ArrayList<>();
        String[] tokens = inputFile.nextLine().split(DELIMITER);
        region.setNumberOfSuns(Integer.parseInt(tokens[0]));
        for (int k = 0; k < region.getNumberOfSuns(); k++) {
            tokens = inputFile.nextLine().split(DELIMITER);
            Coordinates coordinates = new Coordinates(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1]));
            region.getSpace(coordinates).setContents(Contents.SUN);
            suns.add(coordinates); //save the sun location so we don't need to parse space to find all of them.
        }
        return suns;

    }
}