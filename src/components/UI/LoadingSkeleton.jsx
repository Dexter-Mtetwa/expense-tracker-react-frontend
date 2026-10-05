import React from 'react';

export function SkeletonCard() {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ width: '40%', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
      <div style={{ width: '70%', height: '28px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} />
      <div style={{ width: '30%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', gap: '1rem', width: '50%' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '60%' }}>
              <div style={{ height: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
              <div style={{ height: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', width: '40%' }} />
            </div>
          </div>
          <div style={{ width: '20%', height: '18px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      ))}
    </div>
  );
}
