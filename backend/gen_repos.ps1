$base_dir = "c:\sabarish\Projects\Career Compass\backend\src\main\java\com\careercompass"

function Write-JavaFile ($path, $content) {
    Set-Content -Path "$base_dir\$path" -Value $content -Encoding utf8
}

Write-JavaFile "repository\UserRepository.java" "package com.careercompass.repository;
import com.careercompass.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}"

Write-JavaFile "repository\StudentProfileRepository.java" "package com.careercompass.repository;
import com.careercompass.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUserId(Long userId);
    List<StudentProfile> findByCollegeContainingIgnoreCase(String college);
}"

Write-JavaFile "repository\OpportunityRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Opportunity;
import com.careercompass.model.OpportunityStatus;
import com.careercompass.model.OpportunityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    Page<Opportunity> findByStatusAndType(OpportunityStatus status, OpportunityType type, Pageable pageable);
    Page<Opportunity> findByStatus(OpportunityStatus status, Pageable pageable);
    List<Opportunity> findByCompanyIdAndStatus(Long companyId, OpportunityStatus status);
    @Query(`"SELECT o FROM Opportunity o WHERE o.status = 'ACTIVE' ORDER BY o.createdAt DESC`")
    List<Opportunity> findActiveOpportunities(Pageable pageable);
    List<Opportunity> findByCompanyId(Long companyId);
}"

Write-JavaFile "repository\ApplicationRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByOpportunityId(Long opportunityId);
    Optional<Application> findByStudentIdAndOpportunityId(Long studentId, Long opportunityId);
    long countByOpportunityId(Long opportunityId);
}"

Write-JavaFile "repository\SkillRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByCategory(String category);
    Optional<Skill> findByNameIgnoreCase(String name);
    List<Skill> findByNameContainingIgnoreCase(String query);
}"

Write-JavaFile "repository\StudentSkillRepository.java" "package com.careercompass.repository;
import com.careercompass.model.StudentSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface StudentSkillRepository extends JpaRepository<StudentSkill, Long> {
    List<StudentSkill> findByStudentId(Long studentId);
    void deleteByStudentIdAndSkillId(Long studentId, Long skillId);
}"

Write-JavaFile "repository\NotificationRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
    long countByUserIdAndIsReadFalse(Long userId);
}"

Write-JavaFile "repository\PredictionRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    Optional<Prediction> findFirstByStudentIdOrderByCreatedAtDesc(Long studentId);
}"

Write-JavaFile "repository\CareerRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {
    List<Career> findAll();
}"

Write-JavaFile "repository\CareerSkillRepository.java" "package com.careercompass.repository;
import com.careercompass.model.CareerSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface CareerSkillRepository extends JpaRepository<CareerSkill, Long> {
    List<CareerSkill> findByCareerId(Long careerId);
}"

Write-JavaFile "repository\RoadmapRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface RoadmapRepository extends JpaRepository<Roadmap, Long> {
    Optional<Roadmap> findByStudentId(Long studentId);
}"

Write-JavaFile "repository\RoadmapItemRepository.java" "package com.careercompass.repository;
import com.careercompass.model.RoadmapItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RoadmapItemRepository extends JpaRepository<RoadmapItem, Long> {
}"

Write-JavaFile "repository\CompanyRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByUserId(Long userId);
}"

Write-JavaFile "repository\StudentProjectRepository.java" "package com.careercompass.repository;
import com.careercompass.model.StudentProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface StudentProjectRepository extends JpaRepository<StudentProject, Long> {
    List<StudentProject> findByStudentId(Long studentId);
}"

Write-JavaFile "repository\StudentInternshipRepository.java" "package com.careercompass.repository;
import com.careercompass.model.StudentInternship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface StudentInternshipRepository extends JpaRepository<StudentInternship, Long> {
    List<StudentInternship> findByStudentId(Long studentId);
}"

Write-JavaFile "repository\EvaluationRepository.java" "package com.careercompass.repository;
import com.careercompass.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
}"

