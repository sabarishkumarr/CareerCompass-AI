package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDate;
@Data public class ProjectResponse {
    private Long id; private String title; private String description; private String techStack;
    private LocalDate startDate; private LocalDate endDate;
}
