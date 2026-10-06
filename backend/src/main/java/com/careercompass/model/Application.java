package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
@Entity @Table(name = "applications", uniqueConstraints = {@UniqueConstraint(columnNames = {"student_id", "opportunity_id"})})
@Getter @Setter @NoArgsConstructor
public class Application {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false) private StudentProfile student;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "opportunity_id", nullable = false) private Opportunity opportunity;
    @Enumerated(EnumType.STRING) private ApplicationStatus status = ApplicationStatus.APPLIED;
    @Column(columnDefinition = "TEXT") private String coverLetter;
    @Column(precision = 5, scale = 2) private BigDecimal matchScore;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime appliedAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
}
