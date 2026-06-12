#  Asset Management System

> A full-stack web application built for **IIT Roorkee's Cultural Council** to streamline the booking, issuance, and return of physical assets — replacing manual processes with a clean, role-based digital workflow.
> by @uttkarshshrivastav & @LokonGit

---

##  Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Contributing](#contributing)

---

---
### [Deliverables](https://drive.google.com/drive/folders/1vdBn836p6gLMXNURSehqQ9ARHJJ3I9Xg?usp=sharing)
---

## Overview

The Asset Management System allows students and council members to browse and request assets (equipment, props, instruments, etc.), while admins manage the full lifecycle — approving, issuing, and marking returns. All booking statuses are tracked in real time and visible to the requesting user.

---

##  Features

###  User
- Browse all available assets with details
- Submit booking requests for specific assets
- Track booking status in real time (Pending → Approved → Issued → Returned)

###  Admin
- View all incoming booking requests
- Approve or reject bookings with a reason
- Issue assets to approved users
- Mark assets as returned after use
- Access analytics dashboard (booking trends, top assets, utilization rates, category distribution)

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router v7 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| HTTP Client | Axios |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL via Supabase |
| Auth | JSON Web Tokens (JWT) |
| Validation | express-validator |
| Password Hashing | bcryptjs |
| Scheduled Jobs | node-cron |

---

## Project Structure

```
Cult_OP/
├── Frontend/               # React + Vite application
│   ├── src/
│   │   ├── pages/          # Route-level page components
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Axios API call functions
│   │   └── utils/          # Helper utilities
│   ├── .env.example
│   └── package.json
│
└── Backend/                # Express REST API
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── routes/         # Route definitions
    │   ├── middlewares/    # Auth, validation, error handling
    │   ├── models/         # DB query functions
    │   └── services/       # Business logic
    ├── .env.example
    └── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- A [Supabase](https://supabase.com/) project with PostgreSQL database

---

### 1. Clone the Repository

```bash
git clone https://github.com/LokonGit/Cult_OP.git
cd Cult_OP
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Fill in the required values in `.env` (see [Environment Variables](#environment-variables) below), then start the server:

```bash
npm start
```

The backend will start on the port defined in your `.env` (default: `5000`).

---

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Set the backend URL in `.env` to match the port your backend is running on (see [Environment Variables](#environment-variables) below), then start the dev server:

```bash
npm run dev
```

---

## Environment Variables

### Backend — `.env`

Refer to `Backend/.env.example` for all required keys. Key variables include:

| Variable | Description |
|---|---|
| `PORT` | Port the Express server runs on (e.g. `5000`) |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anon/public API key |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`) |

### Frontend — `.env`

Refer to `Frontend/.env.example` for all required keys. Key variables include:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Full base URL of the backend (e.g. `http://localhost:5000/api/v1`) |

>  Make sure `VITE_API_BASE_URL` matches the `PORT` set in your backend `.env`.

## API Reference

All endpoints are prefixed with `/api/v1`.

---

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register a new user |
| `POST` | `/login` | Public | Login and receive JWT token |
| `GET` | `/me` | User | Get current logged-in user details |

---

###  Assets — `/api/v1/assets`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | User | Get all assets |
| `GET` | `/:id` | User | Get a single asset by ID |
| `POST` | `/` | Admin | Create a new asset |
| `PUT` | `/:id` | Admin | Update an asset |
| `DELETE` | `/:id` | Admin | Delete an asset |

---

###  Bookings — `/api/v1/bookings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/` | User | Create a new booking request |
| `GET` | `/my` | User | Get all bookings of current user |
| `GET` | `/` | Admin | Get all bookings |
| `GET` | `/:id` | User/Admin | Get a specific booking by ID |
| `PATCH` | `/:id/approve` | Admin | Approve a booking |
| `PATCH` | `/:id/reject` | Admin | Reject a booking |
| `PATCH` | `/:id/issue` | Admin | Mark asset as issued |
| `PATCH` | `/:id/return` | Admin | Mark asset as returned |

---

###  Analytics — `/api/v1/analytics`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/dashboard` | Admin | Get overall dashboard summary |
| `GET` | `/top-assets` | Admin | Get most booked assets |
| `GET` | `/utilization` | Admin | Get asset utilization rates |
| `GET` | `/booking-trend` | Admin | Get booking trend over time |
| `GET` | `/category-dist` | Admin | Get bookings by category distribution |

---

## Contributing

This project is maintained by the **IIT Roorkee Cultural Council**. For any issues, feature requests, or contributions, please open an issue or pull request on the [GitHub repository](https://github.com/LokonGit/Cult_OP).

---

<p align="center">Built with ❤️ for IIT Roorkee Cultural Council</p>
