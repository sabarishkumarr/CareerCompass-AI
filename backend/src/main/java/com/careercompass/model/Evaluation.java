package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
@Entity @Table(name = "evaluations")
@Getter @Setter @NoArgsConstructor
public class Evaluation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "application_id", nullable = false) private Application application;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "evaluator_id", nullable = false) private User evaluator;
    private Integer technicalRating; private Integer communicationRating; private Integer overallRating;
    @Column(columnDefinition = "TEXT") private String comments;
    private String recommendation;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
