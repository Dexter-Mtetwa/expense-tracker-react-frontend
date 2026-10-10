import React from 'react';
import { Tag, Edit2, Trash2, Calendar, DollarSign } from 'lucide-react';

export default function CategoryList({ categories = [], expenses = [], onEdit, onDelete, showActions = true }) {
  if (categories.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>No categories found.</p>
        <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>Create your first category to start organizing expenses!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
      {categories.map((cat) => {
        const catExpenses = expenses.filter((e) => e.category_id === cat.id);
        const catTotal = catExpenses.reduce((sum, e) => sum + parseFloat(e.amount || '0'), 0);

        return (
          <div
            key={cat.id}
            className="glass-card glass-card-interactive"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-light)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                  }}
                >
                  <Tag
                    size={20}
                    style={{
                      transform: 'translateX(1px)',
                    }}
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {catExpenses.length} expense{catExpenses.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              {showActions && (
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    onClick={() => onEdit(cat)}
                    className="btn btn-secondary btn-icon btn-sm"
                    title="Edit Category"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => onDelete(cat)}
                    className="btn btn-danger btn-icon btn-sm"
                    title="Delete Category"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                {cat.created_at ? new Date(cat.created_at).toLocaleDateString() : 'Active'}
              </span>
              <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <DollarSign size={14} />
                {catTotal.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
