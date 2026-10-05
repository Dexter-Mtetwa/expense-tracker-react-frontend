import React from 'react';
import Badge from '../UI/Badge';
import { ArrowRight, Tag } from 'lucide-react';

export default function RecentExpenses({ expenses = [], categories = [], onViewAll }) {
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const recentList = expenses.slice(0, 5);

  return (
    <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Recent Transactions
        </h3>
        <button onClick={onViewAll} className="btn btn-secondary btn-sm">
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {recentList.length === 0 ? (
        <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          No expenses recorded yet. Click "Add Expense" to get started!
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Date</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentList.map((exp) => (
                <tr key={exp.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{exp.name}</span>
                      {exp.description && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exp.description}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <Badge variant="primary" icon={Tag}>
                      {categoryMap[exp.category_id] || 'Uncategorized'}
                    </Badge>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                    {exp.date}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#10b981', fontSize: '0.9375rem' }}>
                    ${parseFloat(exp.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
