package com.starsearch.starsearch.models;

import lombok.Data;

@Data
public class CreateSimulationRequest {
    private final long id;
    private final int secondsDelay;
    private final String scenarioFile;
    private final int strategy;
    private final String chargeMethod; //TODO is this needed?
    private final int chargeRate;
    private final int fuel;
    private final int gallonsPerThrust;
    private final int gallonsPerSteer;
    private final int gallonsPerScan;
    private final int gallonsPerPass;
}
