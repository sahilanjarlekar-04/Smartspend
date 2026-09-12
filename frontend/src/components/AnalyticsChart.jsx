import React from 'react';
import { PieChart, TrendingDown } from 'lucide-react';

export default function AnalyticsChart({ summary }) {
  const breakdown = summary?.categoryBreakdown || {};
  const totalExpense = summary?.totalExpenses || 1;

  const categories = Object.entries(breakdown).map(([category, amount]) => ({
    category,
    amount: Number(amount),
    percentage: Math.min(100, Math.round((Number(amount) / (totalExpense || 1)) * 100)),
  }));

  categories.sort((a, b) => b.amount - a.amount);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="analytics-panel glass-panel">
      <h3 className="panel-title">
        <PieChart size={20} color="var(--accent-primary)" />
        <span>Expense Analytics</span>
      </h3>

      {categories.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <TrendingDown size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
          <p>No expense data recorded yet to render breakdown.</p>
        </div>
      ) : (
        <div className="category-list">
          {categories.map((item) => (
            <div key={item.category} className="category-item">
              <div className="category-info">
                <span className="category-name">{item.category}</span>
                <span className="category-val">
                  {formatCurrency(item.amount)} ({item.percentage}%)
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
