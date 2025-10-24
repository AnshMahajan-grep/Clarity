# Backend (Clarity)

Node.js + Express backend for Clarity. Uses MongoDB (Atlas) for persistence and JWT for authentication.

Setup

```cmd
cd backend
npm install
copy .env.example .env
# edit .env to set MONGO_URI and JWT_SECRET
node server.js
```

Environment
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWT tokens
- `CLIENT_URL` — frontend origin allowed by CORS (default http://localhost:5173)
- `EMAIL_REGEX` — optional JS regex string to restrict registration emails

Production notes
- If `NODE_ENV=production`, the server will serve static files from `../frontend/dist`. Build the frontend before starting in production.
