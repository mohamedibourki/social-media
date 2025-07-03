import React from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-10 w-10 text-blue-200" />
            <span className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors">
              University Student Affairs
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {['login'].map((item) => (
                <div key={item} className="relative group">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-lg text-sm font-semibold 
                    bg-blue-800/50 hover:bg-blue-700 transition-all duration-200 
                    flex items-center space-x-2 border border-blue-700/50 hover:border-blue-600"
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg
                hover:bg-blue-800/50 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-blue-900/95 backdrop-blur-sm shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {['Services', 'Resources', 'Events', 'Support', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-3 rounded-lg text-base font-medium
                  hover:bg-blue-800/50 transition-all duration-200 hover:pl-6"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}