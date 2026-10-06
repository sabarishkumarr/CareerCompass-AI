from typing import List, Dict, Optional

# Career skill requirements (normalized)
CAREER_SKILLS = {
    'Software Developer': [
        {'name': 'Python', 'proficiency': 70}, {'name': 'Java', 'proficiency': 65},
        {'name': 'JavaScript', 'proficiency': 60}, {'name': 'Git', 'proficiency': 70},
        {'name': 'SQL', 'proficiency': 60}, {'name': 'REST API', 'proficiency': 65},
        {'name': 'Data Structures', 'proficiency': 70}
    ],
    'Full Stack Developer': [
        {'name': 'React', 'proficiency': 70}, {'name': 'Node.js', 'proficiency': 65},
        {'name': 'JavaScript', 'proficiency': 75}, {'name': 'TypeScript', 'proficiency': 60},
        {'name': 'PostgreSQL', 'proficiency': 60}, {'name': 'REST API', 'proficiency': 70},
        {'name': 'HTML5', 'proficiency': 80}, {'name': 'CSS3', 'proficiency': 75}
    ],
    'Data Analyst': [
        {'name': 'Python', 'proficiency': 70}, {'name': 'SQL', 'proficiency': 80},
        {'name': 'Pandas', 'proficiency': 75}, {'name': 'Matplotlib', 'proficiency': 65},
        {'name': 'Excel', 'proficiency': 70}, {'name': 'Statistics', 'proficiency': 70},
        {'name': 'Data Visualization', 'proficiency': 70}
    ],
    'Data Scientist': [
        {'name': 'Python', 'proficiency': 80}, {'name': 'Machine Learning', 'proficiency': 75},
        {'name': 'Statistics', 'proficiency': 80}, {'name': 'Pandas', 'proficiency': 80},
        {'name': 'Scikit-learn', 'proficiency': 70}, {'name': 'SQL', 'proficiency': 70},
        {'name': 'Deep Learning', 'proficiency': 60}, {'name': 'Feature Engineering', 'proficiency': 70}
    ],
    'Machine Learning Engineer': [
        {'name': 'Python', 'proficiency': 85}, {'name': 'Machine Learning', 'proficiency': 85},
        {'name': 'Deep Learning', 'proficiency': 75}, {'name': 'TensorFlow', 'proficiency': 70},
        {'name': 'Scikit-learn', 'proficiency': 80}, {'name': 'Docker', 'proficiency': 60},
        {'name': 'Feature Engineering', 'proficiency': 75}, {'name': 'Statistics', 'proficiency': 80}
    ],
    'Cloud Engineer': [
        {'name': 'AWS', 'proficiency': 75}, {'name': 'Docker', 'proficiency': 70},
        {'name': 'Kubernetes', 'proficiency': 65}, {'name': 'Linux', 'proficiency': 70},
        {'name': 'Terraform', 'proficiency': 60}, {'name': 'Python', 'proficiency': 60},
        {'name': 'Networking', 'proficiency': 65}
    ],
    'DevOps Engineer': [
        {'name': 'Docker', 'proficiency': 75}, {'name': 'Kubernetes', 'proficiency': 70},
        {'name': 'CI/CD', 'proficiency': 75}, {'name': 'Linux', 'proficiency': 75},
        {'name': 'Git', 'proficiency': 80}, {'name': 'AWS', 'proficiency': 65},
        {'name': 'Bash', 'proficiency': 70}, {'name': 'Jenkins', 'proficiency': 65}
    ],
    'UI/UX Developer': [
        {'name': 'Figma', 'proficiency': 80}, {'name': 'HTML5', 'proficiency': 85},
        {'name': 'CSS3', 'proficiency': 85}, {'name': 'React', 'proficiency': 65},
        {'name': 'JavaScript', 'proficiency': 65}, {'name': 'User Research', 'proficiency': 70}
    ],
    'Cybersecurity Analyst': [
        {'name': 'Cybersecurity', 'proficiency': 80}, {'name': 'Linux', 'proficiency': 75},
        {'name': 'Python', 'proficiency': 65}, {'name': 'Networking', 'proficiency': 75},
        {'name': 'Ethical Hacking', 'proficiency': 70}
    ],
    'Backend Developer': [
        {'name': 'Java', 'proficiency': 75}, {'name': 'Spring Boot', 'proficiency': 70},
        {'name': 'Python', 'proficiency': 65}, {'name': 'PostgreSQL', 'proficiency': 70},
        {'name': 'REST API', 'proficiency': 75}, {'name': 'MongoDB', 'proficiency': 60},
        {'name': 'Docker', 'proficiency': 60}, {'name': 'Git', 'proficiency': 70}
    ]
}

def calculate_skill_gap(
    student_skills: List[Dict],
    target_career: str,
    target_skills: Optional[List[Dict]] = None
) -> Dict:
    """
    Calculate skill gap between student skills and career requirements.
    Returns detailed gap analysis.
    """
    # Get required skills
    if target_skills and len(target_skills) > 0:
        required = {s['name'].strip(): s.get('min_proficiency', s.get('proficiency', 70)) 
                   for s in target_skills}
    else:
        career_data = CAREER_SKILLS.get(target_career, CAREER_SKILLS.get('Software Developer', []))
        required = {s['name']: s['proficiency'] for s in career_data}
    
    # Student skill map (case-insensitive)
    student_map = {s['name'].strip().lower(): s.get('proficiency', s.get('proficiency_level', 50)) 
                  for s in student_skills}
    
    matched = []
    missing = []
    total_gap = 0
    max_possible = 0
    
    for skill_name, required_prof in required.items():
        max_possible += required_prof
        student_prof = student_map.get(skill_name.lower(), 0)
        gap = required_prof - student_prof
        
        if student_prof == 0:
            status = "Missing"
            priority = "Critical" if required_prof >= 70 else "High"
        elif student_prof >= required_prof:
            status = "Strong"
            priority = "Low"
        elif gap <= 15:
            status = "Moderate Gap"
            priority = "Medium"
        else:
            status = "High Gap"
            priority = "High"
        
        recommendation = _get_recommendation(skill_name, student_prof, required_prof, status)
        
        item = {
            'skill_name': skill_name,
            'student_proficiency': student_prof,
            'required_proficiency': required_prof,
            'gap': max(0, gap),
            'status': status,
            'priority': priority,
            'recommendation': recommendation
        }
        
        if student_prof >= required_prof:
            matched.append(item)
        else:
            missing.append(item)
            total_gap += gap
    
    # Calculate readiness score
    readiness = 0
    for skill_name, required_prof in required.items():
        student_prof = student_map.get(skill_name.lower(), 0)
        readiness += min(student_prof / required_prof, 1.0) * required_prof
    
    overall_readiness = (readiness / max_possible * 100) if max_possible > 0 else 0
    
    if overall_readiness >= 80:
        readiness_level = "Ready"
    elif overall_readiness >= 60:
        readiness_level = "Near Ready"
    elif overall_readiness >= 40:
        readiness_level = "Developing"
    else:
        readiness_level = "Beginner"
    
    strong_skills = [s['skill_name'] for s in matched]
    priority_gaps = [s['skill_name'] for s in missing if s['priority'] in ('Critical', 'High')]
    
    recommendations = []
    for item in sorted(missing, key=lambda x: x['gap'], reverse=True)[:5]:
        recommendations.append(item['recommendation'])
    
    return {
        'target_career': target_career,
        'overall_readiness': round(overall_readiness, 1),
        'readiness_level': readiness_level,
        'matched_skills': matched,
        'missing_skills': missing,
        'strong_skills': strong_skills,
        'priority_gaps': priority_gaps,
        'recommendations': recommendations
    }

def _get_recommendation(skill: str, current: int, required: int, status: str) -> str:
    if status == "Missing":
        return f"Start learning {skill} - aim for proficiency level {required}%"
    elif status == "High Gap":
        return f"Significantly improve {skill} from {current}% to {required}% (gap: {required-current}%)"
    elif status == "Moderate Gap":
        return f"Enhance {skill} from {current}% to {required}% with practice projects"
    else:
        return f"{skill} is at required level. Maintain and advance further."
