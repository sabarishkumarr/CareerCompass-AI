package com.careercompass.dto.response;
import lombok.Data;
@Data public class RoadmapItemResponse {
    private Long id; private String topic; private String title;
    private String description; private Integer currentLevel;
    private Integer targetLevel; private Integer priority; private String resources; private String projectSuggestion;
    private Boolean isCompleted; private Boolean completed;
    private Integer orderIndex; private Integer stepOrder;
    private Integer estimatedHours;
}
