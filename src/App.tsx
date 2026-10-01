/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetails } from './components/ProductDetails';
import { TheDetailsSection } from './components/TheDetailsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReviewsModal } from './components/ReviewsModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { FloatingChat } from './components/FloatingChat';
import { CartItem } from './types';
import { productImages } from './assets/images';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'gulnar-lehenga-1',
      name: 'Gulnar Silk Lehenga Set',
      collection: 'Boota Luxe',
      color: 'Rani Pink',
      size: '1-2 Y',
      price: 2899,
      quantity: 1,
      image: productImages.front,
    },
  ]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToBag = (size: string, color: string) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: `gulnar-lehenga-${Date.now()}`,
          name: 'Gulnar Silk Lehenga Set',
          collection: 'Boota Luxe',
          color: color,
          size: size,
          price: 2899,
          quantity: 1,
          image: productImages.front,
        },
      ]);
    }
    setCartOpen(true);
    showToast(`Added Gulnar Silk Lehenga Set (${size}, ${color}) to bag`);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    showToast(
      !isWishlisted
        ? 'Added to your Wishlist'
        : 'Removed from your Wishlist'
    );
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2224] flex flex-col font-sans">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Global Header & Navigation */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={isWishlisted ? 1 : 0}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() =>
          showToast(
            isWishlisted
              ? 'Gulnar Silk Lehenga Set is in your wishlist'
              : 'Wishlist is currently empty'
          )
        }
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
      />

      {/* 3. Main Product Page Body */}
      <main className="flex-1">
        {/* Breadcrumb: Max width 1320px, Side padding 56px desktop / 32px tablet / 16px mobile */}
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] pt-6 pb-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 text-[13px] text-[#6F6265] font-normal"
          >
            <a href="/" className="hover:text-[#962949] transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="#boota-luxe" className="hover:text-[#962949] transition-colors">
              Boota Luxe
            </a>
            <span>/</span>
            <span className="text-[#2B2224] font-medium">
              Gulnar Silk Lehenga Set
            </span>
          </nav>
        </div>

        {/* Product Section: 12 Columns / 24px Gutters (gap-6) */}
        <section id="product-section" className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-4 pb-14 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: 7 columns for 2x2 Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery />
            </div>

            {/* Right: 5 columns for contiguous purchase box */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ProductDetails
                onAddToBag={handleAddToBag}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={isWishlisted}
                onOpenReviews={() => setReviewsOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* 4. THE DETAILS Section: Section gap 96px desktop / 56px mobile */}
        <div id="accessories">
          <TheDetailsSection />
        </div>
      </main>

      {/* 5. Footer */}
      <Footer
        onOpenAccount={() => setAccountOpen(true)}
      />

      {/* 6. Drawers & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ReviewsModal
        isOpen={reviewsOpen}
        onClose={() => setReviewsOpen(false)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectItem={(term) => {
          showToast(`Filtered for: ${term}`);
        }}
      />

      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
      />

      {/* 7. Floating Chat / Concierge Widget */}
      <FloatingChat />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#962949] text-[#FFFFFF] text-[13px] font-medium px-4 py-2.5 rounded-[4px] border border-[#E8DADD] shadow-none">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
