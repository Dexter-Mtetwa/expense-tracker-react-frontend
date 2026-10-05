import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';
import ConfirmDialog from '../UI/ConfirmDialog';
import ErrorModal from '../UI/ErrorModal';
import { SkeletonCard } from '../UI/LoadingSkeleton';
import { Plus, Tag } from 'lucide-react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import { fetchExpenses } from '../../services/expenseService';
import { useToast } from '../../context/ToastContext';

export default function CategoriesView() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Error modal state
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { addToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [catData, expData] = await Promise.all([
        fetchCategories(),
        fetchExpenses(),
      ]);
      setCategories(catData || []);
      setExpenses(expData || []);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to load category data. Please try again.');
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showError = (msg) => {
    setErrorMessage(msg);
    setIsErrorModalOpen(true);
  };

  const handleSaveCategory = async (name) => {
    setSubmitting(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, name);
        addToast(`Category updated to "${name}"`, 'success');
      } else {
        await createCategory(name);
        addToast(`Category "${name}" created!`, 'success');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      await loadData();
    } catch (err) {
      showError(err.message || 'Failed to save category.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;
    
    // Check if expenses reference this category
    const linkedCount = expenses.filter((e) => e.category_id === deletingCategory.id).length;
    if (linkedCount > 0) {
      setDeletingCategory(null);
      showError(`Cannot delete category "${deletingCategory.name}" because ${linkedCount} expense(s) reference it. Reassign or delete those expenses first.`);
      return;
    }

    setSubmitting(true);
    try {
      await deleteCategory(deletingCategory.id);
      addToast(`Category "${deletingCategory.name}" deleted`, 'info');
      setDeletingCategory(null);
      await loadData();
    } catch (err) {
      setDeletingCategory(null);
      showError(err.message || 'Failed to delete category.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Tag size={20} style={{ color: 'var(--primary)' }} />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Expense Categories ({categories.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Organize expense records into unique spending categories
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary btn-sm"
          data-tooltip="Add a new spending category"
        >
          <Plus size={16} />
          <span>New Category</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <CategoryList
          categories={categories}
          expenses={expenses}
          onEdit={(cat) => {
            setEditingCategory(cat);
            setIsModalOpen(true);
          }}
          onDelete={(cat) => setDeletingCategory(cat)}
        />
      )}

      {/* Create / Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSaveCategory}
        initialData={editingCategory}
        isLoading={submitting}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deletingCategory?.name}"?`}
        confirmText="Delete Category"
        isLoading={submitting}
      />

      {/* Prominent Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Action Failed"
        message={errorMessage}
      />
    </div>
  );
}
