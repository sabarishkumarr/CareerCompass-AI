package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
@Data public class OpportunityResponse {
    private Long id; private String companyName; private String title; private String type;
    private String location; private String workMode; private BigDecimal stipendMax;
    private LocalDate applicationDeadline; private String status;
}
