package com.starsearch.starsearch.models;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class GetSavedSimulationsResponse {
    private Map<String, String> simulations;
}
