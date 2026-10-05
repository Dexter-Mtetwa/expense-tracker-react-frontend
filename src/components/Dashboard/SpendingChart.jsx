import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLOR_PALETTE = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#f43f5e',
  '#8b5cf6',
  '#06b6d4',
  '#ec4899',
  '#3b82f6',
];

export default function SpendingChart({ categoryTotals = [] }) {
  if (categoryTotals.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '1.75rem', height: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Category Spending Breakdown
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No expense data recorded yet.</p>
      </div>
    );
  }

  const data = {
    labels: categoryTotals.map((c) => c.name),
    datasets: [
      {
        data: categoryTotals.map((c) => c.total),
        backgroundColor: COLOR_PALETTE.slice(0, categoryTotals.length),
        borderColor: 'rgba(15, 23, 42, 0.8)',
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Plus Jakarta Sans',
            size: 12,
            weight: '600',
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return ` ${label}: $${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem', height: '380px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Category Breakdown
      </h3>
      <div style={{ flex: 1, position: 'relative', minHeight: '260px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
