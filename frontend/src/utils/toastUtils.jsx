import React from 'react';
import { toast } from 'react-hot-toast';

const ErrorIcon = () => (
  <svg
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#FF0000" // violet
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4m0 4h.01"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#22c55e" // green
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const showError = (message) =>
  toast.error(message, {
    icon: <ErrorIcon />,
    duration: 4000,
    position: 'top-right',
    style: {
      border: '1px solid #FF0000', 
      background: '#fff',
      color: '##FF0000',
      padding: '14px 16px',
      fontWeight: 500,
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)',
      borderRadius: '8px',
    },
  });

export const showSuccess = (message) =>
  toast.success(message, {
    icon: <SuccessIcon />,
    duration: 4000,
    position: 'top-right',
    style: {
      border: '1px solid #22c55e', 
      background: '#fff',
      color: '#1f1f1f',
      padding: '14px 16px',
      fontWeight: 500,
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)',
      borderRadius: '8px',
    },
  });
