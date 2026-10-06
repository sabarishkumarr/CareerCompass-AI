package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity @Table(name = "student_projects")
@Getter @Setter @NoArgsConstructor
public class StudentProject {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false) private StudentProfile student;
    @Column(nullable = false) private String title;
    @Column(columnDefinition = "TEXT") private String description;
    private String techStack; private String projectUrl; private String githubUrl;
    private LocalDate startDate; private LocalDate endDate;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
