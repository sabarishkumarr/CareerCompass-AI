package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class StudentDashboardResponse {
    private Integer profileCompletion; private PredictionResponse latestPrediction;
    private int applicationCount; private int applicationsCount;
    private int skillCount; private int projectCount; private int projectsCount;
    private Integer placementProbability;
    private List<ApplicationResponse> recentApplications;
    private List<OpportunityResponse> recommendedOpportunities;
}
