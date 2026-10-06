package com.careercompass.util;

import com.careercompass.model.*;
import com.careercompass.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepo;
    private final StudentProfileRepository studentRepo;
    private final CompanyRepository companyRepo;
    private final SkillRepository skillRepo;
    private final StudentSkillRepository studentSkillRepo;
    private final OpportunityRepository oppRepo;
    private final CareerRepository careerRepo;
    private final CareerSkillRepository careerSkillRepo;
    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepo.existsByEmail("student@careercompass.com")) {
            log.info("Demo users already seeded. Verifying skills and careers...");
            seedSkillsAndCareersIfEmpty();
            return;
        }

        log.info("Seeding demo users, skills, careers, and opportunities...");

        // 1. Users
        User s1 = new User();
        s1.setEmail("student@careercompass.com");
        s1.setPasswordHash(encoder.encode("Student@123"));
        s1.setRole(Role.STUDENT);
        userRepo.save(s1);

        User s2 = new User();
        s2.setEmail("student2@careercompass.com");
        s2.setPasswordHash(encoder.encode("Student@123"));
        s2.setRole(Role.STUDENT);
        userRepo.save(s2);

        User s3 = new User();
        s3.setEmail("student3@careercompass.com");
        s3.setPasswordHash(encoder.encode("Student@123"));
        s3.setRole(Role.STUDENT);
        userRepo.save(s3);

        User i1 = new User();
        i1.setEmail("industry@careercompass.com");
        i1.setPasswordHash(encoder.encode("Industry@123"));
        i1.setRole(Role.INDUSTRY);
        userRepo.save(i1);

        User i2 = new User();
        i2.setEmail("industry2@careercompass.com");
        i2.setPasswordHash(encoder.encode("Industry@123"));
        i2.setRole(Role.INDUSTRY);
        userRepo.save(i2);

        User a1 = new User();
        a1.setEmail("admin@careercompass.com");
        a1.setPasswordHash(encoder.encode("Admin@123"));
        a1.setRole(Role.ACADEMIA);
        userRepo.save(a1);

        // 2. Student Profiles
        StudentProfile sp1 = new StudentProfile();
        sp1.setUser(s1);
        sp1.setFirstName("Alex");
        sp1.setLastName("Johnson");
        sp1.setPhone("+1-555-0199");
        sp1.setCollege("Stanford University");
        sp1.setDegree("B.S. Computer Science");
        sp1.setDepartment("Computer Science & Engineering");
        sp1.setGraduationYear(2025);
        sp1.setCgpa(new BigDecimal("8.80"));
        sp1.setIqScore(122);
        sp1.setCommunicationScore(8);
        sp1.setExtracurricularScore(7);
        sp1.setAcademicPerformance(9);
        sp1.setProjectsCompleted(4);
        sp1.setInternshipExperience(true);
        sp1.setPreviousSemesterResult(new BigDecimal("88.50"));
        sp1.setPreferredCareer("Machine Learning Engineer");
        sp1.setBio("Passionate about distributed systems, deep learning, and open source development.");
        sp1.setGithubUrl("https://github.com/alexjohnson");
        sp1.setLinkedinUrl("https://linkedin.com/in/alexjohnson");
        sp1.setProfileCompletion(90);
        studentRepo.save(sp1);

        StudentProfile sp2 = new StudentProfile();
        sp2.setUser(s2);
        sp2.setFirstName("Priya");
        sp2.setLastName("Sharma");
        sp2.setPhone("+1-555-0210");
        sp2.setCollege("UC Berkeley");
        sp2.setDegree("B.S. Data Science");
        sp2.setDepartment("Information Systems");
        sp2.setGraduationYear(2025);
        sp2.setCgpa(new BigDecimal("8.20"));
        sp2.setIqScore(112);
        sp2.setCommunicationScore(9);
        sp2.setExtracurricularScore(8);
        sp2.setAcademicPerformance(8);
        sp2.setProjectsCompleted(3);
        sp2.setInternshipExperience(false);
        sp2.setPreviousSemesterResult(new BigDecimal("82.00"));
        sp2.setPreferredCareer("Data Scientist");
        sp2.setProfileCompletion(80);
        studentRepo.save(sp2);

        // 3. Companies
        Company c1 = new Company();
        c1.setUser(i1);
        c1.setName("Apex Cognitive Labs");
        c1.setIndustry("Artificial Intelligence");
        c1.setDescription("Pioneering enterprise neural search and autonomous decision systems.");
        c1.setHeadquarters("San Francisco, CA");
        c1.setCompanySize("200-500");
        c1.setFoundedYear(2019);
        c1.setWebsite("https://apexcognitive.io");
        companyRepo.save(c1);

        Company c2 = new Company();
        c2.setUser(i2);
        c2.setName("CloudScale Infrastructure");
        c2.setIndustry("Cloud & DevOps");
        c2.setDescription("High-throughput distributed cloud computing and Kubernetes platform.");
        c2.setHeadquarters("Seattle, WA");
        c2.setCompanySize("500-1000");
        c2.setFoundedYear(2016);
        c2.setWebsite("https://cloudscale.tech");
        companyRepo.save(c2);

        // 4. Skills & Careers
        seedSkillsAndCareersIfEmpty();

        // 5. Assign Skills to Student 1
        Map<String, Integer> studentSkills = Map.of(
            "Python", 85,
            "Java", 75,
            "Machine Learning", 80,
            "SQL", 78,
            "React", 70,
            "Docker", 65,
            "Git", 88,
            "PostgreSQL", 75
        );

        studentSkills.forEach((name, prof) -> {
            skillRepo.findByNameIgnoreCase(name).ifPresent(skill -> {
                StudentSkill ss = new StudentSkill();
                ss.setStudent(sp1);
                ss.setSkill(skill);
                ss.setProficiencyLevel(prof);
                ss.setYearsOfExperience(2);
                studentSkillRepo.save(ss);
            });
        });

        // 6. Opportunities
        createOpportunity(c1, "ML Research Intern", OpportunityType.INTERNSHIP, WorkMode.HYBRID,
            "Join our deep learning team researching multi-modal transformer optimizations.",
            new BigDecimal("60000"), new BigDecimal("80000"), "6 Months", new BigDecimal("8.00"), "San Francisco, CA");

        createOpportunity(c1, "AI Systems Engineer", OpportunityType.JOB, WorkMode.REMOTE,
            "Build scalable model inference pipelines serving low-latency LLM workflows.",
            new BigDecimal("120000"), new BigDecimal("160000"), "Full-time", new BigDecimal("7.50"), "Remote");

        createOpportunity(c2, "Cloud Platform Intern", OpportunityType.INTERNSHIP, WorkMode.ON_SITE,
            "Work on Kubernetes controllers, Terraform modules, and automated CI/CD pipelines.",
            new BigDecimal("50000"), new BigDecimal("70000"), "3 Months", new BigDecimal("7.00"), "Seattle, WA");

        createOpportunity(c2, "DevOps Associate", OpportunityType.JOB, WorkMode.HYBRID,
            "Manage production clusters, observability with Prometheus/Grafana, and cloud security.",
            new BigDecimal("100000"), new BigDecimal("135000"), "Full-time", new BigDecimal("7.50"), "Seattle, WA");

        log.info("Data initialization complete! Demo accounts ready.");
    }

    private void createOpportunity(Company comp, String title, OpportunityType type, WorkMode mode,
                                   String desc, BigDecimal minStipend, BigDecimal maxStipend,
                                   String duration, BigDecimal minCgpa, String location) {
        Opportunity o = new Opportunity();
        o.setCompany(comp);
        o.setTitle(title);
        o.setType(type);
        o.setWorkMode(mode);
        o.setDescription(desc);
        o.setStipendMin(minStipend);
        o.setStipendMax(maxStipend);
        o.setDuration(duration);
        o.setMinCgpa(minCgpa);
        o.setLocation(location);
        o.setStatus(OpportunityStatus.ACTIVE);
        o.setApplicationDeadline(LocalDate.now().plusDays(45));
        oppRepo.save(o);
    }

    private void seedSkillsAndCareersIfEmpty() {
        if (skillRepo.count() >= 30 && careerRepo.count() >= 8) {
            return;
        }

        // Master skills catalog
        String[][] skillDefs = {
            {"Python", "Programming"}, {"Java", "Programming"}, {"JavaScript", "Programming"},
            {"TypeScript", "Programming"}, {"C++", "Programming"}, {"Go", "Programming"},
            {"React", "Web"}, {"Node.js", "Web"}, {"Spring Boot", "Web"}, {"FastAPI", "Web"},
            {"HTML5", "Web"}, {"CSS3", "Web"}, {"REST API", "Web"}, {"Microservices", "Web"},
            {"PostgreSQL", "Databases"}, {"MySQL", "Databases"}, {"MongoDB", "Databases"},
            {"Redis", "Databases"}, {"SQL", "Databases"},
            {"Pandas", "Data Science"}, {"NumPy", "Data Science"}, {"Matplotlib", "Data Science"},
            {"Statistics", "Data Science"}, {"Data Analysis", "Data Science"}, {"Data Visualization", "Data Science"},
            {"Machine Learning", "Machine Learning"}, {"Deep Learning", "Machine Learning"},
            {"NLP", "Machine Learning"}, {"Computer Vision", "Machine Learning"}, {"PyTorch", "Machine Learning"},
            {"Scikit-learn", "Machine Learning"}, {"XGBoost", "Machine Learning"},
            {"AWS", "Cloud"}, {"Azure", "Cloud"}, {"Docker", "Cloud"}, {"Kubernetes", "Cloud"}, {"Terraform", "Cloud"},
            {"Git", "DevOps"}, {"CI/CD", "DevOps"}, {"Linux", "DevOps"}, {"Bash", "DevOps"},
            {"Communication", "Soft Skills"}, {"Problem Solving", "Soft Skills"}, {"Team Collaboration", "Soft Skills"},
            {"Agile/Scrum", "Management"}, {"System Design", "Architecture"}
        };

        Map<String, Skill> savedSkills = new HashMap<>();
        for (String[] def : skillDefs) {
            Skill s = skillRepo.findByNameIgnoreCase(def[0]).orElseGet(() -> {
                Skill newS = new Skill();
                newS.setName(def[0]);
                newS.setCategory(def[1]);
                return skillRepo.save(newS);
            });
            savedSkills.put(def[0], s);
        }

        // Master Careers
        Object[][] careerDefs = {
            {"Software Developer", "Design and build production applications across modern languages.", "Technology", 70000, 140000, 15, "Very High", new String[]{"Java", "Python", "Git", "REST API", "Problem Solving"}},
            {"Full Stack Developer", "Build end-to-end web applications with modern frontend and backend architectures.", "Technology", 80000, 160000, 22, "Very High", new String[]{"React", "JavaScript", "Node.js", "PostgreSQL", "REST API", "Git"}},
            {"Machine Learning Engineer", "Design, train, and deploy enterprise machine learning models into production.", "AI", 110000, 210000, 38, "Very High", new String[]{"Python", "Machine Learning", "Deep Learning", "PyTorch", "Docker", "SQL"}},
            {"Data Scientist", "Analyze complex multi-dimensional datasets to extract actionable predictive intelligence.", "Data Science", 95000, 175000, 28, "High", new String[]{"Python", "SQL", "Pandas", "Statistics", "Machine Learning", "Data Visualization"}},
            {"Cloud Engineer", "Architect resilient multi-region cloud infrastructure and automated deployments.", "Cloud", 95000, 170000, 25, "High", new String[]{"AWS", "Docker", "Kubernetes", "Linux", "Terraform", "Git"}},
            {"DevOps Engineer", "Build continuous integration and delivery pipelines, monitoring, and infrastructure reliability.", "DevOps", 100000, 180000, 26, "Very High", new String[]{"Linux", "Docker", "Kubernetes", "CI/CD", "Git", "Bash"}},
            {"Data Analyst", "Clean, transform, and model data into executive dashboards and business metrics.", "Data", 65000, 120000, 18, "High", new String[]{"SQL", "Python", "Data Analysis", "Data Visualization", "Statistics"}},
            {"Backend Developer", "Develop scalable server-side systems, microservices, and database layers.", "Technology", 85000, 165000, 20, "Very High", new String[]{"Java", "Spring Boot", "PostgreSQL", "Microservices", "Docker", "REST API"}}
        };

        for (Object[] cDef : careerDefs) {
            String name = (String) cDef[0];
            String desc = (String) cDef[1];
            String ind = (String) cDef[2];
            int minSal = (int) cDef[3];
            int maxSal = (int) cDef[4];
            int growth = (int) cDef[5];
            String demand = (String) cDef[6];
            String[] reqSkills = (String[]) cDef[7];

            Career c = careerRepo.findAll().stream().filter(car -> car.getName().equalsIgnoreCase(name)).findFirst().orElseGet(() -> {
                Career newC = new Career();
                newC.setName(name);
                newC.setDescription(desc);
                newC.setIndustry(ind);
                newC.setAvgSalaryMin(BigDecimal.valueOf(minSal));
                newC.setAvgSalaryMax(BigDecimal.valueOf(maxSal));
                newC.setGrowthRate(BigDecimal.valueOf(growth));
                newC.setDemandLevel(demand);
                return careerRepo.save(newC);
            });

            // Map skills
            for (String reqSkillName : reqSkills) {
                Skill sk = savedSkills.get(reqSkillName);
                if (sk != null) {
                    boolean exists = careerSkillRepo.findByCareerId(c.getId()).stream()
                        .anyMatch(cs -> cs.getSkill() != null && cs.getSkill().getId().equals(sk.getId()));
                    if (!exists) {
                        CareerSkill cs = new CareerSkill();
                        cs.setCareer(c);
                        cs.setSkill(sk);
                        cs.setMinProficiency(70);
                        cs.setImportanceLevel(9);
                        careerSkillRepo.save(cs);
                    }
                }
            }
        }
        log.info("Skills catalog and Careers successfully seeded!");
    }
}
