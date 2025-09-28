#  Book Club App

A full-stack book club application where users can sign up, log in, browse books, add reviews, and manage their profiles. Built with **React** on the frontend and a backend API (e.g., Express or Django) deployed on **Render**.

---

##  Features

-  User Authentication (Sign Up / Log In / Token-based Auth)
-  Home Page
-  Books Page: View, add, edit, and delete books
-  Reviews: Add/edit/delete reviews for books
-  Profile Page: View personal information
-  React Router navigation
-  Responsive layout with a consistent **Navbar**

---

##  Tech Stack

| Frontend         | Backend                          |
|------------------|----------------------------------|
| React (no Vite)  | Any REST API (e.g. Express/Django) |
| React Router DOM | JWT authentication               |
| Formik & Yup     | Deployed on Render               |
| CSS              |                                  |

---

##  Project Structure
book-club-app/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ └── Navbar.js # Top navigation bar
│ │ ├── pages/ # Page components
│ │ │ ├── HomePage.js
│ │ │ ├── LoginPage.js
│ │ │ ├── SignupPage.js
│ │ │ ├── ProfilePage.js
│ │ │ └── BookPage.js
│ │ ├── App.js # Main routing component
│ │ └── index.js
│ └── package.json
└── README.md

Install dependencies
npm install

 Create an .env file

This file allows the frontend to communicate with the backend server.

REACT_APP_API_BASE_URL=https://book-club-app-ix0p.onrender.com

 Start the development server
npm start


The app will run at: http://localhost:3000



Backend

# 📘 Book Club API

This is the backend REST API for the **Book Club App**, providing authentication, book management, and review functionality. Built using **Node.js**, **Express**, and **PostgreSQL**, and deployed on **Render**.

---

## 🚀 Features

-  JWT-based user authentication
-  Register / Login endpoints
-  CRUD operations for books
-  CRUD operations for reviews
-  Protected routes with middleware
- CORS-enabled for frontend communication

---

## Tech Stack

| Technology    | Description                       |
|---------------|-----------------------------------|
| Node.js       | JavaScript runtime                |
| Express.js    | Backend framework                 |
| PostgreSQL    | Relational database               |
| JWT           | Auth with JSON Web Tokens         |
| Bcrypt        | Password hashing                  |
| dotenv        | Environment variable management   |
| CORS          | Cross-Origin Resource Sharing     |

---

##  Project Structure

book-club-app/
├── server/
│ ├── config/ # DB connection & env config
│ ├── controllers/ # Route logic
│ ├── middleware/ # Auth & error handling
│ ├── models/ # Sequelize / ORM models
│ ├── routes/ # API routes (auth, books, reviews)
│ ├── .env # Environment variables
│ ├── server.js # App entry point
│ └── README.md


---

## ⚙️ Setup Instructions

 Install dependencies
npm install

 Set up the .env file

Create a .env file in the /server directory:

PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_super_secret_key


 If deploying on Render, these should be set in the Environment Variables section of your Render service.

 Run the backend locally
npm run dev


Server runs on: http://localhost:5000

 API Endpoints
 Auth
Method	Endpoint	Description
POST	/api/signup	Register user
POST	/api/login	Login and get JWT
 Books
Method	Endpoint	Description
GET	/api/books	List all books (auth)
POST	/api/books	Create a new book
PATCH	/api/books/:id	Edit a book
DELETE	/api/books/:id	Delete a book
Reviews
Method	Endpoint	Description
GET	/api/reviews	List all reviews (auth)
POST	/api/reviews	Create a review
PATCH	/api/reviews/:id	Edit a review
DELETE	/api/reviews/:id	Delete a review
 Deployment

This backend is deployed on Render:

API Base URL: https://book-club-app-ix0p.onrender.com

Used by the React frontend via .env:

REACT_APP_API_BASE_URL=https://book-club-app-ix0p.onrender.com

Aurthor:Queentel




