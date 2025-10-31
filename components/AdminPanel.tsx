import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud } from 'lucide-react';
import type { Product } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productData: Omit<Product, 'id'>) => void;
}

const productCategories = ['2-Person', 'Family', 'Solo', 'Expedition', 'Shelter', 'Glamping'];

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(productCategories[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setName('');
    setPrice('');
    setCategory(productCategories[0]);
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview('');
    setDescription('');
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image for the product.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      const base64ImageUrl = reader.result as string;
      onAddProduct({ name, price, category, imageUrl: base64ImageUrl, description });
      resetForm();
      onClose();
    };
    reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('There was an error processing the image. Please try again.');
    };
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      resetForm(); // Reset form when panel is closed
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forest-green focus:border-forest-green";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-[70] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col space-y-4 overflow-y-auto pr-2">
              <div>
                <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" id="product-name" value={name} onChange={(e) => setName(e.target.value)} required className={inputStyles} />
              </div>
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">Price (e.g., ¥1,299)</label>
                <input type="text" id="product-price" value={price} onChange={(e) => setPrice(e.target.value)} required className={inputStyles} />
              </div>
               <div>
                <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="product-category" value={category} onChange={(e) => setCategory(e.target.value)} required className={inputStyles}>
                  {productCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="product-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-forest-green hover:text-green-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-forest-green">
                        <span>Upload an image</span>
                        <input id="product-image-upload" name="product-image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} required />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>
              </div>

              {imagePreview && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image Preview</label>
                    <div className="mt-2 aspect-video w-full rounded-lg overflow-hidden border">
                        <img src={imagePreview} alt="Product preview" className="w-full h-full object-cover" />
                    </div>
                </div>
              )}

              <div>
                <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="product-description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} required className={inputStyles}></textarea>
              </div>
              <div className="mt-auto pt-4">
                <button type="submit" className="w-full bg-forest-green text-white font-bold py-3 px-6 rounded-md hover:bg-green-800 transition-colors duration-300">
                  Add Product
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;