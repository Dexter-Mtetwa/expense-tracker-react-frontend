import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlyTrendChart({ expenses = [] }) {
  // Aggregate expenses by month YYYY-MM
  const monthlyTotals = expenses.reduce((acc, exp) => {
    if (!exp.date) return acc;
    const dateObj = new Date(exp.date);
    const monthKey = dateObj.toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[monthKey] = (acc[monthKey] || 0) + parseFloat(exp.amount || '0');
    return acc;
  }, {});

  const labels = Object.keys(monthlyTotals).slice(-6); // Last 6 months
  const values = labels.map((k) => monthlyTotals[k]);

  const data = {
    labels: labels.length > 0 ? labels : ['Sep', 'Oct'],
    datasets: [
      {
        label: 'Monthly Spend ($)',
        data: values.length > 0 ? values : [0, 0],
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderColor: '#6366f1',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => ` Total: $${context.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', weight: '600' },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.06)',
        },
        ticks: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans' },
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem', height: '380px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Spending Trends
      </h3>
      <div style={{ flex: 1, position: 'relative', minHeight: '260px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
