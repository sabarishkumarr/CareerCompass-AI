from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.routes import health, prediction, analysis, matching
from app.schemas.prediction import PlacementPredictionRequest, PlacementPredictionResponse
from app.schemas.analysis import StudentProfileInput, CareerRecommendationResponse, SkillGapRequest, SkillGapResponse
from app.schemas.matching import OpportunityMatchRequest, OpportunityMatchResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="CareerCompass AI - ML Service",
    description="Machine Learning microservice for placement prediction, skill gap analysis, and career recommendations",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["Health"])
app.include_router(prediction.router, prefix="/predict", tags=["Prediction"])
app.include_router(analysis.router, prefix="/analyze", tags=["Analysis"])
app.include_router(matching.router, prefix="/match", tags=["Matching"])

# Top-level route aliases for backward compatibility
@app.post("/predict-placement", response_model=PlacementPredictionResponse, tags=["Prediction"])
async def predict_placement_alias(request: PlacementPredictionRequest):
    return await prediction.predict_placement(request)

@app.post("/analyze-profile", tags=["Analysis"])
async def analyze_profile_alias(request: StudentProfileInput):
    return await analysis.analyze_profile(request)

@app.post("/skill-gap", tags=["Analysis"])
async def skill_gap_alias(request: SkillGapRequest):
    return await analysis.skill_gap_analysis(request)

@app.post("/career-recommendation", tags=["Analysis"])
async def career_recommendation_alias(request: StudentProfileInput):
    return await analysis.analyze_profile(request)

@app.post("/match-opportunities", tags=["Matching"])
async def match_opportunities_alias(request: OpportunityMatchRequest):
    return await matching.match_opportunity(request)

@app.on_event("startup")
async def startup_event():
    logger.info("CareerCompass ML Service starting up...")
    from app.services.ml_predictor import predictor
    if predictor.is_ready():
        logger.info(f"ML Model loaded: {predictor.metadata.get('model_name', 'Unknown')}")
    else:
        logger.warning("ML Model not found. Run training/train_models.py to train models.")
