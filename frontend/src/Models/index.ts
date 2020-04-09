import { Direction } from "../Types"

export class SpaceEntity {
    id: string;
    type: string;
    direction: Direction;
    status: string;

    constructor(id: string, type: any, direction: Direction, status: string) {
        this.id = id;
        this.type = type;
        this.direction = direction;
        this.status = status;
    }
}

export class Space {
    area: Array<Array<SpaceEntity>>;

    constructor(area: Array<Array<SpaceEntity>>) {
        this.area = area;
    }

    height() {
        return this.area.length;
    }

    width() {
        return this.area[0].length;
    }

    get(x: number, y: number): SpaceEntity {
        var actualX = x;
        var actualY = Math.abs(y - this.area.length) - 1;
        return this.area[actualY][actualX];
    }
}

export class Simulation {
    id: string;
    space: Space;

    constructor(id: string, space: Array<Array<SpaceEntity>>) {
        this.id = id;
        this.space = new Space(space);
    }
}