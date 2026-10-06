package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class OpportunityDetailResponse extends OpportunityResponse {
    private String description; private String educationRequirement; private Integer minExperience;
    private List<SkillResponse> requiredSkills; private MatchScoreResponse matchInfo;
}
