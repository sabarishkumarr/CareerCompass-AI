from fastapi import APIRouter
from app.services.ml_predictor import predictor

router = APIRouter()

@router.get("/health")
async def health_check():
    model_ready = predictor.is_ready()
    model_name = predictor.metadata.get('model_name', 'N/A') if model_ready else 'Not loaded'
    
    return {
        "status": "healthy" if model_ready else "degraded",
        "service": "CareerCompass ML Service",
        "version": "1.0.0",
        "model_loaded": model_ready,
        "model_name": model_name,
        "endpoints": [
            "/health",
            "/predict-placement",
            "/analyze-profile",
            "/skill-gap",
            "/career-recommendation",
            "/match-opportunities"
        ]
    }
