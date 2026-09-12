import React, { useState } from 'react';
import { Wallet, LogIn, UserPlus, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function LoginPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        // Register API Call
        const res = await api.register(
          formData.username,
          formData.email,
          formData.password,
          formData.fullName
        );

        if (res.success) {
          alert('Registration successful! Please log in with your credentials.');
          setIsRegister(false);
          setFormData({ username: formData.username, email: '', password: '', fullName: '' });
        } else {
          setErrorMsg(res.message || 'Registration failed.');
        }
      } else {
        // Login API Call
        const res = await api.login(formData.username, formData.password);
        if (res.success) {
          onLoginSuccess({
            username: res.username,
            email: res.email,
            fullName: res.fullName,
            userId: res.userId,
          });
        } else {
          setErrorMsg(res.message || 'Invalid username or password.');
        }
      }
    } catch (err) {
      // Fallback for demo when backend is offline
      if (!isRegister && formData.username && formData.password) {
        onLoginSuccess({
          username: formData.username,
          email: `${formData.username}@expensetracker.com`,
          fullName: formData.username,
          userId: Date.now(),
        });
      } else {
        setErrorMsg('Could not connect to authentication server. Please check backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({ username: 'demo', password: 'demo123', email: '', fullName: '' });
    onLoginSuccess({
      username: 'demo',
      email: 'demo@expensetracker.com',
      fullName: 'Janhavi Student',
      userId: 1,
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div className="glass-panel modal-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            className="logo-icon"
            style={{ margin: '0 auto 1rem auto', width: '56px', height: '56px', borderRadius: '16px' }}
          >
            <Wallet size={30} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>SpendSmart</h2>
        </div>

        {/* Tab Toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(11, 15, 25, 0.6)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)',
          }}
        >
          <button
            type="button"
            style={{
              flex: 1,
              padding: '0.6rem',
              border: 'none',
              borderRadius: '6px',
              background: !isRegister ? 'var(--accent-primary)' : 'transparent',
              color: !isRegister ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => {
              setIsRegister(false);
              setErrorMsg('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              padding: '0.6rem',
              border: 'none',
              borderRadius: '6px',
              background: isRegister ? 'var(--accent-primary)' : 'transparent',
              color: isRegister ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => {
              setIsRegister(true);
              setErrorMsg('');
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: 'var(--expense-bg)',
              border: '1px solid var(--expense-border)',
              color: 'var(--expense-color)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              textAlign: 'center',
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {isRegister && (
              <div className="form-group">
                <label>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Sahil Anjarlekar"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Username / Login ID *</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            {isRegister && (
              <div className="form-group">
                <label>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.8rem' }} disabled={loading}>
              {loading ? (
                <span>Authenticating...</span>
              ) : isRegister ? (
                <>
                  <UserPlus size={18} />
                  <span>Register Account</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Fast Login Button */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
            onClick={handleDemoLogin}
          >
            <ShieldCheck size={16} color="var(--income-color)" />
            <span>One-Click Demo Login (demo / demo123)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
