package com.careercompass.service;
import com.careercompass.dto.response.CandidateResponse;
import com.careercompass.dto.response.MatchScoreResponse;
import com.careercompass.dto.response.StudentProfileResponse;
import com.careercompass.dto.response.ApplicationResponse;
import com.careercompass.model.Application;
import com.careercompass.model.Opportunity;
import com.careercompass.model.OpportunitySkill;
import com.careercompass.model.StudentProfile;
import com.careercompass.model.StudentSkill;
import com.careercompass.repository.ApplicationRepository;
import com.careercompass.repository.OpportunityRepository;
import com.careercompass.repository.StudentProfileRepository;
import com.careercompass.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class MatchingService {
    private final StudentProfileRepository studentProfileRepo;
    private final OpportunityRepository oppRepo;
    private final ApplicationRepository appRepo;
    public MatchScoreResponse calculateMatchScore(Long studentId, Long oppId) {
        StudentProfile student = studentProfileRepo.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Opportunity opp = oppRepo.findById(oppId).orElseThrow(() -> new ResourceNotFoundException("Opp not found"));
        List<OpportunitySkill> reqSkills = opp.getSkills();
        Map<Long, Integer> studentSkillMap = student.getSkills().stream().collect(Collectors.toMap(s -> s.getSkill().getId(), StudentSkill::getProficiencyLevel));
        int totalRequired = reqSkills.size();
        if (totalRequired == 0) {
            MatchScoreResponse r = new MatchScoreResponse(); r.setOverallScore(new BigDecimal("100"));
            r.setMatchedSkills(List.of()); r.setMissingSkills(List.of()); r.setPartialSkills(List.of()); return r;
        }
        int full = 0; int partial = 0;
        List<String> matched = new ArrayList<>(); List<String> missing = new ArrayList<>(); List<String> partialL = new ArrayList<>();
        for (OpportunitySkill rs : reqSkills) {
            Integer sLevel = studentSkillMap.get(rs.getSkill().getId());
            if (sLevel == null) { missing.add(rs.getSkill().getName()); }
            else if (sLevel >= rs.getMinProficiency()) { full++; matched.add(rs.getSkill().getName()); }
            else { partial++; partialL.add(rs.getSkill().getName()); }
        }
        double score = ((full * 1.0) + (partial * 0.5)) / totalRequired * 100.0;
        MatchScoreResponse r = new MatchScoreResponse();
        r.setOverallScore(BigDecimal.valueOf(score).setScale(2, java.math.RoundingMode.HALF_UP));
        r.setMatchedSkills(matched); r.setMissingSkills(missing); r.setPartialSkills(partialL);
        return r;
    }
    public List<CandidateResponse> rankCandidates(Long oppId) {
        return appRepo.findByOpportunityId(oppId).stream().map(a -> {
            CandidateResponse cr = new CandidateResponse(); cr.setMatchScore(a.getMatchScore());
            StudentProfileResponse spr = new StudentProfileResponse(); spr.setId(a.getStudent().getId());
            spr.setFirstName(a.getStudent().getFirstName()); spr.setLastName(a.getStudent().getLastName());
            cr.setStudent(spr);
            ApplicationResponse ar = new ApplicationResponse(); ar.setId(a.getId()); ar.setStatus(a.getStatus().name());
            cr.setApplication(ar); return cr;
        }).sorted((c1, c2) -> c2.getMatchScore().compareTo(c1.getMatchScore())).collect(Collectors.toList());
    }
}
