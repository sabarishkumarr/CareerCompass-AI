from fastapi import APIRouter, HTTPException
from app.schemas.analysis import (
    StudentProfileInput, CareerRecommendationResponse,
    SkillGapRequest, SkillGapResponse
)
from app.services.career_recommender import recommend_careers
from app.services.skill_gap import calculate_skill_gap

router = APIRouter()

@router.post("/profile")
async def analyze_profile(request: StudentProfileInput):
    try:
        profile_dict = request.model_dump() if hasattr(request, "model_dump") else request.dict()
        result = recommend_careers(request.skills, profile_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/skill-gap")
async def skill_gap_analysis(request: SkillGapRequest):
    try:
        result = calculate_skill_gap(
            student_skills=[{'name': s['name'], 'proficiency': s.get('proficiency', s.get('proficiency_level', 50))} 
                           for s in request.student_skills],
            target_career=request.target_career,
            target_skills=request.target_skills
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
