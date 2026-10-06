# API Documentation

## Base URL
`http://localhost:8080/api/v1`

## Authentication
- `POST /auth/login`: Authenticate and receive JWT
- `POST /auth/register`: Register a new user

## Profiles
- `GET /profiles/student/me`: Get current student profile
- `PUT /profiles/student/me`: Update student profile

## Opportunities
- `GET /opportunities`: List available opportunities
- `POST /opportunities`: Create an opportunity (Industry)
- `GET /opportunities/{id}`: Get opportunity details

## Applications
- `POST /applications`: Apply for an opportunity
- `GET /applications/me`: List user applications

## ML Predictions
- `GET /predictions/placement`: Get placement probability prediction for a student
