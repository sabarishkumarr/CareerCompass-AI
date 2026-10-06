package com.careercompass.controller;

import com.careercompass.dto.request.ApplicationRequest;
import com.careercompass.dto.request.ApplicationStatusRequest;
import com.careercompass.dto.response.ApplicationResponse;
import com.careercompass.dto.response.ApiResponse;
import com.careercompass.model.User;
import com.careercompass.repository.UserRepository;
import com.careercompass.service.ApplicationService;
import com.careercompass.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService appService;
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

    @PostMapping
    public ResponseEntity<ApiResponse<ApplicationResponse>> apply(@RequestBody ApplicationRequest req) {
        return ResponseEntity.ok(ApiResponse.success(appService.apply(getUserId(), req)));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getMy() {
        return ResponseEntity.ok(ApiResponse.success(appService.getMyApplications(getUserId())));
    }

    @PutMapping("/{id}/withdraw")
    public ResponseEntity<ApiResponse<Void>> withdraw(@PathVariable Long id) {
        appService.withdrawApplication(id, getUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/opportunity/{oppId}")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getOppApps(@PathVariable Long oppId) {
        return ResponseEntity.ok(ApiResponse.success(appService.getOpportunityApplications(oppId, getUserId())));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(@PathVariable Long id, @RequestBody ApplicationStatusRequest req) {
        appService.updateApplicationStatus(id, getUserId(), req.getStatus());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/industry")
    public ResponseEntity<ApiResponse<List<ApplicationResponse>>> getIndustry() {
        return ResponseEntity.ok(ApiResponse.success(appService.getIndustryApplications(getUserId())));
    }
}
