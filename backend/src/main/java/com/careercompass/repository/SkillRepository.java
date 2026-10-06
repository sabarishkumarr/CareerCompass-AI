package com.careercompass.repository;
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
}
