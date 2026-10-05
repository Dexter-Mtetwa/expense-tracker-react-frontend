import React from 'react';
import Modal from '../UI/Modal';
import { Download, FileSpreadsheet, FileCode } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ExportModal({ isOpen, onClose, expenses = [], categories = [] }) {
  const { addToast } = useToast();

  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;
    return acc;
  }, {});

  const exportCSV = () => {
    if (expenses.length === 0) {
      addToast('No expense records to export', 'warning');
      return;
    }

    const headers = ['ID', 'Name', 'Category', 'Amount', 'Date', 'Description', 'Created At'];
    const rows = expenses.map((e) => [
      `"${e.id}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${(categoryMap[e.category_id] || 'Uncategorized').replace(/"/g, '""')}"`,
      e.amount,
      e.date,
      `"${(e.description || '').replace(/"/g, '""')}"`,
      e.created_at || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expenses_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Successfully exported expenses to CSV file', 'success');
    onClose();
  };

  const exportJSON = () => {
    if (expenses.length === 0) {
      addToast('No expense records to export', 'warning');
      return;
    }

    const formattedData = expenses.map((e) => ({
      ...e,
      category_name: categoryMap[e.category_id] || 'Uncategorized',
    }));

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formattedData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `expenses_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Successfully exported expenses to JSON file', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Financial Data" maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Export your {expenses.length} expense record{expenses.length === 1 ? '' : 's'} for personal accounting, spreadsheets, or audit backup.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ flexDirection: 'column', padding: '1.25rem', gap: '0.5rem', textTransform: 'none' }}
            onClick={exportCSV}
          >
            <FileSpreadsheet size={28} style={{ color: '#10b981' }} />
            <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>CSV Spreadsheet</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Excel, Google Sheets</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ flexDirection: 'column', padding: '1.25rem', gap: '0.5rem', textTransform: 'none' }}
            onClick={exportJSON}
          >
            <FileCode size={28} style={{ color: '#6366f1' }} />
            <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>JSON Format</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Raw Data Backup</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
