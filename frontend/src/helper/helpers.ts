var _ = require('lodash');

class SpaceEntity {
    id: string;
    type: string;
    direction: string;
    status: string;

    constructor(id: string, type: any, direction: any, status: string) {
        this.id = id;
        this.type = type;
        this.direction = direction;
        this.status = status;
    }
}

interface Simulation {
    id: number;
    space: Array<Array<any>>;
}

interface DroneResponse {
    droneID: string;
    orientation: string;
    coordinates: {
        width: number,
        height: number
    };
    strategy: number;
}

interface SpaceElementResponse {
    coordinates: {
        width: number,
        height: number
    };
    contents: string;
    drone: boolean;
    isExplored: boolean;
    isKnown: boolean;
}

export function convertSimulationResponse(simulationResponse: any): Array<Array<any>> {
    var space: Array<any> = [];
    var spaceEntity: SpaceEntity;

    // Initialize space.
    for(var i = 0; i < simulationResponse.height; i++) {
        space.push(new Array(simulationResponse.width));
        for(var j = 0; j < simulationResponse.height; j++) {
            space[i][j] = new SpaceEntity("0", "EMPTY", "none", "none");
        }
    }

    // Assign drone locations.
    simulationResponse.drones.forEach((drone: DroneResponse) => {
        var x = drone.coordinates.width;
        var y = drone.coordinates.height;

        space[y][x] = new SpaceEntity(drone.droneID, "drone", drone.orientation, "");
    });

    // Assign other space entity locations.
    simulationResponse.spaceMap.forEach((spaceElement: SpaceElementResponse) => {
        var x = spaceElement.coordinates.width;
        var y = spaceElement.coordinates.height;

        // Only add if it's not a drone since drones are processed first.
        spaceEntity = new SpaceEntity("0", spaceElement.contents, "none", "");
        if(spaceEntity.type != "DRONE") {
            space[y][x] = spaceEntity;
        }
    });
    console.log(space);
    return space;
}

