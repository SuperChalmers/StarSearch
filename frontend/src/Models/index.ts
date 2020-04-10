import { Direction } from "../Types"

export class SpaceEntity {
    id: string;
    type: string;
    direction: Direction;
    status: string;
    known: boolean;
    explored: boolean;

    constructor(id: string, type: any, direction: Direction, status: string, known: boolean = false, explored: boolean = false) {
        this.id = id;
        this.type = type;
        this.direction = direction;
        this.status = status;
        this.known = known;
        this.explored = explored;
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

    width() {
        return this.space.width();
    }

    height() {
        return this.space.height();
    }
}