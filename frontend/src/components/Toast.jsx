import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle size={18} className="text-gold" />}
            {toast.type === 'info' && <Info size={18} className="text-gold" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-red" />}
          </div>
          <div className="toast-message">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="toast-close-btn"
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
