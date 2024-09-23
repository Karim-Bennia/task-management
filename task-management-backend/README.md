Task Management Back-End (NestJS)
This repository contains the back-end service for the Task Management system built using NestJS, MongoDB, and JWT authentication.

Setup Instructions
Prerequisites
Install Node.js (version 16.x or later).
Install MongoDB (or use a cloud database like MongoDB Atlas).
Install Docker and Docker Compose if you plan to use Docker for running this project.
Installation
Clone the repository:

bash
Copier le code
git clone https://github.com/your-repo/task-management-backend.git
cd task-management-backend
Install dependencies:

bash
Copier le code
npm install
Environment variables: Create a .env file at the root of the project and add the following variables:

bash
Copier le code
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
Running the application:

To run the application in development mode:
bash
Copier le code
npm run start:dev
Running with Docker:

Make sure Docker and Docker Compose are installed.
Build and run the Docker container:
bash
Copier le code
docker-compose up --build
Testing:

Run unit tests:
bash
Copier le code
npm run test
Run end-to-end tests:
bash
Copier le code
npm run test:e2e
