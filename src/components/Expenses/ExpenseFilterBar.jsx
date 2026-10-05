import React from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';

export default function ExpenseFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = [],
  onOpenExport,
  onOpenCreate,
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {/* Search & Category Select */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
            placeholder="Search by expense name or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        <div style={{ position: 'relative', width: '200px' }}>
          <select
            className="form-select"
            style={{ paddingLeft: '2.25rem', marginBottom: 0 }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <Filter size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={onOpenExport} className="btn btn-secondary btn-sm">
          <Download size={16} />
          <span>Export CSV</span>
        </button>
        <button onClick={onOpenCreate} className="btn btn-primary btn-sm">
          <Plus size={16} />
          <span>New Expense</span>
        </button>
      </div>
    </div>
  );
}
