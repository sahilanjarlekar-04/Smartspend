-- Initial Seed for Demo User Account
INSERT INTO users (username, email, password, full_name, created_at)
VALUES ('demo', 'demo@expensetracker.com', 'demo123', 'Janhavi Student', NOW());

-- Sample initial data for Expense Tracker
INSERT INTO transactions (title, amount, type, category, date, payment_method, notes)
VALUES ('Salary Payment', 45000.00, 'INCOME', 'Salary', '2026-09-01', 'Bank Transfer', 'Monthly Software Developer Salary');

INSERT INTO transactions (title, amount, type, category, date, payment_method, notes)
VALUES ('House Rent', 12000.00, 'EXPENSE', 'Housing', '2026-09-02', 'UPI', 'Apartment Rent September');

INSERT INTO transactions (title, amount, type, category, date, payment_method, notes)
VALUES ('Grocery Shopping', 3500.00, 'EXPENSE', 'Food', '2026-09-05', 'Credit Card', 'D-Mart Monthly Supplies');

INSERT INTO transactions (title, amount, type, category, date, payment_method, notes)
VALUES ('Freelance Design', 8500.00, 'INCOME', 'Freelance', '2026-09-07', 'PayPal', 'Website Redesign Project');

INSERT INTO transactions (title, amount, type, category, date, payment_method, notes)
VALUES ('Internet & Electricity', 2100.00, 'EXPENSE', 'Utilities', '2026-09-08', 'UPI', 'Broadband and Electricity Bill');
