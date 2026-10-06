package com.careercompass.repository;
import com.careercompass.model.RoadmapItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RoadmapItemRepository extends JpaRepository<RoadmapItem, Long> {
}
