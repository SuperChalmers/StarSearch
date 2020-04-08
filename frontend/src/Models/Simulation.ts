// import { convertSimulationResponse } from "../helper/helpers";

class Space {
    area: Array<Array<any>>;

    constructor(area: Array<Array<any>>) {
        this.area = area;
    }

    height() {
        return this.area.length;
    }

    width() {
        return this.area[0].length;
    }

    get(x: number, y: number) {
        var actualX = x; //= Math.abs(x - this.area[0].length) - 1;
        var actualY = Math.abs(y - this.area.length) - 1;
        return this.area[actualY][actualX];
    }
}

export class Simulation {
    id: string;
    space: Space;

    constructor(id: string, space: Array<Array<any>>) {
        this.id = id;
        this.space = new Space(space);
    }
}