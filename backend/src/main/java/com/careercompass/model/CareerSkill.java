package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name = "career_skills", uniqueConstraints = {@UniqueConstraint(columnNames = {"career_id", "skill_id"})})
@Getter @Setter @NoArgsConstructor
public class CareerSkill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "career_id", nullable = false) private Career career;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "skill_id", nullable = false) private Skill skill;
    private Integer importanceLevel; private Integer minProficiency;
}
