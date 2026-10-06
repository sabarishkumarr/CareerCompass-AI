package com.careercompass.dto.request;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;
@Data public class InternshipRequest {
    private String companyName; private String role; private String description;
    private LocalDate startDate; private LocalDate endDate; private BigDecimal stipend; private Boolean isCurrent;
}
