package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;
@Entity @Table(name = "roadmaps")
@Getter @Setter @NoArgsConstructor
public class Roadmap {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false) private StudentProfile student;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "career_id") private Career career;
    private String title; @Column(columnDefinition = "TEXT") private String description;
    @Column(precision = 5, scale = 2) private BigDecimal progress;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "roadmap", cascade = CascadeType.ALL, orphanRemoval = true) @OrderBy("orderIndex ASC") private List<RoadmapItem> items;
}
