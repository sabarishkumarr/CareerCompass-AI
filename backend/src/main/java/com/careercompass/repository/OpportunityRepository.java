package com.careercompass.repository;
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
    @Query("SELECT o FROM Opportunity o WHERE o.status = 'ACTIVE' ORDER BY o.createdAt DESC")
    List<Opportunity> findActiveOpportunities(Pageable pageable);
    List<Opportunity> findByCompanyId(Long companyId);
}
