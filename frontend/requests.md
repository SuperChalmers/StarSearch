simulation

## Routes

### Simulation

#### Create New Simulation
Creates a new simulation instance

`POST /simulation`

Request:
```json
{
    "simulation": {
        "name": "[SIMULATION_NAME]",
        "secondsDelay": 123,
        "scenarioFile": "[PATH_TO_FILE]",
        "strategy": "0",
        "chargeMethod": "[METHOD_TYPE]",
        "chargeRate": 123,
        "fuel": 123,
        "gallonsPerThrust": 123,
        "gallonsPerSteer": 123,
        "gallonsPerScan": 123,
        "gallonsPerPass": 123
    }
}
```

Response:
```json 
{
  "height": 4,
  "width": 5,
  "drones": [
    {
      "droneID": "d0",
      "orientation": "N",
      "coordinates": {
        "width": 1,
        "height": 2
      },
      "strategy": 0
    },
    {
      "droneID": "d1",
      "orientation": "NE",
      "coordinates": {
        "width": 0,
        "height": 1
      },
      "strategy": 0
    },
    {
      "droneID": "d2",
      "orientation": "W",
      "coordinates": {
        "width": 3,
        "height": 1
      },
      "strategy": 0
    }
  ],
  "spaceMap": [
    {
      "coordinates": {
        "width": 1,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 2,
        "height": 1
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 3,
        "height": 2
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 4,
        "height": 3
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 1,
        "height": 1
      },
      "contents": "SUN",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 2,
        "height": 2
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 3,
        "height": 3
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 1
      },
      "contents": "EMPTY",
      "drone": true,
      "isExplored": true,
      "isKnown": true
    },
    {
      "coordinates": {
        "width": 1,
        "height": 2
      },
      "contents": "EMPTY",
      "drone": true,
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
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 2
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 1,
        "height": 3
      },
      "contents": "SUN",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 3
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 4,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 3,
        "height": 0
      },
      "contents": "SUN",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 4,
        "height": 1
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 2,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 3,
        "height": 1
      },
      "contents": "EMPTY",
      "drone": true,
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
      "isKnown": false
    }
  ]
}
```

#### Load Simulation
Loads an existing saved simulation.

Request:
`GET /simulation`

Response:
```json
{
  "height": 2,
  "width": 2,
  "drones": [
    {
      "droneID": "d1",
      "orientation": "NE",
      "coordinates": {
        "width": 0,
        "height": 1
      },
      "strategy": 0
    }
  ],
  "spaceMap": [
    {
      "coordinates": {
        "width": 0,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 1,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 1
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
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    }
  ]
}
```

#### Execute Next Step
Runs the next step of the simulation.

Request:
`GET /simulation/next`

Response:
```json
{
  "height": 2,
  "width": 2,
  "drones": [
    {
      "droneID": "d1",
      "orientation": "NE",
      "coordinates": {
        "width": 0,
        "height": 1
      },
      "strategy": 0
    }
  ],
  "spaceMap": [
    {
      "coordinates": {
        "width": 0,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 1,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 1
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
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    }
  ]
}
```

#### Fast Forward Simulation
Fast-forwards through the simulation. Returns the final state of the space.

Request:
`GET /simulation/fast-forward`

Response:
```json
{
  "height": 2,
  "width": 2,
  "drones": [
    {
      "droneID": "d1",
      "orientation": "NE",
      "coordinates": {
        "width": 0,
        "height": 1
      },
      "strategy": 0
    }
  ],
  "spaceMap": [
    {
      "coordinates": {
        "width": 0,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 1,
        "height": 0
      },
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    },
    {
      "coordinates": {
        "width": 0,
        "height": 1
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
      "contents": "STARS",
      "drone": false,
      "isExplored": false,
      "isKnown": false
    }
  ]
}
```

#### Stop Simulation
Stops current simulation, allows users to reload it later.

Request:
`GET /simulation/stop`

Response:
```json
200 Success
```

#### List Saved Simulations
Lists the existing simulations from the server.

Request:
`GET /simulations`

Response:
```json
{
    "simulations": [
        {
            "id": 123,
            "name": "[SIMULATION_NAME]"
        },
        {
            "id": 123,
            "name": "[SIMULATION_NAME]"
        }
    ]
}
```


