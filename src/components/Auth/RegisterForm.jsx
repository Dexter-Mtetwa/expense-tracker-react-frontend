import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Mail, Lock, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterForm({ onSwitchToLogin }) {
  const { register, loading } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long as required by API.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register(email, password);
      addToast('Account created successfully! Welcome aboard.', 'success');
    } catch (err) {
      setError(err.message || 'Registration failed. Email might already exist.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          color: 'var(--danger)',
          fontSize: '0.875rem',
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
            style={{ paddingLeft: '2.5rem' }}
            placeholder="newuser@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Password (Min 8 chars)</label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <Lock size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
        <label className="form-label">Confirm Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <CheckCircle2 size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', marginTop: '0.5rem' }} disabled={loading}>
        {loading ? 'Creating Account...' : (
          <>
            <span>Create Account & Sign In</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
