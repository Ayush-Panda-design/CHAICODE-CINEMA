# 🎬 ChaiCode Cinema – Seat Booking Backend

A production-style Node.js + Express + PostgreSQL seat booking app with JWT authentication, modular architecture, and concurrency-safe transactions.

---

## 📁 Project Structure

```
root/
├── index.mjs                   # Entry point – mounts HTML routes + starts server
├── index.html                  # Seat booking UI (JWT-protected)
├── login.html                  # Login form
├── register.html               # Registration form
├── init.sql                    # DB seed – runs automatically on first Docker start
├── Dockerfile
├── docker-compose.yml
├── .env                        # Environment variables (copy from .env.example)
├── .gitignore
├── package.json
└── src/
    ├── app.js                  # Express app factory – mounts all modules
    ├── common/
    │   ├── config/
    │   │   └── db.js           # pg Pool (reads from .env)
    │   ├── middleware/
    │   │   ├── auth.middleware.js     # JWT verification → req.user
    │   │   └── validate.middleware.js # Required-field checker
    │   └── utils/
    │       ├── jwt.utils.js    # signToken / verifyToken
    │       ├── api-response.js # apiSuccess / apiError helpers
    │       └── api-error.js    # Custom ApiError class
    └── modules/
        ├── auth/
        │   ├── auth.controller.js
        │   ├── auth.routes.js
        │   └── auth.service.js
        ├── booking/
        │   ├── booking.controller.js
        │   ├── booking.routes.js
        │   └── booking.service.js   # Original transaction logic preserved
        └── seat/
            ├── seat.controller.js
            ├── seat.routes.js
            └── seat.service.js
```

---

## 🚀 Quick Start (Docker – Recommended)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### 1. Clone & configure

```bash
git clone <your-repo-url>
cd cinema-booking
cp .env .env.local   # optionally customise values
```

### 2. Start everything

```bash
docker compose up --build
```

This will:
- Pull the `postgres:16-alpine` image
- Create the database, `users` table, and seed 20 seats automatically via `init.sql`
- Build and start the Node.js app

### 3. Open the app

```
http://localhost:8080
```

You'll be redirected to `/login`. Register first, then book seats.

---

## 🐳 Docker Commands Reference

| Action | Command |
|---|---|
| Start all services (foreground) | `docker compose up` |
| Start all services (detached) | `docker compose up -d` |
| Build & start (after code changes) | `docker compose up --build` |
| Stop all services | `docker compose down` |
| Stop & remove volumes (reset DB) | `docker compose down -v` |
| View live logs | `docker compose logs -f` |
| View app logs only | `docker compose logs -f app` |
| View DB logs only | `docker compose logs -f db` |
| Restart only the app | `docker compose restart app` |
| Open a shell in the app container | `docker compose exec app sh` |
| Open psql in the DB container | `docker compose exec db psql -U postgres -d cinema_db` |
| List running containers | `docker compose ps` |

---

## 🛠️ Local Development (Without Docker)

### Prerequisites
- Node.js 20+
- PostgreSQL running locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Edit `.env` and point `DB_HOST`, `DB_PORT`, etc. to your local Postgres instance:

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=cinema_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### 3. Create database & seed

Connect to your Postgres and run:

```bash
psql -U postgres -c "CREATE DATABASE cinema_db;"
psql -U postgres -d cinema_db -f init.sql
```

### 4. Run the server

```bash
# Production
npm start

# Development (auto-restart on file change)
npm run dev
```

---

## 🔌 API Reference

### Auth

| Method | Path | Body | Auth | Description |
|---|---|---|---|---|
| POST | `/auth/register` | `{ email, password }` | ❌ | Register new user |
| POST | `/auth/login` | `{ email, password }` | ❌ | Login, returns JWT |

### Seats

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/seats` | ❌ | Get all seats |

### Booking

| Method | Path | Auth | Description |
|---|---|---|---|
| PUT | `/booking/:id/:name` | ✅ Bearer JWT | Book seat by ID (uses `req.user.email`, ignores `:name`) |

---

## 🔐 Auth Flow

```
1. POST /auth/register  →  account created
2. POST /auth/login     →  { token, email }
3. Store token in localStorage
4. PUT /booking/:id/:name  with  Authorization: Bearer <token>
```

---

## 🏦 Transaction Safety

The booking endpoint uses PostgreSQL row-level locking to prevent double-booking under concurrent requests:

```sql
BEGIN;
SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE;
-- If no row → ROLLBACK (seat taken)
UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1;
COMMIT;
```

This logic is preserved **exactly** from the original starter code.

---

## 🧩 Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8080` | HTTP server port |
| `DB_HOST` | `db` (Docker) / `localhost` | Postgres host |
| `DB_PORT` | `5432` | Postgres port |
| `DB_USER` | `postgres` | Postgres username |
| `DB_PASSWORD` | `postgres` | Postgres password |
| `DB_NAME` | `cinema_db` | Database name |
| `JWT_SECRET` | *(set this!)* | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | `7d` | JWT expiry duration |

> ⚠️ **Change `JWT_SECRET` before deploying to production.**

---

## 📦 Tech Stack

- **Runtime**: Node.js 20 (ESM)
- **Framework**: Express 4
- **Database**: PostgreSQL 16
- **Auth**: bcrypt + jsonwebtoken
- **Frontend**: Vanilla JS + Tailwind CSS CDN
- **Containerisation**: Docker + Docker Compose