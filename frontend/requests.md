simulation

Routes

Creates a new simulation instance

`POST /simulation`

Request
```json
{
    simulation: {
        secondsDelay: 123,
        scenarioFile: "FILE",
        strategy: "STRATEGY",
        chargeMethod: "METHOD",
        chargeRate: 123,
        fuel: 123,
        gallonsPerThrust: 123,
        gallonsPerSteer: 123,
        gallonsPerScan: 123,
        gallonsPerPass: 123
    }
}
```

Response
```json
{
    simulation: {
        height: 3,
        width: 3,
        spaceships: [
            {
                id: 1,
                x: 1,
                y: 1,
                direction: "east"
            },
            {
                id: 1,
                x: 1,
                y: 1,
                direction: "west"
            }
        ],
        suns: [
            {
                id: 1,
                x: 1,
                y: 1
            },
            {
                id: 1,
                x: 1,
                y: 1
            }
        ]
    }
}
```

Update a simulation instance

`PUT /simulation/[SIMULATION_ID]`

Request
```json
{
    simulation: {
        height: 3,
        width: 3,
        spaceships: [
            {
                id: 1,
                x: 1,
                y: 1,
                direction: "east"
            },
            {
                id: 1,
                x: 1,
                y: 1,
                direction: "west"
            }
        ],
        suns: [
            {
                id: 1,
                x: 1,
                y: 1
            },
            {
                id: 1,
                x: 1,
                y: 1
            }
        ]
    }
}
```

Response
```json
{
    simulation: {
        height: 3,
        width: 3,
        spaceships: [
            {
                id: 1,
                x: 1,
                y: 1,
                direction: "east"
            },
            {
                id: 1,
                x: 1,
                y: 1,
                direction: "west"
            }
        ],
        suns: [
            {
                id: 1,
                x: 1,
                y: 1
            },
            {
                id: 1,
                x: 1,
                y: 1
            }
        ]
    }
}
```
