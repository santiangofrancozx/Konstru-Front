// src/components/ui/Modal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './button'; // Asegúrate de ajustar la importación al componente de botón que estés utilizando

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl h-3/4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Modal Title</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
