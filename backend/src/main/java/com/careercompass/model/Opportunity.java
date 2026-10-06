package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;
@Entity @Table(name = "opportunities")
@Getter @Setter @NoArgsConstructor
public class Opportunity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "company_id", nullable = false) private Company company;
    @Column(nullable = false) private String title;
    @Enumerated(EnumType.STRING) private OpportunityType type;
    @Column(columnDefinition = "TEXT") private String description;
    private String location;
    @Enumerated(EnumType.STRING) private WorkMode workMode;
    private BigDecimal stipendMin; private BigDecimal stipendMax; private String duration;
    private LocalDate applicationDeadline;
    @Column(precision = 4, scale = 2) private BigDecimal minCgpa;
    private Integer minExperience; private String educationRequirement;
    @Enumerated(EnumType.STRING) private OpportunityStatus status = OpportunityStatus.ACTIVE;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true) private List<OpportunitySkill> skills;
    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true) private List<Application> applications;
}
