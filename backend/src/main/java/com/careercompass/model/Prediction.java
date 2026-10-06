package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
@Entity @Table(name = "predictions")
@Getter @Setter @NoArgsConstructor
public class Prediction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false) private StudentProfile student;
    @Column(precision = 5, scale = 2) private BigDecimal placementProbability;
    private Boolean isPlaced; private String modelUsed;
    @Column(columnDefinition = "TEXT") private String featuresJson;
    @Column(precision = 5, scale = 2) private BigDecimal confidenceLevel;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
