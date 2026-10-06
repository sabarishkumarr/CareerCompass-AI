package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
@Entity @Table(name = "roadmap_items")
@Getter @Setter @NoArgsConstructor
public class RoadmapItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "roadmap_id", nullable = false) private Roadmap roadmap;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "skill_id") private Skill skill;
    private String topic; @Column(columnDefinition = "TEXT") private String description;
    private Integer currentLevel; private Integer targetLevel; private Integer priority;
    @Column(columnDefinition = "TEXT") private String resources;
    @Column(columnDefinition = "TEXT") private String projectSuggestion;
    private Boolean isCompleted = false; private Integer orderIndex;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
