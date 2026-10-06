# Setup Guide

Follow these instructions to set up the CareerCompass project locally.

## 1. Environment Setup
Copy `.env.example` to `.env` and configure your local settings.

## 2. Database
Run `docker-compose up -d postgres` to start the database.
The database schema and seeds will be applied automatically on the first start.

## 3. ML Service
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 4. Backend
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

## 5. Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to access the application.
