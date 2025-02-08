import React, { useContext } from 'react';
import Toast from './toast/Toast';
import { ToastContext } from '../context/ToastContext';

const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;