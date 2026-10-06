package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;
@Entity @Table(name = "careers")
@Getter @Setter @NoArgsConstructor
public class Career {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(unique = true, nullable = false) private String name;
    @Column(columnDefinition = "TEXT") private String description;
    private String industry;
    private BigDecimal avgSalaryMin; private BigDecimal avgSalaryMax;
    private BigDecimal growthRate; private String demandLevel;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @OneToMany(mappedBy = "career", cascade = CascadeType.ALL, orphanRemoval = true) private List<CareerSkill> skills;
}
