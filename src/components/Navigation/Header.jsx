import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Plus } from 'lucide-react';

export default function Header({ title, onOpenNewExpense }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="card"
      style={{
        height: 'var(--header-height)',
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: '1px solid var(--card-border)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '0 2rem',
        background: 'var(--card-bg)',
      }}
    >
      <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
        {title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-icon"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          style={{ width: '36px', height: '36px' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {onOpenNewExpense && (
          <button onClick={onOpenNewExpense} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add Expense</span>
          </button>
        )}
      </div>
    </header>
  );
}
