package com.careercompass.service;
import com.careercompass.dto.response.NotificationResponse;
import com.careercompass.exception.ResourceNotFoundException;
import com.careercompass.model.Notification;
import com.careercompass.model.User;
import com.careercompass.repository.NotificationRepository;
import com.careercompass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;
@Service @RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepo;
    private final UserRepository userRepo;
    public List<NotificationResponse> getUserNotifications(Long userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId).stream().map(n -> {
            NotificationResponse r = new NotificationResponse();
            r.setId(n.getId()); r.setTitle(n.getTitle()); r.setMessage(n.getMessage());
            r.setType(n.getType()); r.setIsRead(n.getIsRead()); r.setCreatedAt(n.getCreatedAt()); return r;
        }).collect(Collectors.toList());
    }
    @Transactional public void markAsRead(Long userId, Long notifId) {
        Notification n = notificationRepo.findById(notifId).orElseThrow(() -> new ResourceNotFoundException("Not found"));
        if(n.getUser().getId().equals(userId)) { n.setIsRead(true); notificationRepo.save(n); }
    }
    @Transactional public void markAllAsRead(Long userId) {
        List<Notification> notifs = notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
        notifs.forEach(n -> n.setIsRead(true)); notificationRepo.saveAll(notifs);
    }
    public void createNotification(Long userId, String title, String message, String type) {
        User u = userRepo.findById(userId).orElseThrow();
        Notification n = new Notification(); n.setUser(u); n.setTitle(title); n.setMessage(message); n.setType(type);
        notificationRepo.save(n);
    }
    public long getUnreadCount(Long userId) { return notificationRepo.countByUserIdAndIsReadFalse(userId); }
}
