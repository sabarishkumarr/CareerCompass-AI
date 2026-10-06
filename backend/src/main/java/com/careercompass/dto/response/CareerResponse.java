package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data public class CareerResponse {
    private Long id; private String name; private String description; private String industry;
    private BigDecimal avgSalaryMin; private BigDecimal avgSalaryMax; private BigDecimal growthRate;
    private String demandLevel;
    private List<SkillResponse> requiredSkills;
}
