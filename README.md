# 💰 SpendSmart - Full Stack Java & React Expense Tracker

A full-stack personal finance and expense management web application developed for **Full Stack Java Development** course submission.

---

## 🌟 Tech Stack

- **Frontend**: React (Vite), React Router, Vanilla CSS3 (Glassmorphism Dark Theme design system), Lucide React Icons.
- **Backend**: Java 21, Spring Boot 3.2 (Spring Web, Spring Data JPA, REST Controller, CORS WebConfig).
- **Database**: MySQL Server (supported via JDBC) / H2 In-Memory Database (built-in zero setup).

---

## 📁 Project Architecture & Directory Structure

```text
expense-tracker-fullstack/
├── backend/                             # Java Spring Boot Backend
│   ├── pom.xml                          # Maven Configuration & Dependencies
│   └── src/
│       └── main/
│           ├── java/com/expensetracker/
│           │   ├── ExpenseTrackerApplication.java
│           │   ├── config/WebConfig.java          # CORS Mapping
│           │   ├── controller/AuthController.java# User Registration & Login REST APIs
│           │   ├── controller/TransactionController.java # Transaction REST APIs
│           │   ├── dto/AuthRequest.java           # Authentication Payload DTO
│           │   ├── dto/AuthResponse.java          # Authentication Response DTO
│           │   ├── dto/SummaryResponse.java       # Financial Stats DTO
│           │   ├── model/Transaction.java         # JPA Entity (Transactions)
│           │   ├── model/TransactionType.java     # Enum (INCOME/EXPENSE)
│           │   ├── model/User.java                # JPA Entity (Users)
│           │   ├── repository/TransactionRepository.java # JPA Repository
│           │   ├── repository/UserRepository.java# User Repository
│           │   ├── service/TransactionService.java # Business Logic
│           │   └── service/UserService.java      # Auth & Registration Logic
│           └── resources/
│               ├── application.properties         # MySQL / Database Config
│               └── data.sql                        # Initial Sample Dataset
│
└── frontend/                            # React Frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx                      # Main Dashboard Component & Router
        ├── index.css                    # Modern Glassmorphic CSS System
        ├── services/api.js              # Fetch REST API Integration Layer
        ├── components/
            ├── Navbar.jsx               # Header & Navigation Links
            ├── DashboardSummary.jsx     # Net Balance, Income & Expense Cards
            ├── TransactionForm.jsx      # Modal Form for Add / Edit Record
            ├── TransactionList.jsx      # Search, Filter & Table View
            ├── AnalyticsChart.jsx       # Category Expense Breakdown Visual
            ├── LoginPage.jsx            # User Authentication & Sign-Up Component
            └── Toast.jsx                # Success Notification Alerts
        └── pages/
            ├── DashboardPage.jsx        # Main Overview Page
            ├── TransactionsPage.jsx     # Full Filterable Data Table Page
            └── AnalyticsPage.jsx        # Category Analytics Breakdown Page
```

---

## 🚀 How to Run the Project

### 1. Database Setup (MySQL)
Make sure your MySQL server is running on `localhost:3306`.
- Database Name: `expensetracker_db` (Spring Boot will automatically create it if it doesn't exist).
- Default Username in `application.properties`: `root`
- Default Password in `application.properties`: `root`

### 2. Start the Backend (Spring Boot)
Open terminal in `expense-tracker-fullstack/backend`:
```bash
.\mvnw.cmd spring-boot:run
```
The REST API will start at: `http://localhost:8080/api/transactions`

### 3. Start the Frontend (React)
Open terminal in `expense-tracker-fullstack/frontend`:
```bash
npm run dev
```
Open your browser at: `http://localhost:5173`

---

## 🔌 REST API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Authenticate user credentials |
| `GET` | `/api/transactions` | Fetch all logged transactions |
| `GET` | `/api/transactions/summary` | Fetch Net Balance, Total Income, Total Expenses |
| `POST` | `/api/transactions` | Create a new transaction |
| `PUT` | `/api/transactions/{id}` | Edit / Update an existing transaction |
| `DELETE` | `/api/transactions/{id}` | Delete a transaction record from database |
