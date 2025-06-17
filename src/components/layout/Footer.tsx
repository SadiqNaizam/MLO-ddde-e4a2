import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} Artisan Bakery Dashboard. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link to="/support" className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Support
          </Link>
          <Link to="/terms" className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-sm hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;