# 💰 SpendSmart - Full Stack Java & React Expense Tracker

A full-stack personal finance and expense management web application developed for **Full Stack Java Development** course submission.

---

## 🌟 Tech Stack

- **Frontend**: React (Vite), Vanilla CSS3 (Glassmorphism Dark Theme design system), Lucide React Icons.
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
│           │   ├── controller/TransactionController.java # REST APIs
│           │   ├── dto/SummaryResponse.java       # Financial Stats DTO
│           │   ├── model/Transaction.java         # JPA Entity
│           │   ├── model/TransactionType.java     # Enum (INCOME/EXPENSE)
│           │   ├── repository/TransactionRepository.java # JPA Repository
│           │   └── service/TransactionService.java # Business Logic
│           └── resources/
│               ├── application.properties         # MySQL / Database Config
│               └── data.sql                        # Initial Sample Dataset
│
└── frontend/                            # React Frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx                      # Main Dashboard Component
        ├── index.css                    # Modern Glassmorphic CSS System
        ├── services/api.js              # Fetch REST API Integration Layer
        └── components/
            ├── Navbar.jsx               # Header & Add Transaction Button
            ├── DashboardSummary.jsx     # Net Balance, Income & Expense Cards
            ├── TransactionForm.jsx      # Modal Form for Add / Edit Record
            ├── TransactionList.jsx      # Search, Filter & Table View
            ├── AnalyticsChart.jsx       # Category Expense Breakdown Visual
            └── Toast.jsx                # Success Notification Alerts
```

---

## 🚀 How to Run the Project

### 1. Database Setup (MySQL)
Make sure your MySQL server is running on `localhost:3306`.
- Database Name: `expensetracker_db` (Spring Boot will automatically create it if it doesn't exist).
- Default Username in `application.properties`: `root`
- Default Password in `application.properties`: `root` (Change this in `backend/src/main/resources/application.properties` to match your MySQL password if needed).

> *Note: If MySQL is not running, you can also uncomment the H2 database lines in `application.properties` to run zero-setup in-memory database!*

### 2. Start the Backend (Spring Boot)
Open terminal in `expense-tracker-fullstack/backend`:
```bash
# If Maven is installed:
mvn spring-boot:run

# Or compile and run using Java:
javac -d target/classes -cp ...
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
| `GET` | `/api/transactions` | Fetch all logged transactions (sorted by latest date) |
| `GET` | `/api/transactions/summary` | Fetch Net Balance, Total Income, Total Expenses, and Category Breakdown |
| `GET` | `/api/transactions/{id}` | Get transaction details by ID |
| `POST` | `/api/transactions` | Create a new transaction |
| `PUT` | `/api/transactions/{id}` | Edit / Update an existing transaction |
| `DELETE` | `/api/transactions/{id}` | Delete a transaction record from database |

---

## ✨ Features Implemented
1. **Financial Metrics Dashboard**: Live dynamic computation of Net Balance, Total Income, Total Expenses, and Database Transaction Counts.
2. **Category Expense Analytics**: Visual breakdown of category-wise spending percentage progress bars.
3. **Full CRUD Operations**: Modal interface allowing users to create new income/expense entries, edit existing entries, and remove records.
4. **Live Search & Filters**: Instant search by keyword, transaction type (Income/Expense), and category dropdown.
5. **CORS Enabled**: Configured Spring MVC `WebConfig` for cross-origin request handling.
