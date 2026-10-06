package com.careercompass.controller;

import com.careercompass.dto.response.ApiResponse;
import com.careercompass.dto.response.CareerRecommendationResponse;
import com.careercompass.dto.response.PredictionResponse;
import com.careercompass.dto.response.SkillGapResponse;
import com.careercompass.model.StudentProfile;
import com.careercompass.model.User;
import com.careercompass.repository.StudentProfileRepository;
import com.careercompass.repository.UserRepository;
import com.careercompass.service.MLClientService;
import com.careercompass.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ml")
@RequiredArgsConstructor
public class MLController {
    private final MLClientService mlClientService;
    private final UserRepository userRepo;
    private final StudentProfileRepository profileRepo;

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        return ResponseEntity.ok(ApiResponse.success(Map.of(
            "status", "UP",
            "service", "CareerCompass ML Integration",
            "timestamp", System.currentTimeMillis()
        )));
    }

    @PostMapping("/predict-placement")
    public ResponseEntity<ApiResponse<PredictionResponse>> predictPlacement(@RequestBody(required = false) Map<String, Object> req) {
        Long profileId = resolveCurrentStudentProfileId();
        return ResponseEntity.ok(ApiResponse.success(mlClientService.predictPlacement(profileId, req)));
    }

    @PostMapping("/skill-gap")
    public ResponseEntity<ApiResponse<SkillGapResponse>> skillGap(@RequestBody Map<String, Object> req) {
        Long profileId = resolveCurrentStudentProfileId();
        Long careerId = 1L;
        if (req != null && req.containsKey("career_id")) {
            careerId = Long.valueOf(req.get("career_id").toString());
        } else if (req != null && req.containsKey("careerId")) {
            careerId = Long.valueOf(req.get("careerId").toString());
        }
        return ResponseEntity.ok(ApiResponse.success(mlClientService.getSkillGap(profileId, careerId)));
    }

    @PostMapping("/career-recommendation")
    public ResponseEntity<ApiResponse<List<CareerRecommendationResponse>>> careerRecommendation(@RequestBody(required = false) Map<String, Object> req) {
        Long profileId = resolveCurrentStudentProfileId();
        return ResponseEntity.ok(ApiResponse.success(mlClientService.getCareerRecommendations(profileId)));
    }

    private Long resolveCurrentStudentProfileId() {
        try {
            String email = SecurityUtils.getCurrentUserEmail();
            if (email != null) {
                User u = userRepo.findByEmail(email).orElse(null);
                if (u != null) {
                    StudentProfile sp = profileRepo.findByUserId(u.getId()).orElse(null);
                    if (sp != null) return sp.getId();
                }
            }
        } catch (Exception ignored) {}
        // Fallback to first student profile
        return profileRepo.findAll().stream().findFirst().map(StudentProfile::getId).orElse(1L);
    }
}
