import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import { INITIAL_PRODUCTS } from './constants';
import type { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
    setIsAdminPanelOpen(true); // Open admin panel on successful login
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    setIsAdminPanelOpen(false);
  };

  return (
    <div className="bg-white text-dark-gray font-sans">
      <Header
        isAdmin={isAdmin}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onAdminClick={() => setIsAdminPanelOpen(true)}
        onLogout={handleLogout}
      />
      <Hero />
      <main>
        <About />
        <Products products={products} onProductSelect={handleProductSelect} />
        <Contact />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)}
        onAddProduct={handleAddProduct}
      />
      <LoginModal 
        isOpen={isLoginModalOpen && !isAdmin} // Only show if not logged in
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;