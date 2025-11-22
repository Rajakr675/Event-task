# Event Task – Node.js Backend

A simple and clean backend application built using **Node.js**, **Express.js**, **Knex.js**, and **PostgreSQL**.
This project supports **user authentication**, **event creation**, and **event listing with pagination + date filters**.

---

## 🚀 Tech Stack

* **Node.js + Express.js** – API development
* **PostgreSQL** – Database
* **Knex.js** – Query builder
* **Bookshelf.js** – ORM
* **JWT Authentication** – Secure login
* **bcrypt.js** – Password hashing
* **Migrations** – Database setup
* **dotenv** – Environment variable management

---

## 📂 Project Structure

```
project/
│── app.js
│── server.js
│── db.js
│── .gitignore
│── package.json
│── /migrations
│── /src
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
```

---

## 🔐 Features

### User

* User Signup
* User Login (JWT based)

### Events

* Create Event
* Get Events

  * Pagination
  * Start/End date filter

---

## 📡 API Endpoints

### Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | User Register |
| POST   | `/api/auth/login`  | User Login    |

### Events

| Method | Endpoint      | Description                            |
| ------ | ------------- | -------------------------------------- |
| POST   | `/api/events` | Create event                           |
| GET    | `/api/events` | List events (pagination + date filter) |

---
