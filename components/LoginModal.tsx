
import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Hardcoded credentials for demonstration
    if (username === 'admin' && password === 'password') {
      onLoginSuccess();
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { y: "50px", opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-sm w-full"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-dark-gray">Admin Login</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-green focus:border-forest-green" 
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-green focus:border-forest-green" 
                  />
                </div>
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-forest-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <LogIn size={20} />
                    <span>Log In</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
