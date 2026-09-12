import React, { useState } from 'react';
import { Search, Filter, Edit3, Trash2, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = ['ALL', ...new Set(transactions.map((t) => t.category))];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.notes && t.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.paymentMethod && t.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'ALL' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      {/* Toolbar */}
      <div className="toolbar glass-panel" style={{ background: 'rgba(11,15,25,0.4)' }}>
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by title, notes, method..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Filter size={16} />
            <span>Filters:</span>
          </div>

          <select
            className="select-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="INCOME">Income Only</option>
            <option value="EXPENSE">Expenses Only</option>
          </select>

          <select
            className="select-input"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'ALL' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3>No Transactions Found</h3>
          <p>Try clearing filters or add a new transaction to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date & Method</th>
                <th>Amount</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="transaction-title">{t.title}</div>
                    {t.notes && <div className="transaction-notes">{t.notes}</div>}
                  </td>

                  <td>
                    <span className={`badge ${t.type === 'INCOME' ? 'income' : 'expense'}`}>
                      {t.type === 'INCOME' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {t.type}
                    </span>
                  </td>

                  <td>
                    <span className="category-tag">{t.category}</span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Calendar size={14} />
                      <span>{t.date}</span>
                    </div>
                    {t.paymentMethod && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.paymentMethod}</div>
                    )}
                  </td>

                  <td>
                    <span className={`amount ${t.type === 'INCOME' ? 'income' : 'expense'}`}>
                      {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn-icon"
                        title="Edit Record"
                        onClick={() => onEdit(t)}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        className="btn-icon delete"
                        title="Delete Record"
                        onClick={() => onDelete(t.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
