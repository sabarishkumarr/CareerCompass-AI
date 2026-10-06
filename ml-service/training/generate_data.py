import numpy as np
import pandas as pd
import os

def generate_placement_dataset(n_samples=9939, random_state=42):
    """
    Generate synthetic placement dataset with realistic feature correlations.
    This simulates a real college placement dataset with 9939 records.
    """
    np.random.seed(random_state)
    n = n_samples
    
    # Generate features with realistic distributions
    # IQ: Normal distribution, mean=100, std=15, range=[70,140]
    iq = np.random.normal(100, 15, n).clip(70, 140).astype(int)
    
    # Previous Semester Result: range=[40,100], normal dist
    prev_sem = np.random.normal(72, 15, n).clip(40, 100).round(1)
    
    # CGPA: range=[5.0,10.0], students tend toward 7-8
    cgpa = np.random.normal(7.3, 1.0, n).clip(5.0, 10.0).round(2)
    
    # Academic Performance: 1-10 scale
    academic_perf = np.random.normal(6.5, 2.0, n).clip(1, 10).astype(int)
    
    # Extra-Curricular Score: 1-10
    extra_curr = np.random.normal(5.5, 2.5, n).clip(1, 10).astype(int)
    
    # Communication Skills: 1-10 (most important feature)
    comm_skills = np.random.normal(6.0, 2.2, n).clip(1, 10).astype(int)
    
    # Projects Completed: 0-10, Poisson distributed
    projects = np.random.poisson(2.5, n).clip(0, 10).astype(int)
    
    # Internship Experience: binary (0/1), ~40% have experience
    internship = (np.random.random(n) > 0.60).astype(int)
    
    # Generate placement probability using logistic function
    # Feature importance matches prototype: comm>iq>projects>cgpa>prev_sem>extra>academic>internship
    logit = (
        -4.5                          # intercept
        + 0.025 * (comm_skills * 10)  # communication: ~27% importance
        + 0.022 * iq                  # IQ: ~25% importance  
        + 0.018 * (cgpa * 10)         # CGPA: ~17%
        + 0.015 * (projects * 10)     # projects: ~17%
        + 0.010 * prev_sem            # prev semester: ~11%
        + 0.003 * (extra_curr * 10)   # extra-curr: ~1%
        + 0.003 * (academic_perf * 10)# academic: ~1%
        + 0.002 * internship * 100    # internship: ~0.3%
        + np.random.normal(0, 0.8, n) # noise
    )
    
    prob = 1 / (1 + np.exp(-logit))
    placement = (np.random.random(n) < prob).astype(int)
    
    df = pd.DataFrame({
        'IQ': iq,
        'Previous_Semester_Result': prev_sem,
        'CGPA': cgpa,
        'Academic_Performance': academic_perf,
        'Extra_Curricular_Score': extra_curr,
        'Communication_Skills': comm_skills,
        'Projects_Completed': projects,
        'Internship_Experience': internship,
        'Placement': placement
    })
    
    return df

if __name__ == '__main__':
    print("Generating synthetic placement dataset...")
    df = generate_placement_dataset()
    
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/placement_data.csv', index=False)
    
    print(f"Dataset shape: {df.shape}")
    print(f"Placement rate: {df['Placement'].mean():.2%}")
    print(f"Feature correlations with Placement:")
    for col in df.columns[:-1]:
        corr = df[col].corr(df['Placement'])
        print(f"  {col}: {corr:.3f}")
    print("\nDataset saved to data/placement_data.csv")
