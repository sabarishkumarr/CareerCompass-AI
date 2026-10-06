package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data public class CareerRecommendationResponse {
    private CareerResponse career;
    private BigDecimal matchPercentage;
    private String reason;
    private List<String> matchingSkills;
    private List<String> missingSkills;
    private List<String> recommendedSkills;
    private List<String> suggestedProjects;
    private List<String> learningPath;
}
