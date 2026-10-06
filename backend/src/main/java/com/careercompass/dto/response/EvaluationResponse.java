package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDateTime;
@Data public class EvaluationResponse {
    private Long id; private Integer technicalRating; private Integer communicationRating; private Integer overallRating;
    private String comments; private String recommendation; private LocalDateTime createdAt;
}
