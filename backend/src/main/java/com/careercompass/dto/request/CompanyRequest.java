package com.careercompass.dto.request;
import lombok.Data;
@Data public class CompanyRequest {
    private String name; private String industry; private String description;
    private String website; private String headquarters; private String companySize; private Integer foundedYear;
}
