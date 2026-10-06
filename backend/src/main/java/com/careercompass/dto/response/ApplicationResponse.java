package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;
@Data public class ApplicationResponse {
    private Long id; private OpportunityResponse opportunity; private String status;
    private BigDecimal matchScore; private LocalDateTime appliedAt;
}
