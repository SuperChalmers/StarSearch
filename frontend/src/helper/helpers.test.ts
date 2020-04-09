import { convertSimulationResponse } from './helpers';

describe('createSimulation', () => {
    it('Creates a grid', () => {
        const simulationServerResponse = {
            id: 123,
            height: 2,
            width: 2,
            drones: [
                {
                    droneID: "d0",
                    orientation: "N",
                    coordinates: {
                        width: 0,
                        height: 1
                    },
                    strategy: 0
                }
            ],
            spaceMap: [
                {
                    coordinates: {
                        width: 0,
                        height: 0
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 1,
                        height: 0
                    },
                    contents: "SUN",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 1,
                        height: 1
                    },
                    contents: "STARS",
                    drone: false,
                    isExplored: false,
                    isKnown: false
                },
                {
                    coordinates: {
                        width: 0,
                        height: 1
                    },
                    contents: "DRONE",
                    drone: true,
                    isExplored: false,
                    isKnown: true
                }
            ]
        }
        
        var space = convertSimulationResponse(simulationServerResponse);
    
        expect(space[0].length).toBe(2);
        expect(space.length).toBe(2);

        expect(space[1][0].type).toBe("DRONE")
        expect(space[1][0].direction).toBe("N")

        expect(space[1][1].type).toBe("STARS")
        expect(space[1][1].direction).toBe("none")

        expect(space[0][1].type).toBe("SUN")
        expect(space[0][1].direction).toBe("none")

        expect(space[0][0].type).toBe("STARS")
        expect(space[0][0].direction).toBe("none")
    })
})

