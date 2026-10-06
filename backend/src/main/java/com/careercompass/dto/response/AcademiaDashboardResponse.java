package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
@Data public class AcademiaDashboardResponse {
    private long totalStudents;
    private BigDecimal avgCgpa;
    private BigDecimal averageCgpa;
    private BigDecimal placementRate;
    private long totalOpportunities;
    private long totalCompanies;
    private long activeOpportunities;
    private List<Map<String, Object>> topSkills;
    private List<Map<String, Object>> placementByDept;
}
