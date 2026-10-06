$base_dir = "c:\sabarish\Projects\Career Compass\backend\src\main\java\com\careercompass\dto"

function Write-JavaFile ($path, $content) {
    Set-Content -Path "$base_dir\$path" -Value $content -Encoding utf8
}

Write-JavaFile "request\LoginRequest.java" "package com.careercompass.dto.request;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data public class LoginRequest {
    @NotBlank @Email private String email;
    @NotBlank private String password;
}"

Write-JavaFile "request\RegisterRequest.java" "package com.careercompass.dto.request;
import com.careercompass.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data public class RegisterRequest {
    @NotBlank @Email private String email;
    @NotBlank private String password;
    @NotNull private Role role;
    private String firstName; private String lastName;
    private String companyName;
}"

Write-JavaFile "request\StudentProfileRequest.java" "package com.careercompass.dto.request;
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
}"

Write-JavaFile "request\SkillRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
@Data public class SkillRequest {
    private String name; private String category; private Integer proficiencyLevel; private Integer yearsOfExperience;
}"

Write-JavaFile "request\OpportunityRequest.java" "package com.careercompass.dto.request;
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
}"

Write-JavaFile "request\ApplicationRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
@Data public class ApplicationRequest {
    private Long opportunityId; private String coverLetter;
}"

Write-JavaFile "request\ProjectRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
import java.time.LocalDate;
@Data public class ProjectRequest {
    private String title; private String description; private String techStack;
    private String projectUrl; private String githubUrl; private LocalDate startDate; private LocalDate endDate;
}"

Write-JavaFile "request\InternshipRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;
@Data public class InternshipRequest {
    private String companyName; private String role; private String description;
    private LocalDate startDate; private LocalDate endDate; private BigDecimal stipend; private Boolean isCurrent;
}"

Write-JavaFile "request\CompanyRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
@Data public class CompanyRequest {
    private String name; private String industry; private String description;
    private String website; private String headquarters; private String companySize; private Integer foundedYear;
}"

Write-JavaFile "response\AuthResponse.java" "package com.careercompass.dto.response;
import com.careercompass.model.Role;
import lombok.Data;
@Data public class AuthResponse {
    private String token; private Long userId; private String email; private Role role; private String firstName; private String fullName;
}"

Write-JavaFile "response\StudentProfileResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
@Data public class StudentProfileResponse {
    private Long id; private String firstName; private String lastName; private String email;
    private String college; private String degree; private String department; private Integer graduationYear;
    private BigDecimal cgpa; private String preferredCareer; private Integer profileCompletion;
}"

Write-JavaFile "response\StudentDashboardResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class StudentDashboardResponse {
    private Integer profileCompletion; private PredictionResponse latestPrediction;
    private int applicationCount; private int skillCount; private int projectCount;
    private List<ApplicationResponse> recentApplications;
    private List<OpportunityResponse> recommendedOpportunities;
}"

Write-JavaFile "response\SkillResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
@Data public class SkillResponse {
    private Long id; private String name; private String category; private Integer proficiencyLevel;
}"

Write-JavaFile "response\OpportunityResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
@Data public class OpportunityResponse {
    private Long id; private String companyName; private String title; private String type;
    private String location; private String workMode; private BigDecimal stipendMax;
    private LocalDate applicationDeadline; private String status;
}"

Write-JavaFile "response\ApplicationResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;
@Data public class ApplicationResponse {
    private Long id; private OpportunityResponse opportunity; private String status;
    private BigDecimal matchScore; private LocalDateTime appliedAt;
}"

Write-JavaFile "response\MatchScoreResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data public class MatchScoreResponse {
    private BigDecimal overallScore; private List<String> matchedSkills; private List<String> missingSkills; private List<String> partialSkills;
}"

Write-JavaFile "response\CandidateResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
@Data public class CandidateResponse {
    private StudentProfileResponse student; private ApplicationResponse application; private BigDecimal matchScore;
}"

Write-JavaFile "response\PredictionResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Data public class PredictionResponse {
    private BigDecimal placementProbability; private Boolean isPlaced; private BigDecimal confidenceLevel; private LocalDateTime createdAt;
}"

Write-JavaFile "response\CompanyResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
@Data public class CompanyResponse {
    private Long id; private String name; private String industry; private String description; private String website;
}"

Write-JavaFile "response\IndustryDashboardResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class IndustryDashboardResponse {
    private int activeOpportunities; private int totalApplications; private int shortlistedCount;
    private int interviewCount; private int selectedCount; private List<OpportunityResponse> topOpportunities;
}"

Write-JavaFile "response\PagedResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class PagedResponse<T> {
    private List<T> content; private int pageNo; private int pageSize; private long totalElements; private int totalPages; private boolean last;
}"

Write-JavaFile "response\AcademiaDashboardResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
@Data public class AcademiaDashboardResponse {
    private long totalStudents; private BigDecimal avgCgpa; private BigDecimal placementRate; private long totalOpportunities;
}"

Write-JavaFile "response\ProjectResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDate;
@Data public class ProjectResponse {
    private Long id; private String title; private String description; private String techStack;
    private LocalDate startDate; private LocalDate endDate;
}"

Write-JavaFile "response\InternshipResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDate;
@Data public class InternshipResponse {
    private Long id; private String companyName; private String role; private LocalDate startDate; private LocalDate endDate;
}"

Write-JavaFile "response\NotificationResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDateTime;
@Data public class NotificationResponse {
    private Long id; private String title; private String message; private String type; private Boolean isRead; private LocalDateTime createdAt;
}"
