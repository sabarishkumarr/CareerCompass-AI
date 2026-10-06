package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
@Entity @Table(name = "student_skills", uniqueConstraints = {@UniqueConstraint(columnNames = {"student_id", "skill_id"})})
@Getter @Setter @NoArgsConstructor
public class StudentSkill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_id", nullable = false) private StudentProfile student;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "skill_id", nullable = false) private Skill skill;
    private Integer proficiencyLevel; private Integer yearsOfExperience;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
