# EduTrack - University Management System

A full-stack MERN application to manage students, courses, grades, and attendance.

## Features
- **Role-Based Access:** Admin, Faculty, and Student dashboards.
- **Admin:** Manage courses, enroll students, and view analytics.
- **Faculty:** Mark attendance and upload student grades.
- **Student:** View personal report cards and attendance logs.
- **Analytics:** Search filter and CSV Export functionality.

## Tech Stack
- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, JWT Authentication, Bcrypt
- **Database:** MongoDB (Mongoose)

## Installation
1. Clone the repo: `git clone <your-link>`
2. Install dependencies for both folders:
   - `cd backend && npm install`
   - `cd frontend && npm install`
3. Create a `.env` file in the backend with:
   - `PORT=5000`, `MONGO_URI`, `JWT_SECRET`
4. Run the project: `npm run dev`