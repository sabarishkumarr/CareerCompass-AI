$base_dir = "c:\sabarish\Projects\Career Compass\backend\src\main\java\com\careercompass"
$res_dir = "c:\sabarish\Projects\Career Compass\backend\src\main\resources"

function Write-JavaFile ($path, $content) {
    Set-Content -Path "$base_dir\$path" -Value $content -Encoding utf8
}
function Write-ResFile ($path, $content) {
    Set-Content -Path "$res_dir\$path" -Value $content -Encoding utf8
}

Write-ResFile "application.yml" "spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/careercompass
    username: `${DB_USERNAME:postgres}
    password: `${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

server:
  port: 8080
  error:
    include-message: always
    include-binding-errors: always

app:
  jwt:
    secret: `${JWT_SECRET:careercompass_super_secret_jwt_key_at_least_256_bits_long_for_hs512}
    expiration: `${JWT_EXPIRATION:86400000}
  ml-service:
    url: `${ML_SERVICE_URL:http://localhost:8000}
  cors:
    allowed-origins: `${FRONTEND_URL:http://localhost:5173,http://localhost:3000}

springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    path: /swagger-ui.html

logging:
  level:
    com.careercompass: INFO
    org.springframework.security: WARN"

Write-JavaFile "CareerCompassApplication.java" "package com.careercompass;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CareerCompassApplication {
    public static void main(String[] args) {
        SpringApplication.run(CareerCompassApplication.class, args);
    }
}"

Write-JavaFile "util\SecurityUtils.java" "package com.careercompass.util;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static String getCurrentUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }
}"

Write-JavaFile "config\CorsConfig.java" "package com.careercompass.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(`"/**`").allowedOrigins(`"http://localhost:5173`", `"http://localhost:3000`").allowedMethods(`"GET`", `"POST`", `"PUT`", `"DELETE`", `"PATCH`", `"OPTIONS`").allowedHeaders(`"*`").allowCredentials(true);
    }
}"

Write-JavaFile "config\OpenApiConfig.java" "package com.careercompass.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;
@Configuration
@OpenAPIDefinition(info = @Info(title = `"CareerCompass API`", version = `"v1`"), security = @SecurityRequirement(name = `"bearerAuth`"))
@SecurityScheme(name = `"bearerAuth`", description = `"JWT auth description`", scheme = `"bearer`", type = SecuritySchemeType.HTTP, bearerFormat = `"JWT`", in = SecuritySchemeIn.HEADER)
public class OpenApiConfig {
}"

Write-JavaFile "config\MLServiceConfig.java" "package com.careercompass.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
@Configuration
public class MLServiceConfig {
    @Value(`"`${app.ml-service.url}`") private String mlServiceUrl;
    @Bean public RestTemplate restTemplate() { return new RestTemplate(); }
    @Bean public String mlServiceUrl() { return mlServiceUrl; }
}"

Write-JavaFile "security\JwtAuthFilter.java" "package com.careercompass.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        final String authHeader = request.getHeader(`"Authorization`");
        if (authHeader == null || !authHeader.startsWith(`"Bearer `")) {
            chain.doFilter(request, response); return;
        }
        final String jwt = authHeader.substring(7);
        try {
            final String email = jwtService.extractUsername(jwt);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) { logger.warn(`"JWT validation failed: `" + e.getMessage()); }
        chain.doFilter(request, response);
    }
}"

Write-JavaFile "security\CustomUserDetailsService.java" "package com.careercompass.security;
import com.careercompass.model.User;
import com.careercompass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(`"User not found: `" + email));
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .authorities(List.of(new SimpleGrantedAuthority(`"ROLE_`" + user.getRole().name())))
            .accountLocked(Boolean.FALSE.equals(user.getIsActive()))
            .build();
    }
}"

Write-JavaFile "security\JwtService.java" "package com.careercompass.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
@Service
public class JwtService {
    @Value(`"`${app.jwt.secret}`") private String jwtSecret;
    @Value(`"`${app.jwt.expiration}`") private long jwtExpiration;
    private SecretKey getSigningKey() { return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8)); }
    public String generateToken(UserDetails userDetails) { return generateToken(Map.of(), userDetails); }
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder().claims(extraClaims).subject(userDetails.getUsername()).issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + jwtExpiration)).signWith(getSigningKey()).compact();
    }
    public String extractUsername(String token) { return extractClaim(token, Claims::getSubject); }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) { return claimsResolver.apply(extractAllClaims(token)); }
    private Claims extractAllClaims(String token) { return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload(); }
    public boolean isTokenValid(String token, UserDetails userDetails) { return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token); }
    private boolean isTokenExpired(String token) { return extractExpiration(token).before(new Date()); }
    private Date extractExpiration(String token) { return extractClaim(token, Claims::getExpiration); }
}"

Write-JavaFile "config\SecurityConfig.java" "package com.careercompass.config;
import com.careercompass.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable).cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth.requestMatchers(`"/api/auth/**`").permitAll()
                .requestMatchers(`"/swagger-ui/**`", `"/v3/api-docs/**`", `"/swagger-ui.html`").permitAll()
                .requestMatchers(`"/api/health`").permitAll()
                .requestMatchers(`"/api/academia/**`").hasAuthority(`"ROLE_ACADEMIA`")
                .requestMatchers(HttpMethod.POST, `"/api/opportunities/**`").hasAuthority(`"ROLE_INDUSTRY`")
                .requestMatchers(HttpMethod.PUT, `"/api/opportunities/**`").hasAuthority(`"ROLE_INDUSTRY`")
                .requestMatchers(HttpMethod.DELETE, `"/api/opportunities/**`").hasAuthority(`"ROLE_INDUSTRY`")
                .requestMatchers(`"/api/industry/**`").hasAuthority(`"ROLE_INDUSTRY`")
                .requestMatchers(`"/api/students/**`").hasAuthority(`"ROLE_STUDENT`")
                .anyRequest().authenticated()
            ).authenticationProvider(authenticationProvider()).addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class).build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of(`"http://localhost:*`", `"http://127.0.0.1:*`"));
        config.setAllowedMethods(List.of(`"GET`", `"POST`", `"PUT`", `"DELETE`", `"PATCH`", `"OPTIONS`"));
        config.setAllowedHeaders(List.of(`"*`")); config.setAllowCredentials(true); config.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(`"/**`", config); return source;
    }
    @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
    @Bean public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService); provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { return config.getAuthenticationManager(); }
}"

Write-JavaFile "exception\ResourceNotFoundException.java" "package com.careercompass.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException { public ResourceNotFoundException(String message) { super(message); } }"

Write-JavaFile "exception\UnauthorizedException.java" "package com.careercompass.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException { public UnauthorizedException(String message) { super(message); } }"

Write-JavaFile "exception\BadRequestException.java" "package com.careercompass.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException { public BadRequestException(String message) { super(message); } }"

Write-JavaFile "exception\DuplicateResourceException.java" "package com.careercompass.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateResourceException extends RuntimeException { public DuplicateResourceException(String message) { super(message); } }"

Write-JavaFile "exception\GlobalExceptionHandler.java" "package com.careercompass.exception;
import com.careercompass.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.List;
import java.util.stream.Collectors;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) { return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error(ex.getMessage())); }
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnauthorized(UnauthorizedException ex) { return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error(ex.getMessage())); }
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadRequest(BadRequestException ex) { return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(ex.getMessage())); }
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicate(DuplicateResourceException ex) { return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.error(ex.getMessage())); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<List<String>>> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(error -> error.getField() + `": `" + error.getDefaultMessage()).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(false, `"Validation Error`", errors));
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleAccessDenied(AccessDeniedException ex) { return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error(`"Access Denied`")); }
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Void>> handleAuth(AuthenticationException ex) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(`"Authentication Failed`")); }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneral(Exception ex) { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(`"Internal Server Error: `" + ex.getMessage())); }
}"

Write-JavaFile "dto\response\ApiResponse.java" "package com.careercompass.dto.response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @AllArgsConstructor @NoArgsConstructor
public class ApiResponse<T> {
    private boolean success; private String message; private T data;
    public static <T> ApiResponse<T> success(T data) { return new ApiResponse<>(true, `"Success`", data); }
    public static <T> ApiResponse<T> success(String message, T data) { return new ApiResponse<>(true, message, data); }
    public static <T> ApiResponse<T> error(String message) { return new ApiResponse<>(false, message, null); }
}"

