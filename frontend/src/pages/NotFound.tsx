import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Square Card */}
      <div className="w-96 h-96 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
        
        {/* Animated 404 */}
        <h1 className="text-8xl font-extrabold text-gray-800 animate-bounce">
          404
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xl font-semibold text-gray-600 animate-pulse">
          Oops! Page not found.
        </p>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          🔙 Go Back
        </button>
      </div>
    </div>
  );
}
