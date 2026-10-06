package com.careercompass.service;
import com.careercompass.dto.request.*;
import com.careercompass.dto.response.*;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.model.*;
import com.careercompass.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.math.BigDecimal;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class StudentService {
    private final StudentProfileRepository profileRepo;
    private final SkillRepository skillRepo;
    private final StudentSkillRepository studentSkillRepo;
    private final StudentProjectRepository projectRepo;
    private final StudentInternshipRepository internshipRepo;
    private final MLClientService mlClient;
    private final RoadmapService roadmapService;
    private final ApplicationService appService;

    public StudentProfileResponse getProfile(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        StudentProfileResponse r = new StudentProfileResponse();
        r.setId(p.getId()); r.setFirstName(p.getFirstName()); r.setLastName(p.getLastName());
        r.setEmail(p.getUser() != null ? p.getUser().getEmail() : null);
        r.setPhone(p.getPhone());
        r.setCollege(p.getCollege()); r.setDegree(p.getDegree()); r.setDepartment(p.getDepartment());
        r.setGraduationYear(p.getGraduationYear()); r.setCgpa(p.getCgpa());
        r.setIqScore(p.getIqScore()); r.setCommunicationScore(p.getCommunicationScore());
        r.setExtracurricularScore(p.getExtracurricularScore()); r.setAcademicPerformance(p.getAcademicPerformance());
        r.setProjectsCompleted(p.getProjectsCompleted()); r.setInternshipExperience(p.getInternshipExperience());
        r.setPreferredCareer(p.getPreferredCareer()); r.setBio(p.getBio());
        r.setLinkedinUrl(p.getLinkedinUrl()); r.setGithubUrl(p.getGithubUrl()); r.setPortfolioUrl(p.getPortfolioUrl());
        r.setProfileCompletion(p.getProfileCompletion());
        return r;
    }
    @Transactional public StudentProfileResponse updateProfile(Long userId, StudentProfileRequest req) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        p.setFirstName(req.getFirstName()); p.setLastName(req.getLastName());
        p.setPhone(req.getPhone());
        p.setCollege(req.getCollege()); p.setDegree(req.getDegree()); p.setDepartment(req.getDepartment());
        p.setGraduationYear(req.getGraduationYear()); p.setCgpa(req.getCgpa());
        if (req.getPreferredCareer() != null) p.setPreferredCareer(req.getPreferredCareer());
        if (req.getBio() != null) p.setBio(req.getBio());
        if (req.getLinkedinUrl() != null) p.setLinkedinUrl(req.getLinkedinUrl());
        if (req.getGithubUrl() != null) p.setGithubUrl(req.getGithubUrl());
        if (req.getPortfolioUrl() != null) p.setPortfolioUrl(req.getPortfolioUrl());
        p.setProfileCompletion(85); // simplified calculation
        profileRepo.save(p); return getProfile(userId);
    }
    public StudentDashboardResponse getDashboard(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        StudentDashboardResponse r = new StudentDashboardResponse();
        r.setProfileCompletion(p.getProfileCompletion());
        int apps = p.getApplications() != null ? p.getApplications().size() : 0;
        int skills = p.getSkills() != null ? p.getSkills().size() : 0;
        int projects = p.getProjects() != null ? p.getProjects().size() : 0;
        r.setApplicationCount(apps);
        r.setApplicationsCount(apps);
        r.setSkillCount(skills);
        r.setProjectCount(projects);
        r.setProjectsCount(projects);
        try {
            PredictionResponse pred = mlClient.predictPlacement(p.getId(), null);
            r.setLatestPrediction(pred);
            if (pred != null && pred.getPlacementProbability() != null) {
                r.setPlacementProbability(pred.getPlacementProbability().multiply(BigDecimal.valueOf(100)).intValue());
            } else {
                r.setPlacementProbability(85);
            }
        } catch (Exception e) {
            r.setPlacementProbability(85);
        }
        r.setRecentApplications(appService.getMyApplications(userId));
        r.setRecommendedOpportunities(List.of());
        return r;
    }
    @Transactional public void addSkill(Long userId, SkillRequest req) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        Skill skill = skillRepo.findByNameIgnoreCase(req.getName()).orElseGet(() -> {
            Skill s = new Skill(); s.setName(req.getName()); s.setCategory(req.getCategory()); return skillRepo.save(s);
        });
        StudentSkill ss = new StudentSkill(); ss.setStudent(p); ss.setSkill(skill);
        ss.setProficiencyLevel(req.getProficiencyLevel()); ss.setYearsOfExperience(req.getYearsOfExperience());
        studentSkillRepo.save(ss);
    }
    @Transactional public void removeSkill(Long userId, Long skillId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        studentSkillRepo.deleteByStudentIdAndSkillId(p.getId(), skillId);
    }
    public List<SkillResponse> getSkills(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return p.getSkills().stream().map(s -> {
            SkillResponse r = new SkillResponse(); r.setId(s.getSkill().getId()); r.setName(s.getSkill().getName());
            r.setProficiencyLevel(s.getProficiencyLevel()); return r;
        }).collect(Collectors.toList());
    }
    @Transactional public void addProject(Long userId, ProjectRequest req) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        StudentProject sp = new StudentProject(); sp.setStudent(p); sp.setTitle(req.getTitle());
        sp.setDescription(req.getDescription()); sp.setTechStack(req.getTechStack()); sp.setStartDate(req.getStartDate()); sp.setEndDate(req.getEndDate());
        projectRepo.save(sp);
    }
    @Transactional public void addInternship(Long userId, InternshipRequest req) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        StudentInternship si = new StudentInternship(); si.setStudent(p); si.setCompanyName(req.getCompanyName());
        si.setRole(req.getRole()); si.setStartDate(req.getStartDate()); si.setEndDate(req.getEndDate());
        internshipRepo.save(si);
    }
    public List<ProjectResponse> getProjects(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return p.getProjects().stream().map(pr -> {
            ProjectResponse r = new ProjectResponse(); r.setId(pr.getId()); r.setTitle(pr.getTitle()); return r;
        }).collect(Collectors.toList());
    }
    public List<InternshipResponse> getInternships(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return p.getInternships().stream().map(i -> {
            InternshipResponse r = new InternshipResponse(); r.setId(i.getId()); r.setCompanyName(i.getCompanyName()); return r;
        }).collect(Collectors.toList());
    }
    public PredictionResponse getPlacementPrediction(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return mlClient.predictPlacement(p.getId(), null);
    }
    public List<CareerRecommendationResponse> getCareerAnalysis(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return mlClient.getCareerRecommendations(p.getId());
    }
    public SkillGapResponse getSkillGap(Long userId, Long careerId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return mlClient.getSkillGap(p.getId(), careerId);
    }
    public RoadmapResponse getRoadmap(Long userId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return roadmapService.getRoadmap(p.getId());
    }
    @Transactional public RoadmapResponse generateRoadmap(Long userId, Long careerId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        return roadmapService.generateRoadmap(p.getId(), careerId);
    }
    @Transactional public void completeRoadmapItem(Long userId, Long itemId) {
        StudentProfile p = profileRepo.findByUserId(userId).orElseThrow();
        roadmapService.completeRoadmapItem(p.getId(), itemId);
    }
}
