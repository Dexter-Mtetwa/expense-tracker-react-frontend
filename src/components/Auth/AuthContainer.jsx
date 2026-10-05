import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Receipt } from 'lucide-react';

export default function AuthContainer() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '1.5rem',
        background: 'var(--bg-main)',
      }}
    >
      <div
        className="card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Brand Logo & Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.5rem', width: '100%' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            marginBottom: '0.875rem',
          }}>
            <Receipt size={26} style={{ color: '#ffffff' }} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Expense Tracker
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Personal Finance & Expense Management API
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          background: 'var(--input-bg)',
          padding: '3px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          border: '1px solid var(--input-border)',
          width: '100%',
        }}>
          <button
            type="button"
            className="btn"
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              background: !isRegister ? 'var(--primary)' : 'transparent',
              color: !isRegister ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.8125rem',
            }}
            onClick={() => setIsRegister(false)}
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn"
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              background: isRegister ? 'var(--primary)' : 'transparent',
              color: isRegister ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.8125rem',
            }}
            onClick={() => setIsRegister(true)}
          >
            Create Account
          </button>
        </div>

        {/* Form rendering */}
        <div style={{ width: '100%' }}>
          {!isRegister ? (
            <LoginForm onSwitchToRegister={() => setIsRegister(true)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsRegister(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
