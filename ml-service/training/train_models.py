import numpy as np
import pandas as pd
import joblib
import json
import os
import warnings
warnings.filterwarnings('ignore')

from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report
)
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns

def load_or_generate_data():
    data_path = 'data/placement_data.csv'
    if not os.path.exists(data_path):
        print("Data not found. Generating synthetic dataset...")
        import sys
        sys.path.insert(0, '.')
        from training.generate_data import generate_placement_dataset
        df = generate_placement_dataset()
        os.makedirs('data', exist_ok=True)
        df.to_csv(data_path, index=False)
    else:
        df = pd.read_csv(data_path)
    return df

def inspect_data(df):
    print("=== DATA INSPECTION ===")
    print(f"Shape: {df.shape}")
    print(f"\nMissing values:\n{df.isnull().sum()}")
    print(f"\nDuplicate rows: {df.duplicated().sum()}")
    print(f"\nClass distribution:\n{df['Placement'].value_counts(normalize=True)}")
    print(f"\nBasic statistics:\n{df.describe().round(2)}")
    
    # Remove duplicates if any
    df_clean = df.drop_duplicates()
    if len(df_clean) < len(df):
        print(f"Removed {len(df) - len(df_clean)} duplicate rows")
    
    return df_clean

def train_and_evaluate():
    print("\n" + "="*60)
    print("CareerCompass AI - ML Training Pipeline")
    print("="*60 + "\n")
    
    # Load data
    df = load_or_generate_data()
    df = inspect_data(df)
    
    # Features and target
    feature_cols = [
        'IQ', 'Previous_Semester_Result', 'CGPA', 'Academic_Performance',
        'Extra_Curricular_Score', 'Communication_Skills', 'Projects_Completed',
        'Internship_Experience'
    ]
    X = df[feature_cols]
    y = df['Placement']
    
    print(f"\nFeatures: {feature_cols}")
    print(f"Target: Placement")
    print(f"Total samples: {len(df)}")
    print(f"Placement rate: {y.mean():.2%}")
    
    # Train-test split (stratified)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"\nTrain: {len(X_train)}, Test: {len(X_test)}")
    
    # Define models
    models = {
        'Logistic Regression': Pipeline([
            ('scaler', StandardScaler()),
            ('clf', LogisticRegression(max_iter=1000, random_state=42, C=1.0))
        ]),
        'KNN': Pipeline([
            ('scaler', StandardScaler()),
            ('clf', KNeighborsClassifier(n_neighbors=7, weights='distance'))
        ]),
        'Decision Tree': Pipeline([
            ('clf', DecisionTreeClassifier(max_depth=10, min_samples_split=20, random_state=42))
        ]),
        'Random Forest': Pipeline([
            ('clf', RandomForestClassifier(
                n_estimators=200, max_depth=15, min_samples_split=10,
                random_state=42, n_jobs=-1
            ))
        ]),
        'XGBoost': Pipeline([
            ('clf', XGBClassifier(
                n_estimators=200, max_depth=6, learning_rate=0.1,
                subsample=0.8, colsample_bytree=0.8,
                random_state=42, eval_metric='logloss', verbosity=0
            ))
        ])
    }
    
    # Cross-validation setup
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    
    results = []
    trained_models = {}
    
    print("\n=== MODEL TRAINING AND EVALUATION ===")
    print("-" * 80)
    
    for name, model in models.items():
        print(f"\nTraining: {name}")
        
        # Train
        model.fit(X_train, y_train)
        trained_models[name] = model
        
        # Test predictions
        y_pred = model.predict(X_test)
        y_prob = model.predict_proba(X_test)[:, 1] if hasattr(model, 'predict_proba') else None
        
        # Metrics
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        
        # Cross-validation
        cv_scores = cross_val_score(model, X, y, cv=cv, scoring='f1', n_jobs=-1)
        cv_mean = cv_scores.mean()
        cv_std = cv_scores.std()
        
        results.append({
            'Model': name,
            'Accuracy': round(acc, 4),
            'Precision': round(prec, 4),
            'Recall': round(rec, 4),
            'F1-Score': round(f1, 4),
            'CV Mean F1': round(cv_mean, 4),
            'CV Std': round(cv_std, 4)
        })
        
        print(f"  Accuracy:  {acc:.4f}")
        print(f"  Precision: {prec:.4f}")
        print(f"  Recall:    {rec:.4f}")
        print(f"  F1-Score:  {f1:.4f}")
        print(f"  CV F1:     {cv_mean:.4f} ± {cv_std:.4f}")
    
    # Print comparison table
    results_df = pd.DataFrame(results)
    print("\n=== MODEL COMPARISON ===")
    print(results_df.to_string(index=False))
    
    # Select best model by CV F1 score
    best_model_name = results_df.loc[results_df['CV Mean F1'].idxmax(), 'Model']
    best_model = trained_models[best_model_name]
    best_metrics = results_df[results_df['Model'] == best_model_name].iloc[0]
    
    print(f"\n=== SELECTED MODEL: {best_model_name} ===")
    print(f"CV F1 Score: {best_metrics['CV Mean F1']:.4f}")
    
    # Feature importance (for tree-based models)
    feature_importance = None
    if best_model_name in ['Random Forest', 'XGBoost', 'Decision Tree']:
        clf = best_model.named_steps['clf']
        importances = clf.feature_importances_
        feature_importance = dict(zip(feature_cols, [round(float(imp), 4) for imp in importances]))
        sorted_importance = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
        print("\nFeature Importance:")
        for feat, imp in sorted_importance:
            print(f"  {feat}: {imp:.4f} ({imp*100:.1f}%)")
    
    # Save artifacts
    os.makedirs('artifacts', exist_ok=True)
    
    # Save best model
    model_path = 'artifacts/placement_model.joblib'
    joblib.dump(best_model, model_path)
    print(f"\nModel saved: {model_path}")
    
    # Save feature columns list
    joblib.dump(feature_cols, 'artifacts/feature_cols.joblib')
    
    # Save model metadata
    metadata = {
        'model_name': best_model_name,
        'feature_columns': feature_cols,
        'training_samples': len(X_train),
        'test_samples': len(X_test),
        'metrics': {
            'accuracy': float(best_metrics['Accuracy']),
            'precision': float(best_metrics['Precision']),
            'recall': float(best_metrics['Recall']),
            'f1_score': float(best_metrics['F1-Score']),
            'cv_mean_f1': float(best_metrics['CV Mean F1']),
            'cv_std': float(best_metrics['CV Std'])
        },
        'feature_importance': feature_importance,
        'model_comparison': results
    }
    
    with open('artifacts/model_metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)
    print("Metadata saved: artifacts/model_metadata.json")
    
    # Generate confusion matrix visualization
    try:
        y_pred_best = best_model.predict(X_test)
        cm = confusion_matrix(y_test, y_pred_best)
        
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=['Not Placed', 'Placed'],
                   yticklabels=['Not Placed', 'Placed'])
        plt.title(f'Confusion Matrix - {best_model_name}')
        plt.ylabel('Actual')
        plt.xlabel('Predicted')
        plt.tight_layout()
        plt.savefig('artifacts/confusion_matrix.png', dpi=100, bbox_inches='tight')
        plt.close()
        print("Confusion matrix saved: artifacts/confusion_matrix.png")
    except Exception as e:
        print(f"Warning: Could not save confusion matrix: {e}")
    
    # Generate feature importance plot
    if feature_importance:
        try:
            sorted_feats = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
            feat_names = [x[0].replace('_', ' ') for x in sorted_feats]
            feat_vals = [x[1] for x in sorted_feats]
            
            plt.figure(figsize=(10, 6))
            bars = plt.barh(feat_names[::-1], feat_vals[::-1], color='#6366f1')
            plt.xlabel('Feature Importance')
            plt.title(f'Feature Importance - {best_model_name}')
            plt.tight_layout()
            plt.savefig('artifacts/feature_importance.png', dpi=100, bbox_inches='tight')
            plt.close()
            print("Feature importance saved: artifacts/feature_importance.png")
        except Exception as e:
            print(f"Warning: Could not save feature importance: {e}")
    
    print("\n=== TRAINING COMPLETE ===")
    return metadata

if __name__ == '__main__':
    metadata = train_and_evaluate()
