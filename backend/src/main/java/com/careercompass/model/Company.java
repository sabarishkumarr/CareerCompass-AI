package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;
@Entity @Table(name = "companies")
@Getter @Setter @NoArgsConstructor
public class Company {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(nullable = false) private String name;
    private String industry; @Column(columnDefinition = "TEXT") private String description;
    private String website; private String headquarters; private String companySize;
    private Integer foundedYear; private String logoUrl;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true) private List<Opportunity> opportunities;
}
