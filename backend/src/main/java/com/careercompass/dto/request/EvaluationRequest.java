package com.careercompass.dto.request;
import lombok.Data;
@Data public class EvaluationRequest {
    private Integer technicalRating; private Integer communicationRating; private Integer overallRating;
    private String comments; private String recommendation;
}
