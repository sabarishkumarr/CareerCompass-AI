import subprocess
import sys
import os
from pathlib import Path

def main():
    print("CareerCompass ML Service Startup")
    print("="*40)
    
    # Generate data if needed
    if not Path('data/placement_data.csv').exists():
        print("Generating training data...")
        subprocess.run([sys.executable, 'training/generate_data.py'], check=True)
    
    # Train models if needed
    if not Path('artifacts/placement_model.joblib').exists():
        print("Training ML models (this may take 1-2 minutes)...")
        subprocess.run([sys.executable, 'training/train_models.py'], check=True)
    else:
        print("Model artifacts found. Skipping training.")
    
    print("\nStarting FastAPI server on port 8000...")
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False, log_level="info")

if __name__ == '__main__':
    main()
