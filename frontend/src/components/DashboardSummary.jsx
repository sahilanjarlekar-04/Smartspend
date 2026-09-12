import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

export default function DashboardSummary({ summary }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val || 0);
  };

  const netBalance = summary?.netBalance ?? 0;
  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpenses = summary?.totalExpenses ?? 0;
  const totalCount = summary?.totalTransactions ?? 0;

  return (
    <div className="dashboard-grid">
      {/* Net Balance */}
      <div className="stat-card balance glass-panel">
        <div className="stat-header">
          <span className="stat-title">Net Balance</span>
          <div className="stat-icon-wrapper">
            <DollarSign size={20} />
          </div>
        </div>
        <div className="stat-value" style={{ color: netBalance >= 0 ? '#f8fafc' : '#f43f5e' }}>
          {formatCurrency(netBalance)}
        </div>
        <div className="stat-subtext">Overall financial status</div>
      </div>

      {/* Total Income */}
      <div className="stat-card income glass-panel">
        <div className="stat-header">
          <span className="stat-title">Total Income</span>
          <div className="stat-icon-wrapper">
            <ArrowUpRight size={20} />
          </div>
        </div>
        <div className="stat-value" style={{ color: 'var(--income-color)' }}>
          {formatCurrency(totalIncome)}
        </div>
        <div className="stat-subtext">Incoming funds logged</div>
      </div>

      {/* Total Expenses */}
      <div className="stat-card expense glass-panel">
        <div className="stat-header">
          <span className="stat-title">Total Expenses</span>
          <div className="stat-icon-wrapper">
            <ArrowDownRight size={20} />
          </div>
        </div>
        <div className="stat-value" style={{ color: 'var(--expense-color)' }}>
          {formatCurrency(totalExpenses)}
        </div>
        <div className="stat-subtext">Total spending recorded</div>
      </div>

      {/* Total Transactions */}
      <div className="stat-card glass-panel">
        <div className="stat-header">
          <span className="stat-title">Transactions</span>
          <div className="stat-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-secondary)' }}>
            <Activity size={20} />
          </div>
        </div>
        <div className="stat-value">
          {totalCount}
        </div>
        <div className="stat-subtext">Logged database records</div>
      </div>
    </div>
  );
}
