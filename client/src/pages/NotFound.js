import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-red-600 text-4xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home size={20} />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center gap-2 w-full justify-center"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact support.
        </div>
      </div>
    </div>
  );
};

export default NotFound;