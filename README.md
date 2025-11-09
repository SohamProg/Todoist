# Full Stack TODO Helpdesk System

A role-based TODO management app built with **React**, **Express.js**, and **MongoDB**, featuring authentication, API versioning, admin dashboard, input validation, error handling, and modern frontend styling.

---

## 🚀 Features

- User registration & login (JWT authentication)
- Role-based access: `user` and `admin`
- CRUD APIs for todos (Create, Read, Update, Delete)
- Admin dashboard: view todos grouped by user
- API versioning: `/api/v1/...`
- Input validation & centralized error handling
- API documentation via Postman collection
- Responsive frontend (custom CSS-in-JS)
- Secure logout

---

## 🗂️ Project Structure

```
todo-helpdesk/
  backend/
    server.js
    .env
    package.json
  client/
    src/
      App.js
    package.json
  docs/
    Postman_collection.json
  README.md
```

---

## 🛠️ Setup Instructions

### 1. Prerequisites

- **Node.js** (v14 or higher): [Download](https://nodejs.org/)
- **MongoDB Community Server** ([Install guide](https://www.mongodb.com/try/download/community))
- **Git** ([Install guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/todo-helpdesk.git
cd todo-helpdesk
```

---

### 3. Backend Setup

```bash
cd backend
```

#### a) Install dependencies
```bash
npm install
```

#### b) Set up environment variables
Create a `.env` file in the backend folder:
```
MONGODB_URI=mongodb://localhost:27017/tododb
JWT_SECRET=your_jwt_secret_here
PORT=5000
```
> **Tip:** Never commit `.env` to public repositories.

#### c) Start MongoDB server
- On macOS/Linux:
  ```
  mongod --dbpath /path/to/your/dbfolder
  ```
- On Windows:  
  Open MongoDB Compass, or run `mongod.exe` from installation directory.

#### d) Start backend server
```bash
node server.js
```
Backend runs at `http://localhost:5000`

---

### 4. Frontend Setup

```bash
cd ../client
npm install
npm start
```
Frontend runs at `http://localhost:3000`

---

### 5. API Documentation (Postman)

- All API endpoints, request/response examples, and workflows are documented in the provided `docs/Postman_collection.json`.
- **To use:**  
  1. Open [Postman](https://www.postman.com/).
  2. Click Import > select the collection JSON.
  3. Browse and send requests using your local server URLs.

---

## 📚 Database Schema

### MongoDB (Mongoose Models)

**User**
```js
{
  username: String,
  password: String (hashed),
  role: "user"|"admin",
  createdAt: Date
}
```
**Todo**
```js
{
  userId: ObjectId,    // references User._id
  title: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 API Versioning, Validation, Error Handling

- **Versioning:** All backend API endpoints are under `/api/v1/` (ready for future `/v2/`)
- **Validation:** All essential input parameters are validated (see endpoints)
- **Centralized error handler:** Consistent JSON error responses

---

## 📖 API Summary

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | /api/register         | Register new user          |
| POST   | /api/login            | Login and get JWT token    |
| GET    | /api/todos            | Get own todos (user) or all (admin)|
| POST   | /api/todos            | Add a new todo             |
| PUT    | /api/todos/:id        | Update a todo              |
| DELETE | /api/todos/:id        | Delete a todo              |
| GET    | /api/admin/todos      | Admin: todos grouped by user|

---

### Error Format

All errors:
```json
{ "message": "Error message..." }
```

---

## 🔐 Example Usage

1. Register as user or admin.
2. Login to receive JWT token.
3. Use token as `Authorization: Bearer <token>` for all requests.
4. Manage todos; admin can view all users' todos via special dashboard.

---

## ✨ Scalability Note

This app is easily scalable:  
- MongoDB supports sharding and replica sets for high volume.  
- Express servers can be load balanced or containerized (Docker, Kubernetes).  
- Stateless JWT authentication makes horizontal scaling simple.  
- Managed MongoDB (Atlas) and cloud infrastructure (AWS/GCP/Azure) further enhance scalability.

---

## 💬 Support

Please open issues for bugs or feature requests, and see `Postman_collection.json` for full API usage examples.

---
