import React, { useState, useEffect } from 'react';
import ExpenseFilterBar from './ExpenseFilterBar';
import ExpenseList from './ExpenseList';
import ExpenseModal from './ExpenseModal';
import ExportModal from './ExportModal';
import ConfirmDialog from '../UI/ConfirmDialog';
import ErrorModal from '../UI/ErrorModal';
import { SkeletonTable } from '../UI/LoadingSkeleton';
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import { fetchCategories } from '../../services/categoryService';
import { useToast } from '../../context/ToastContext';

export default function ExpensesView({ isCreateOpen, setIsCreateOpen }) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Error modal state
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { addToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [expData, catData] = await Promise.all([
        fetchExpenses(selectedCategory || null),
        fetchCategories(),
      ]);
      setExpenses(expData || []);
      setCategories(catData || []);
    } catch (err) {
      showError(err.message || 'Error loading expenses from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const showError = (msg) => {
    setErrorMessage(msg);
    setIsErrorModalOpen(true);
  };

  const handleSaveExpense = async (data) => {
    setSubmitting(true);
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, data);
        addToast('Expense updated successfully!', 'success');
      } else {
        await createExpense(data);
        addToast('New expense created successfully!', 'success');
      }
      setIsCreateOpen(false);
      setEditingExpense(null);
      await loadData();
    } catch (err) {
      showError(err.message || 'Failed to save expense.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExpense = async () => {
    if (!deletingExpense) return;
    setSubmitting(true);
    try {
      await deleteExpense(deletingExpense.id);
      addToast('Expense record deleted', 'info');
      setDeletingExpense(null);
      await loadData();
    } catch (err) {
      setDeletingExpense(null);
      showError(err.message || 'Failed to delete expense.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredExpenses = expenses.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      (e.description && e.description.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <ExpenseFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenCreate={() => {
          setEditingExpense(null);
          setIsCreateOpen(true);
        }}
      />

      {loading ? (
        <SkeletonTable />
      ) : (
        <ExpenseList
          expenses={filteredExpenses}
          categories={categories}
          onEdit={(exp) => {
            setEditingExpense(exp);
            setIsCreateOpen(true);
          }}
          onDelete={(exp) => setDeletingExpense(exp)}
        />
      )}

      <ExpenseModal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={handleSaveExpense}
        initialData={editingExpense}
        categories={categories}
        isLoading={submitting}
      />

      <ConfirmDialog
        isOpen={Boolean(deletingExpense)}
        onClose={() => setDeletingExpense(null)}
        onConfirm={handleDeleteExpense}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deletingExpense?.name}"? This action cannot be undone.`}
        confirmText="Delete Expense"
        isLoading={submitting}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        expenses={filteredExpenses}
        categories={categories}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Action Failed"
        message={errorMessage}
      />
    </div>
  );
}
