import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Receipt, FolderKanban, Users, BookOpen, LogOut, ShieldCheck } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'categories', label: 'Categories', icon: FolderKanban },
    { id: 'guide', label: 'App Guide', icon: BookOpen },
  ];

  if (isAdmin) {
    navItems.push({ id: 'users', label: 'User Directory', icon: Users });
  }

  return (
    <aside
      className="card"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 'var(--sidebar-width)',
        borderRadius: 0,
        borderRight: '1px solid var(--card-border)',
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '1.25rem 1rem',
        background: 'var(--card-bg)',
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.25rem', borderBottom: '1px solid var(--card-border)' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Receipt
            size={20}
            style={{
              color: '#ffffff',
              transform: 'translateX(1px)',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Expense Tracker
          </h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>FastAPI & PostgreSQL API</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '1.25rem', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="btn"
              style={{
                justify: 'flex-start',
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 600,
                border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Footer with Un-obscured Sign Out Button */}
      <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email || 'Authenticated User'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
            {isAdmin && <ShieldCheck size={12} style={{ color: 'var(--primary)' }} />}
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{user?.role || 'USER'}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="btn btn-icon btn-secondary"
          title="Sign Out"
          style={{ width: '34px', height: '34px', flexShrink: 0 }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
