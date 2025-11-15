Management App. It includes:
Live at: https://subsboard.netlify.app/

✅ Overview ✅ Features ✅ Tech Stack ✅ Installation steps ✅ Environment variables ✅ Scripts ✅ Folder structure ✅ API endpoints ✅ Screenshots (placeholders for you to replace) ✅ Future improvements

You can copy–paste directly into your project.

📘 SubBoard — Subscription Management Dashboard

SubBoard is a full-stack subscription management dashboard where users can:

View subscription plans

Subscribe to plans

Manage active subscriptions

View all past subscriptions

Switch between Dark / Light mode

View an analytics dashboard with growth charts

Built with React + TypeScript, Node.js + Express, and Prisma ORM.

🚀 Tech Stack Frontend

React + TypeScript

TailwindCSS

React Router

Framer Motion

Chart.js + React-Chartjs-2

Backend

Node.js

Express

Prisma ORM

PostgreSQL (or MySQL / SQLite)

Auth

JWT Authentication

bcrypt.js password hashing

📦 Features ✔ User Features

Browse subscription plans

Subscribe to any plan

View active subscription

View all previous subscriptions

Unsubscribe

Dark / Light mode (saved in localStorage)

✔ Admin Features

Manage all subscriptions

View analytics

Monthly revenue summary

User growth charts

✔ Additional Functionality

Clean UI with Tailwind

Mobile responsive

Error handling & Toast messages

Secure protected routes

📂 Project Structure . ├── backend/ │ ├── src/ │ │ ├── controllers/ │ │ ├── middlewares/ │ │ ├── routes/ │ │ ├── services/ │ │ ├── utils/ │ │ └── index.ts │ ├── prisma/ │ │ └── schema.prisma │ └── package.json │ └── frontend/ ├── src/ │ ├── components/ │ ├── pages/ │ ├── services/ │ ├── hooks/ │ ├── styles/ │ └── main.tsx └── package.json

🛠 Installation 1️⃣ Clone the repository git clone https://github.com/yourusername/subboard.git cd subboard

🔧 Backend Setup 2️⃣ Install dependencies cd backend npm install

3️⃣ Create .env DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/subboard" JWT_SECRET="your_jwt_secret" PORT=4000

4️⃣ Prisma setup npx prisma migrate dev --name init npx prisma db seed

5️⃣ Start backend npm run dev

Backend runs on: 👉 http://localhost:4000

🎨 Frontend Setup 6️⃣ Install dependencies cd ../frontend npm install

7️⃣ Create .env VITE_API_URL="http://localhost:4000/api"

8️⃣ Run frontend npm run dev

Frontend runs on: 👉 http://localhost:5173

🔐 Authentication Flow

User logs in → Server returns JWT

Token stored in localStorage

Axios attaches JWT to every request

Protected routes validated by backend middleware

📡 API Endpoints Auth Method Endpoint Description POST /auth/register Register user POST /auth/login Login & get token Subscriptions Method Endpoint Description POST /subscription/subscribe/:planId Subscribe to a plan GET /subscription/me Get all user subscriptions GET /subscription/active Get active subscription DELETE /subscription/unsubscribe/:id Cancel subscription GET /subscription/all Admin — list all Plans Method Endpoint Description GET /plans Get all plans 🌙 Dark Mode Support

SubBoard includes full light/dark theme with Tailwind:

Auto-load from localStorage

Toggle in Navbar

Smooth transitions with Tailwind + CSS

🖼 Screenshots Dashboard (Dark Mode)

Replace with your screenshot

Plans Page

Subscription Page

📌 Future Improvements

Payment integration (Stripe)

Auto-renew system

Email notifications

Multi-user roles

User settings page
