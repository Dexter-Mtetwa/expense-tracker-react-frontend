import React from 'react';
import Modal from './Modal';
import { AlertCircle } from 'lucide-react';

export default function ErrorModal({ isOpen, onClose, title = 'Unable to Complete Request', message }) {
  if (!isOpen || !message) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center', padding: '0.5rem 0' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          color: 'var(--danger)',
        }}>
          <AlertCircle size={28} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', lineHeight: 1.5, fontWeight: 500 }}>
            {message}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onClose}
          style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
        >
          Got it
        </button>
      </div>
    </Modal>
  );
}
