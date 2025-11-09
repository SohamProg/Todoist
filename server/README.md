# Full Stack TODO Helpdesk System

A role-based TODO management app built with **React**, **Express.js**, and **MongoDB**, featuring real authentication, API versioning, admin dashboard, validation, and beautiful frontend styling.

---

## 🚀 Features

- **User Registration & Login** (JWT authentication, password hashing)
- **Role-based Access** (`user` vs `admin`)
- **CRUD APIs for Todos** (Create, Read, Update, Delete)
- **Admin Dashboard:** View todos grouped by user
- **API Versioning:** Versioned routing (scope `/api/v1/...`)
- **Validation & Error Handling** (express-validator, centralized middleware)
- **Postman API Documentation**
- **Modern Frontend Design** (custom CSS in JS)
- **Logout Feature**

---

## 🗂️ Project Structure

```
backend/
  server.js
client/
  src/
    App.js
    ...other React files
```

---

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-username/todo-helpdesk.git
cd todo-helpdesk/backend
npm install
```

### 2. Run MongoDB

- Local: Ensure MongoDB is running at `mongodb://localhost:27017/tododb`
- Or use MongoDB Atlas, update connection string in `server.js`

### 3. Start Backend

```bash
node server.js
```

### 4. Setup Frontend

```bash
cd ../client
npm install
npm start
```

- App runs on `http://localhost:3000` by default

---

## 📚 Database Schema

### MongoDB (Mongoose models)

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
  userId: ObjectId,   // references User._id
  title: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 API Versioning, Validation, Error Handling

- **Scope:** All backend API endpoints are versioned under the `/api/v1/` namespace, enabling future expansion (e.g., `/api/v2/`) without breaking existing clients. This applies to all authentication, todo management, and admin-specific routes. Only the API surface is versioned—internal logic and database schemas may evolve independently.
- **Validation:** Request body schema via [`express-validator`](https://express-validator.github.io/)
- **Centralized error handler:** Returns consistent JSON errors.

---

## 📖 API Documentation

- All API documentation (**requests, responses, example payloads**) is generated and exported as a **Postman collection**.  
- See `docs/Postman_collection.json` for import into Postman and for viewing, running, or for use with API development tools.

---

## ✨ Frontend Styling

- Modern, responsive design using CSS-in-JS
- **Admin dashboard**: todos grouped by username
- **User dashboard**: only owns todos displayed

---

## 📝 Example Usage

1. **Register** new accounts (choose 'user' or 'admin' role).
2. **Login** and copy JWT token for API testing.
3. **Add todos** and **toggle completed** status, **delete todos**.
4. **Admins** can view everyone's todos grouped by user from their dashboard.

---

## 🚦 Test Endpoints

Test with Postman/Curl (replace `<id>`/`<token>` as needed):

- Register: `POST /api/register`
- Login: `POST /api/login`
- Todos:
    - Get: `GET /api/todos`
    - Add: `POST /api/todos`
    - Update: `PUT /api/todos/<id>`
    - Delete: `DELETE /api/todos/<id>`
- Admin grouped todos: `GET /api/admin/todos` (JWT required, role=admin)

---
