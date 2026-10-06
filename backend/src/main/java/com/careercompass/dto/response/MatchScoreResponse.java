package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data public class MatchScoreResponse {
    private BigDecimal overallScore; private List<String> matchedSkills; private List<String> missingSkills; private List<String> partialSkills;
}
