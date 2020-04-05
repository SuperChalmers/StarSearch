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
            List<Drone> drones = createDrones(inputFile, region);
            createSuns(inputFile, region);

            String[] tokens = inputFile.nextLine().split(DELIMITER);
            int turnLimit = Integer.parseInt(tokens[0]);
            inputFile.close();
            return SimulationSystem.builder()
                    .drones(drones)
                    .maxSpaceExplorable(region.getSpaceMap().size() - region.getNumberOfSuns())
                    .maxTurns(turnLimit)
                    .region(region)
                    .spaceExplored(drones.size())
                    .turnCounter(0)
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

    private static List<Drone> createDrones(Scanner inputFile, Region region) {
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
                    .build());

            Space droneSpace = region.getSpace(coordinates);
            droneSpace.setIsExplored(true);
            droneSpace.setIsKnown(true);
            droneSpace.setContents(Contents.EMPTY);
            droneSpace.setDrone(true);
        }
        return drones;
    }

    private static void createSuns(Scanner inputFile, Region region) {
        String[] tokens = inputFile.nextLine().split(DELIMITER);
        region.setNumberOfSuns(Integer.parseInt(tokens[0]));
        for (int k = 0; k < region.getNumberOfSuns(); k++) {
            tokens = inputFile.nextLine().split(DELIMITER);
            Coordinates coordinates = new Coordinates(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1]));
            region.getSpace(coordinates).setContents(Contents.SUN);
        }
    }
}