package com.careercompass.controller;
import com.careercompass.dto.request.LoginRequest;
import com.careercompass.dto.request.RegisterRequest;
import com.careercompass.dto.response.ApiResponse;
import com.careercompass.dto.response.AuthResponse;
import com.careercompass.service.AuthService;
import com.careercompass.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth") @RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/register") public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(ApiResponse.success(authService.register(req)));
    }
    @PostMapping("/login") public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(req)));
    }
    @GetMapping("/me") public ResponseEntity<ApiResponse<String>> me() { return ResponseEntity.ok(ApiResponse.success(SecurityUtils.getCurrentUserEmail())); }
}
