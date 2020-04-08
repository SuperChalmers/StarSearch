import { Simulation } from './Simulation';

describe('createSimulation', () => {
    it('Creates a grid', () => {
        var simulation: Simulation = new Simulation("1", [["a", "b"], ["c", "d"]]);
    
        expect(simulation.space.height()).toBe(2)
        expect(simulation.space.width()).toBe(2)
    })

    it('selects the correct element', () => {
        /*
            How space is referenced.
            [
                1 ["a", "b"], 
                0 ["c", "d"]
                    0    1
            ]
        */

        var simulation: Simulation = new Simulation("1", [["a", "b"], ["c", "d"]]);
    
        expect(simulation.space.get(0, 0)).toEqual("c")
        expect(simulation.space.get(0, 1)).toEqual("a")
        expect(simulation.space.get(1, 1)).toEqual("b")
        expect(simulation.space.get(1, 0)).toEqual("d")
    })
})

