# CareerCompass AI ML Service

This is the Machine Learning microservice for the CareerCompass AI platform. It provides the core predictive and analytical capabilities through a FastAPI-based REST API.

## Features
- **Placement Prediction**: Predicts student placement probability using trained ML models (Random Forest, XGBoost, etc.).
- **Skill Gap Analysis**: Identifies gaps between a student's current skills and their target career requirements.
- **Career Recommendations**: Recommends best-fit career paths based on a student's skill profile.
- **Opportunity Matching**: Evaluates a student's profile against job/internship requirements.

## Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Run data generation: `python training/generate_data.py`
3. Train models: `python training/train_models.py`
4. Start the service: `python startup.py`

## Endpoints
- `GET /health`
- `POST /predict-placement` (alias for `/predict/placement`)
- `POST /analyze-profile` (alias for `/analyze/profile`)
- `POST /skill-gap` (alias for `/analyze/skill-gap`)
- `POST /career-recommendation`
- `POST /match-opportunities` (alias for `/match/opportunity`)
