import React, { useState, useEffect } from 'react';
import StatCards from './StatCards';
import SpendingChart from './SpendingChart';
import MonthlyTrendChart from './MonthlyTrendChart';
import RecentExpenses from './RecentExpenses';
import { SkeletonCard, SkeletonTable } from '../UI/LoadingSkeleton';
import { fetchExpenses, fetchTotalSpent } from '../../services/expenseService';
import { fetchCategories } from '../../services/categoryService';
import { useToast } from '../../context/ToastContext';

export default function DashboardView({ onNavigateToExpenses }) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalSpent, setTotalSpent] = useState('0.00');
  const [loading, setLoading] = useState(true);

  const { addToast } = useToast();

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [expData, catData, totalRes] = await Promise.all([
        fetchExpenses(),
        fetchCategories(),
        fetchTotalSpent().catch(() => ({ total: 0 })),
      ]);

      setExpenses(expData || []);
      setCategories(catData || []);
      setTotalSpent(totalRes?.total || '0.00');
    } catch (err) {
      addToast(err.message || 'Error loading dashboard metrics from server', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Compute category spend summary
  const categoryTotals = categories.map((cat) => {
    const catExpenses = expenses.filter((e) => e.category_id === cat.id);
    const sum = catExpenses.reduce((acc, e) => acc + parseFloat(e.amount || '0'), 0);
    return { id: cat.id, name: cat.name, total: sum };
  }).filter((c) => c.total > 0);

  const topCat = [...categoryTotals].sort((a, b) => b.total - a.total)[0];
  const topCategoryName = topCat ? topCat.name : null;
  const avgExpense = expenses.length > 0 ? parseFloat(totalSpent) / expenses.length : 0;

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonTable />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 4 Stat Cards */}
      <StatCards
        totalSpent={totalSpent}
        expenseCount={expenses.length}
        topCategoryName={topCategoryName}
        avgExpense={avgExpense}
      />

      {/* Visual Analytics Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <SpendingChart categoryTotals={categoryTotals} />
        <MonthlyTrendChart expenses={expenses} />
      </div>

      {/* Recent Activity */}
      <RecentExpenses
        expenses={expenses}
        categories={categories}
        onViewAll={onNavigateToExpenses}
      />
    </div>
  );
}
