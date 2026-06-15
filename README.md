# 🎨 CollabDraw

CollabDraw is a real-time collaborative drawing application built for seamless teamwork, classrooms, and creative minds. It allows multiple users to join a shared room and draw together on a digital canvas in real time.

## 🚀 Tech Stack

This project is a full-stack **Turborepo** monorepo featuring:

### Frontend
- **Next.js 15 (App Router)**: Fast, server-rendered React application.
- **Tailwind CSS v4**: Beautiful, custom-designed premium glassmorphic UI.
- **Lucide React**: Crisp, modern SVG icons.

### Backend & Real-time
- **Node.js & Express (`http_backend`)**: RESTful API for user authentication and room management.
- **WebSocket Server (`ws_backend`)**: High-performance real-time drawing synchronization.

### Database
- **PostgreSQL (Supabase)**: Relational database for storing user accounts, rooms, and chat logs.
- **Prisma ORM**: Type-safe database access and schema migrations.

---

## 📂 Project Structure

```text
collabdraw/
├── apps/
│   ├── collabdraw_frontend/  # Next.js web application
│   ├── http_backend/         # Express REST API (Auth & Rooms)
│   └── ws_backend/           # WebSocket server for real-time collaboration
├── packages/
│   ├── db/                   # Prisma ORM schema and generated client
│   ├── ui/                   # Shared React components library
│   ├── common/               # Shared TypeScript types and logic
│   └── eslint-config/        # Shared linting configuration
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/en) (v18+)
- [pnpm](https://pnpm.io/) package manager
- A [Supabase](https://supabase.com/) account (or local PostgreSQL database)

### 1. Install Dependencies
Run the following from the root directory:
```bash
pnpm install
```

### 2. Environment Variables
You need to set up your environment variables for the database and JWT secrets. 

Create a `.env` file in `packages/db`, `apps/http_backend`, and `apps/ws_backend`:
```env
# Shared Database URL (Use direct connection port 5432 for Prisma)
DATABASE_URL="postgresql://user:password@host:5432/postgres"

# Backend secrets (for both http_backend and ws_backend)
JWT_SECRET="your_super_secret_jwt_string"
```

For the frontend, create `.env` in `apps/collabdraw_frontend`:
```env
NEXT_PUBLIC_HTTP_BACKEND_URL="http://localhost:3001/"
NEXT_PUBLIC_WS_BACKEND_URL="ws://localhost:8080"
```

### 3. Initialize the Database
Push your Prisma schema to your database to create the necessary tables:
```bash
cd packages/db
npx prisma db push
```

### 4. Run the Development Servers
Start everything simultaneously using Turborepo from the root folder:
```bash
pnpm run dev
```

This will spin up:
- The Next.js frontend on `http://localhost:3000`
- The HTTP backend on `http://localhost:3001`
- The WebSocket backend on `ws://localhost:8080`

---

## ☁️ Deployment

### Database
Deploy a PostgreSQL instance on **Supabase**. Ensure you use the **direct connection** (Port `5432`) for `prisma db push` and the connection pooler (Port `6543` with `?pgbouncer=true`) for the backend APIs if under heavy load.

### Backends (Render / Railway)
Both `http_backend` and `ws_backend` are long-running Node processes.
- **Build Command**: `pnpm run build`
- **Start Command**: `pnpm start`
- *Make sure to provide `DATABASE_URL` and `JWT_SECRET` as environment variables.*

### Frontend (Vercel)
The `collabdraw_frontend` is optimized for **Vercel**.
- Set the **Root Directory** to `apps/collabdraw_frontend`.
- Provide the `NEXT_PUBLIC_HTTP_BACKEND_URL` and `NEXT_PUBLIC_WS_BACKEND_URL` environment variables pointing to your deployed backend URLs.

---

*Maintained by Prince Agrawal*
