package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Entity @Table(name = "student_profiles")
@Getter @Setter @NoArgsConstructor
public class StudentProfile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false) private User user;
    private String firstName; private String lastName; private String phone; private String college;
    private String degree; private String department; private Integer graduationYear;
    @Column(precision = 4, scale = 2) private BigDecimal cgpa;
    private Integer iqScore; private Integer communicationScore; private Integer extracurricularScore;
    private Integer academicPerformance; private Integer projectsCompleted; private Boolean internshipExperience;
    @Column(precision = 5, scale = 2) private BigDecimal previousSemesterResult;
    private String preferredCareer; @Column(columnDefinition = "TEXT") private String bio;
    private String linkedinUrl; private String githubUrl; private String portfolioUrl;
    private String resumePath; private Integer profileCompletion;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
    @UpdateTimestamp private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true) private List<StudentSkill> skills;
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true) private List<StudentProject> projects;
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true) private List<StudentInternship> internships;
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true) private List<Application> applications;
}
