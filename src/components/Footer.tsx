import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {year} Feedback Form. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
             <span className="text-gray-600 text-sm">$HOOTER</span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex gap-6">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;