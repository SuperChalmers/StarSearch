export enum Direction {
    N = "N",
    NW = "NW",
    NE = "NE",
    S = "S",
    SW = "SW",
    SE = "SE",
    W = "W",
    E = "E",
    none = "none"
}

export interface Simulation {
    id: number;
    space: Array<Array<any>>;
}

export interface DroneResponse {
    droneID: string;
    orientation: Direction;
    coordinates: {
        width: number,
        height: number
    };
    strategy: number;
}

export interface SpaceElementResponse {
    coordinates: {
        width: number,
        height: number
    };
    contents: string;
    drone: boolean;
    isExplored: boolean;
    isKnown: boolean;
}