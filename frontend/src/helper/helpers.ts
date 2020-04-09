import { Direction, DroneResponse, SpaceElementResponse } from "../Types"
import { SpaceEntity } from "../Models"


export function convertSimulationResponse(simulationResponse: any): Array<Array<SpaceEntity>> {
    var space: Array<any> = [];
    var spaceEntity: SpaceEntity;

    // Initialize space.
    for(var i = 0; i < simulationResponse.height; i++) {
        space.push(new Array(simulationResponse.width));
        for(var j = 0; j < simulationResponse.height; j++) {
            space[i][j] = new SpaceEntity("0", "EMPTY", Direction["none"], "none");
        }
    }

    // Assign drone locations.
    simulationResponse.drones.forEach((drone: DroneResponse) => {
        var x = drone.coordinates.width;
        var y = drone.coordinates.height;
        
        space[y][x] = new SpaceEntity(drone.droneID, "DRONE", Direction[drone.orientation], "", true, true);
    });

    // Assign other space entity locations.
    simulationResponse.spaceMap.forEach((spaceElement: SpaceElementResponse) => {
        var x = spaceElement.coordinates.width;
        var y = spaceElement.coordinates.height;

        // Only add if it's not a drone since drones are processed first.
        spaceEntity = new SpaceEntity("0", spaceElement.contents, Direction["none"], "", spaceElement.isKnown, spaceElement.isExplored);
        if(spaceEntity.type !== "DRONE") {
            space[y][x] = spaceEntity;
        }
    });
    
    return space;
}

