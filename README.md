# ⛲ The Fountain

> *"Be the Fountain, Not the Stream"*

A youth entrepreneurship and goal-setting platform designed to empower African youth to become self-directed learners, ethical leaders, and innovative entrepreneurs.

---

## Mission

To empower African youth to set realistic, achievable goals — helping them take practical steps toward financial freedom and entrepreneurship rather than waiting to be employed. Not everyone can be an employee. **Be the fountain that others benefit from.**

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Frontend    | React 18, React Router v6                     |
| Backend     | Python 3.11, Flask 3.0, Flask-SQLAlchemy       |
| Database    | MySQL 8.0                                      |
| Auth        | Flask-JWT-Extended (JWT tokens)                |
| API Comm.   | Axios, Flask-CORS                              |
| Styling     | Custom CSS, Google Fonts (Poppins + Inter)     |
| ORM         | SQLAlchemy + PyMySQL                           |

---

## Features

### 🎯 Goal Setting
- Create personal, business, education, finance, and health goals
- Break goals into actionable milestones with due dates
- Track progress with visual progress bars
- Update goal status (Active / Paused / Completed)

### 📊 Business Planning
- Build structured business plans with templates
- Industry classification, target market, and revenue model sections
- Financial tracker: log income and expenses by category
- Real-time profit/loss summary dashboard

### 🤝 Mentorship
- Browse available mentors by expertise
- Send mentorship requests with personalized messages
- Mentors can accept, decline, or mark sessions complete
- View active mentorship relationships

### 💬 Community Feed
- Share success stories, tips, and questions
- Like and comment on posts
- Filter posts by category
- Role-based content (youth, mentor, entrepreneur)

### 👤 Authentication
- Register with role selection (Youth / Mentor / Entrepreneur)
- Secure login with JWT-based session management
- Role-specific dashboards and navigation

---

## Project Structure

```
The FOUNTAIN/
├── backend/                    # Flask REST API
│   ├── app.py                  # App factory & entry point
│   ├── config.py               # Configuration (DB, JWT, secrets)
│   ├── requirements.txt        # Python dependencies
│   ├── models/
│   │   ├── user.py             # User model (roles: youth/mentor/entrepreneur/admin)
│   │   ├── goal.py             # Goal & Milestone models
│   │   ├── business.py         # BusinessPlan & FinancialRecord models
│   │   ├── mentorship.py       # Mentorship request model
│   │   └── community.py        # Post & Comment models
│   └── routes/
│       ├── auth.py             # /api/auth — register, login, me
│       ├── goals.py            # /api/goals — CRUD + milestones
│       ├── business.py         # /api/business — plans + financials
│       ├── mentorship.py       # /api/mentorship — browse, request, respond
│       └── community.py        # /api/community — posts, likes, comments
│
└── frontend/                   # React SPA
    ├── public/index.html
    └── src/
        ├── App.jsx             # Routes & auth guards
        ├── index.css           # Global styles & design system
        ├── context/
        │   └── AuthContext.jsx # Auth state (login, logout, register)
        ├── data/
        │   └── mockData.js     # Seed data & pre-set user accounts
        ├── components/
        │   └── Sidebar.jsx     # Navigation sidebar
        └── pages/
            ├── Landing.jsx     # Public landing page
            ├── Login.jsx       # Sign in
            ├── Register.jsx    # Sign up with role selection
            ├── Dashboard.jsx   # Role-based home dashboard
            ├── Goals.jsx       # Goal & milestone management
            ├── BusinessPlan.jsx # Business planning & financials
            ├── Mentorship.jsx  # Mentor browsing & requests
            └── Community.jsx   # Social feed
```

---

## Database Schema

```
users           — id, name, email, password_hash, role, bio, skills, location
goals           — id, user_id, title, description, category, target_date, status
milestones      — id, goal_id, title, is_completed, due_date
business_plans  — id, user_id, business_name, industry, target_market, revenue_model, status
financial_records — id, business_plan_id, type, amount, category, description, date
mentorships     — id, mentor_id, mentee_id, status, message
posts           — id, user_id, content, category, likes
comments        — id, post_id, user_id, content
```

---

## API Endpoints

| Method | Endpoint                               | Description                    |
|--------|----------------------------------------|-------------------------------|
| POST   | /api/auth/register                     | Create account                 |
| POST   | /api/auth/login                        | Login & receive JWT token      |
| GET    | /api/auth/me                           | Get current user               |
| GET    | /api/goals/                            | Get user's goals               |
| POST   | /api/goals/                            | Create new goal                |
| PUT    | /api/goals/\<id\>                      | Update goal                    |
| DELETE | /api/goals/\<id\>                      | Delete goal                    |
| POST   | /api/goals/\<id\>/milestones           | Add milestone                  |
| PUT    | /api/goals/\<id\>/milestones/\<mid\>   | Toggle milestone               |
| GET    | /api/business/                         | Get business plans             |
| POST   | /api/business/                         | Create business plan           |
| POST   | /api/business/\<id\>/financials        | Add financial record           |
| GET    | /api/mentorship/mentors                | Browse mentors                 |
| POST   | /api/mentorship/request                | Send mentorship request        |
| PUT    | /api/mentorship/\<id\>/respond         | Accept / decline request       |
| GET    | /api/community/posts                   | Get community posts            |
| POST   | /api/community/posts                   | Create post                    |
| POST   | /api/community/posts/\<id\>/like       | Like a post                    |
| POST   | /api/community/posts/\<id\>/comments   | Comment on a post              |

---

## Getting Started

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up MySQL database
mysql -u root -p -e "CREATE DATABASE fountain_db;"

# Run the API
python app.py
# API runs on http://localhost:5000
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# App runs on http://localhost:3000
```

---

## Demo Accounts

| Role         | Email                      | Password   |
|--------------|----------------------------|------------|
| Youth        | youth@fountain.com         | youth123   |
| Mentor       | mentor@fountain.com        | mentor123  |
| Entrepreneur | entrepreneur@fountain.com  | entre123   |
| Admin        | admin@fountain.com         | admin123   |

---

## Design System

| Token        | Value     | Usage                        |
|--------------|-----------|------------------------------|
| Primary      | `#E8621A` | Buttons, highlights, CTAs    |
| Secondary    | `#2D6A4F` | Mentor role, success         |
| Accent       | `#F4A261` | Logo, sidebar, decorative    |
| Background   | `#FAFAF7` | Page background              |
| Dark         | `#1A1A2E` | Text, sidebar background     |

Fonts: **Poppins** (headings) · **Inter** (body)

---

## Author

**Des Gasana IRAKORA**
African Leadership University
Formative Assignment — January 2026

---

*The Fountain — Empowering African Youth to Create, Lead, and Thrive.*
