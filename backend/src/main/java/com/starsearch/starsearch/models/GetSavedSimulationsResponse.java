package com.starsearch.starsearch.models;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetSavedSimulationsResponse {
    private List<String> simulations;
}
