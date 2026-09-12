import React from 'react';
import DashboardSummary from '../components/DashboardSummary';
import AnalyticsChart from '../components/AnalyticsChart';
import TransactionList from '../components/TransactionList';

export default function DashboardPage({ summary, transactions, onEdit, onDelete }) {
  return (
    <div>
      <DashboardSummary summary={summary} />

      <div className="main-layout">
        <div>
          <h3 style={{ marginBottom: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Recent Activity</span>
          </h3>
          <TransactionList
            transactions={transactions.slice(0, 5)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>

        <div>
          <AnalyticsChart summary={summary} />
        </div>
      </div>
    </div>
  );
}
