Setup Instructions

Prerequisites
Install Node.js (version 16.x or later).
Install Docker and Docker Compose if you plan to use Docker for running this project.
Installation
Clone the repository:
git clone https://github.com/your-repo/task-management-frontend.git

cd task-management-frontend
Install dependencies:
npm install

Environment variables: Create a .env.local file at the root of the project and add the following variables:
NEXT_PUBLIC_API_URL=http://localhost:4000
Running the application:
npm run dev

Running with Docker:
Make sure Docker and Docker Compose are installed.
Build and run the Docker container:

docker-compose up --build

Testing:
Run tests using the following command:
npm run test