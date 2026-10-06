package com.careercompass.dto.response;
import com.careercompass.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @AllArgsConstructor @NoArgsConstructor
public class AuthResponse {
    private String token;
    private Long userId;
    private String email;
    private Role role;
    private String firstName;
    private String fullName;
}
