package com.careercompass.service;
import com.careercompass.dto.response.CareerResponse;
import com.careercompass.dto.response.SkillResponse;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.model.Career;
import com.careercompass.repository.CareerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class CareerService {
    private final CareerRepository careerRepo;

    public List<CareerResponse> getAllCareers() {
        return careerRepo.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public CareerResponse getCareerById(Long id) {
        Career c = careerRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Career not found with id: " + id));
        return mapToResponse(c);
    }

    private CareerResponse mapToResponse(Career c) {
        CareerResponse r = new CareerResponse();
        r.setId(c.getId());
        r.setName(c.getName());
        r.setDescription(c.getDescription());
        r.setIndustry(c.getIndustry());
        r.setAvgSalaryMin(c.getAvgSalaryMin());
        r.setAvgSalaryMax(c.getAvgSalaryMax());
        r.setGrowthRate(c.getGrowthRate());
        r.setDemandLevel(c.getDemandLevel());
        if (c.getSkills() != null) {
            r.setRequiredSkills(c.getSkills().stream().map(cs -> {
                SkillResponse sr = new SkillResponse();
                if (cs.getSkill() != null) {
                    sr.setId(cs.getSkill().getId());
                    sr.setName(cs.getSkill().getName());
                    sr.setCategory(cs.getSkill().getCategory());
                }
                sr.setProficiencyLevel(cs.getMinProficiency());
                return sr;
            }).collect(Collectors.toList()));
        } else {
            r.setRequiredSkills(List.of());
        }
        return r;
    }
}
