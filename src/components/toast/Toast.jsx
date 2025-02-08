import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './toast.css';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaThumbsUp } from 'react-icons/fa';
import { ToastContext } from '../../contexts/ToastContext';

const Toast = ({ id, type = 'success', message = '', duration = 3000, position = 'top-right', dismissable = true, animationIn = 'slide-in-left', animationOut = 'slide-out-right', animationSpeed = 0.5 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    document.documentElement.style.setProperty('--animation-duration', `${animationSpeed}s`);
  }, [animationSpeed]);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleDismiss = () => {
    setIsExiting(true);
  };

  const handleAnimationEnd = (event) => {
    if (isExiting && event.animationName.includes('slideOut')) {
      setIsVisible(false);
      removeToast(id);
    }
  };

  const toastClasses = `MToast ${type} ${isExiting ? animationOut : animationIn}`;

  const iconMap = {
    success: FaCheckCircle,
    info: FaInfoCircle,
    warning: FaExclamationTriangle,
    danger: FaTimesCircle,
    primary: FaThumbsUp,
  };

  const Icon = iconMap[type] || iconMap.success;

  return isVisible ? (
    <div className={`MToast-container ${position}`}>
      <div className={toastClasses} role="alert" onAnimationEnd={handleAnimationEnd}>
        <div className="flex items-center justify-center bg-base-100 text-base-content shadow-2xl text-md font-bold">
          <div className="MToast-icon">
            <Icon />
          </div>
          <div className="MToast-body">
            {message}
          </div>

          {dismissable && (
            <button type="button" className="MToast-close" onClick={handleDismiss}>
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

Toast.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'primary']),
  message: PropTypes.string,
  duration: PropTypes.number,
  position: PropTypes.oneOf(['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center', 'middle-center']),
  dismissable: PropTypes.bool,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  animationSpeed: PropTypes.number,
};

export default Toast;