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

Spacecraft instruction

`PUT /spacecraft/[ID]`

Response
```json
{
    instruction: "INSTRUCTION",
    {
        x: 1,
        y: 1,
        direction: "east"
    }
}
```
