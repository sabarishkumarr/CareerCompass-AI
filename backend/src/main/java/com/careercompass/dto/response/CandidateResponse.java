package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
@Data public class CandidateResponse {
    private StudentProfileResponse student; private ApplicationResponse application; private BigDecimal matchScore;
}
