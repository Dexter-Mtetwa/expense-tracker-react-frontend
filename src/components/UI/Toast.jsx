import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '400px',
      width: '100%',
      pointerEvents: 'none',
    }}>
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success': return <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />;
            case 'danger': return <XCircle size={18} style={{ color: '#f43f5e', flexShrink: 0 }} />;
            case 'warning': return <AlertTriangle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />;
            default: return <Info size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />;
          }
        };

        return (
          <div
            key={toast.id}
            className="animate-fade-in"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '0.75rem',
              padding: '0.875rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--card-bg-solid)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {getIcon()}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                padding: '2px',
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
