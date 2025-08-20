import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number; // auto-hide in ms
  onClose: () => void;
}

export default function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg z-50 transition-all duration-500
        ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
      `}
    >
      {message}
    </div>
  );
}
