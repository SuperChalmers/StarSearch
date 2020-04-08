import { convertSimulationResponse } from './helpers';

describe('createSimulation', () => {
    it('Creates a grid', async () => {
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
                    contents: "STARS",
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
    
        await expect(space[0].length).toBe(2);
    })
})

