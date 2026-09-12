import React from 'react';
import TransactionList from '../components/TransactionList';
import { Plus } from 'lucide-react';

export default function TransactionsPage({ transactions, onEdit, onDelete, onOpenAddModal }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>All Transactions</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Manage, search, filter, edit and delete your income and expense records
          </p>
        </div>

        <button className="btn-primary" onClick={onOpenAddModal}>
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>

      <TransactionList
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
