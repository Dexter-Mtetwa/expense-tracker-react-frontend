import React from 'react';
import { BookOpen, ShieldCheck, Tag, Receipt, Database, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function GuideView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Banner */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <BookOpen
            size={26}
            style={{
              transform: 'translateX(1px)',
            }}
          />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Application Guide & System Rules
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Learn how Expense Tracker manages data integrity, business rules, categories, and authentication.
          </p>
        </div>
      </div>

      {/* Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Category Rules */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tag size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Category Rules</h3>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
            <li>
              <strong>Unique Names:</strong> Category names are case-insensitive and normalized (e.g. <em>"Food"</em>, <em>"food"</em>, and <em>"FOOD"</em> are treated as identical).
            </li>
            <li>
              <strong>Deletion Restriction (RESTRICT):</strong> A category <em>cannot</em> be deleted while active expenses are assigned to it. This prevents orphaned expense records.
            </li>
          </ul>
        </div>

        {/* Security & Access */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Security & Ownership</h3>
          </div>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
            <li>
              <strong>Resource Ownership:</strong> Users can only view, edit, or delete their own expense data.
            </li>
            <li>
              <strong>Role-Based Access:</strong> Admin users have privileged access to system user directories.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
