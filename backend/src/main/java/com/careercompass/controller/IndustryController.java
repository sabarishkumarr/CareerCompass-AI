package com.careercompass.controller;

import com.careercompass.dto.request.CompanyRequest;
import com.careercompass.dto.response.ApiResponse;
import com.careercompass.dto.response.CandidateResponse;
import com.careercompass.dto.response.CompanyResponse;
import com.careercompass.dto.response.IndustryDashboardResponse;
import com.careercompass.model.User;
import com.careercompass.repository.UserRepository;
import com.careercompass.service.CompanyService;
import com.careercompass.service.MatchingService;
import com.careercompass.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/industry")
@RequiredArgsConstructor
public class IndustryController {
    private final CompanyService companyService;
    private final MatchingService matchService;
    private final UserRepository userRepo;

    private Long getUserId() {
        try {
            String email = SecurityUtils.getCurrentUserEmail();
            if (email != null && !email.isEmpty() && !"anonymousUser".equals(email)) {
                return userRepo.findByEmail(email).map(User::getId).orElse(4L);
            }
        } catch (Exception ignored) {}
        return 4L;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<IndustryDashboardResponse>> dash() {
        return ResponseEntity.ok(ApiResponse.success(companyService.getIndustryDashboard(getUserId())));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<CompanyResponse>> profile() {
        return ResponseEntity.ok(ApiResponse.success(companyService.getCompanyProfile(getUserId())));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<CompanyResponse>> updateProfile(@RequestBody CompanyRequest req) {
        return ResponseEntity.ok(ApiResponse.success(companyService.updateCompanyProfile(getUserId(), req)));
    }

    @GetMapping("/opportunities/{id}/ranked")
    public ResponseEntity<ApiResponse<List<CandidateResponse>>> ranked(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(matchService.rankCandidates(id)));
    }
}
