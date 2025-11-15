import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-6xl font-extrabold text-brand mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand-dark transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
