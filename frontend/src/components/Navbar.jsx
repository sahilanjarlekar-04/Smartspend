import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, Plus, Database, LogOut, User, LayoutDashboard, ListFilter, PieChart } from 'lucide-react';

export default function Navbar({ onOpenAddModal, dbStatus, currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo-group">
          <div className="logo-icon">
            <Wallet size={24} />
          </div>
          <div className="logo-text">
            <h1>SpendSmart</h1>
          </div>
        </div>

        {/* Multi-page Nav Links */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
            })}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/transactions"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
            })}
          >
            <ListFilter size={16} />
            <span>Transactions</span>
          </NavLink>

          <NavLink
            to="/analytics"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
            })}
          >
            <PieChart size={16} />
            <span>Analytics</span>
          </NavLink>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: dbStatus ? '#10b981' : '#f59e0b', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.7rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <Database size={13} />
            <span>{dbStatus ? 'MySQL Backend Connected' : 'Connecting Backend...'}</span>
          </div>

          {currentUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <User size={14} color="var(--accent-primary)" />
              <span style={{ fontWeight: 600 }}>{currentUser.fullName || currentUser.username}</span>
            </div>
          )}

          <button className="btn-primary" onClick={onOpenAddModal}>
            <Plus size={16} />
            <span>Add Record</span>
          </button>

          {currentUser && (
            <button className="btn-secondary" onClick={onLogout} title="Sign Out">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
