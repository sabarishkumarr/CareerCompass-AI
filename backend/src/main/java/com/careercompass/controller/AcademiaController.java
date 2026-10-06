package com.careercompass.controller;
import com.careercompass.dto.response.AcademiaDashboardResponse;
import com.careercompass.dto.response.ApiResponse;
import com.careercompass.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController @RequestMapping("/api/academia") @RequiredArgsConstructor
public class AcademiaController {
    private final AnalyticsService analyticsService;
    @GetMapping("/dashboard") public ResponseEntity<ApiResponse<AcademiaDashboardResponse>> dash() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getAcademiaDashboard())); }
    @GetMapping("/student-analytics") public ResponseEntity<ApiResponse<Map<String,Object>>> sa() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getStudentAnalytics())); }
    @GetMapping("/skill-analytics") public ResponseEntity<ApiResponse<Map<String,Object>>> ska() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getSkillAnalytics())); }
    @GetMapping("/placement-analytics") public ResponseEntity<ApiResponse<Map<String,Object>>> pa() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getPlacementAnalytics())); }
    @GetMapping("/industry-demand") public ResponseEntity<ApiResponse<List<Map<String,Object>>>> id() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getIndustryDemand())); }
    @GetMapping("/training-recommendations") public ResponseEntity<ApiResponse<List<String>>> tr() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getTrainingRecommendations())); }
}
