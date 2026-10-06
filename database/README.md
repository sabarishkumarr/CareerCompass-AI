# Database Documentation

This folder contains the database initialization scripts for the CareerCompass application.

## Files
- `schema.sql`: Contains the complete PostgreSQL schema definition, including all tables, constraints, and performance indexes.
- `seed.sql`: Contains demo/initial data for skills, careers, and their relationships. 

## Initialization
When running `docker-compose up`, the database will automatically execute `schema.sql` followed by `seed.sql` on the first run.

## Note
User authentication data and demo users are managed separately by the Backend Spring Boot DataInitializer to ensure passwords are properly hashed using BCrypt before storage.
