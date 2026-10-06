import os

base_dir = r"c:\sabarish\Projects\Career Compass\backend\src\main\java\com\careercompass\model"
os.makedirs(base_dir, exist_ok=True)

models = {
    "Role.java": '''package com.careercompass.model;
public enum Role { STUDENT, INDUSTRY, ACADEMIA }
''',
    "User.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private StudentProfile studentProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Company company;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Notification> notifications;
}
''',
    "StudentProfile.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "student_profiles")
@Getter @Setter @NoArgsConstructor
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String firstName;
    private String lastName;
    private String phone;
    private String college;
    private String degree;
    private String department;
    private Integer graduationYear;
    
    @Column(precision = 4, scale = 2)
    private BigDecimal cgpa;
    
    private Integer iqScore;
    private Integer communicationScore;
    private Integer extracurricularScore;
    private Integer academicPerformance;
    private Integer projectsCompleted;
    private Boolean internshipExperience;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal previousSemesterResult;
    
    private String preferredCareer;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;
    private String resumePath;
    private Integer profileCompletion;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentSkill> skills;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentProject> projects;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentInternship> internships;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications;
}
''',
    "Skill.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "skills")
@Getter @Setter @NoArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "StudentSkill.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_skills", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "skill_id"})
})
@Getter @Setter @NoArgsConstructor
public class StudentSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer proficiencyLevel; // 1-100
    private Integer yearsOfExperience;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "Company.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "companies")
@Getter @Setter @NoArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    private String industry;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String website;
    private String headquarters;
    private String companySize;
    private Integer foundedYear;
    private String logoUrl;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Opportunity> opportunities;
}
''',
    "OpportunityType.java": '''package com.careercompass.model;
public enum OpportunityType { INTERNSHIP, JOB, PROJECT, HACKATHON }
''',
    "WorkMode.java": '''package com.careercompass.model;
public enum WorkMode { REMOTE, HYBRID, ON_SITE }
''',
    "OpportunityStatus.java": '''package com.careercompass.model;
public enum OpportunityStatus { ACTIVE, CLOSED, DRAFT }
''',
    "Opportunity.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Entity
@Table(name = "opportunities")
@Getter @Setter @NoArgsConstructor
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    private OpportunityType type;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @Enumerated(EnumType.STRING)
    private WorkMode workMode;

    private BigDecimal stipendMin;
    private BigDecimal stipendMax;
    private String duration;
    
    private LocalDate applicationDeadline;
    
    @Column(precision = 4, scale = 2)
    private BigDecimal minCgpa;
    
    private Integer minExperience;
    private String educationRequirement;

    @Enumerated(EnumType.STRING)
    private OpportunityStatus status = OpportunityStatus.ACTIVE;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OpportunitySkill> skills;

    @OneToMany(mappedBy = "opportunity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Application> applications;
}
''',
    "OpportunitySkill.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "opportunity_skills", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"opportunity_id", "skill_id"})
})
@Getter @Setter @NoArgsConstructor
public class OpportunitySkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opportunity_id", nullable = false)
    private Opportunity opportunity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Boolean isRequired = true;
    private Integer minProficiency;
}
''',
    "ApplicationStatus.java": '''package com.careercompass.model;
public enum ApplicationStatus { APPLIED, UNDER_REVIEW, SHORTLISTED, INTERVIEW, SELECTED, REJECTED, WITHDRAWN }
''',
    "Application.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "applications", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "opportunity_id"})
})
@Getter @Setter @NoArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opportunity_id", nullable = false)
    private Opportunity opportunity;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    @Column(precision = 5, scale = 2)
    private BigDecimal matchScore;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime appliedAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
''',
    "StudentProject.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_projects")
@Getter @Setter @NoArgsConstructor
public class StudentProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String techStack;
    private String projectUrl;
    private String githubUrl;
    
    private LocalDate startDate;
    private LocalDate endDate;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "StudentInternship.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "student_internships")
@Getter @Setter @NoArgsConstructor
public class StudentInternship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(nullable = false)
    private String companyName;
    
    private String role;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private LocalDate startDate;
    private LocalDate endDate;
    
    private BigDecimal stipend;
    private Boolean isCurrent;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "Career.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "careers")
@Getter @Setter @NoArgsConstructor
public class Career {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String industry;
    
    private BigDecimal avgSalaryMin;
    private BigDecimal avgSalaryMax;
    private BigDecimal growthRate;
    private String demandLevel;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "career", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CareerSkill> skills;
}
''',
    "CareerSkill.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "career_skills", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"career_id", "skill_id"})
})
@Getter @Setter @NoArgsConstructor
public class CareerSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id", nullable = false)
    private Career career;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private Integer importanceLevel; // 1-10
    private Integer minProficiency; // 1-100
}
''',
    "Roadmap.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "roadmaps")
@Getter @Setter @NoArgsConstructor
public class Roadmap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "career_id")
    private Career career;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal progress;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "roadmap", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<RoadmapItem> items;
}
''',
    "RoadmapItem.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "roadmap_items")
@Getter @Setter @NoArgsConstructor
public class RoadmapItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roadmap_id", nullable = false)
    private Roadmap roadmap;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;

    private String topic;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Integer currentLevel;
    private Integer targetLevel;
    private Integer priority;
    
    @Column(columnDefinition = "TEXT")
    private String resources;
    
    @Column(columnDefinition = "TEXT")
    private String projectSuggestion;
    
    private Boolean isCompleted = false;
    private Integer orderIndex;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "Prediction.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "predictions")
@Getter @Setter @NoArgsConstructor
public class Prediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(precision = 5, scale = 2)
    private BigDecimal placementProbability;
    
    private Boolean isPlaced;
    private String modelUsed;
    
    @Column(columnDefinition = "TEXT")
    private String featuresJson;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal confidenceLevel;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "Notification.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter @Setter @NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private String type;
    private Long referenceId;
    private String referenceType;
    
    private Boolean isRead = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
''',
    "Evaluation.java": '''package com.careercompass.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "evaluations")
@Getter @Setter @NoArgsConstructor
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluator_id", nullable = false)
    private User evaluator;

    private Integer technicalRating;
    private Integer communicationRating;
    private Integer overallRating;
    
    @Column(columnDefinition = "TEXT")
    private String comments;
    
    private String recommendation;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
'''
}

for name, content in models.items():
    with open(os.path.join(base_dir, name), 'w', encoding='utf-8') as f:
        f.write(content)
print("Models generated.")
