

# Expense Tracker v1

A full-stack web application for tracking personal expenses — built with React on the frontend and Node.js + Express on the backend.

## 🚀 Demo

Live frontend: [https://expense-tracker-v1-silk.vercel.app](https://expense-tracker-v1-silk.vercel.app)
Live backend: (deployed on Render)
Google OAuth login is integrated, and users can securely manage their expenses.

---

## 🧩 Tech Stack

**Frontend**

* React (using Vite)
* React Router for client-side routing
* `react-hot-toast` for notifications
* Deployed on Vercel

**Backend**

* Node.js + Express
* Authentication via Google OAuth2 (using `passport-google-oauth20`)
* MongoDB (Atlas) with Mongoose for database access
* JWT for session/token management
* Deployed on Render

---

## ✅ Features

* User registration & login via Google OAuth
* JWT token issuance and HTTP-only cookie storage
* CRUD operations for expenses/transactions
* Filtering, sorting, and pagination of transactions
* Protected routes (dashboard) that require authentication
* Responsive UI — works on desktop & mobile

---

## 📁 Project Structure

```
root/
 ├─ client/          ← React frontend  
 │   ├─ src/         ← React components, pages  
 │   └─ …  
 └─ server/          ← Backend API  
     ├─ database/    ← Mongoose schemas & DB connection  
     ├─ auth/        ← Passport strategy + session logic  
     └─ …  
```

---

## 🛠️ Setup Instructions

### Backend

1. Clone the repo:

   ```bash
   git clone https://github.com/Mohd-Akbar1/expense-tracker-v1.git
   cd expense-tracker-v1/server
   ```
2. Create a `.env` file and add the following (replace with your values):

   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=https://your-deployment/api/auth/google/callback
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   CLIENT_URL=https://your-front-url
   JWT_SECRET=your_jwt_secret
   ```
3. Install dependencies & run:

   ```bash
   npm install
   npm run dev
   ```

   

### Frontend

1. Navigate to the client folder:

   ```bash
   cd ../client
   ```

2. Install & start:

   ```bash
   npm install
   npm run dev
   ```

   Then open your browser at `http://localhost:5173`.

---

## 📌 Important Deployment Notes

* On **MongoDB Atlas**, ensure you whitelist `0.0.0.0/0` in Network Access to allow connections from Render (or any host).
* On **Vercel**, to support client-side routing (e.g., `/auth/callback`, `/dashboard`), add a `vercel.json` at your frontend root:

  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/" }
    ]
  }
  ```
* In your backend, set the full callback URL in `GoogleStrategy`, e.g.:

  ```js
  callbackURL: process.env.GOOGLE_CALLBACK_URL
  ```
* Make sure the `CLIENT_URL` in the backend env matches exactly your front deployment URL (including `https://`).

---

## 🧪 Usage Flow

1. Visit the frontend and click “Sign in with Google”.
2. After authentication, you're redirected to `/auth/callback?token=<JWT>`.
3. The frontend reads the token (from URL), stores it (e.g., localStorage), and redirects to the dashboard.
4. The dashboard fetches transactions from the API (backend) using the token.
5. You can add, view, filter, and sort your expenses.





Thanks to all the open-source libraries used (React, Express, Mongoose, Passport) and the great developer community for inspiration and support.


