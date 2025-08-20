// src/components/Error.tsx
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
  message?: string;
}

export default function Error({ message }: ErrorProps) {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="relative max-w-md mx-auto mt-10 p-6 bg-red-50 border border-red-300 rounded-lg shadow-md text-red-700">

      {/* Icon + Message */}
      <div className="flex items-center mb-4">
        <AlertCircle className="w-6 h-6 mr-2 text-red-500" />
        <span className="font-medium">
          {message || "Something went wrong. Please try again."}
        </span>
      </div>

      {/* Center Close Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate(0)}
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
