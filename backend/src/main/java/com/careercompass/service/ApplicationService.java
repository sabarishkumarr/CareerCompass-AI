package com.careercompass.service;
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
            throw new DuplicateResourceException("Already applied");
        }
        Application app = new Application(); app.setStudent(student); app.setOpportunity(opp);
        app.setCoverLetter(req.getCoverLetter());
        app.setMatchScore(matchingService.calculateMatchScore(student.getId(), opp.getId()).getOverallScore());
        appRepo.save(app);
        notifService.createNotification(opp.getCompany().getUser().getId(), "New Application", student.getFirstName() + " applied to " + opp.getTitle(), "APPLICATION");
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
        if(!app.getStudent().getId().equals(student.getId())) throw new com.careercompass.exception.UnauthorizedException("Not yours");
        app.setStatus(ApplicationStatus.WITHDRAWN); appRepo.save(app);
    }
    public List<ApplicationResponse> getOpportunityApplications(Long oppId, Long userId) {
        return appRepo.findByOpportunityId(oppId).stream().map(this::toResponse).collect(Collectors.toList());
    }
    @Transactional public void updateApplicationStatus(Long id, Long userId, String status) {
        Application app = appRepo.findById(id).orElseThrow();
        app.setStatus(ApplicationStatus.valueOf(status)); appRepo.save(app);
        notifService.createNotification(app.getStudent().getUser().getId(), "Application Update", "Your application status for " + app.getOpportunity().getTitle() + " changed to " + status, "APPLICATION");
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
}
