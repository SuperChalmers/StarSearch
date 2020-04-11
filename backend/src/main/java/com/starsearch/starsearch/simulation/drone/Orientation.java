package com.starsearch.starsearch.simulation.drone;

import java.util.Random;

public enum Orientation {
    N,
    NE,
    E,
    SE,
    S,
    SW,
    W,
    NW;

    private static Random randGenerator = new Random();


    public static Orientation getRandomOrientation() {
        return Orientation.values()[Math.abs(randGenerator.nextInt()) % Orientation.values().length];
    }
}