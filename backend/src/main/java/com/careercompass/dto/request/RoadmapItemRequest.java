package com.careercompass.dto.request;
import lombok.Data;
@Data public class RoadmapItemRequest {
    private String topic; private String description; private Integer targetLevel; private Integer priority;
}
