package com.careercompass.model;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
@Entity @Table(name = "notifications")
@Getter @Setter @NoArgsConstructor
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false) private User user;
    private String title; @Column(columnDefinition = "TEXT") private String message;
    private String type; private Long referenceId; private String referenceType;
    private Boolean isRead = false;
    @CreationTimestamp @Column(updatable = false) private LocalDateTime createdAt;
}
