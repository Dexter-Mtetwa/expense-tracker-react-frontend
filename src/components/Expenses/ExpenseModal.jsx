import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import { useToast } from '../../context/ToastContext';

export default function ExpenseModal({ isOpen, onClose, onSubmit, initialData = null, categories = [], isLoading = false }) {
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setAmount(initialData.amount || '');
      setDate(initialData.date || new Date().toISOString().split('T')[0]);
      setCategoryId(initialData.category_id || (categories[0]?.id || ''));
      setDescription(initialData.description || '');
    } else {
      setName('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategoryId(categories[0]?.id || '');
      setDescription('');
    }
  }, [initialData, categories, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please enter an expense name', 'warning');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      addToast('Please enter a valid amount greater than 0', 'warning');
      return;
    }
    if (!categoryId) {
      addToast('Please select a category', 'warning');
      return;
    }
    if (!date) {
      addToast('Please select a date', 'warning');
      return;
    }

    onSubmit({
      name: name.trim(),
      amount: parseFloat(amount),
      date,
      category_id: categoryId,
      description: description.trim() || null,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Expense' : 'Create New Expense'}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Expense Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. AWS Cloud Hosting, Grocery Shopping"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Amount ($) *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Category *</label>
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Date *</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
          <label className="form-label">Description / Notes (Optional)</label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Add additional details or transaction notes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : (initialData ? 'Update Expense' : 'Save Expense')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
