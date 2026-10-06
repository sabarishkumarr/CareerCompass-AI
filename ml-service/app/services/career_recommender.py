from typing import List, Dict, Optional
import math

CAREER_PROFILES = {
    'Software Developer': {
        'skills': ['Python', 'Java', 'JavaScript', 'Git', 'SQL', 'Data Structures'],
        'importance': {'Python': 8, 'Java': 8, 'JavaScript': 7, 'Git': 9, 'SQL': 7, 'Data Structures': 8},
        'projects': ['Build a REST API', 'Create a CRUD application', 'Implement a data structure library'],
        'learning_path': ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Fundamentals', 'Version Control (Git)', 'REST API Design'],
        'industry': 'Technology'
    },
    'Data Scientist': {
        'skills': ['Python', 'Machine Learning', 'Statistics', 'Pandas', 'SQL', 'Scikit-learn', 'Deep Learning'],
        'importance': {'Python': 9, 'Machine Learning': 9, 'Statistics': 9, 'Pandas': 8, 'SQL': 7, 'Scikit-learn': 8},
        'projects': ['Predict house prices with regression', 'Customer churn prediction', 'NLP sentiment analysis'],
        'learning_path': ['Python & NumPy', 'Statistics & Probability', 'Machine Learning Algorithms', 'Feature Engineering', 'Model Evaluation & Deployment'],
        'industry': 'Data Science'
    },
    'Machine Learning Engineer': {
        'skills': ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Docker', 'Scikit-learn'],
        'importance': {'Python': 9, 'Machine Learning': 9, 'Deep Learning': 8, 'TensorFlow': 8, 'Docker': 7},
        'projects': ['Train a CNN for image classification', 'Build an NLP pipeline', 'Deploy a model with FastAPI'],
        'learning_path': ['Advanced Python', 'Neural Networks', 'PyTorch/TensorFlow', 'MLOps', 'Model Deployment'],
        'industry': 'AI/ML'
    },
    'Full Stack Developer': {
        'skills': ['React', 'Node.js', 'JavaScript', 'TypeScript', 'PostgreSQL', 'HTML5', 'CSS3'],
        'importance': {'React': 8, 'Node.js': 8, 'JavaScript': 9, 'PostgreSQL': 7, 'HTML5': 9, 'CSS3': 8},
        'projects': ['Build a full-stack e-commerce app', 'Create a real-time chat application', 'SaaS dashboard'],
        'learning_path': ['HTML/CSS/JavaScript', 'React Framework', 'Node.js & Express', 'Database Design', 'Deployment & DevOps'],
        'industry': 'Technology'
    },
    'Data Analyst': {
        'skills': ['Python', 'SQL', 'Pandas', 'Excel', 'Tableau', 'Statistics'],
        'importance': {'SQL': 9, 'Python': 8, 'Pandas': 8, 'Statistics': 8, 'Excel': 7},
        'projects': ['Sales data analysis dashboard', 'Customer segmentation analysis', 'A/B testing analysis'],
        'learning_path': ['SQL Fundamentals', 'Python for Data Analysis', 'Statistical Analysis', 'Data Visualization', 'Business Intelligence'],
        'industry': 'Analytics'
    },
    'Cloud Engineer': {
        'skills': ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'Python'],
        'importance': {'AWS': 9, 'Docker': 8, 'Kubernetes': 8, 'Linux': 8, 'Terraform': 7},
        'projects': ['Deploy a scalable web app on AWS', 'Set up a CI/CD pipeline', 'Infrastructure as Code project'],
        'learning_path': ['Linux Administration', 'Cloud Fundamentals (AWS)', 'Containerization (Docker)', 'Orchestration (Kubernetes)', 'Infrastructure as Code'],
        'industry': 'Cloud'
    },
    'DevOps Engineer': {
        'skills': ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Git', 'Jenkins'],
        'importance': {'Docker': 9, 'Kubernetes': 8, 'CI/CD': 9, 'Linux': 8, 'Git': 9},
        'projects': ['Build automated CI/CD pipeline', 'Kubernetes cluster setup', 'Monitoring & alerting system'],
        'learning_path': ['Linux & Shell Scripting', 'Git & Version Control', 'Docker & Containers', 'CI/CD Pipelines', 'Kubernetes & Orchestration'],
        'industry': 'Technology'
    },
    'UI/UX Developer': {
        'skills': ['Figma', 'HTML5', 'CSS3', 'React', 'JavaScript', 'User Research'],
        'importance': {'Figma': 9, 'HTML5': 9, 'CSS3': 9, 'React': 7, 'JavaScript': 7},
        'projects': ['Design a mobile app UI', 'Redesign an existing website', 'Create a design system'],
        'learning_path': ['Design Principles', 'Figma Prototyping', 'HTML/CSS Advanced', 'User Research Methods', 'Accessibility'],
        'industry': 'Design'
    },
    'Cybersecurity Analyst': {
        'skills': ['Cybersecurity', 'Linux', 'Python', 'Networking', 'Ethical Hacking'],
        'importance': {'Cybersecurity': 10, 'Linux': 8, 'Networking': 8, 'Python': 7},
        'projects': ['Vulnerability assessment project', 'Implement network security', 'Capture The Flag challenges'],
        'learning_path': ['Networking Fundamentals', 'Linux Security', 'Cryptography', 'Penetration Testing', 'Security Certifications (CEH)'],
        'industry': 'Security'
    },
    'Backend Developer': {
        'skills': ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'REST API', 'Docker'],
        'importance': {'Java': 8, 'Spring Boot': 8, 'REST API': 9, 'PostgreSQL': 8, 'Docker': 7},
        'projects': ['Design a microservices architecture', 'Build a high-performance REST API', 'Implement a caching layer'],
        'learning_path': ['Java Programming', 'Spring Boot Framework', 'Database Design', 'REST API Design', 'Microservices'],
        'industry': 'Technology'
    }
}

def recommend_careers(student_skills: List[Dict], profile: Dict) -> Dict:
    """
    Recommend careers based on student skills and profile.
    Content-based matching using skill overlap.
    """
    student_skill_map = {s['name'].lower(): s.get('proficiency', 50) for s in student_skills}
    preferred = profile.get('preferred_career', '').lower()
    
    career_scores = []
    
    for career_name, career_data in CAREER_PROFILES.items():
        required_skills = career_data['skills']
        importance = career_data.get('importance', {})
        
        # Calculate weighted skill match score
        total_weight = sum(importance.get(s, 5) for s in required_skills)
        earned_weight = 0
        matched_skills = []
        missing_skills = []
        
        for skill in required_skills:
            weight = importance.get(skill, 5)
            student_prof = student_skill_map.get(skill.lower(), 0)
            
            if student_prof > 0:
                contribution = (student_prof / 100) * weight
                earned_weight += contribution
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)
        
        match_score = (earned_weight / total_weight * 100) if total_weight > 0 else 0
        
        # Boost for preferred career
        if career_name.lower() == preferred:
            match_score = min(match_score * 1.1, 100)
        
        # Build reasons
        reasons = []
        if len(matched_skills) > 3:
            reasons.append(f"You have {len(matched_skills)} of {len(required_skills)} required skills")
        if matched_skills:
            reasons.append(f"Proficient in: {', '.join(matched_skills[:3])}")
        if career_name.lower() == preferred:
            reasons.append("Matches your preferred career path")
        
        career_scores.append({
            'career_name': career_name,
            'match_score': round(match_score, 1),
            'matching_skills': matched_skills,
            'missing_skills': missing_skills[:5],
            'reasons': reasons,
            'recommended_skills': missing_skills[:3],
            'suggested_projects': career_data['projects'][:2],
            'learning_path': career_data['learning_path'][:5]
        })
    
    # Sort by score
    career_scores.sort(key=lambda x: x['match_score'], reverse=True)
    top_careers = career_scores[:6]
    
    primary = top_careers[0]['career_name'] if top_careers else 'Software Developer'
    
    explanation = (f"Based on your skill profile and {len(student_skills)} registered skills, "
                   f"{primary} shows the highest compatibility at {top_careers[0]['match_score']:.1f}% match.")
    
    return {
        'recommendations': top_careers,
        'primary_recommendation': primary,
        'explanation': explanation
    }
