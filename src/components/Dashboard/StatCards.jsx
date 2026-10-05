import React from 'react';
import { DollarSign, Receipt, TrendingUp, Calendar } from 'lucide-react';

export default function StatCards({ totalSpent, expenseCount, topCategoryName, avgExpense }) {
  const cards = [
    {
      title: 'Total Spending',
      value: `$${parseFloat(totalSpent || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'All recorded expenses',
      icon: DollarSign,
      color: '#6366f1',
      bg: 'var(--primary-light)',
      tooltip: 'Sum of all expense amounts recorded for your user account.',
    },
    {
      title: 'Total Transactions',
      value: expenseCount,
      subtitle: 'Recorded expense entries',
      icon: Receipt,
      color: '#10b981',
      bg: 'var(--success-light)',
      tooltip: 'Total number of individual expense items registered.',
    },
    {
      title: 'Top Category',
      value: topCategoryName || 'N/A',
      subtitle: 'Highest spend allocation',
      icon: TrendingUp,
      color: '#f59e0b',
      bg: 'var(--warning-light)',
      tooltip: 'Category with the highest cumulative spending.',
    },
    {
      title: 'Average Expense',
      value: `$${parseFloat(avgExpense || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Per single transaction',
      icon: Calendar,
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.12)',
      tooltip: 'Average cost per transaction across all your expenses.',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="card card-interactive"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1rem',
            }}
            data-tooltip={card.tooltip}
          >
            {/* Centered Icon Container */}
            <div
              className="icon-center-box"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: card.bg,
                border: `1px solid ${card.color}40`,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
              }}
            >
              <Icon size={22} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                {card.title}
              </span>
              <div style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {card.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
