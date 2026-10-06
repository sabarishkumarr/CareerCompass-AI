package com.careercompass.service;
import com.careercompass.dto.request.OpportunityRequest;
import com.careercompass.dto.response.OpportunityResponse;
import com.careercompass.dto.response.OpportunityDetailResponse;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.model.Company;
import com.careercompass.model.Opportunity;
import com.careercompass.model.OpportunityStatus;
import com.careercompass.model.OpportunitySkill;
import com.careercompass.model.Skill;
import com.careercompass.repository.CompanyRepository;
import com.careercompass.repository.OpportunityRepository;
import com.careercompass.repository.SkillRepository;
import com.careercompass.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class OpportunityService {
    private final OpportunityRepository oppRepo;
    private final CompanyRepository companyRepo;
    private final SkillRepository skillRepo;
    private final MatchingService matchingService;
    private final StudentProfileRepository studentRepo;
    public Page<OpportunityResponse> getOpportunities(String type, String keyword, int page, int size) {
        return oppRepo.findByStatus(OpportunityStatus.ACTIVE, PageRequest.of(page, size)).map(this::toResponse);
    }
    public OpportunityDetailResponse getOpportunityById(Long id, Long userId) {
        Opportunity opp = oppRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found"));
        OpportunityDetailResponse r = new OpportunityDetailResponse();
        r.setId(opp.getId()); r.setTitle(opp.getTitle()); r.setCompanyName(opp.getCompany().getName());
        r.setDescription(opp.getDescription()); r.setType(opp.getType().name());
        try {
            Long studentId = studentRepo.findByUserId(userId).get().getId();
            r.setMatchInfo(matchingService.calculateMatchScore(studentId, opp.getId()));
        } catch(Exception ignored) {}
        return r;
    }
    @Transactional public OpportunityResponse createOpportunity(Long userId, OpportunityRequest req) {
        Company company = companyRepo.findByUserId(userId).orElseThrow();
        Opportunity opp = new Opportunity(); opp.setCompany(company);
        opp.setTitle(req.getTitle()); opp.setType(req.getType()); opp.setDescription(req.getDescription());
        opp.setLocation(req.getLocation()); opp.setWorkMode(req.getWorkMode());
        opp.setStipendMin(req.getStipendMin()); opp.setStipendMax(req.getStipendMax());
        opp.setDuration(req.getDuration()); opp.setApplicationDeadline(req.getApplicationDeadline());
        opp.setMinCgpa(req.getMinCgpa()); opp.setMinExperience(req.getMinExperience()); opp.setEducationRequirement(req.getEducationRequirement());
        opp = oppRepo.save(opp);
        return toResponse(opp);
    }
    @Transactional public OpportunityResponse updateOpportunity(Long id, Long userId, OpportunityRequest req) {
        Opportunity opp = oppRepo.findById(id).orElseThrow();
        opp.setTitle(req.getTitle()); oppRepo.save(opp); return toResponse(opp);
    }
    @Transactional public void deleteOpportunity(Long id, Long userId) { oppRepo.deleteById(id); }
    public List<OpportunityResponse> getCompanyOpportunities(Long userId) {
        Company company = companyRepo.findByUserId(userId).orElseThrow();
        return oppRepo.findByCompanyId(company.getId()).stream().map(this::toResponse).collect(Collectors.toList());
    }
    private OpportunityResponse toResponse(Opportunity opp) {
        OpportunityResponse r = new OpportunityResponse(); r.setId(opp.getId());
        r.setCompanyName(opp.getCompany().getName()); r.setTitle(opp.getTitle());
        r.setType(opp.getType().name()); r.setLocation(opp.getLocation());
        if(opp.getWorkMode()!=null) r.setWorkMode(opp.getWorkMode().name());
        r.setStipendMax(opp.getStipendMax()); r.setApplicationDeadline(opp.getApplicationDeadline());
        r.setStatus(opp.getStatus().name()); return r;
    }
}
