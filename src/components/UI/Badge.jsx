import React from 'react';

export default function Badge({ children, variant = 'primary', icon: Icon, style = {} }) {
  const getVariantClass = () => {
    switch (variant) {
      case 'success': return 'badge-success';
      case 'danger': return 'badge-danger';
      case 'warning': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  return (
    <span className={`badge ${getVariantClass()}`} style={style}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
