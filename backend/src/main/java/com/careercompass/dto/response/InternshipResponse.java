package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDate;
@Data public class InternshipResponse {
    private Long id; private String companyName; private String role; private LocalDate startDate; private LocalDate endDate;
}
