package com.careercompass.service;
import com.careercompass.dto.response.SkillResponse;
import com.careercompass.model.Skill;
import com.careercompass.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class SkillService {
    private final SkillRepository skillRepo;

    public List<SkillResponse> getAllSkills() {
        return skillRepo.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<SkillResponse> getSkillsByCategory(String category) {
        return skillRepo.findByCategory(category).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<SkillResponse> searchSkills(String query) {
        return skillRepo.findByNameContainingIgnoreCase(query).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private SkillResponse mapToResponse(Skill s) {
        SkillResponse r = new SkillResponse();
        r.setId(s.getId());
        r.setName(s.getName());
        r.setCategory(s.getCategory());
        return r;
    }
}
