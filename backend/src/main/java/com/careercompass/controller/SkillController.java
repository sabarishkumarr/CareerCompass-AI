package com.careercompass.controller;
import com.careercompass.dto.response.ApiResponse;
import com.careercompass.dto.response.SkillResponse;
import com.careercompass.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/skills") @RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(skillService.getAllSkills()));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(ApiResponse.success(skillService.getSkillsByCategory(category)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<SkillResponse>>> search(@RequestParam("q") String query) {
        return ResponseEntity.ok(ApiResponse.success(skillService.searchSkills(query)));
    }
}
