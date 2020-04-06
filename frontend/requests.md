simulation

## Available Variables

`SIMULATION_NAME`: Any string defined by the user.

`FILE`: String of a .txt text file with simulation configs.

`STRATEGY_STRING`: 0 or 1, 0 = drone selects activity randomly, 1 = drone tries to pick the "best" action.

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
        "scenarioFile": "[FILE]",
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
`GET /simulation/[SIMULATION_ID]`

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

### Drone
Drone action

`PUT /drone/123`

Request Thrust:
```json
{
    "action": "thrust",
    "detail": "1"
}
```

Request Steer:
```json
{
    "action": "steer",
    "detail": "northwest"
}
```

Request Pass:
```json
{
    "action": "pass",
    "detail": ""
}
```

Request Scan:
```json
{
    "action": "scan",
    "detail": ""
}
```

Response (for all actions is current state of simulation):
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