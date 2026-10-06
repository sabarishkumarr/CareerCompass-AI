package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data public class PredictionResponse {
    private BigDecimal placementProbability;
    private Boolean isPlaced;
    private BigDecimal confidenceLevel;
    private String predictionLabel;
    private String modelUsed;
    private BigDecimal modelAccuracy;
    private String explanation;
    private List<String> recommendations;
    private List<Map<String, Object>> featureContributions;
    private LocalDateTime createdAt;
}
