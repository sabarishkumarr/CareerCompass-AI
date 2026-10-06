"""
CareerCompass AI - Final Reproducible ML Experiment Pipeline
Computes exact metrics for Section 6.2 of the Academic Report:
- Iteration 1: Random Forest Baseline (Original single train/test split, default params, no CV)
- Iteration 2: Random Forest Optimized (Data audit, Stratified split, Regularized parameters, 5-Fold Stratified CV)
- Final Model Comparison: Logistic Regression, KNN, Decision Tree, Random Forest, XGBoost
"""

import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report
)

def run_experiment():
    dataset_path = 'ml-service/data/placement_data.csv'
    if not os.path.exists(dataset_path):
        dataset_path = 'data/placement_data.csv'
    
    print(f"Loading dataset from: {dataset_path}")
    df = pd.read_csv(dataset_path)
    total_records = len(df)
    
    # Dataset & Leakage / Duplicate Audit
    duplicates_count = int(df.duplicated().sum())
    feature_duplicates = int(df.duplicated(subset=[
        'IQ', 'Previous_Semester_Result', 'CGPA', 'Academic_Performance',
        'Extra_Curricular_Score', 'Communication_Skills', 'Projects_Completed',
        'Internship_Experience'
    ]).sum())
    missing_values = int(df.isnull().sum().sum())
    
    feature_cols = [
        'IQ', 'Previous_Semester_Result', 'CGPA', 'Academic_Performance',
        'Extra_Curricular_Score', 'Communication_Skills', 'Projects_Completed',
        'Internship_Experience'
    ]
    target_col = 'Placement'
    
    X = df[feature_cols]
    y = df[target_col]
    
    placement_counts = y.value_counts().to_dict()
    placement_rate = float(y.mean())
    
    print(f"Total records: {total_records}")
    print(f"Exact duplicates: {duplicates_count}")
    print(f"Feature duplicates: {feature_duplicates}")
    print(f"Missing values: {missing_values}")
    print(f"Placement distribution: {placement_counts} (Rate: {placement_rate:.2%})")
    
    # =========================================================================
    # ITERATION 1: Baseline Random Forest
    # - Standard non-stratified 80/20 train/test split (original initial setup)
    # - Default RandomForestClassifier (n_estimators=100, unconstrained max_depth)
    # - Single train/test split evaluation (No Cross-Validation)
    # =========================================================================
    X_train_it1, X_test_it1, y_train_it1, y_test_it1 = train_test_split(
        X, y, test_size=0.20, random_state=42, shuffle=True
    )
    
    rf_baseline = RandomForestClassifier(random_state=42)
    rf_baseline.fit(X_train_it1, y_train_it1)
    
    y_pred_it1 = rf_baseline.predict(X_test_it1)
    
    acc_it1 = accuracy_score(y_test_it1, y_pred_it1)
    prec_it1 = precision_score(y_test_it1, y_pred_it1, zero_division=0)
    rec_it1 = recall_score(y_test_it1, y_pred_it1, zero_division=0)
    f1_it1 = f1_score(y_test_it1, y_pred_it1, zero_division=0)
    cm_it1 = confusion_matrix(y_test_it1, y_pred_it1).tolist()
    
    iteration_1_result = {
        'iteration': 'Iteration 1: Baseline Random Forest',
        'model': 'Random Forest (Baseline)',
        'description': 'Original single train/test split (80/20 unstratified), default hyperparameters, no cross-validation',
        'train_samples': len(X_train_it1),
        'test_samples': len(X_test_it1),
        'accuracy': round(float(acc_it1), 4),
        'precision': round(float(prec_it1), 4),
        'recall': round(float(rec_it1), 4),
        'f1_score': round(float(f1_it1), 4),
        'cv_mean_f1': None,
        'cv_std': None,
        'confusion_matrix': cm_it1,
        'tn': cm_it1[0][0],
        'fp': cm_it1[0][1],
        'fn': cm_it1[1][0],
        'tp': cm_it1[1][1]
    }
    
    # =========================================================================
    # ITERATION 2: Refined Random Forest
    # - Stratified 80/20 train/test split (preserves 81.63% / 18.37% class balance)
    # - Regularized hyperparameters: n_estimators=200, max_depth=15, min_samples_split=10
    # - 5-Fold Stratified Cross-Validation for statistical confidence bounds
    # =========================================================================
    X_train_it2, X_test_it2, y_train_it2, y_test_it2 = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    rf_it2 = RandomForestClassifier(
        n_estimators=200, max_depth=15, min_samples_split=10,
        random_state=42, n_jobs=-1
    )
    rf_it2.fit(X_train_it2, y_train_it2)
    y_pred_it2 = rf_it2.predict(X_test_it2)
    
    acc_it2 = accuracy_score(y_test_it2, y_pred_it2)
    prec_it2 = precision_score(y_test_it2, y_pred_it2, zero_division=0)
    rec_it2 = recall_score(y_test_it2, y_pred_it2, zero_division=0)
    f1_it2 = f1_score(y_test_it2, y_pred_it2, zero_division=0)
    cm_it2 = confusion_matrix(y_test_it2, y_pred_it2).tolist()
    
    cv5 = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores_rf = cross_val_score(rf_it2, X, y, cv=cv5, scoring='f1', n_jobs=-1)
    cv_mean_it2 = float(cv_scores_rf.mean())
    cv_std_it2 = float(cv_scores_rf.std())
    
    iteration_2_result = {
        'iteration': 'Iteration 2: Refined Random Forest',
        'model': 'Random Forest (Tuned + Stratified CV)',
        'description': 'Leakage/duplicate audit, Stratified 80/20 split, regularized max_depth=15, min_samples_split=10, 5-Fold Stratified CV',
        'train_samples': len(X_train_it2),
        'test_samples': len(X_test_it2),
        'accuracy': round(float(acc_it2), 4),
        'precision': round(float(prec_it2), 4),
        'recall': round(float(rec_it2), 4),
        'f1_score': round(float(f1_it2), 4),
        'cv_mean_f1': round(cv_mean_it2, 4),
        'cv_std': round(cv_std_it2, 4),
        'confusion_matrix': cm_it2,
        'tn': cm_it2[0][0],
        'fp': cm_it2[0][1],
        'fn': cm_it2[1][0],
        'tp': cm_it2[1][1]
    }
    
    # =========================================================================
    # BENCHMARK: Final Model Comparison Across All 5 Algorithms
    # Evaluated under identical Stratified 80/20 Split + 5-Fold Stratified CV
    # =========================================================================
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
    
    final_comparison = []
    
    for name, model in models.items():
        print(f"Benchmarking: {name}...")
        model.fit(X_train_it2, y_train_it2)
        y_pred = model.predict(X_test_it2)
        
        acc = accuracy_score(y_test_it2, y_pred)
        prec = precision_score(y_test_it2, y_pred, zero_division=0)
        rec = recall_score(y_test_it2, y_pred, zero_division=0)
        f1 = f1_score(y_test_it2, y_pred, zero_division=0)
        cm = confusion_matrix(y_test_it2, y_pred).tolist()
        
        cv_scores = cross_val_score(model, X, y, cv=cv5, scoring='f1', n_jobs=-1)
        cv_mean = float(cv_scores.mean())
        cv_std = float(cv_scores.std())
        
        final_comparison.append({
            'model': name,
            'accuracy': round(float(acc), 4),
            'precision': round(float(prec), 4),
            'recall': round(float(rec), 4),
            'f1_score': round(float(f1), 4),
            'cv_mean_f1': round(cv_mean, 4),
            'cv_std': round(cv_std, 4),
            'confusion_matrix': cm,
            'tn': cm[0][0],
            'fp': cm[0][1],
            'fn': cm[1][0],
            'tp': cm[1][1]
        })
        
    # Feature Importance for best tree-based models
    rf_clf = models['Random Forest'].named_steps['clf']
    rf_feat_imp = {feat: round(float(imp), 4) for feat, imp in zip(feature_cols, rf_clf.feature_importances_)}
    
    xgb_clf = models['XGBoost'].named_steps['clf']
    xgb_feat_imp = {feat: round(float(imp), 4) for feat, imp in zip(feature_cols, xgb_clf.feature_importances_)}
    
    summary_output = {
        'dataset_info': {
            'dataset_path': dataset_path,
            'total_samples': total_records,
            'feature_columns': feature_cols,
            'target_column': target_col,
            'duplicate_rows': duplicates_count,
            'feature_duplicates': feature_duplicates,
            'missing_values': missing_values,
            'placement_class_distribution': placement_counts,
            'placement_rate': round(placement_rate, 4),
            'train_test_split_ratio': '80% Train (7951 samples) / 20% Test (1988 samples)',
            'random_seed': 42
        },
        'iteration_1': iteration_1_result,
        'iteration_2': iteration_2_result,
        'final_model_comparison': final_comparison,
        'feature_importance': {
            'random_forest': rf_feat_imp,
            'xgboost': xgb_feat_imp
        }
    }
    
    # Save to artifacts directory in ml-service
    artifacts_dir = 'ml-service/artifacts'
    os.makedirs(artifacts_dir, exist_ok=True)
    
    json_path = os.path.join(artifacts_dir, 'final_model_evaluation.json')
    with open(json_path, 'w') as f:
        json.dump(summary_output, f, indent=2)
    print(f"Results saved to: {json_path}")
    
    # Create tabular DataFrame for CSV export
    rows_for_csv = []
    
    # Iteration rows
    rows_for_csv.append({
        'Category': 'Iteration Progression',
        'Model': iteration_1_result['model'],
        'Setup / Preprocessing': iteration_1_result['description'],
        'Accuracy': iteration_1_result['accuracy'],
        'Precision': iteration_1_result['precision'],
        'Recall': iteration_1_result['recall'],
        'F1-Score': iteration_1_result['f1_score'],
        '5-Fold CV F1 (Mean ± Std)': 'N/A (Single Split)',
        'Confusion Matrix [TN, FP; FN, TP]': f"[{cm_it1[0][0]}, {cm_it1[0][1]}; {cm_it1[1][0]}, {cm_it1[1][1]}]"
    })
    
    rows_for_csv.append({
        'Category': 'Iteration Progression',
        'Model': iteration_2_result['model'],
        'Setup / Preprocessing': iteration_2_result['description'],
        'Accuracy': iteration_2_result['accuracy'],
        'Precision': iteration_2_result['precision'],
        'Recall': iteration_2_result['recall'],
        'F1-Score': iteration_2_result['f1_score'],
        '5-Fold CV F1 (Mean ± Std)': f"{iteration_2_result['cv_mean_f1']:.4f} ± {iteration_2_result['cv_std']:.4f}",
        'Confusion Matrix [TN, FP; FN, TP]': f"[{cm_it2[0][0]}, {cm_it2[0][1]}; {cm_it2[1][0]}, {cm_it2[1][1]}]"
    })
    
    # Model Comparison rows
    for model_res in final_comparison:
        cm = model_res['confusion_matrix']
        rows_for_csv.append({
            'Category': 'Final Model Comparison',
            'Model': model_res['model'],
            'Setup / Preprocessing': 'Stratified 80/20 Split + 5-Fold Stratified CV + Scaler Pipeline',
            'Accuracy': model_res['accuracy'],
            'Precision': model_res['precision'],
            'Recall': model_res['recall'],
            'F1-Score': model_res['f1_score'],
            '5-Fold CV F1 (Mean ± Std)': f"{model_res['cv_mean_f1']:.4f} ± {model_res['cv_std']:.4f}",
            'Confusion Matrix [TN, FP; FN, TP]': f"[{cm[0][0]}, {cm[0][1]}; {cm[1][0]}, {cm[1][1]}]"
        })
        
    csv_df = pd.DataFrame(rows_for_csv)
    csv_path = os.path.join(artifacts_dir, 'final_model_evaluation.csv')
    csv_df.to_csv(csv_path, index=False)
    print(f"Summary table saved to: {csv_path}")
    
    return summary_output, csv_df

if __name__ == '__main__':
    run_experiment()
