package com.careercompass.controller;

import com.careercompass.dto.request.OpportunityRequest;
import com.careercompass.dto.response.*;
import com.careercompass.model.User;
import com.careercompass.repository.UserRepository;
import com.careercompass.service.OpportunityService;
import com.careercompass.service.MatchingService;
import com.careercompass.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@RequiredArgsConstructor
public class OpportunityController {
    private final OpportunityService oppService;
    private final MatchingService matchService;
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

    @GetMapping
    public ResponseEntity<ApiResponse<Page<OpportunityResponse>>> getAll(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(ApiResponse.success(oppService.getOpportunities(type, keyword, page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OpportunityDetailResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(oppService.getOpportunityById(id, getUserId())));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OpportunityResponse>> create(@RequestBody OpportunityRequest req) {
        return ResponseEntity.ok(ApiResponse.success(oppService.createOpportunity(getUserId(), req)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OpportunityResponse>> update(@PathVariable Long id, @RequestBody OpportunityRequest req) {
        return ResponseEntity.ok(ApiResponse.success(oppService.updateOpportunity(id, getUserId(), req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        oppService.deleteOpportunity(id, getUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<OpportunityResponse>>> getMy() {
        return ResponseEntity.ok(ApiResponse.success(oppService.getCompanyOpportunities(getUserId())));
    }

    @GetMapping("/{id}/match")
    public ResponseEntity<ApiResponse<MatchScoreResponse>> match(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(matchService.calculateMatchScore(getUserId(), id)));
    }
}
