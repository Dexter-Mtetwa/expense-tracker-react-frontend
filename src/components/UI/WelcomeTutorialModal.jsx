import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Sparkles, Tag, Receipt, PieChart, Check } from 'lucide-react';

export default function WelcomeTutorialModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('expense_tracker_tutorial_seen');
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('expense_tracker_tutorial_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Welcome to Expense Tracker" maxWidth="500px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Get started in 3 simple steps:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              1
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>Set Up Categories</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Create custom spending categories (e.g. Food, Subscriptions, Housing). Names are case-insensitive and unique.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              2
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>Log Your Expenses</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Record transaction details, amounts, dates, and assign them to your categories.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--warning-light)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
              3
            </div>
            <div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>Track Financial Analytics</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Monitor category totals, monthly trend charts, and export your expense history to CSV spreadsheets.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClose}
          style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
        >
          <Check size={18} />
          <span>Get Started</span>
        </button>
      </div>
    </Modal>
  );
}
