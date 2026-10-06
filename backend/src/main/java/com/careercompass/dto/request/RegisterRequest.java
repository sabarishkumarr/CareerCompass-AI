package com.careercompass.dto.request;
import com.careercompass.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data public class RegisterRequest {
    @NotBlank @Email private String email;
    @NotBlank private String password;
    @NotNull private Role role;
    private String firstName; private String lastName;
    private String companyName;
}
