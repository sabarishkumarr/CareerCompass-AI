package com.careercompass.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
@Configuration
public class MLServiceConfig {
    @Value("${app.ml-service.url}") private String mlServiceUrl;
    @Bean public RestTemplate restTemplate() { return new RestTemplate(); }
    @Bean public String mlServiceUrl() { return mlServiceUrl; }
}
