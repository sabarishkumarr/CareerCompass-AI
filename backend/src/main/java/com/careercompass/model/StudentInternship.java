package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;
@Entity @Table(name = "student_internships")
@Getter @Setter @NoArgsConstructor
public class StudentInternship {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false) private StudentProfile student;
    @Column(nullable = false) private String companyName;
    private String role; @Column(columnDefinition = "TEXT") private String description;
    private LocalDate startDate; private LocalDate endDate;
    private BigDecimal stipend; private Boolean isCurrent;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
