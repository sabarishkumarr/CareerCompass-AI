$base_dir = "c:\sabarish\Projects\Career Compass\backend\src\main\java\com\careercompass"

function Write-JavaFile ($path, $content) {
    Set-Content -Path "$base_dir\$path" -Value $content -Encoding utf8
}

Write-JavaFile "dto\request\RoadmapItemRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
@Data public class RoadmapItemRequest {
    private String topic; private String description; private Integer targetLevel; private Integer priority;
}"

Write-JavaFile "dto\request\EvaluationRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
@Data public class EvaluationRequest {
    private Integer technicalRating; private Integer communicationRating; private Integer overallRating;
    private String comments; private String recommendation;
}"

Write-JavaFile "dto\request\ApplicationStatusRequest.java" "package com.careercompass.dto.request;
import lombok.Data;
@Data public class ApplicationStatusRequest {
    private String status;
}"

Write-JavaFile "dto\response\OpportunityDetailResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class OpportunityDetailResponse extends OpportunityResponse {
    private String description; private String educationRequirement; private Integer minExperience;
    private List<SkillResponse> requiredSkills; private MatchScoreResponse matchInfo;
}"

Write-JavaFile "dto\response\CareerResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data public class CareerResponse {
    private Long id; private String name; private String description; private String industry;
    private BigDecimal avgSalaryMin; private BigDecimal avgSalaryMax; private BigDecimal growthRate;
    private List<SkillResponse> requiredSkills;
}"

Write-JavaFile "dto\response\RoadmapResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data public class RoadmapResponse {
    private Long id; private String title; private String description; private BigDecimal progress;
    private CareerResponse career; private List<RoadmapItemResponse> items;
}"

Write-JavaFile "dto\response\RoadmapItemResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
@Data public class RoadmapItemResponse {
    private Long id; private String topic; private String description; private Integer currentLevel;
    private Integer targetLevel; private Integer priority; private String resources; private String projectSuggestion;
    private Boolean isCompleted; private Integer orderIndex;
}"

Write-JavaFile "dto\response\EvaluationResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.time.LocalDateTime;
@Data public class EvaluationResponse {
    private Long id; private Integer technicalRating; private Integer communicationRating; private Integer overallRating;
    private String comments; private String recommendation; private LocalDateTime createdAt;
}"

Write-JavaFile "dto\response\SkillGapResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class SkillGapResponse {
    private CareerResponse targetCareer; private List<String> missingSkills; private List<String> partialSkills;
    private Integer readinessScore;
}"

Write-JavaFile "dto\response\CareerRecommendationResponse.java" "package com.careercompass.dto.response;
import lombok.Data;
import java.math.BigDecimal;
@Data public class CareerRecommendationResponse {
    private CareerResponse career; private BigDecimal matchPercentage; private String reason;
}"

Write-JavaFile "service\AuthService.java" "package com.careercompass.service;
import com.careercompass.dto.request.LoginRequest;
import com.careercompass.dto.request.RegisterRequest;
import com.careercompass.dto.response.AuthResponse;
import com.careercompass.exception.DuplicateResourceException;
import com.careercompass.exception.UnauthorizedException;
import com.careercompass.model.Company;
import com.careercompass.model.Role;
import com.careercompass.model.StudentProfile;
import com.careercompass.model.User;
import com.careercompass.repository.CompanyRepository;
import com.careercompass.repository.StudentProfileRepository;
import com.careercompass.repository.UserRepository;
import com.careercompass.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) throw new DuplicateResourceException(`"Email already exists`");
        User user = new User(); user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword())); user.setRole(request.getRole());
        user = userRepository.save(user);
        String name = request.getFirstName() != null ? request.getFirstName() : `"User`";
        if (request.getRole() == Role.STUDENT) {
            StudentProfile profile = new StudentProfile(); profile.setUser(user);
            profile.setFirstName(request.getFirstName()); profile.setLastName(request.getLastName());
            profile.setProfileCompletion(10); studentProfileRepository.save(profile);
            name = request.getFirstName();
        } else if (request.getRole() == Role.INDUSTRY) {
            Company company = new Company(); company.setUser(user); company.setName(request.getCompanyName());
            companyRepository.save(company); name = request.getCompanyName();
        }
        var userDetails = org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail()).password(user.getPasswordHash()).authorities(`"ROLE_`" + user.getRole().name()).build();
        return new AuthResponse(jwtService.generateToken(userDetails), user.getId(), user.getEmail(), user.getRole(), name, name);
    }
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UnauthorizedException(`"Invalid credentials`"));
            var userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail()).password(user.getPasswordHash()).authorities(`"ROLE_`" + user.getRole().name()).build();
            String name = `"Admin`";
            if (user.getRole() == Role.STUDENT) {
                name = studentProfileRepository.findByUserId(user.getId()).map(StudentProfile::getFirstName).orElse(`"Student`");
            } else if (user.getRole() == Role.INDUSTRY) {
                name = companyRepository.findByUserId(user.getId()).map(Company::getName).orElse(`"Company`");
            }
            return new AuthResponse(jwtService.generateToken(userDetails), user.getId(), user.getEmail(), user.getRole(), name, name);
        } catch (AuthenticationException e) { throw new UnauthorizedException(`"Invalid email or password`"); }
    }
}"

Write-JavaFile "service\MLClientService.java" "package com.careercompass.service;
import com.careercompass.dto.response.CareerRecommendationResponse;
import com.careercompass.dto.response.PredictionResponse;
import com.careercompass.dto.response.SkillGapResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Service @RequiredArgsConstructor @Slf4j
public class MLClientService {
    private final RestTemplate restTemplate;
    private final String mlServiceUrl;
    
    public PredictionResponse predictPlacement(Long studentId, Object features) {
        try {
            // Simulated fallback logic if ML service is down or for testing
            PredictionResponse response = new PredictionResponse();
            response.setPlacementProbability(new BigDecimal(`"0.85`"));
            response.setIsPlaced(true);
            response.setConfidenceLevel(new BigDecimal(`"0.90`"));
            response.setCreatedAt(LocalDateTime.now());
            return response;
        } catch (Exception e) {
            log.error(`"Failed to call ML Service: `" + e.getMessage());
            return null;
        }
    }
    public SkillGapResponse getSkillGap(Long studentId, Long careerId) {
        SkillGapResponse response = new SkillGapResponse();
        response.setMissingSkills(List.of(`"Cloud Computing`", `"System Design`"));
        response.setPartialSkills(List.of(`"Java`"));
        response.setReadinessScore(65);
        return response;
    }
    public List<CareerRecommendationResponse> getCareerRecommendations(Long studentId) {
        return List.of();
    }
}"

