# 🌙 Dream Journal — Backend API

🔗 **Frontend App (Live)**: [https://dream-journal-f.vercel.app/](https://dream-journal-f.vercel.app/)

Welcome to the **Dream Journal** backend — an app where users can log, view, and analyze their dreams. This project is built using **NestJS**, **TypeORM**, and **JWT** for authentication.

---

## 🚀 Technologies Used

- ⚙️ NestJS
- 🗃️ PostgreSQL (via TypeORM)
- 🔐 JWT (JSON Web Tokens)
- 🛡️ Passport.js
- ☁️ Render for deployment

---

## 📦 API Endpoints

### 🔐 Authentication (/auth)
- POST /auth/register — Register a new user
- Body: { "username": "user", "password": "pass" }

- POST /auth/login — Log in and receive a token
- Body: { "username": "user", "password": "pass" }

- GET /auth/me — Get data of the authenticated user
- Header: Authorization: Bearer <token>

### 🌙 Dreams (/dreams)

- POST /dreams — Create a new dream
- GET /dreams — Get all dreams from the authenticated user
- GET /dreams/:id — Get a specific dream by ID
- PUT /dreams/:id — Edit a dream
- DELETE /dreams/:id — Delete a dream



----

## 📬 Contact

Created by **Facundo Robert** – [GitHub](https://github.com/RobertFacundo)  

Feel free to reach out for collaboration or feedback!

----