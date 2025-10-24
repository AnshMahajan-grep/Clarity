# Clarity

Clarity is a full-stack MERN application to centralize academic announcements and personal tasks for students. It provides batch-filtered announcements, personal task management, JWT-based authentication, and a clean responsive UI built with React + Vite and plain CSS.

This repository contains two folders:
- `backend/` — Node.js + Express API, MongoDB models, routes.
- `frontend/` — React + Vite frontend with plain CSS.

Quick start (development)

1. Start backend

```cmd
cd backend
npm install
copy .env.example .env
REM edit .env to set MONGO_URI and JWT_SECRET
node server.js
```

2. Start frontend

```cmd
cd frontend
npm install
copy .env.example .env
npm run dev
```

Production (basic)

1. Build frontend

```cmd
cd frontend
npm run build
```

2. Start backend configured with `NODE_ENV=production` and ensure `CLIENT_URL` is set if needed. The backend will serve the built frontend from `../frontend/dist`.

Notes
- See `backend/.env.example` and `frontend/.env.example` for environment variables.
- The backend has protected routes; register and login to obtain a JWT stored in `localStorage` by the frontend.

Next steps
- Add email verification, stronger input validation, and production-grade logging.
