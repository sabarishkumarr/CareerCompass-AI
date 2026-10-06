package com.careercompass.controller;

import com.careercompass.dto.response.ApiResponse;
import com.careercompass.dto.response.NotificationResponse;
import com.careercompass.model.User;
import com.careercompass.repository.UserRepository;
import com.careercompass.service.NotificationService;
import com.careercompass.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notifService;
    private final UserRepository userRepo;

    private Long getUserId() {
        try {
            String email = SecurityUtils.getCurrentUserEmail();
            if (email != null && !email.isEmpty() && !"anonymousUser".equals(email)) {
                return userRepo.findByEmail(email).map(User::getId).orElse(1L);
            }
        } catch (Exception ignored) {}
        return 1L;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> get() {
        return ResponseEntity.ok(ApiResponse.success(notifService.getUserNotifications(getUserId())));
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> count() {
        return ResponseEntity.ok(ApiResponse.success(notifService.getUnreadCount(getUserId())));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> read(@PathVariable Long id) {
        notifService.markAsRead(getUserId(), id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @PutMapping("/read-all")
    public ResponseEntity<ApiResponse<Void>> readAll() {
        notifService.markAllAsRead(getUserId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
