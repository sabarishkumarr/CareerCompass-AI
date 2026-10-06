package com.careercompass.dto.request;
import lombok.Data;
import java.math.BigDecimal;
@Data public class StudentProfileRequest {
    private String firstName; private String lastName; private String phone;
    private String college; private String degree; private String department;
    private Integer graduationYear; private BigDecimal cgpa;
    private Integer iqScore; private Integer communicationScore; private Integer extracurricularScore;
    private Integer academicPerformance; private Integer projectsCompleted; private Boolean internshipExperience;
    private BigDecimal previousSemesterResult; private String preferredCareer; private String bio;
    private String linkedinUrl; private String githubUrl; private String portfolioUrl;
}
