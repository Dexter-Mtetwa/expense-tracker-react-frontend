import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import { useToast } from '../../context/ToastContext';

export default function CategoryModal({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) {
  const { addToast } = useToast();
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
    } else {
      setName('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('Please enter a category name', 'warning');
      return;
    }
    if (name.trim().length > 50) {
      addToast('Category name cannot exceed 50 characters', 'warning');
      return;
    }

    onSubmit(name.trim());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Category' : 'Create New Category'} maxWidth="450px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Category Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Travel, Utilities, Subscriptions"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={50}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Note: Category names are normalized (case-insensitive & unique).
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : (initialData ? 'Update Category' : 'Create Category')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
