# Clinic Management System (Full-Stack)

Production-style clinic management platform with public website, role-based authentication, and dashboards for Admin, Doctor, and Patient.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT + role-based access control

## Implemented Modules

- Public website pages: Home, About, Doctors, Services, Contact
- Authentication: Register, Login, Forgot Password, Protected profile endpoint
- Admin APIs: analytics, doctor CRUD, patients list, appointments list
- Doctor APIs: appointments, status updates, schedule, medical notes/prescriptions
- Patient APIs: doctors list, appointment booking/history, records, profile
- Responsive dashboard layouts with clean medical UI and glassmorphism cards

## Folder Structure

```
backend/
  src/
    config/ controllers/ middleware/ models/ routes/ utils/
frontend/
  src/
    components/ context/ pages/ services/
```

## Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Core API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/auth/me`
- `GET /api/public/content`
- `GET /api/admin/analytics`
- `GET /api/doctor/appointments`
- `POST /api/patient/appointments`

## Notes

- Configure SMTP in backend `.env` for real email notifications.
- For production, replace development JWT secret and use secure CORS origins.
- Add validation, rate limiting, and audit logging before deployment to regulated environments.
