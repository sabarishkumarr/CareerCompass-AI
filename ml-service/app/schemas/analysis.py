from pydantic import BaseModel
from typing import List, Optional, Dict

class StudentProfileInput(BaseModel):
    student_id: Optional[int] = None
    skills: List[Dict[str, float]]  # [{name: "Python", proficiency: 80}, ...]
    cgpa: float
    projects_completed: int
    internship_experience: bool
    preferred_career: Optional[str] = None
    communication_skills: Optional[int] = None
    iq_score: Optional[int] = None

class CareerMatch(BaseModel):
    career_name: str
    match_score: float
    matching_skills: List[str]
    missing_skills: List[str]
    reasons: List[str]
    recommended_skills: List[str]
    suggested_projects: List[str]
    learning_path: List[str]

class CareerRecommendationResponse(BaseModel):
    recommendations: List[CareerMatch]
    primary_recommendation: str
    explanation: str

class SkillGapRequest(BaseModel):
    student_skills: List[Dict]  # [{name, proficiency}, ...]
    target_career: str
    target_skills: Optional[List[Dict]] = None  # [{name, required_proficiency}, ...]

class SkillGapItem(BaseModel):
    skill_name: str
    student_proficiency: float
    required_proficiency: float
    gap: float
    status: str  # "Strong", "Moderate Gap", "High Gap", "Missing"
    priority: str  # "Low", "Medium", "High", "Critical"
    recommendation: str

class SkillGapResponse(BaseModel):
    target_career: str
    overall_readiness: float  # 0-100
    readiness_level: str  # "Ready", "Near Ready", "Developing", "Beginner"
    matched_skills: List[SkillGapItem]
    missing_skills: List[SkillGapItem]
    strong_skills: List[str]
    priority_gaps: List[str]
    recommendations: List[str]
