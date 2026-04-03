# 🌾 Inno-Track — AI-Powered Smart Farming Platform

A full-stack precision agriculture platform that combines AI, satellite technology, and real-time data analytics to help farmers make smarter decisions. Built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Database](https://img.shields.io/badge/Database-MongoDB-darkgreen)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Demo Credentials](#-demo-credentials)

---

## ✨ Features

| Module | Description |
|---|---|
| 🔐 **Aadhaar Auth** | Register & login using 12-digit Aadhaar number with OTP verification |
| 🌱 **Crop Health Monitoring** | AI-powered disease detection and health analysis |
| 💧 **Smart Irrigation** | Real-time soil moisture and automated irrigation dashboard |
| 🗺️ **Farm Mapping** | GPS-based precision mapping with satellite data |
| 🤖 **AI Assistant** | Intelligent chatbot for farming queries and advice |
| 🐛 **Pest & Disease Alerts** | Early warning system for crop threats |
| 🌾 **Pre-Sowing Advisory** | Soil and weather-based crop recommendations |
| 📊 **Yield & Profit Forecast** | ML-powered harvest and revenue predictions |
| 👤 **Farmer Profile** | Personalized dashboard with farm summary |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Component-based UI
- **Vite** — Lightning-fast development server
- **Framer Motion** — Premium page transitions & animations
- **Axios** — HTTP client for API calls
- **React Router DOM** — Client-side routing

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JWT** — JSON Web Token authentication
- **CORS** — Cross-Origin Resource Sharing

### Design
- **Glassmorphism UI** — Frosted glass card design
- **Ken Burns Animation** — Cinematic background imagery
- **Blue & Green Theme** — AgriTech professional aesthetic
- **Google Fonts (Outfit)** — Modern typography

---

## 📦 Prerequisites

Make sure you have the following installed on your system:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18+ | [nodejs.org](https://nodejs.org/) |
| **MongoDB** | v6+ | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **npm** | v9+ | Comes with Node.js |

> ⚠️ **Important:** MongoDB must be running locally on port `27017` before starting the backend.

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd fsd2
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## ▶️ Running the Project

### Step 1: Start MongoDB

Make sure MongoDB is running. On Windows:

```bash
# If installed as a service, it runs automatically.
# Otherwise, start manually:
mongod
```

### Step 2: Start the Backend Server

Open a **new terminal** and run:

```bash
cd server
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected to: mongodb://127.0.0.1:27017/smartfarming
```

### Step 3: Start the Frontend Dev Server

Open **another terminal** and run:

```bash
cd client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 4: Open in Browser

Go to **[http://localhost:5173/](http://localhost:5173/)** 🎉

---

## 📁 Project Structure

```
fsd2/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Shared components
│   │   │   ├── Header.jsx     # Navigation bar with Solutions dropdown
│   │   │   ├── Footer.jsx     # Site footer with links
│   │   │   └── PageTransition.jsx  # Framer Motion wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global authentication state
│   │   ├── App.jsx            # Root component with routing
│   │   ├── Home.jsx           # Landing page
│   │   ├── AadhaarLogin.jsx   # Login with Aadhaar + OTP
│   │   ├── AadhaarRegister.jsx # Registration form
│   │   ├── Profile.jsx        # User dashboard
│   │   ├── CropHealthMonitoring.jsx
│   │   ├── IrrigationDashboard.jsx
│   │   ├── FarmMapping.jsx
│   │   ├── AIFarmingAssistant.jsx
│   │   ├── PestDiseaseAlerts.jsx
│   │   ├── PreSowingAdvisory.jsx
│   │   ├── YieldProfitForecast.jsx
│   │   ├── AboutPage.jsx
│   │   ├── contactPage.jsx
│   │   ├── style.css          # Global design system
│   │   └── main.jsx           # Entry point
│   ├── vite.config.js         # Vite config with API proxy
│   └── package.json
│
├── server/                    # Backend (Node.js + Express)
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   └── User.js            # Mongoose User schema
│   ├── routes/
│   │   ├── authRoutes.js      # Register, Login, OTP, Profile
│   │   ├── farmRoutes.js      # Farm data endpoints
│   │   └── contactRoutes.js   # Contact form handler
│   ├── server.js              # Express app entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register with Aadhaar, name, phone, district |
| `POST` | `/api/auth/request-otp` | Request OTP for an Aadhaar number |
| `POST` | `/api/auth/login` | Verify OTP and get JWT token |
| `GET` | `/api/auth/profile` | Get logged-in user's profile (requires JWT) |

### Contact

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit a contact form inquiry |

---

## 🔑 Demo Credentials

For testing the login flow:

| Field | Value |
|---|---|
| **Aadhaar** | Any 12-digit number (e.g., `123456789012`) |
| **OTP** | Any 6-digit number (e.g., `123456`) |

> 📌 Register first, then use the same Aadhaar to login.

---

## 🎨 Design System

The platform uses a unified **Deep Blue & Vibrant Green** theme:

| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#1a3c5e` | Headers, cards, text |
| `--secondary` | `#2e7d32` | Buttons, accents |
| `--accent` | `#76ba1b` | Highlights, links |
| `--light-sage` | `#f1f8e9` | Backgrounds |

---

## 📄 License

This project is built for educational and demonstration purposes.

---

**Made with 💚 by Inno-Track Team**