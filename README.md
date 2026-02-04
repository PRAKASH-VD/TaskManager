# Task Manager (MERN)

## Tech Stack
- Frontend: React (Vite) + TailwindCSS v4 (`@tailwindcss/vite`)
- Backend: Node.js + Express (REST API)
- Database: MongoDB
- Auth: JWT + bcrypt

## Setup Steps

### 1) Backend Environment
Create `Backend/.env`:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Database steps**
1. Create a MongoDB cluster (MongoDB Atlas or local MongoDB).
2. Copy the connection string into `MONGODB_URI`.

### 2) Frontend Environment
Create `Frontend/.env`:
```
VITE_API_URL=http://localhost:3000/api/v1
```

## How To Run

### Backend
```
cd Backend
npm install
npm run dev
```

### Frontend
```
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and calls the backend at `http://localhost:3000`.

## How Would You Scale This For Production?
1. Deploy backend on Render with autoscaling, and frontend on Netlify with proper build caching.
2. Lock down CORS to the Netlify domain and enforce HTTPS everywhere.
3. Move all secrets to managed env stores (Render/Netlify), rotate JWT secrets regularly.
4. Add MongoDB indexes for common queries (user + status + createdAt) and monitor slow queries.
5. Introduce caching (Redis) for frequent reads and task list responses.
6. Add rate limiting, request logging, and centralized error tracking (e.g., Sentry).
7. Use CI/CD to run tests, lint, and build on every push.
8. Enable database backups, monitoring, and alerts for uptime.
