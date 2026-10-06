import joblib
import json
import numpy as np
import pandas as pd
from pathlib import Path
from typing import Optional, Dict
import logging

logger = logging.getLogger(__name__)

class MLPredictor:
    def __init__(self):
        self.model = None
        self.feature_cols = None
        self.metadata = None
        self._load_model()
    
    def _load_model(self):
        model_path = Path('artifacts/placement_model.joblib')
        feature_path = Path('artifacts/feature_cols.joblib')
        metadata_path = Path('artifacts/model_metadata.json')
        
        if not model_path.exists():
            logger.warning("Model not found. Run training/train_models.py first.")
            return
        
        try:
            self.model = joblib.load(model_path)
            self.feature_cols = joblib.load(feature_path)
            with open(metadata_path) as f:
                self.metadata = json.load(f)
            logger.info(f"Model loaded: {self.metadata.get('model_name', 'Unknown')}")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
    
    def is_ready(self) -> bool:
        return self.model is not None
    
    def predict(self, features: Dict) -> Dict:
        if not self.is_ready():
            return self._fallback_prediction(features)
        
        try:
            # Prepare input
            input_data = pd.DataFrame([{
                'IQ': features['iq'],
                'Previous_Semester_Result': features['previous_semester_result'],
                'CGPA': features['cgpa'],
                'Academic_Performance': features['academic_performance'],
                'Extra_Curricular_Score': features['extracurricular_score'],
                'Communication_Skills': features['communication_skills'],
                'Projects_Completed': features['projects_completed'],
                'Internship_Experience': features['internship_experience']
            }])
            
            # Predict
            prediction = int(self.model.predict(input_data)[0])
            probabilities = self.model.predict_proba(input_data)[0]
            placement_prob = float(probabilities[1])
            
            # Determine confidence
            if placement_prob > 0.75 or placement_prob < 0.25:
                confidence = "High"
            elif placement_prob > 0.60 or placement_prob < 0.40:
                confidence = "Moderate"
            else:
                confidence = "Low"
            
            # Feature contributions from model metadata
            feature_contributions = []
            if self.metadata and self.metadata.get('feature_importance'):
                fi = self.metadata['feature_importance']
                display_names = {
                    'IQ': 'IQ Score',
                    'Previous_Semester_Result': 'Previous Semester Result',
                    'CGPA': 'CGPA',
                    'Academic_Performance': 'Academic Performance',
                    'Extra_Curricular_Score': 'Extra-Curricular Score',
                    'Communication_Skills': 'Communication Skills',
                    'Projects_Completed': 'Projects Completed',
                    'Internship_Experience': 'Internship Experience'
                }
                for feat, imp in sorted(fi.items(), key=lambda x: x[1], reverse=True):
                    feature_contributions.append({
                        'feature': feat,
                        'importance': imp,
                        'display_name': display_names.get(feat, feat)
                    })
            
            # Generate explanation
            explanation = self._generate_explanation(features, prediction, placement_prob)
            recommendations = self._generate_recommendations(features, prediction, placement_prob)
            
            model_accuracy = self.metadata.get('metrics', {}).get('accuracy', 0.0) if self.metadata else 0.0
            model_name = self.metadata.get('model_name', 'Random Forest') if self.metadata else 'Random Forest'
            
            return {
                'prediction': prediction,
                'prediction_label': 'Placed' if prediction == 1 else 'Not Placed',
                'placement_probability': round(placement_prob, 4),
                'confidence_level': confidence,
                'model_used': model_name,
                'model_accuracy': model_accuracy,
                'feature_contributions': feature_contributions,
                'explanation': explanation,
                'recommendations': recommendations
            }
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return self._fallback_prediction(features)
    
    def _fallback_prediction(self, features: Dict) -> Dict:
        """Simple rule-based fallback if model unavailable"""
        score = (
            features.get('communication_skills', 5) * 0.28 +
            features.get('iq', 100) / 140 * 10 * 0.25 +
            features.get('cgpa', 7.0) * 0.17 +
            features.get('projects_completed', 0) * 0.17 +
            features.get('previous_semester_result', 70) / 100 * 10 * 0.11 +
            features.get('extracurricular_score', 5) * 0.01 +
            features.get('academic_performance', 5) * 0.01 +
            features.get('internship_experience', 0) * 0.003
        ) / 10
        
        prob = min(max(score, 0.05), 0.95)
        prediction = 1 if prob >= 0.5 else 0
        
        return {
            'prediction': prediction,
            'prediction_label': 'Placed' if prediction == 1 else 'Not Placed',
            'placement_probability': round(prob, 4),
            'confidence_level': 'Low',
            'model_used': 'Rule-Based Fallback',
            'model_accuracy': 0.0,
            'feature_contributions': [],
            'explanation': 'Using rule-based scoring (model not available)',
            'recommendations': self._generate_recommendations(features, prediction, prob)
        }
    
    def _generate_explanation(self, features: Dict, prediction: int, prob: float) -> str:
        comm = features.get('communication_skills', 5)
        iq = features.get('iq', 100)
        cgpa = features.get('cgpa', 7.0)
        projects = features.get('projects_completed', 0)
        
        strengths = []
        if comm >= 7: strengths.append("strong communication skills")
        if iq >= 110: strengths.append("above-average IQ")
        if cgpa >= 8.0: strengths.append("excellent CGPA")
        if projects >= 3: strengths.append("solid project portfolio")
        
        if prediction == 1:
            base = f"The model predicts a {prob*100:.1f}% placement probability. "
            if strengths:
                return base + f"Key strengths: {', '.join(strengths)}."
            return base + "The overall profile meets placement criteria."
        else:
            base = f"The model predicts a {prob*100:.1f}% placement probability. "
            return base + "Improving communication skills, CGPA, and project count would increase placement chances."
    
    def _generate_recommendations(self, features: Dict, prediction: int, prob: float) -> list:
        recs = []
        comm = features.get('communication_skills', 5)
        cgpa = features.get('cgpa', 7.0)
        projects = features.get('projects_completed', 0)
        internship = features.get('internship_experience', 0)
        
        if comm < 7:
            recs.append("Improve communication skills through presentations and group discussions")
        if cgpa < 7.5:
            recs.append("Focus on academic performance to improve CGPA above 7.5")
        if projects < 3:
            recs.append("Complete at least 2-3 meaningful technical projects")
        if not internship:
            recs.append("Seek internship opportunities to gain industry experience")
        if not recs:
            recs.append("Maintain your current performance and explore advanced opportunities")
            recs.append("Consider applying for competitive internships and job roles")
        
        return recs

# Singleton instance
predictor = MLPredictor()
