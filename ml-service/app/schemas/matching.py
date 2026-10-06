from pydantic import BaseModel
from typing import List, Dict, Optional

class OpportunityMatchRequest(BaseModel):
    student_skills: List[Dict]  # [{name, proficiency}, ...]
    required_skills: List[Dict]  # [{name, min_proficiency, is_required}, ...]
    student_cgpa: Optional[float] = None
    min_cgpa_required: Optional[float] = None

class MatchedSkillDetail(BaseModel):
    skill_name: str
    student_proficiency: float
    required_proficiency: float
    match_strength: str

class OpportunityMatchResponse(BaseModel):
    overall_match_score: float
    match_percentage: str
    matched_skills: List[MatchedSkillDetail]
    missing_required_skills: List[str]
    missing_preferred_skills: List[str]
    cgpa_eligible: Optional[bool] = None
    strengths: List[str]
    weaknesses: List[str]
    recommendation: str
