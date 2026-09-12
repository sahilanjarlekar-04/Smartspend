import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TransactionForm from './components/TransactionForm';
import LoginPage from './components/LoginPage';
import Toast from './components/Toast';
import { api } from './services/api';

const DEMO_SAMPLE_DATA = [
  { id: 1, title: 'Software Developer Salary', amount: 45000, type: 'INCOME', category: 'Salary', date: '2026-09-01', paymentMethod: 'Bank Transfer', notes: 'Monthly Salary' },
  { id: 2, title: 'House Rent Payment', amount: 12000, type: 'EXPENSE', category: 'Housing', date: '2026-09-02', paymentMethod: 'UPI', notes: 'Apartment Rent' },
  { id: 3, title: 'Grocery Shopping D-Mart', amount: 3500, type: 'EXPENSE', category: 'Food', date: '2026-09-05', paymentMethod: 'Credit Card', notes: 'Monthly supplies' },
  { id: 4, title: 'Freelance UI/UX Project', amount: 8500, type: 'INCOME', category: 'Freelance', date: '2026-09-07', paymentMethod: 'PayPal', notes: 'Client Landing Page' },
  { id: 5, title: 'Broadband & Power Bill', amount: 2100, type: 'EXPENSE', category: 'Utilities', date: '2026-09-08', paymentMethod: 'UPI', notes: 'Internet and Electricity' },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [dbConnected, setDbConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Check saved session
  useEffect(() => {
    const savedUser = localStorage.getItem('expensetracker_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('expensetracker_user');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('expensetracker_user', JSON.stringify(userData));
    setToastMessage(`Welcome, ${userData.fullName || userData.username}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('expensetracker_user');
    setToastMessage('Signed out successfully.');
  };

  // Load data scoped to current user
  const loadData = async (user) => {
    const usernameKey = user?.username?.toLowerCase() || 'guest';
    const storageKey = `expensetracker_txs_${usernameKey}`;

    try {
      const data = await api.getAllTransactions();
      const summaryData = await api.getSummary();
      
      // If user is new (not demo) and backend returned initial sample data, show clean empty state for new user
      if (usernameKey !== 'demo' && data.length > 0) {
        const userSaved = localStorage.getItem(storageKey);
        if (userSaved) {
          const parsed = JSON.parse(userSaved);
          setTransactions(parsed);
          calculateLocalSummary(parsed);
        } else {
          // Fresh new account -> 0 activity!
          setTransactions([]);
          calculateLocalSummary([]);
        }
      } else {
        setTransactions(data);
        setSummary(summaryData);
      }
      setDbConnected(true);
    } catch (err) {
      console.warn('Backend API connection offline, using user-scoped state', err);
      setDbConnected(false);

      const userSaved = localStorage.getItem(storageKey);
      if (userSaved) {
        const parsed = JSON.parse(userSaved);
        setTransactions(parsed);
        calculateLocalSummary(parsed);
      } else if (usernameKey === 'demo') {
        // Demo account gets sample data
        setTransactions(DEMO_SAMPLE_DATA);
        calculateLocalSummary(DEMO_SAMPLE_DATA);
      } else {
        // New registered user gets ZERO activity!
        setTransactions([]);
        calculateLocalSummary([]);
      }
    }
  };

  const saveUserTransactions = (username, list) => {
    const usernameKey = username?.toLowerCase() || 'guest';
    localStorage.setItem(`expensetracker_txs_${usernameKey}`, JSON.stringify(list));
  };

  const calculateLocalSummary = (list) => {
    let income = 0;
    let expense = 0;
    const catMap = {};

    list.forEach((t) => {
      if (t.type === 'INCOME') {
        income += Number(t.amount);
      } else {
        expense += Number(t.amount);
        catMap[t.category] = (catMap[t.category] || 0) + Number(t.amount);
      }
    });

    setSummary({
      totalIncome: income,
      totalExpenses: expense,
      netBalance: income - expense,
      totalTransactions: list.length,
      categoryBreakdown: catMap,
    });
  };

  useEffect(() => {
    if (currentUser) {
      loadData(currentUser);
    }
  }, [currentUser]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingTransaction) {
      // Update
      const updatedList = transactions.map((t) =>
        t.id === editingTransaction.id ? { ...formData, id: t.id } : t
      );
      setTransactions(updatedList);
      calculateLocalSummary(updatedList);
      saveUserTransactions(currentUser?.username, updatedList);

      if (dbConnected) {
        try {
          await api.updateTransaction(editingTransaction.id, formData);
        } catch (err) {
          // Handled locally
        }
      }
      setToastMessage('Transaction updated successfully!');
    } else {
      // Create
      const newRecord = { ...formData, id: Date.now() };
      const updatedList = [newRecord, ...transactions];
      setTransactions(updatedList);
      calculateLocalSummary(updatedList);
      saveUserTransactions(currentUser?.username, updatedList);

      if (dbConnected) {
        try {
          await api.createTransaction(formData);
        } catch (err) {
          // Handled locally
        }
      }
      setToastMessage('New transaction saved!');
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingTransaction(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction record?')) return;

    const updatedList = transactions.filter((t) => t.id !== id);
    setTransactions(updatedList);
    calculateLocalSummary(updatedList);
    saveUserTransactions(currentUser?.username, updatedList);

    if (dbConnected) {
      try {
        await api.deleteTransaction(id);
      } catch (err) {
        // Handled locally
      }
    }
    setToastMessage('Transaction deleted');
  };

  // Render Login page if not authenticated
  if (!currentUser) {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Navbar
          onOpenAddModal={handleOpenAddModal}
          dbStatus={dbConnected}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  summary={summary}
                  transactions={transactions}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDelete}
                />
              }
            />

            <Route
              path="/transactions"
              element={
                <TransactionsPage
                  transactions={transactions}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDelete}
                  onOpenAddModal={handleOpenAddModal}
                />
              }
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage summary={summary} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <TransactionForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleCreateOrUpdate}
          initialData={editingTransaction}
        />

        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      </div>
    </BrowserRouter>
  );
}
