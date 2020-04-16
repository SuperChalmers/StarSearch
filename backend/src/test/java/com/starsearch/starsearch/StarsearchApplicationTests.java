package com.starsearch.starsearch;


import com.starsearch.starsearch.simulation.drone.Action;
import com.starsearch.starsearch.simulation.drone.Drone;
import com.starsearch.starsearch.simulation.drone.DroneAction;
import com.starsearch.starsearch.simulation.drone.Orientation;
import com.starsearch.starsearch.simulation.region.Contents;
import com.starsearch.starsearch.simulation.region.Space;
import com.starsearch.starsearch.simulation.simulation.SimulationSystem;
import com.starsearch.starsearch.simulation.utils.Coordinates;
import com.starsearch.starsearch.simulation.utils.OrientationCoordinateOffsets;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.starsearch.starsearch.simulation.region.Region;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class StarsearchApplicationTests {
    private static final int MOCKREGIONWIDTH = 3;
    private static final int MOCKREGIONHEIGHT = 3;
    private static final String MOCKDEFAULTORIENTATION = "north";
    private static final int MOCKDEFAULTNUMDRONES = 2;
    private static final int MOCKDEFAULTFUEL = 3;
    private static final int MOCKDEFAULTNUMSUNS = 1;
    private static final int MOCKDEFAULTTURNLIMIT = 2;
    private static final int MOCKDEFAULTCHARGERATE = 2;
    private static final int MOCKGALLONSPERTHRUST = 3;
    private static final int MOCKGALLONSPERSTEER = 2;
    private static final int MOCKGALLONSPERSCAN = 1;
    private static final int MOCKGALLONSPERPASS = 0;

    @Test
    void contextLoads() {
    }

    @Test
    void FuelTest_DroneShouldHaveCorrectAmountOfFuel() {
        SimulationSystem simulation = createSimulationSystem();
        List<Drone> drones = simulation.getDrones();
        // check initial fuel for drones
        for(int k=0; k<MOCKDEFAULTNUMDRONES; k++){
            assert drones.get(k).getFuel() == MOCKDEFAULTFUEL;
        }

        // check fuel consumption for each action
        // thrust
        Drone drone0 = drones.get(0);
        int initialFuel=drone0.getFuel();
        assert initialFuel >= MOCKGALLONSPERTHRUST;
        DroneAction action = DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.THRUST1) //Catch-all if no other action is allowed
                .build();
        assert simulation.checkFuel(action, drone0) == true;
        assert drone0.getFuel() == initialFuel-MOCKGALLONSPERTHRUST;
        // steer
        drone0.setFuel(MOCKDEFAULTFUEL);
        initialFuel=drone0.getFuel();
        assert initialFuel >= MOCKGALLONSPERSTEER;
        action = DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.STEER) //Catch-all if no other action is allowed
                .build();
        assert simulation.checkFuel(action, drone0) == true;
        assert drone0.getFuel() == initialFuel-MOCKGALLONSPERSTEER;
        // scan
        drone0.setFuel(MOCKDEFAULTFUEL);
        initialFuel=drone0.getFuel();
        assert initialFuel >= MOCKGALLONSPERSCAN;
        action = DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.SCAN) //Catch-all if no other action is allowed
                .build();
        assert simulation.checkFuel(action, drone0) == true;
        assert drone0.getFuel() == initialFuel-MOCKGALLONSPERSCAN;
        // pass
        drone0.setFuel(MOCKDEFAULTFUEL);
        initialFuel=drone0.getFuel();
        assert initialFuel >= MOCKGALLONSPERSCAN;
        action = DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.PASS) //Catch-all if no other action is allowed
                .build();
        assert simulation.checkFuel(action, drone0) == true;
        assert drone0.getFuel() == initialFuel-MOCKGALLONSPERPASS;

        // check edge case for fuel
        drone0.setFuel(MOCKGALLONSPERSTEER);
        initialFuel=drone0.getFuel();
        action = DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.STEER) //Catch-all if no other action is allowed
                .build();
        assert simulation.checkFuel(action, drone0) == true;
        assert drone0.getFuel() == 0;

        // check if drone doesn't have enough fuel, it shouldn't be able to execute the corresponding action.
        drone0.setFuel(MOCKGALLONSPERSTEER-1);
        initialFuel=drone0.getFuel();
        action = DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.STEER) //Catch-all if no other action is allowed
                .build();
        assert simulation.checkFuel(action, drone0) == false;
        assert drone0.getFuel() == initialFuel;
    }

    @Test
    void FuelTest_DroneShouldBeAbleToGetChargedWhenStaysNextToSun() {
        SimulationSystem simulation = createSimulationSystem();
        List<DroneAction> mockDroneActions = new ArrayList<>();
        Drone drone0 = simulation.getDrones().get(0);
        Drone drone1 = simulation.getDrones().get(1);
        mockDroneActions.add(DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.PASS)
                .build());
        mockDroneActions.add(DroneAction.builder()
                .orientation(Orientation.SW)
                .coordinates(drone1.getCoordinates())
                .action(Action.PASS)
                .build());

        // Test drone should be able to get charged if it's next to a sun.
        // the mock region makes the drone0 at (0,0), drone1 at (1,1), and sun at (2,2)
        simulation.runSimulation(mockDroneActions, false);
        assert drone0.getFuel() == MOCKDEFAULTFUEL;
        assert drone1.getFuel() == MOCKDEFAULTFUEL+MOCKDEFAULTCHARGERATE*(MOCKDEFAULTTURNLIMIT+1);

        // Test if a drone doesn't have enough fuel initially but it's next to a sun, then eventually it may get enough
        // fuel to fulfill its action.
        simulation = createSimulationSystem();
        drone0 = simulation.getDrones().get(0);
        drone1 = simulation.getDrones().get(1);
        drone0.setFuel(0);
        drone1.setFuel(0);
        mockDroneActions.set(1, DroneAction.builder()
                .orientation(Orientation.W)
                .coordinates(drone1.getCoordinates())
                .action(Action.THRUST2)
                .build());
        simulation.runSimulation(mockDroneActions, false);
        assert drone0.getCoordinates().getWidth()==0 && drone0.getCoordinates().getHeight()==0;
        assert drone1.getCoordinates().getWidth()==0 && drone1.getCoordinates().getHeight()==1;
        assert drone1.getFuel() == 1;
        System.out.println("simulation.getTurnCounter()="+simulation.getTurnCounter());
        assert simulation.getTurnCounter() == 3;
    }

    @Test
    void FuelTest_DroneWithoutFuelShouldBeAbleToBeCrashedByOtherDrones() {
        SimulationSystem simulation = createSimulationSystem();
        List<DroneAction> mockDroneActions = new ArrayList<>();
        Drone drone0 = simulation.getDrones().get(0);
        Drone drone1 = simulation.getDrones().get(1);
        mockDroneActions.add(DroneAction.builder()
                .orientation(Orientation.N)
                .coordinates(drone0.getCoordinates())
                .action(Action.THRUST3)
                .build());
        mockDroneActions.add(DroneAction.builder()
                .orientation(Orientation.SW)
                .coordinates(drone1.getCoordinates())
                .action(Action.THRUST2)
                .build());

        drone0.setFuel(0);
        simulation.runSimulation(mockDroneActions, false);
        // the mock region makes the drone0 at (0,0), drone1 at (1,1), and sun at (2,2)
        assert drone0.getToDelete()==true;
        assert drone1.getToDelete()==true;
        assert simulation.getTurnCounter() == 2;
    }

    private SimulationSystem createSimulationSystem(){
        Region region = createMockRegion();
        List<Drone> drones = createMockDrones(region);
        List<Coordinates> suns = createMockSuns(region);
        SimulationSystem simulation = SimulationSystem.builder()
                .drones(drones)
                .maxSpaceExplorable(region.getSpaceMap().size() - region.getNumberOfSuns())
                .maxTurns(MOCKDEFAULTTURNLIMIT)
                .region(region)
                .spaceExplored(drones.size())
                .chargeRate(MOCKDEFAULTCHARGERATE)
                .gallonsPerThrust(MOCKGALLONSPERTHRUST)
                .gallonsPerSteer(MOCKGALLONSPERSTEER)
                .gallonsPerScan(MOCKGALLONSPERSCAN)
                .gallonsPerPass(MOCKGALLONSPERPASS)
                .turnCounter(0)
                .saveTurn(-1) //old format. No turn to save.
                .fileVersion(0) //original file version is defined as 0
                .suns(suns)
                .complete(false)
                .build();
        return simulation;
    }

    private Region createMockRegion() {
        return new Region(MOCKREGIONWIDTH, MOCKREGIONHEIGHT);
    }

    private List<Drone> createMockDrones(Region region){
        List<Drone> drones = new ArrayList<>();
        int numberOfDrones = MOCKDEFAULTNUMDRONES;
        for (int k = 0; k < numberOfDrones; k++) {

            int droneX = k;
            int droneY = k;
            Orientation orientation = OrientationCoordinateOffsets.getOrientationFromDirection(MOCKDEFAULTORIENTATION);
            Coordinates coordinates = new Coordinates(droneX, droneY);
            drones.add(Drone.builder()
                    .coordinates(coordinates)
                    .orientation(orientation)
                    .droneID("d" + k)
                    .toDelete(false)
                    .strategy(0)
                    .fuel(MOCKDEFAULTFUEL)
                    .build());

            Space droneSpace = region.getSpace(coordinates);
            droneSpace.setIsExplored(true);
            droneSpace.setIsKnown(true);
            droneSpace.setContents(Contents.EMPTY);
            droneSpace.setDrone(true);
        }
        return drones;
    }

    private List<Coordinates> createMockSuns(Region region){
        List<Coordinates> suns = new ArrayList<>();
        region.setNumberOfSuns(MOCKDEFAULTNUMSUNS);
        for (int k=0; k<region.getNumberOfSuns(); k++){
            Coordinates coordinates = new Coordinates(2,2);
            region.getSpace(coordinates).setContents(Contents.SUN);
            suns.add(coordinates); //save the sun location so we don't need to parse space to find all of them.
        }
        return suns;
    }
}
