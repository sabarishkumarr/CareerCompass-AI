package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data public class SkillGapResponse {
    private CareerResponse targetCareer;
    private Integer readinessScore;
    private String readinessLevel;
    private List<String> missingSkills;
    private List<String> partialSkills;
    private List<String> strongSkills;
    private List<String> priorityGaps;
    private List<Map<String, Object>> matchedSkills;
    private List<String> recommendations;
}
