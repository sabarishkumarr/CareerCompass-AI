from fastapi import APIRouter, HTTPException
from app.schemas.matching import OpportunityMatchRequest, OpportunityMatchResponse

router = APIRouter()

@router.post("/opportunity")
async def match_opportunity(request: OpportunityMatchRequest):
    try:
        student_skills = {s['name'].lower(): s.get('proficiency', 50) 
                         for s in request.student_skills}
        
        matched = []
        missing_required = []
        missing_preferred = []
        total_required = 0
        total_earned = 0
        
        for req_skill in request.required_skills:
            skill_name = req_skill['name']
            min_prof = req_skill.get('min_proficiency', 60)
            is_required = req_skill.get('is_required', True)
            
            student_prof = student_skills.get(skill_name.lower(), 0)
            
            if is_required:
                total_required += min_prof
                if student_prof >= min_prof:
                    total_earned += min_prof
                    matched.append({
                        'skill_name': skill_name,
                        'student_proficiency': student_prof,
                        'required_proficiency': min_prof,
                        'match_strength': 'Strong' if student_prof >= min_prof * 1.2 else 'Adequate'
                    })
                elif student_prof > 0:
                    total_earned += student_prof * 0.5
                    matched.append({
                        'skill_name': skill_name,
                        'student_proficiency': student_prof,
                        'required_proficiency': min_prof,
                        'match_strength': 'Partial'
                    })
                    missing_required.append(skill_name)
                else:
                    missing_required.append(skill_name) if is_required else missing_preferred.append(skill_name)
            else:
                if student_prof == 0:
                    missing_preferred.append(skill_name)
        
        match_score = (total_earned / total_required * 100) if total_required > 0 else 0
        
        strengths = [s['skill_name'] for s in matched if s['match_strength'] == 'Strong']
        weaknesses = missing_required[:3]
        
        cgpa_eligible = None
        if request.student_cgpa and request.min_cgpa_required:
            cgpa_eligible = request.student_cgpa >= request.min_cgpa_required
        
        if match_score >= 80:
            recommendation = "Strong match! You meet most requirements for this opportunity."
        elif match_score >= 60:
            recommendation = "Good match. Work on the missing skills to strengthen your application."
        elif match_score >= 40:
            recommendation = "Partial match. Significant skill development required before applying."
        else:
            recommendation = "Low match. Focus on building core skills before applying."
        
        return {
            'overall_match_score': round(match_score, 1),
            'match_percentage': f"{match_score:.0f}%",
            'matched_skills': matched,
            'missing_required_skills': missing_required,
            'missing_preferred_skills': missing_preferred,
            'cgpa_eligible': cgpa_eligible,
            'strengths': strengths,
            'weaknesses': weaknesses,
            'recommendation': recommendation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
