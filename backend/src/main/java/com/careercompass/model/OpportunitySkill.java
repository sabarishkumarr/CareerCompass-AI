package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
@Entity @Table(name = "opportunity_skills", uniqueConstraints = {@UniqueConstraint(columnNames = {"opportunity_id", "skill_id"})})
@Getter @Setter @NoArgsConstructor
public class OpportunitySkill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "opportunity_id", nullable = false) private Opportunity opportunity;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "skill_id", nullable = false) private Skill skill;
    private Boolean isRequired = true; private Integer minProficiency;
}
