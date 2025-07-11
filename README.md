# 🔗 URL Shortener API (NestJS)

This is a secure and scalable **URL Shortener** backend application built with **NestJS**, **MongoDB**, and **JWT authentication**. Users can register, log in, shorten URLs, track statistics, and manage access — all with rate-limited API access.

---

## 🚀 Deployed Backend

**Live URL**:  
[https://url-shortener-c16e.onrender.com](https://url-shortener-c16e.onrender.com)

---

## ⚙️ Local Setup Instructions

Follow the steps below to set up and run the project locally:

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud like Atlas)
- `npm` or `yarn`

### 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Priyanshu15092001/Markopolo-Assignment.git
   cd Markopolo-Assignment
   ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    Create a `.env` file at the root and add:
    ```bash
    MONGODB_URI=your_mongo_connection_string
    JWT_SECRET=your_secret_key
    PORT=3000
    BASE_URL=http://localhost:3000
    ```

4. **Run the server**:
    ```bash
    npm run start:dev
    ```

5. **Access the API locally**:
- API base: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/docs`

## 📘 Swagger API Documentation

Explore all endpoints via Swagger:  
📚 [Swagger Docs](https://url-shortener-c16e.onrender.com/docs)

---

## 📌 API Endpoints Overview

### 🔐 Auth Routes
| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | `/auth/register`   | Register a new user        |
| POST   | `/auth/login`      | Login and get JWT token    |

### 🔗 URL Shortening Routes *(JWT required)*
| Method | Endpoint                    | Description                      |
|--------|-----------------------------|----------------------------------|
| POST   | `/api/shorten`              | Shorten a long URL               |
| GET    | `/api/stats/:shortCode`     | Get click stats for a short URL  |

### ↪️ Redirection
| Method | Endpoint        | Description               |
|--------|------------------|---------------------------|
| GET    | `/r/:shortCode`    | Redirect to original URL  |

---

## 🧪 Rate Limiting

| Route            | Limit               |
|------------------|---------------------|
| `/api/shorten`   | 2 requests / 10 sec |
| `/api/stats/:id` | 5 requests / 30 sec |

> Global rate limit: 10 requests / minute per IP

---

## 🎥 Video Demo

Watch the video explanation of the project:  
🎬 [Project Walkthrough](https://youtu.be/B6fZXpwqJIE)  

---

## ✅ Bonus Features Completed

- [x] ✅ **Authentication & Token Protection** (JWT-based)
- [x] ✅ **API Rate Limiting using `@nestjs/throttler`**
- [x] ✅ **Swagger UI integration**
- [ ] ⬜ Dockerization

---

## 🛠️ Tech Stack

- **NestJS**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **Swagger** for API docs
- **ThrottlerModule** for rate limiting
