
import React, { useState } from 'react';
import type { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const WeChatPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75">
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-lg p-8 text-center relative max-w-sm w-full"
        >
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-4">Order via WeChat</h3>
            <img src="https://picsum.photos/seed/qrcode/200/200" alt="WeChat QR Code" className="mx-auto mb-4 border-4 border-gray-200 rounded-md" />
            <p className="text-gray-600">Scan the QR code with WeChat to contact us and place your order.</p>
            <p className="mt-2 text-sm text-gray-500">WeChat ID: TentChargedSales</p>
        </motion.div>
    </div>
);


const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [showWeChat, setShowWeChat] = useState(false);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50%", opacity: 0, scale: 0.8 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 25 }
    },
    exit: { y: "50%", opacity: 0, scale: 0.8 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-64 md:h-auto object-cover" />
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-gray mb-2">{product.name}</h2>
            <p className="text-xl md:text-2xl font-bold text-forest-green mb-4">{product.price}</p>
            <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
            <button
              onClick={() => setShowWeChat(true)}
              className="mt-auto w-full bg-forest-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors duration-300"
            >
              Order via WeChat
            </button>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white/50 rounded-full p-1">
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showWeChat && <WeChatPopup onClose={() => setShowWeChat(false)} />}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default ProductModal;