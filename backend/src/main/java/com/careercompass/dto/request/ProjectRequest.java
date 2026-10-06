package com.careercompass.dto.request;
import lombok.Data;
import java.time.LocalDate;
@Data public class ProjectRequest {
    private String title; private String description; private String techStack;
    private String projectUrl; private String githubUrl; private LocalDate startDate; private LocalDate endDate;
}
