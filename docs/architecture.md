# Architecture Documentation

CareerCompass is built using a microservices-inspired monolithic architecture, separated by concerns.

## Components

1. **Frontend (React/Vite)**
   - Manages UI and state
   - Communicates with Backend via REST API
   - Handles authentication tokens (JWT)

2. **Backend (Spring Boot)**
   - Primary business logic and API gateway
   - Manages database interactions
   - Handles authentication and authorization
   - Proxies ML requests to ML Service

3. **ML Service (FastAPI)**
   - Python-based microservice for AI predictions
   - Handles model inference (placement probability, skill matching)
   - Exposes internal REST API for Backend

4. **Database (PostgreSQL)**
   - Relational database for structured data storage
   - Contains all user profiles, skills, and application data
