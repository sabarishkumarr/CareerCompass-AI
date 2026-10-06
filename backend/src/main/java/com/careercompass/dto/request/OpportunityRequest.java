package com.careercompass.dto.request;
import com.careercompass.model.OpportunityType;
import com.careercompass.model.WorkMode;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
@Data public class OpportunityRequest {
    private String title; private OpportunityType type; private String description;
    private String location; private WorkMode workMode; private BigDecimal stipendMin; private BigDecimal stipendMax;
    private String duration; private LocalDate applicationDeadline; private BigDecimal minCgpa;
    private Integer minExperience; private String educationRequirement;
    private List<SkillReq> skills;
    @Data public static class SkillReq { private Long skillId; private Boolean isRequired; private Integer minProficiency; }
}
