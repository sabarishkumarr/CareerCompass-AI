package com.careercompass.dto.response;
import lombok.Data;
import java.util.List;
@Data public class IndustryDashboardResponse {
    private String companyName;
    private int activeOpportunities; private int activeListings;
    private int totalApplications; private int totalApplicants;
    private int shortlistedCount; private int shortlisted;
    private int interviewCount; private int selectedCount;
    private int topMatchedCandidates;
    private List<OpportunityResponse> topOpportunities;
}
