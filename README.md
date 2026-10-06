# CareerCompass AI

CareerCompass AI is an intelligent platform connecting students, academia, and industry through data-driven insights and machine learning.

## Architecture

```
+----------------+      +----------------+      +----------------+
|                |      |                |      |                |
|  Frontend (UI) |<---->|  Backend (API) |<---->|   PostgreSQL   |
|  (React/Vite)  |      | (Spring Boot)  |      |   (Database)   |
|                |      |                |      |                |
+----------------+      +----------------+      +----------------+
                               |
                               v
                        +----------------+
                        |                |
                        |   ML Service   |
                        |   (FastAPI)    |
                        |                |
                        +----------------+
```

## Features

- **Student Portal**: Manage profiles, view recommended careers, track progress, apply for opportunities, and get AI-driven placement predictions.
- **Industry Portal**: Post internships/jobs, evaluate candidates, matching algorithms to find the best fit.
- **Academia Portal**: Track student progress, aggregate analytics, curriculum feedback.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React, Vite, TailwindCSS |
| Backend | Java 17, Spring Boot, Spring Security |
| ML Service | Python 3.11, FastAPI, Scikit-learn |
| Database | PostgreSQL 15 |
| Infrastructure | Docker, Docker Compose |

## Prerequisites
- Java 17+
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15 (if not using Docker)

## Quick Start

### Running with Docker

The easiest way to start the required infrastructure (Database) is using Docker:

```bash
docker-compose up -d
```
This will start PostgreSQL on port `5432` and pgAdmin on port `5050`.

### Demo Accounts & Login Credentials

All demo accounts come pre-loaded with verified records and portfolios:

| Role | Email | Password | Pre-seeded Data |
|------|-------|----------|-----------------|
| **Student** | `student@careercompass.com` | `Student@123` | Alex Johnson (Stanford, CS, CGPA 8.8, 8 skills, projects) |
| **Industry / Recruiter** | `industry@careercompass.com` | `Industry@123` | Apex Cognitive Labs (San Francisco, 4 active listings) |
| **Academia / Admin** | `admin@careercompass.com` | `Admin@123` | University Admin (Institutional dashboards & analytics) |

---

### Startup Instructions

#### 1. Machine Learning Microservice (FastAPI)
```bash
cd ml-service
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```
- Interactive Swagger UI: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

#### 2. Backend (Spring Boot)
Option A (Default - PostgreSQL):
```bash
cd backend
mvn spring-boot:run
```

Option B (Self-contained / In-Memory H2 Mode):
```bash
cd backend
mvn spring-boot:run "-Dspring-boot.run.profiles=h2"
```
- REST API Base: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- H2 Console (when in H2 mode): `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:careercompass`)

#### 3. Frontend (React / Vite)
```bash
cd frontend
npm run dev
```
- Access web application: `http://localhost:5173`

## API Overview
The Backend exposes RESTful endpoints under `/api/v1/`. For details, see `docs/api.md`.

## Troubleshooting
- **Database Connection Issues**: Ensure PostgreSQL is running and credentials match `.env`
- **Port Conflicts**: Ensure ports 8080 (backend), 5173 (frontend), 8000 (ML), and 5432 (DB) are available.
