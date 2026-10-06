package com.careercompass.service;
import com.careercompass.dto.request.LoginRequest;
import com.careercompass.dto.request.RegisterRequest;
import com.careercompass.dto.response.AuthResponse;
import com.careercompass.exception.DuplicateResourceException;
import com.careercompass.exception.UnauthorizedException;
import com.careercompass.model.Company;
import com.careercompass.model.Role;
import com.careercompass.model.StudentProfile;
import com.careercompass.model.User;
import com.careercompass.repository.CompanyRepository;
import com.careercompass.repository.StudentProfileRepository;
import com.careercompass.repository.UserRepository;
import com.careercompass.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service @RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) throw new DuplicateResourceException("Email already exists");
        User user = new User(); user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword())); user.setRole(request.getRole());
        user = userRepository.save(user);
        String name = request.getFirstName() != null ? request.getFirstName() : "User";
        if (request.getRole() == Role.STUDENT) {
            StudentProfile profile = new StudentProfile(); profile.setUser(user);
            profile.setFirstName(request.getFirstName()); profile.setLastName(request.getLastName());
            profile.setProfileCompletion(10); studentProfileRepository.save(profile);
            name = request.getFirstName();
        } else if (request.getRole() == Role.INDUSTRY) {
            Company company = new Company(); company.setUser(user); company.setName(request.getCompanyName());
            companyRepository.save(company); name = request.getCompanyName();
        }
        var userDetails = org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail()).password(user.getPasswordHash()).authorities("ROLE_" + user.getRole().name()).build();
        return new AuthResponse(jwtService.generateToken(userDetails), user.getId(), user.getEmail(), user.getRole(), name, name);
    }
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
            var userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail()).password(user.getPasswordHash()).authorities("ROLE_" + user.getRole().name()).build();
            String name = "Admin";
            if (user.getRole() == Role.STUDENT) {
                name = studentProfileRepository.findByUserId(user.getId()).map(StudentProfile::getFirstName).orElse("Student");
            } else if (user.getRole() == Role.INDUSTRY) {
                name = companyRepository.findByUserId(user.getId()).map(Company::getName).orElse("Company");
            }
            return new AuthResponse(jwtService.generateToken(userDetails), user.getId(), user.getEmail(), user.getRole(), name, name);
        } catch (AuthenticationException e) { throw new UnauthorizedException("Invalid email or password"); }
    }
}
