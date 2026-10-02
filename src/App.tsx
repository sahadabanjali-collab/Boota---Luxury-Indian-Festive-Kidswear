/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HomePage } from './components/home/HomePage';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetails } from './components/ProductDetails';
import { TheDetailsSection } from './components/TheDetailsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReviewsModal } from './components/ReviewsModal';
import { SearchModal } from './components/SearchModal';
import { FloatingChat } from './components/FloatingChat';
import { CartItem, Product, AnnouncementMessage } from './types';
import { initialAnnouncements, allProducts } from './data/products';
import { ArrowLeft } from 'lucide-react';

// Specialized Content & Brand Pages
import { AboutUsPage } from './pages/AboutUsPage';
import { WhyChooseBootaPage } from './pages/WhyChooseBootaPage';
import { BlogPage } from './pages/BlogPage';
import { GiftCardPage } from './pages/GiftCardPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { WholesalePage } from './pages/WholesalePage';
import { FAQPage } from './pages/FAQPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { ReturnsExchangesPage } from './pages/ReturnsExchangesPage';

// Customer Account, Orders & Returns System
import { UserProfile, Order, ReturnExchangeRequest } from './types/account';
import {
  getStoredUserProfile,
  saveStoredUserProfile,
  getStoredOrders,
  saveStoredOrders,
  getStoredReturns,
  saveStoredReturns,
} from './data/mockAccountData';
import { AccountDashboard } from './components/account/AccountDashboard';
import { AuthModal } from './components/account/AuthModal';
import { OrderDetailModal } from './components/account/OrderDetailModal';
import { ReturnExchangeModal } from './components/account/ReturnExchangeModal';

export type AppView =
  | 'home'
  | 'pdp'
  | 'about'
  | 'why-boota'
  | 'blog'
  | 'gift-card'
  | 'contact'
  | 'wholesale'
  | 'faq'
  | 'size-guide'
  | 'returns';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(allProducts[0]);
  const [announcements, setAnnouncements] = useState<AnnouncementMessage[]>(initialAnnouncements);

  // Customer Account & Orders State
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [returnsList, setReturnsList] = useState<ReturnExchangeRequest[]>(getStoredReturns);

  // Account & Returns Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [returnModalOrder, setReturnModalOrder] = useState<Order | null>(null);
  const [returnModalOpen, setReturnModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
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

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from Wishlist' : 'Saved to your Wishlist');
      return updated;
    });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBag = (size: string, color: string, productParam?: Product) => {
    const prod = productParam || selectedProduct || allProducts[0];
    const existingIndex = cartItems.findIndex(
      (item) => item.name === prod.name && item.size === size && item.color === color
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: `${prod.id}-${Date.now()}`,
          name: prod.name,
          collection: prod.collection,
          color: color,
          size: size,
          price: prod.price,
          quantity: 1,
          image: prod.image,
        },
      ]);
    }
    setCartOpen(true);
    showToast(`Added ${prod.name} (${size}, ${color}) to bag`);
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

  const handleOpenAccount = () => {
    if (userProfile.isLoggedIn) {
      setDashboardOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Cancelled' as const,
          cancellable: false,
          trackingTimeline: [
            {
              status: 'Cancelled',
              timestamp: 'Just now',
              description: 'Order cancelled by customer. 100% refund initiated to source.',
              completed: true,
              current: true,
            },
            ...o.trackingTimeline,
          ],
        };
      }
      return o;
    });
    setOrders(updated);
    saveStoredOrders(updated);
    showToast(
      `Order #${target?.orderNumber || ''} cancelled. Automatic refund of ₹${
        target?.total || 0
      } initiated.`
    );
  };

  const handleCreateReturnSuccess = (newReq: ReturnExchangeRequest) => {
    const updated = [newReq, ...returnsList];
    setReturnsList(updated);
    saveStoredReturns(updated);
    showToast(`Request #${newReq.requestNumber} confirmed! Doorstep pickup scheduled.`);
  };

  const handleUpdateUserProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveStoredUserProfile(updated);
  };

  const handleLogout = () => {
    const loggedOut: UserProfile = { ...userProfile, isLoggedIn: false };
    setUserProfile(loggedOut);
    saveStoredUserProfile(loggedOut);
    setDashboardOpen(false);
    showToast('Signed out of your Boota account.');
  };

  const handleLoginSuccess = (loggedUser: UserProfile) => {
    setUserProfile(loggedUser);
    saveStoredUserProfile(loggedUser);
    setAuthModalOpen(false);
    setDashboardOpen(true);
    showToast(`Welcome back, ${loggedUser.name}!`);
  };

  const handleNavigatePage = (page: string) => {
    const validPages: AppView[] = [
      'home',
      'pdp',
      'about',
      'why-boota',
      'blog',
      'gift-card',
      'contact',
      'wholesale',
      'faq',
      'size-guide',
      'returns',
    ];
    let target = page.toLowerCase().replace('#', '') as AppView;
    if (target === ('contact-us' as any)) target = 'contact';
    if (target === ('return' as any) || target === ('returns-exchanges' as any)) target = 'returns';

    if (validPages.includes(target)) {
      setCurrentView(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to browser hash for direct page linking (e.g. #about, #size-guide, #faq)
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (rawHash) {
        handleNavigatePage(rawHash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2B2224] flex flex-col font-sans">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar
        messages={announcements}
        onUpdateMessages={(newMsgs) => setAnnouncements(newMsgs)}
      />

      {/* 2. Global Header & Navigation */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentView={currentView}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() =>
          showToast(
            wishlistIds.length > 0
              ? `${wishlistIds.length} item(s) in your Wishlist`
              : 'Your wishlist is currently empty'
          )
        }
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={handleOpenAccount}
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigatePage={handleNavigatePage}
        onSelectCategory={(cat) => {
          setCurrentView('home');
          showToast(`Viewing ${cat} collection`);
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onOpenReviewsModal={() => setReviewsOpen(true)}
            onFilterChange={(type, val) => {
              showToast(`Browsing ${val}`);
            }}
          />
        )}

        {currentView === 'about' && (
          <AboutUsPage
            onNavigateHome={() => handleNavigatePage('home')}
            onExploreCollection={(cat) => {
              setCurrentView('home');
              showToast(cat ? `Viewing ${cat} Collection` : 'Exploring Collection');
            }}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentView === 'why-boota' && (
          <WhyChooseBootaPage
            onNavigateHome={() => handleNavigatePage('home')}
            onExploreCollection={() => {
              setCurrentView('home');
              showToast('Exploring Festive Collection');
            }}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage
            onNavigateHome={() => handleNavigatePage('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'gift-card' && (
          <GiftCardPage
            onNavigateHome={() => handleNavigatePage('home')}
            onAddToCart={(item) => {
              setCartItems((prev) => [...prev, item]);
              setCartOpen(true);
            }}
            showToast={showToast}
          />
        )}

        {currentView === 'contact' && (
          <ContactUsPage onNavigateHome={() => handleNavigatePage('home')} />
        )}

        {currentView === 'wholesale' && (
          <WholesalePage onNavigateHome={() => handleNavigatePage('home')} />
        )}

        {currentView === 'faq' && (
          <FAQPage
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateContact={() => handleNavigatePage('contact')}
            onNavigateSizeGuide={() => handleNavigatePage('size-guide')}
          />
        )}

        {currentView === 'size-guide' && (
          <SizeGuidePage
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateContact={() => handleNavigatePage('contact')}
          />
        )}

        {currentView === 'returns' && (
          <ReturnsExchangesPage
            allOrders={orders}
            onStartReturnModal={(targetOrder) => {
              setReturnModalOrder(targetOrder || null);
              setReturnModalOpen(true);
            }}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {currentView === 'pdp' && (
          /* Product Detail Page View with Back Navigation */
          <div className="w-full">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] pt-6 pb-2">
              <div className="flex items-center justify-between">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center space-x-2 text-[13px] text-[#6F6265] font-normal"
                >
                  <button
                    onClick={() => setCurrentView('home')}
                    className="hover:text-[#962949] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <span>/</span>
                  <span className="hover:text-[#962949] transition-colors">
                    {selectedProduct?.collection || 'Boota Luxe'}
                  </span>
                  <span>/</span>
                  <span className="text-[#2B2224] font-medium">
                    {selectedProduct?.name || 'Gulnar Silk Lehenga Set'}
                  </span>
                </nav>

                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center space-x-1.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#962949] hover:text-[#80223d] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2]" />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>

            {/* Product Hero 2-Column Split */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-6 lg:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                <div className="lg:col-span-7">
                  <ProductGallery product={selectedProduct} />
                </div>
                <div className="lg:col-span-5 lg:sticky lg:top-24">
                  <ProductDetails
                    product={selectedProduct}
                    onAddToBag={handleAddToBag}
                    onToggleWishlist={() =>
                      selectedProduct && handleToggleWishlist(selectedProduct.id)
                    }
                    isWishlisted={
                      selectedProduct ? wishlistIds.includes(selectedProduct.id) : false
                    }
                    onOpenReviews={() => setReviewsOpen(true)}
                  />
                </div>
              </div>
            </div>

            {/* Product Craft Details Section */}
            <TheDetailsSection />
          </div>
        )}
      </main>

      {/* 14. Full Boota Footer (4 Columns, Legal Bar, Payment Icons) */}
      <Footer
        onOpenAccount={handleOpenAccount}
        onNavigatePage={handleNavigatePage}
        onOpenSizeGuide={() => handleNavigatePage('size-guide')}
      />

      {/* Interactive Overlays */}
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
        onSelectItem={(productName: string) => {
          const match = allProducts.find((p) =>
            p.name.toLowerCase().includes(productName.toLowerCase())
          );
          if (match) {
            handleSelectProduct(match);
          }
          setSearchOpen(false);
        }}
      />

      {/* Customer Account Dashboard Modal */}
      <AccountDashboard
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        user={userProfile}
        orders={orders}
        returns={returnsList}
        onUpdateUser={handleUpdateUserProfile}
        onLogout={handleLogout}
        onViewOrder={(ord) => setDetailOrder(ord)}
        onStartReturn={(ord) => {
          setReturnModalOrder(ord || null);
          setReturnModalOpen(true);
        }}
        onCancelOrder={handleCancelOrder}
        wishlistProducts={allProducts.filter((p) => wishlistIds.includes(p.id))}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod, size, color) => handleAddToBag(size, color, prod)}
      />

      {/* Auth Modal (Mobile OTP primary, Email/Password, Guest) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenGuestReturn={() => {
          setReturnModalOrder(null);
          setReturnModalOpen(true);
        }}
      />

      {/* Order Detail Modal with Timeline, Invoice & Cancel */}
      <OrderDetailModal
        isOpen={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
        order={detailOrder}
        onCancelOrder={handleCancelOrder}
        onInitiateReturn={(ord) => {
          setReturnModalOrder(ord);
          setReturnModalOpen(true);
        }}
      />

      {/* 2-Minute Self-Service Return / Exchange Modal */}
      <ReturnExchangeModal
        isOpen={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        order={returnModalOrder}
        allOrders={orders}
        onSuccess={handleCreateReturnSuccess}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#2B2224] text-white text-[13.5px] px-5 py-2.5 rounded-[4px] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* WhatsApp Concierge / Floating Help */}
      <FloatingChat />
    </div>
  );
}
