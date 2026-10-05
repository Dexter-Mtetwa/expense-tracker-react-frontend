import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const { login, loading } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      await login(email, password);
      addToast('Signed in successfully.', 'success');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{
          padding: '0.625rem 0.875rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--danger-light)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: 'var(--danger)',
          fontSize: '0.8125rem',
          fontWeight: 600,
        }}>
          {error}
        </div>
      )}

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Email Address</label>
        <div style={{ position: 'relative' }}>
          <input
            type="email"
            className="form-input"
            style={{ paddingLeft: '2.375rem' }}
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '0.25rem' }}>
        <label className="form-label">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            className="form-input"
            style={{ paddingLeft: '2.375rem' }}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem' }} disabled={loading}>
        {loading ? 'Authenticating...' : (
          <>
            <span>Sign In</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
