import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-gray-900 to-surface">
      <div className="w-full max-w-md p-8 bg-surface/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h1>
        <p className="text-gray-300 mb-6">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-md hover:opacity-90 transition-opacity">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;