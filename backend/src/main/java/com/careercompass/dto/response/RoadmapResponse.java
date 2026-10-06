package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data public class RoadmapResponse {
    private Long id; private String title; private String description; private BigDecimal progress;
    private Integer progressPercentage;
    private String careerName;
    private CareerResponse career; private List<RoadmapItemResponse> items;
}
