from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PlacementPredictionRequest, PlacementPredictionResponse
from app.services.ml_predictor import predictor

router = APIRouter()

@router.post("/placement", response_model=PlacementPredictionResponse)
async def predict_placement(request: PlacementPredictionRequest):
    try:
        # Pydantic v1 vs v2 dict method
        req_dict = request.model_dump() if hasattr(request, "model_dump") else request.dict()
        result = predictor.predict(req_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
