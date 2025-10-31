import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ products, onProductSelect }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [products]);

  const displayedProducts = useMemo(() => {
    let filtered = [...products];

    if (filterCategory !== 'All') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    if (sortOrder !== 'default') {
      const parsePrice = (priceStr: string) => Number(priceStr.replace(/[^0-9.-]+/g, ""));
      filtered.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return sortOrder === 'price-asc' ? priceA - priceB : priceB - priceA;
      });
    }
    
    return filtered;
  }, [products, filterCategory, sortOrder]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  const controlStyles = "bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-green";

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark-gray mb-6">Our Products</h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <div>
            <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
            <select id="category-filter" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={controlStyles}>
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sort-order" className="sr-only">Sort by Price</label>
            <select id="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={controlStyles}>
              <option value="default">Sort by Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <motion.div 
          key={filterCategory + sortOrder} // Re-trigger animation on change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  exit="exit"
                  layout
                  className="group bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-dark-gray mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-forest-green mb-4">{product.price}</p>
                    <button
                      onClick={() => onProductSelect(product)}
                      className="w-full bg-dark-gray text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 col-span-full"
              >
                No products match your criteria.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;