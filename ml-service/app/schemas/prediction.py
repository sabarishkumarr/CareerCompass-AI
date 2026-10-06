from pydantic import BaseModel, Field
from typing import Optional, Dict, List

class PlacementPredictionRequest(BaseModel):
    iq: float = Field(..., ge=70, le=140, description="IQ score (70-140)")
    previous_semester_result: float = Field(..., ge=40, le=100, description="Previous semester result (40-100)")
    cgpa: float = Field(..., ge=5.0, le=10.0, description="CGPA (5.0-10.0)")
    academic_performance: int = Field(..., ge=1, le=10, description="Academic performance score (1-10)")
    extracurricular_score: int = Field(..., ge=1, le=10, description="Extra-curricular score (1-10)")
    communication_skills: int = Field(..., ge=1, le=10, description="Communication skills (1-10)")
    projects_completed: int = Field(..., ge=0, le=10, description="Number of projects completed")
    internship_experience: int = Field(..., ge=0, le=1, description="Internship experience (0 or 1)")

class FeatureImportanceItem(BaseModel):
    feature: str
    importance: float
    display_name: str

class PlacementPredictionResponse(BaseModel):
    prediction: int  # 0 or 1
    prediction_label: str  # "Placed" or "Not Placed"
    placement_probability: float  # 0.0 to 1.0
    confidence_level: str  # "High", "Moderate", "Low"
    model_used: str
    model_accuracy: float
    feature_contributions: List[FeatureImportanceItem]
    explanation: str
    recommendations: List[str]
