package com.starsearch.starsearch.simulation.drone;

import java.util.Random;

public enum Action {
    STEER,
    THRUST1,
    THRUST2,
    THRUST3,
    SCAN,
    PASS;

    private static Random randGenerator = new Random();

    public static Action getRandomAction() {
        return Action.values()[Math.abs(randGenerator.nextInt()) % Action.values().length];
    }
}
