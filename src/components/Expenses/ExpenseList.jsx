import React from 'react';
import Badge from '../UI/Badge';
import { Tag, Edit2, Trash2, Calendar, FileText } from 'lucide-react';

export default function ExpenseList({ expenses = [], categories = [], onEdit, onDelete }) {
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  if (expenses.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '1rem', fontWeight: 600 }}>No matching expenses found.</p>
        <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>Try adjusting your search filters or click "New Expense".</p>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ overflow: 'hidden' }}>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Notes</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'center', width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                    {exp.name}
                  </span>
                </td>
                <td>
                  <Badge variant="primary" icon={Tag}>
                    {categoryMap[exp.category_id] || 'Uncategorized'}
                  </Badge>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    <span>{exp.date}</span>
                  </div>
                </td>
                <td>
                  {exp.description ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.8125rem', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <FileText size={14} />
                      <span>{exp.description}</span>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', italic: 'true' }}>-</span>
                  )}
                </td>
                <td style={{ textAlign: 'right', fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>
                  ${parseFloat(exp.amount).toFixed(2)}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                    <button
                      onClick={() => onEdit(exp)}
                      className="btn btn-secondary btn-icon btn-sm"
                      title="Edit Expense"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(exp)}
                      className="btn btn-danger btn-icon btn-sm"
                      title="Delete Expense"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
