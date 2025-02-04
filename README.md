# 🚀 Web Portal API

**Web Portal API** is a RESTful API built with **Node.js, Express, TypeScript, and MongoDB**.  
It provides **user authentication (JWT), role-based access (Student & Teacher), and user management**.

## 📌 Features
- 🔑 **JWT Authentication** (Login & Registration)
- 👤 **User Management** (Get user info, Delete user)
- 🛡️ **Role-Based Access Control** (`student`, `teacher`, `admin`)
- 📄 **API Documentation** via Swagger
- 🐳 **Docker Support**
- 🔐 **Secure API with CORS & Helmet**

---

## 📦 **Installation**
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/web-portal-api.git
cd web-portal-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the project root and configure the following:
```dotenv
MONGO_URI="mongodb://mongo:27017/mydatabase"
JWT_SECRET="supersecret"
PORT=5050
```

## 🚀 **Running the Server**
### 1️⃣ Start the server in development mode
```bash
npm run dev
```

The API will be available at `http://localhost:5050`.

### 2️⃣ Run the project with Docker
```bash
docker-compose up --build
```

This will start the **API** and **MongoDB** container.


## 🛠️ **API Endpoints**
### 🔑 Authentication
| Method | Endpoint              | Description             | Auth Required |
|--------|-----------------------|-------------------------|--------------|
| `POST` | `/api/auth/register`  | Register a new user    | ❌ No |
| `POST` | `/api/auth/login`     | Login & get JWT token  | ❌ No |

### 👤 User Management
| Method  | Endpoint             | Description               | Auth Required |
|---------|----------------------|---------------------------|--------------|
| `GET`   | `/api/users/me`      | Get current user profile | ✅ Yes |
| `DELETE`| `/api/users/:id`     | Delete a user (Self/Admin) | ✅ Yes |

## 🛡️ **Authentication & Security**
- API uses **JWT-based authentication**.  
- You need to send the **Bearer Token** in the `Authorization` header.  
- Example:

Authorization: Bearer YOUR_JWT_TOKEN

## 📄 **API Documentation (Swagger)**
Swagger UI is available at:  
📌 **[http://localhost:5050/api-docs](http://localhost:5050/api-docs)**  

To test protected endpoints, click **Authorize** and enter your **JWT Token**.


## 🏗 **Project Structure**
```
src/
│── config/         # Configuration files
│   ├── database.ts # MongoDB connection
│   ├── env.ts      # Environment variables
│   ├── swagger.ts  # Swagger setup
│── controllers/    # Route handlers
│   ├── auth.controller.ts
│   ├── user.controller.ts
│── models/         # Database models
│   ├── user.model.ts
│── routes/         # API routes
│   ├── auth.routes.ts
│   ├── user.routes.ts
│── services/       # Business logic
│   ├── user.service.ts
│── middlewares/    # Express middleware
│   ├── auth.middleware.ts
│── types/          # TypeScript types
│── server.ts       # Server entry point
```

## 🛠 **Docker Setup**
If you want to run the application inside Docker:

1. Build and start the containers:
```bash
docker-compose up --build
```
2. Stop containers:
```bash
docker-compose down
```

## 📝 **License**
This project is licensed under the **MIT License**.
