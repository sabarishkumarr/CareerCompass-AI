package com.careercompass.repository;
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
}
