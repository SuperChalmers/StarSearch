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
                    strategy: 0,
                    fuel: 0
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
                    isExplored: true,
                    isKnown: true
                }
            ]
        }
        
        var space = convertSimulationResponse(simulationServerResponse);
    
        expect(space[0].length).toBe(2);
        expect(space.length).toBe(2);

        expect(space[1][0].type).toBe("DRONE")
        expect(space[1][0].direction).toBe("N")
        expect(space[1][0].explored).toBe(true)

        expect(space[1][1].type).toBe("STARS")
        expect(space[1][1].direction).toBe("none")

        expect(space[0][1].type).toBe("SUN")
        expect(space[0][1].direction).toBe("none")

        expect(space[0][0].type).toBe("STARS")
        expect(space[0][0].direction).toBe("none")
    })

    describe('createSimulation', () => {
        it('ignores found barriers on UI contains barriers', () => {
            var simulationServerResponse = {
                "height": 4,
                "width": 5,
                "drones": [
                    {
                        "droneID": "d0",
                        "orientation": "SE",
                        "coordinates": {
                            "width": 0,
                            "height": 0
                        },
                        "toDelete": true,
                        "strategy": 0,
                        "fuel": 0
                    },
                    {
                        "droneID": "d2",
                        "orientation": "SE",
                        "coordinates": {
                            "width": 3,
                            "height": 2
                        },
                        "toDelete": false,
                        "strategy": 0,
                        "fuel": 0
                    }
                ],
                "spaceMap": [
                    {
                        "coordinates": {
                            "width": 2,
                            "height": 1
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 4,
                            "height": 3
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 0,
                            "height": -1
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 0,
                            "height": 0
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 2,
                            "height": 2
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 0,
                            "height": 1
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 2,
                            "height": 3
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 0,
                            "height": 2
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 0,
                            "height": 3
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 3,
                            "height": -1
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 3,
                            "height": 0
                        },
                        "contents": "SUN",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 3,
                            "height": 1
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 1,
                            "height": -1
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 1,
                            "height": 0
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 3,
                            "height": 2
                        },
                        "contents": "EMPTY",
                        "drone": true,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 1,
                            "height": 1
                        },
                        "contents": "SUN",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 3,
                            "height": 3
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": -1,
                            "height": -1
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 1,
                            "height": 2
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": -1,
                            "height": 0
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 1,
                            "height": 3
                        },
                        "contents": "SUN",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": -1,
                            "height": 1
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": -1,
                            "height": 2
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 4,
                            "height": 0
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 4,
                            "height": 1
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 2,
                            "height": -1
                        },
                        "contents": "BARRIER",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 2,
                            "height": 0
                        },
                        "contents": "EMPTY",
                        "drone": false,
                        "isExplored": true,
                        "isKnown": true
                    },
                    {
                        "coordinates": {
                            "width": 4,
                            "height": 2
                        },
                        "contents": "STARS",
                        "drone": false,
                        "isExplored": false,
                        "isKnown": true
                    }
                ],
                "turnsTaken": 9
            };

            var space = convertSimulationResponse(simulationServerResponse);
    
            expect(space[0].length).toBe(5);
            expect(space.length).toBe(4);
        })
    })
})

