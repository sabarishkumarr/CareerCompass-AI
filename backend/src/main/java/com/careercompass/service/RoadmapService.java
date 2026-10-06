package com.careercompass.service;

import com.careercompass.dto.response.CareerResponse;
import com.careercompass.dto.response.RoadmapItemResponse;
import com.careercompass.dto.response.RoadmapResponse;
import com.careercompass.model.Career;
import com.careercompass.model.Roadmap;
import com.careercompass.model.RoadmapItem;
import com.careercompass.model.StudentProfile;
import com.careercompass.repository.CareerRepository;
import com.careercompass.repository.RoadmapItemRepository;
import com.careercompass.repository.RoadmapRepository;
import com.careercompass.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoadmapService {
    private final RoadmapRepository roadmapRepo;
    private final RoadmapItemRepository itemRepo;
    private final StudentProfileRepository studentRepo;
    private final CareerRepository careerRepo;

    public RoadmapResponse getRoadmap(Long studentId) {
        return roadmapRepo.findByStudentId(studentId)
                .map(this::mapToResponse)
                .orElseGet(() -> generateRoadmap(studentId, 1L));
    }

    @Transactional
    public RoadmapResponse generateRoadmap(Long studentId, Long careerId) {
        StudentProfile student = studentRepo.findById(studentId).orElse(null);
        if (student == null) {
            student = studentRepo.findAll().stream().findFirst().orElseThrow();
        }
        final StudentProfile targetStudent = student;

        Career career = careerRepo.findById(careerId).orElseGet(() -> {
            return careerRepo.findAll().stream().findFirst().orElse(null);
        });

        String careerName = career != null ? career.getName() : "Software Engineer";

        Roadmap rm = roadmapRepo.findByStudentId(targetStudent.getId()).orElseGet(() -> {
            Roadmap newRm = new Roadmap();
            newRm.setStudent(targetStudent);
            return newRm;
        });

        rm.setCareer(career);
        rm.setTitle("Career Acceleration Roadmap: " + careerName);
        rm.setDescription("AI-curated learning milestones designed to systematically close verified competency gaps for " + careerName + ".");
        rm.setProgress(BigDecimal.valueOf(20.0));

        if (rm.getItems() != null) {
            rm.getItems().clear();
        } else {
            rm.setItems(new ArrayList<>());
        }

        Roadmap saved = roadmapRepo.save(rm);

        List<RoadmapItem> items = createMilestones(saved, careerName);
        saved.getItems().addAll(items);
        roadmapRepo.save(saved);

        return mapToResponse(saved);
    }

    @Transactional
    public void completeRoadmapItem(Long studentId, Long itemId) {
        RoadmapItem item = itemRepo.findById(itemId).orElseThrow();
        item.setIsCompleted(!Boolean.TRUE.equals(item.getIsCompleted()));
        itemRepo.save(item);

        Roadmap rm = item.getRoadmap();
        if (rm != null && rm.getItems() != null && !rm.getItems().isEmpty()) {
            long completed = rm.getItems().stream().filter(i -> Boolean.TRUE.equals(i.getIsCompleted())).count();
            double pct = Math.round(((double) completed / rm.getItems().size()) * 100.0);
            rm.setProgress(BigDecimal.valueOf(pct));
            roadmapRepo.save(rm);
        }
    }

    private List<RoadmapItem> createMilestones(Roadmap rm, String careerName) {
        List<RoadmapItem> list = new ArrayList<>();

        RoadmapItem m1 = new RoadmapItem();
        m1.setRoadmap(rm);
        m1.setOrderIndex(1);
        m1.setTopic("Core Languages & Software Architecture Foundations");
        m1.setDescription("Deepen mastery of foundational paradigms, object-oriented design patterns, and idiomatic idioms in primary languages.");
        m1.setCurrentLevel(75);
        m1.setTargetLevel(90);
        m1.setPriority(9);
        m1.setIsCompleted(true);
        list.add(m1);

        RoadmapItem m2 = new RoadmapItem();
        m2.setRoadmap(rm);
        m2.setOrderIndex(2);
        m2.setTopic("Data Structures, Complexity & Algorithmic Problem Solving");
        m2.setDescription("Hands-on problem solving on trees, graphs, dynamic programming, and space/time complexity optimizations.");
        m2.setCurrentLevel(60);
        m2.setTargetLevel(85);
        m2.setPriority(8);
        m2.setIsCompleted(false);
        list.add(m2);

        RoadmapItem m3 = new RoadmapItem();
        m3.setRoadmap(rm);
        m3.setOrderIndex(3);
        m3.setTopic(careerName + " Core Frameworks & Tooling Ecosystem");
        m3.setDescription("Hands-on implementation with production frameworks, libraries, unit testing suites, and data pipelines.");
        m3.setCurrentLevel(45);
        m3.setTargetLevel(85);
        m3.setPriority(10);
        m3.setIsCompleted(false);
        list.add(m3);

        RoadmapItem m4 = new RoadmapItem();
        m4.setRoadmap(rm);
        m4.setOrderIndex(4);
        m4.setTopic("Cloud Infrastructure, Docker & Automated CI/CD");
        m4.setDescription("Containerize microservices, configure multi-stage Docker builds, and automate deployment pipelines via GitHub Actions.");
        m4.setCurrentLevel(35);
        m4.setTargetLevel(80);
        m4.setPriority(7);
        m4.setIsCompleted(false);
        list.add(m4);

        RoadmapItem m5 = new RoadmapItem();
        m5.setRoadmap(rm);
        m5.setOrderIndex(5);
        m5.setTopic("End-to-End Industry Capstone Deployment");
        m5.setDescription("Architect and ship a full-stack, production-grade application featuring real-time telemetry, authentication, and live API endpoints.");
        m5.setCurrentLevel(20);
        m5.setTargetLevel(90);
        m5.setPriority(9);
        m5.setIsCompleted(false);
        list.add(m5);

        return itemRepo.saveAll(list);
    }

    private RoadmapResponse mapToResponse(Roadmap rm) {
        RoadmapResponse resp = new RoadmapResponse();
        resp.setId(rm.getId());
        resp.setTitle(rm.getTitle());
        resp.setDescription(rm.getDescription());
        resp.setProgress(rm.getProgress());
        resp.setProgressPercentage(rm.getProgress() != null ? rm.getProgress().intValue() : 20);

        String carName = rm.getCareer() != null ? rm.getCareer().getName() : "Software Engineer";
        resp.setCareerName(carName);

        if (rm.getCareer() != null) {
            CareerResponse cr = new CareerResponse();
            cr.setId(rm.getCareer().getId());
            cr.setName(rm.getCareer().getName());
            cr.setDescription(rm.getCareer().getDescription());
            cr.setIndustry(rm.getCareer().getIndustry());
            resp.setCareer(cr);
        }

        if (rm.getItems() != null) {
            List<RoadmapItemResponse> itemResponses = rm.getItems().stream().map(i -> {
                RoadmapItemResponse ir = new RoadmapItemResponse();
                ir.setId(i.getId());
                ir.setTopic(i.getTopic());
                ir.setTitle(i.getTopic());
                ir.setDescription(i.getDescription());
                ir.setCurrentLevel(i.getCurrentLevel());
                ir.setTargetLevel(i.getTargetLevel());
                ir.setPriority(i.getPriority());
                ir.setIsCompleted(i.getIsCompleted());
                ir.setCompleted(Boolean.TRUE.equals(i.getIsCompleted()));
                ir.setOrderIndex(i.getOrderIndex());
                ir.setStepOrder(i.getOrderIndex());
                ir.setEstimatedHours(25 + (i.getOrderIndex() != null ? i.getOrderIndex() * 5 : 10));
                return ir;
            }).collect(Collectors.toList());
            resp.setItems(itemResponses);
        } else {
            resp.setItems(List.of());
        }

        return resp;
    }
}
