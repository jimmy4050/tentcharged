import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, UserCog, LogIn, LogOut } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onAdminClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, onLoginClick, onAdminClick, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  
  const headerClasses = `fixed w-full top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-sm text-dark-gray' : 'bg-transparent text-white'}`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" onClick={(e) => handleNavLinkClick(e, '#home')} aria-label="Go to homepage">
            <Logo className={`h-8 w-auto transition-colors duration-300 ${isScrolled ? 'text-dark-gray' : 'text-white'}`} />
          </a>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="font-medium hover:text-forest-green transition-colors">
                {link.name}
              </a>
            ))}
            {isAdmin ? (
              <>
                <button onClick={onAdminClick} className="flex items-center space-x-2 bg-forest-green text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors">
                    <UserCog size={20} />
                    <span>Admin Panel</span>
                </button>
                <button onClick={onLogout} className="flex items-center space-x-2 bg-dark-gray text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
              </>
            ) : (
                <button onClick={onLoginClick} className="flex items-center space-x-2 bg-dark-gray text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                    <LogIn size={20} />
                    <span>Admin Login</span>
                </button>
            )}
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden absolute top-full left-0 w-full ${isScrolled ? 'bg-white/95' : 'bg-dark-gray/95'} shadow-lg overflow-hidden`}
          >
            <nav className="flex flex-col items-center space-y-4 py-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="text-lg font-medium hover:text-forest-green transition-colors">
                  {link.name}
                </a>
              ))}
               {isAdmin ? (
                <div className="flex flex-col items-center space-y-4 mt-4">
                  <button onClick={() => { onAdminClick(); setIsMenuOpen(false); }} className="flex items-center space-x-2 bg-forest-green text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors w-40 justify-center">
                      <UserCog size={20} />
                      <span>Admin Panel</span>
                  </button>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="flex items-center space-x-2 bg-dark-gray text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors w-40 justify-center">
                      <LogOut size={20} />
                      <span>Logout</span>
                  </button>
                </div>
            ) : (
                <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="flex items-center space-x-2 bg-dark-gray text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors mt-4 w-40 justify-center">
                    <LogIn size={20} />
                    <span>Admin Login</span>
                </button>
            )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;