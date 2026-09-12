import React from 'react';
import AnalyticsChart from '../components/AnalyticsChart';

export default function AnalyticsPage({ summary }) {
  const netBalance = summary?.netBalance ?? 0;
  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpenses = summary?.totalExpenses ?? 0;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Spending & Category Analytics</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Detailed financial breakdown by category and expenditure trends
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <AnalyticsChart summary={summary} />

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Financial Health Overview
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SAVINGS RATE</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--income-color)' }}>
                {totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)) : 0}%
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Percentage of income retained</div>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>EXPENSE RATIO</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--expense-color)' }}>
                {totalIncome > 0 ? Math.min(100, Math.round((totalExpenses / totalIncome) * 100)) : 0}%
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Percentage of income spent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
