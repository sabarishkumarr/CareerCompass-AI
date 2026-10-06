package com.careercompass.controller;

import com.careercompass.dto.response.ApiResponse;
import com.careercompass.dto.response.CareerResponse;
import com.careercompass.service.CareerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/careers")
@RequiredArgsConstructor
public class CareerController {
    private final CareerService careerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CareerResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(careerService.getAllCareers()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CareerResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(careerService.getCareerById(id)));
    }
}
