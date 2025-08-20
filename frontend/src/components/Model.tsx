import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-red bg-opacity-40 z-50">
      <div className="bg-cyan-200 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-white hover:text-red-800"
          onClick={onClose}
        >
          ✕
        </button>
        {title && <h2 className="text-xl font-bold mb-4 text-blue-900">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
