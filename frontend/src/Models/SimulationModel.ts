import { Direction } from "../Types"

export class SpaceEntity {
    id: string;
    type: string;
    direction: Direction;
    status: string;
    known: boolean;
    explored: boolean;
    fuel: number;

    constructor(id: string, type: any, direction: Direction, status: string, fuel: number, known: boolean = false, explored: boolean = false) {
        this.id = id;
        this.type = type;
        this.direction = direction;
        this.status = status;
        this.known = known;
        this.explored = explored;
        this.fuel = fuel;
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
    width: number;
    height: number;
    safeSquares: number;
    exploredSquares: number;

    constructor(id: string, space: Array<Array<SpaceEntity>>) {
        this.id = id;
        this.space = new Space(space);

        this.width = this.space.width();
        this.height = this.space.height();

        this.safeSquares = this.getSafeSquares()
        this.exploredSquares = this.getExploredSquares()
    }

    getSafeSquares() {
        var safeSquares = 0;

        for (var i = 0; i < this.space.width(); i++) {
            for (var j = 0; j < this.space.height(); j++) {
                const spaceEntity = this.space.get(i, j);
                const type = spaceEntity.type;

                if (type === "DRONE" || type === "EMPTY" || type === "STARS") {
                    safeSquares++;
                }
            }
        }

        return safeSquares;
    }

    getExploredSquares() {
        var exploredSquares = 0;

        for (var i = 0; i < this.space.width(); i++) {
            for (var j = 0; j < this.space.height(); j++) {
                const spaceEntity = this.space.get(i, j);
                const type = spaceEntity.type;

                if (type === "DRONE" || type === "EMPTY") {
                    exploredSquares++;
                }
            }
        }

        return exploredSquares;
    }
}