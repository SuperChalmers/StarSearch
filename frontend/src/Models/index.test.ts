import { Simulation } from '.';
import { Direction } from '../Types';

describe('createSimulation', () => {
    it('Creates a grid', () => {
        var simulation: Simulation = new Simulation("1", [
            [
                { 
                    id: "a",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                },
                { 
                    id: "b",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                }
            ],
            [
                { 
                    id: "c",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                },
                { 
                    id: "d",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                }
            ]
        ]);
    
        expect(simulation.space.height()).toBe(2)
        expect(simulation.space.width()).toBe(2)
        expect(simulation.id).toBe("1")

        expect(simulation.space.get(0, 0).id).toEqual("c")
        expect(simulation.space.get(0, 1).id).toEqual("a")
        expect(simulation.space.get(1, 1).id).toEqual("b")
        expect(simulation.space.get(1, 0).id).toEqual("d")
    })

    it('Creates a grid', () => {
        var simulation: Simulation = new Simulation("1", [
            [
                { 
                    id: "a",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                },
                { 
                    id: "b",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                },
                { 
                    id: "c",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                }
            ],
            [
                { 
                    id: "d",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                },
                { 
                    id: "e",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                },
                { 
                    id: "f",
                    type: "DRONE",
                    direction: Direction.N,
                    status: "none"
                }
            ]
        ]);
    
        expect(simulation.space.height()).toBe(2)
        expect(simulation.space.width()).toBe(3)
        expect(simulation.id).toBe("1")
    })
})

