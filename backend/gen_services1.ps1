$base_dir = "c:\sabarish\Projects\Career Compass\backend\src\main\java\com\careercompass"

function Write-JavaFile ($path, $content) {
    Set-Content -Path "$base_dir\$path" -Value $content -Encoding utf8
}

Write-JavaFile "service\NotificationService.java" "package com.careercompass.service;
import com.careercompass.dto.response.NotificationResponse;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.model.Notification;
import com.careercompass.model.User;
import com.careercompass.repository.NotificationRepository;
import com.careercompass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepo;
    private final UserRepository userRepo;
    public List<NotificationResponse> getUserNotifications(Long userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId).stream().map(n -> {
            NotificationResponse r = new NotificationResponse();
            r.setId(n.getId()); r.setTitle(n.getTitle()); r.setMessage(n.getMessage());
            r.setType(n.getType()); r.setIsRead(n.getIsRead()); r.setCreatedAt(n.getCreatedAt()); return r;
        }).collect(Collectors.toList());
    }
    @Transactional public void markAsRead(Long userId, Long notifId) {
        Notification n = notificationRepo.findById(notifId).orElseThrow(() -> new ResourceNotFoundException(`"Not found`"));
        if(n.getUser().getId().equals(userId)) { n.setIsRead(true); notificationRepo.save(n); }
    }
    @Transactional public void markAllAsRead(Long userId) {
        List<Notification> notifs = notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
        notifs.forEach(n -> n.setIsRead(true)); notificationRepo.saveAll(notifs);
    }
    public void createNotification(Long userId, String title, String message, String type) {
        User u = userRepo.findById(userId).orElseThrow();
        Notification n = new Notification(); n.setUser(u); n.setTitle(title); n.setMessage(message); n.setType(type);
        notificationRepo.save(n);
    }
    public long getUnreadCount(Long userId) { return notificationRepo.countByUserIdAndIsReadFalse(userId); }
}"

Write-JavaFile "service\SkillService.java" "package com.careercompass.service;
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
        return skillRepo.findAll().stream().map(s -> {
            SkillResponse r = new SkillResponse(); r.setId(s.getId()); r.setName(s.getName()); r.setCategory(s.getCategory()); return r;
        }).collect(Collectors.toList());
    }
}"

Write-JavaFile "service\MatchingService.java" "package com.careercompass.service;
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
        StudentProfile student = studentProfileRepo.findById(studentId).orElseThrow(() -> new ResourceNotFoundException(`"Student not found`"));
        Opportunity opp = oppRepo.findById(oppId).orElseThrow(() -> new ResourceNotFoundException(`"Opp not found`"));
        List<OpportunitySkill> reqSkills = opp.getSkills();
        Map<Long, Integer> studentSkillMap = student.getSkills().stream().collect(Collectors.toMap(s -> s.getSkill().getId(), StudentSkill::getProficiencyLevel));
        int totalRequired = reqSkills.size();
        if (totalRequired == 0) {
            MatchScoreResponse r = new MatchScoreResponse(); r.setOverallScore(new BigDecimal(`"100`"));
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
}"

Write-JavaFile "service\ApplicationService.java" "package com.careercompass.service;
import com.careercompass.dto.request.ApplicationRequest;
import com.careercompass.dto.response.ApplicationResponse;
import com.careercompass.dto.response.OpportunityResponse;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.exception.DuplicateResourceException;
import com.careercompass.model.Application;
import com.careercompass.model.ApplicationStatus;
import com.careercompass.model.Opportunity;
import com.careercompass.model.StudentProfile;
import com.careercompass.model.User;
import com.careercompass.repository.ApplicationRepository;
import com.careercompass.repository.OpportunityRepository;
import com.careercompass.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository appRepo;
    private final StudentProfileRepository studentRepo;
    private final OpportunityRepository oppRepo;
    private final MatchingService matchingService;
    private final NotificationService notifService;
    @Transactional public ApplicationResponse apply(Long userId, ApplicationRequest req) {
        StudentProfile student = studentRepo.findByUserId(userId).orElseThrow();
        Opportunity opp = oppRepo.findById(req.getOpportunityId()).orElseThrow();
        if (appRepo.findByStudentIdAndOpportunityId(student.getId(), opp.getId()).isPresent()) {
            throw new DuplicateResourceException(`"Already applied`");
        }
        Application app = new Application(); app.setStudent(student); app.setOpportunity(opp);
        app.setCoverLetter(req.getCoverLetter());
        app.setMatchScore(matchingService.calculateMatchScore(student.getId(), opp.getId()).getOverallScore());
        appRepo.save(app);
        notifService.createNotification(opp.getCompany().getUser().getId(), `"New Application`", student.getFirstName() + `" applied to `" + opp.getTitle(), `"APPLICATION`");
        return toResponse(app);
    }
    public List<ApplicationResponse> getMyApplications(Long userId) {
        StudentProfile student = studentRepo.findByUserId(userId).orElseThrow();
        return appRepo.findByStudentId(student.getId()).stream().map(this::toResponse).collect(Collectors.toList());
    }
    public ApplicationResponse getApplicationById(Long id) { return toResponse(appRepo.findById(id).orElseThrow()); }
    @Transactional public void withdrawApplication(Long id, Long userId) {
        Application app = appRepo.findById(id).orElseThrow();
        StudentProfile student = studentRepo.findByUserId(userId).orElseThrow();
        if(!app.getStudent().getId().equals(student.getId())) throw new com.careercompass.exception.UnauthorizedException(`"Not yours`");
        app.setStatus(ApplicationStatus.WITHDRAWN); appRepo.save(app);
    }
    public List<ApplicationResponse> getOpportunityApplications(Long oppId, Long userId) {
        return appRepo.findByOpportunityId(oppId).stream().map(this::toResponse).collect(Collectors.toList());
    }
    @Transactional public void updateApplicationStatus(Long id, Long userId, String status) {
        Application app = appRepo.findById(id).orElseThrow();
        app.setStatus(ApplicationStatus.valueOf(status)); appRepo.save(app);
        notifService.createNotification(app.getStudent().getUser().getId(), `"Application Update`", `"Your application status for `" + app.getOpportunity().getTitle() + `" changed to `" + status, `"APPLICATION`");
    }
    public List<ApplicationResponse> getIndustryApplications(Long userId) {
        return List.of(); // Simplified for now
    }
    private ApplicationResponse toResponse(Application app) {
        ApplicationResponse r = new ApplicationResponse(); r.setId(app.getId());
        r.setStatus(app.getStatus().name()); r.setMatchScore(app.getMatchScore()); r.setAppliedAt(app.getAppliedAt());
        OpportunityResponse or = new OpportunityResponse(); or.setId(app.getOpportunity().getId());
        or.setTitle(app.getOpportunity().getTitle()); or.setCompanyName(app.getOpportunity().getCompany().getName());
        r.setOpportunity(or); return r;
    }
}"

Write-JavaFile "service\OpportunityService.java" "package com.careercompass.service;
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
        Opportunity opp = oppRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException(`"Not found`"));
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
}"

Write-JavaFile "service\CompanyService.java" "package com.careercompass.service;
import com.careercompass.dto.request.CompanyRequest;
import com.careercompass.dto.response.CompanyResponse;
import com.careercompass.dto.response.IndustryDashboardResponse;
import com.careercompass.model.Company;
import com.careercompass.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service @RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepo;
    public CompanyResponse getCompanyProfile(Long userId) {
        Company c = companyRepo.findByUserId(userId).orElseThrow();
        CompanyResponse r = new CompanyResponse(); r.setId(c.getId()); r.setName(c.getName());
        r.setIndustry(c.getIndustry()); r.setDescription(c.getDescription()); r.setWebsite(c.getWebsite()); return r;
    }
    @Transactional public CompanyResponse updateCompanyProfile(Long userId, CompanyRequest req) {
        Company c = companyRepo.findByUserId(userId).orElseThrow();
        c.setName(req.getName()); c.setIndustry(req.getIndustry()); c.setDescription(req.getDescription());
        c.setWebsite(req.getWebsite()); companyRepo.save(c); return getCompanyProfile(userId);
    }
    public IndustryDashboardResponse getIndustryDashboard(Long userId) {
        IndustryDashboardResponse r = new IndustryDashboardResponse();
        r.setActiveOpportunities(0); r.setTotalApplications(0); r.setShortlistedCount(0); r.setInterviewCount(0); r.setSelectedCount(0);
        r.setTopOpportunities(List.of()); return r;
    }
}"
