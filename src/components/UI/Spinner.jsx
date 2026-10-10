import React from 'react';
import { LoaderCircle } from 'lucide-react';
import './Spinner.css';

export default function Spinner({ size = 24, className = '' }) {
  return <LoaderCircle className={`spinner ${className}`} size={size} />;
}
