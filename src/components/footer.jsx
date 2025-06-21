import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">FoodieZilla</h1>
        <p className="text-sm mt-2 md:mt-0">&copy; {new Date().getFullYear()} FoodieZilla. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-200">Privacy</a>
          <a href="#" className="hover:text-gray-200">Terms</a>
          <a href="#" className="hover:text-gray-200">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
