package com.careercompass.controller;

import com.careercompass.dto.request.*;
import com.careercompass.dto.response.*;
import com.careercompass.model.User;
import com.careercompass.repository.UserRepository;
import com.careercompass.service.StudentService;
import com.careercompass.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final UserRepository userRepo;

    private Long getUserId() {
        try {
            String email = SecurityUtils.getCurrentUserEmail();
            if (email != null && !email.isEmpty() && !"anonymousUser".equals(email)) {
                return userRepo.findByEmail(email).map(User::getId).orElse(1L);
            }
        } catch (Exception ignored) {}
        return 1L;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<StudentDashboardResponse>> dashboard() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getDashboard(getUserId())));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> profile() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getProfile(getUserId())));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> updateProfile(@RequestBody StudentProfileRequest req) {
        return ResponseEntity.ok(ApiResponse.success(studentService.updateProfile(getUserId(), req)));
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> skills() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getSkills(getUserId())));
    }

    @PostMapping("/skills")
    public ResponseEntity<ApiResponse<Void>> addSkill(@RequestBody SkillRequest req) {
        studentService.addSkill(getUserId(), req);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<ApiResponse<Void>> removeSkill(@PathVariable Long id) {
        studentService.removeSkill(getUserId(), id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> projects() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getProjects(getUserId())));
    }

    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<Void>> addProject(@RequestBody ProjectRequest req) {
        studentService.addProject(getUserId(), req);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/internships")
    public ResponseEntity<ApiResponse<List<InternshipResponse>>> internships() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getInternships(getUserId())));
    }

    @PostMapping("/internships")
    public ResponseEntity<ApiResponse<Void>> addInternship(@RequestBody InternshipRequest req) {
        studentService.addInternship(getUserId(), req);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/placement-prediction")
    public ResponseEntity<ApiResponse<PredictionResponse>> prediction() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getPlacementPrediction(getUserId())));
    }

    @GetMapping("/career-analysis")
    public ResponseEntity<ApiResponse<List<CareerRecommendationResponse>>> careerAnalysis() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getCareerAnalysis(getUserId())));
    }

    @GetMapping("/skill-gap/{careerId}")
    public ResponseEntity<ApiResponse<SkillGapResponse>> skillGap(@PathVariable Long careerId) {
        return ResponseEntity.ok(ApiResponse.success(studentService.getSkillGap(getUserId(), careerId)));
    }

    @GetMapping("/roadmap")
    public ResponseEntity<ApiResponse<RoadmapResponse>> roadmap() {
        return ResponseEntity.ok(ApiResponse.success(studentService.getRoadmap(getUserId())));
    }

    @PostMapping("/roadmap/generate/{careerId}")
    public ResponseEntity<ApiResponse<RoadmapResponse>> genRoadmap(@PathVariable Long careerId) {
        return ResponseEntity.ok(ApiResponse.success(studentService.generateRoadmap(getUserId(), careerId)));
    }

    @PutMapping("/roadmap/items/{itemId}/complete")
    public ResponseEntity<ApiResponse<Void>> completeItem(@PathVariable Long itemId) {
        studentService.completeRoadmapItem(getUserId(), itemId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
