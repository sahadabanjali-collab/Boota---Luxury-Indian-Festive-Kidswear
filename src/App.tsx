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
import { SizeGuideModal } from './components/SizeGuideModal';
import { FloatingChat } from './components/FloatingChat';
import { CartItem, Product, AnnouncementMessage } from './types';
import { initialAnnouncements, allProducts } from './data/products';
import { ArrowLeft, Settings } from 'lucide-react';
import { BestPairedWith } from './components/BestPairedWith';
import { SimilarStyleCarousel } from './components/SimilarStyleCarousel';
import { AdminProductSettingsModal } from './components/AdminProductSettingsModal';

// Specialized Content & Brand Pages
import { GirlsLandingPage } from './pages/GirlsLandingPage';
import { AccessoriesLandingPage } from './pages/AccessoriesLandingPage';
import { CollectionsLandingPage } from './pages/CollectionsLandingPage';
import { OccasionsLandingPage } from './pages/OccasionsLandingPage';
import { SaleLandingPage } from './pages/SaleLandingPage';
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
  | 'girl'
  | 'collection'
  | 'accessories'
  | 'occasions'
  | 'sale'
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
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'home') return 'home';
      if (hash === 'girl' || hash === 'girls') return 'girl';
      if (hash === 'collection' || hash === 'collections') return 'collection';
      if (hash === 'accessories' || hash === 'accessory') return 'accessories';
      if (hash === 'occasions' || hash === 'occasion') return 'occasions';
      if (hash === 'sale') return 'sale';
      if (hash === 'pdp') return 'pdp';
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'home') return 'home';
      if (params.get('view') === 'girl' || params.get('view') === 'girls') return 'girl';
      if (params.get('view') === 'collection' || params.get('view') === 'collections') return 'collection';
      if (params.get('view') === 'accessories' || params.get('view') === 'accessory') return 'accessories';
      if (params.get('view') === 'occasions' || params.get('view') === 'occasion') return 'occasions';
      if (params.get('view') === 'sale') return 'sale';
      // Default to 'pdp' so the user directly sees the product page requested
      return 'pdp';
    }
    return 'pdp';
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(allProducts[0]);
  const [announcements, setAnnouncements] = useState<AnnouncementMessage[]>(initialAnnouncements);
  const [collectionFilter, setCollectionFilter] = useState<'all' | 'desi' | 'play' | 'luxe'>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');
  const [saleFilter, setSaleFilter] = useState<string>('all');
  const [girlAge, setGirlAge] = useState<string>('');

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
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Configurable Return Window & Best Paired With Map
  const [returnDays, setReturnDays] = useState<number>(() => {
    const saved = localStorage.getItem('boota_return_days');
    return saved ? Number(saved) : 7;
  });

  const [pairedProductMap, setPairedProductMap] = useState<{ [productId: string]: string[] }>(() => {
    const saved = localStorage.getItem('boota_paired_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      'gulnar-silk-lehenga': ['kundan-headband', 'kolhapuri-sandals', 'potli-bag'],
      'noorani-tissue-sharara': ['kundan-headband', 'lac-bangles', 'potli-bag'],
      'kesar-bandhani-gharara': ['lac-bangles', 'kolhapuri-sandals', 'potli-bag'],
    };
  });

  const [adminSettingsOpen, setAdminSettingsOpen] = useState(false);

  const handleUpdateReturnDays = (days: number) => {
    setReturnDays(days);
    localStorage.setItem('boota_return_days', String(days));
    showToast(`Return window updated to ${days} days`);
  };

  const handleUpdatePairedProducts = (productId: string, pairedIds: string[]) => {
    setPairedProductMap((prev) => {
      const updated = { ...prev, [productId]: pairedIds };
      localStorage.setItem('boota_paired_products', JSON.stringify(updated));
      return updated;
    });
    showToast('Best paired with products updated!');
  };

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
      'girl',
      'collection',
      'accessories',
      'occasions',
      'sale',
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
    let target: string = page.toLowerCase().replace('#', '').trim();
    if (target === 'girls') target = 'girl';
    if (target === 'collections') target = 'collection';
    if (target === 'accessory' || target === 'acc') target = 'accessories';
    if (target === 'occasion') target = 'occasions';
    if (target === 'sales') target = 'sale';
    if (target === 'contact-us') target = 'contact';
    if (target === 'return' || target === 'returns-exchanges') target = 'returns';

    // Route category hashes from mobile directly to the proper page
    if (
      [
        'lehenga-sets',
        'suit-sets',
        'sharara-sets',
        'anarkalis',
        'anarkali-sets',
        'dresses',
        'tops',
        'top-sets',
        'baby-age',
        'toddler-age',
        'kids-age',
      ].includes(target)
    ) {
      setCurrentView('girl');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    if (['boota-desi', 'boota-play', 'boota-luxe'].includes(target)) {
      if (target === 'boota-desi') setCollectionFilter('desi');
      if (target === 'boota-play') setCollectionFilter('play');
      if (target === 'boota-luxe') setCollectionFilter('luxe');
      setCurrentView('collection');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    if (validPages.includes(target as AppView)) {
      setCurrentView(target as AppView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
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
          const lower = cat.toLowerCase().trim();
          if (lower === 'girl' || lower === 'girls') {
            handleNavigatePage('girl');
            return;
          }
          if (lower === '0-12m' || lower.includes('0-12') || lower.includes('baby (0-12')) {
            setGirlAge('0-12M');
            handleNavigatePage('girl');
            return;
          }
          if (lower === '1-3y' || lower.includes('1-3') || lower.includes('toddler (1-3')) {
            setGirlAge('1-3Y');
            handleNavigatePage('girl');
            return;
          }
          if (lower === '3y+' || lower.includes('3+') || lower.includes('kids (3+')) {
            setGirlAge('3Y+');
            handleNavigatePage('girl');
            return;
          }
          if (lower === 'collection' || lower === 'collections') {
            setCollectionFilter('all');
            handleNavigatePage('collection');
            return;
          }
          if (lower.includes('desi')) {
            setCollectionFilter('desi');
            handleNavigatePage('collection');
            return;
          }
          if (lower.includes('play')) {
            setCollectionFilter('play');
            handleNavigatePage('collection');
            return;
          }
          if (lower.includes('luxe')) {
            setCollectionFilter('luxe');
            handleNavigatePage('collection');
            return;
          }
          if (
            lower === 'accessories' ||
            lower === 'accessory' ||
            lower.includes('swaddle') ||
            lower.includes('pillow') ||
            lower.includes('toy') ||
            lower.includes('hair') ||
            lower.includes('bangle') ||
            lower.includes('jewel') ||
            lower.includes('bag')
          ) {
            handleNavigatePage('accessories');
            return;
          }
          if (lower === 'occasions' || lower === 'occasion') {
            setOccasionFilter('all');
            handleNavigatePage('occasions');
            return;
          }
          if (lower.includes('ganesh') || lower.includes('ganpati')) {
            setOccasionFilter('ganesh-chaturthi');
            handleNavigatePage('occasions');
            return;
          }
          if (lower.includes('navratri') || lower.includes('durga')) {
            setOccasionFilter('navratri');
            handleNavigatePage('occasions');
            return;
          }
          if (lower.includes('diwali') || lower.includes('dussehra')) {
            setOccasionFilter('diwali');
            handleNavigatePage('occasions');
            return;
          }
          if (
            lower.includes('baby welcome') ||
            lower.includes('mundan') ||
            lower.includes('annaprashan') ||
            lower.includes('baby ceremonies')
          ) {
            setOccasionFilter('baby-ceremonies');
            handleNavigatePage('occasions');
            return;
          }
          if (
            lower.includes('wedding') ||
            lower.includes('mehendi') ||
            lower.includes('haldi') ||
            lower.includes('sangeet')
          ) {
            setOccasionFilter('wedding');
            handleNavigatePage('occasions');
            return;
          }
          if (lower === 'sale' || lower === 'all sale') {
            setSaleFilter('all');
            handleNavigatePage('sale');
            return;
          }
          if (lower.includes('sale') && lower.includes('desi')) {
            setSaleFilter('desi');
            handleNavigatePage('sale');
            return;
          }
          if (lower.includes('sale') && lower.includes('play')) {
            setSaleFilter('play');
            handleNavigatePage('sale');
            return;
          }
          if (lower.includes('sale') && lower.includes('luxe')) {
            setSaleFilter('luxe');
            handleNavigatePage('sale');
            return;
          }
          if (
            lower.includes('special offer') ||
            lower.includes('special prices') ||
            lower.includes('last chance') ||
            lower.includes('first time on sale') ||
            lower.includes('special')
          ) {
            setSaleFilter('special');
            handleNavigatePage('sale');
            return;
          }
          if (
            lower.includes('suit') ||
            lower.includes('lehenga') ||
            lower.includes('sharara') ||
            lower.includes('dress') ||
            lower.includes('kurti') ||
            lower.includes('top') ||
            lower.includes('anarkali')
          ) {
            handleNavigatePage('girl');
            return;
          }
          const match = allProducts.find(
            (p) =>
              p.name.toLowerCase().includes(lower) ||
              p.category.toLowerCase().includes(lower) ||
              p.collection.toLowerCase().includes(lower)
          );
          if (match) {
            setSelectedProduct(match);
            setCurrentView('pdp');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`Viewing ${match?.name}`);
            return;
          }
          handleNavigatePage('girl');
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'sale' && (
          <SaleLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentView('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => handleNavigatePage('home')}
            initialFilter={saleFilter}
          />
        )}

        {currentView === 'occasions' && (
          <OccasionsLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentView('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => handleNavigatePage('home')}
            initialFilter={occasionFilter}
          />
        )}

        {currentView === 'collection' && (
          <CollectionsLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentView('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => handleNavigatePage('home')}
            initialFilter={collectionFilter}
          />
        )}

        {currentView === 'accessories' && (
          <AccessoriesLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentView('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || 'Free Size', p.color, p);
            }}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

        {currentView === 'girl' && (
          <GirlsLandingPage
            products={allProducts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setCurrentView('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={(p, size) => {
              handleAddToBag(size || p.sizes[0] || '1-2 Y', p.color, p);
            }}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        )}

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

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setAdminSettingsOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[4px] border border-[#E8DADD] bg-white hover:bg-[#FAF6F4] text-[12px] font-semibold text-[#962949] transition-colors cursor-pointer shadow-2xs"
                    title="Store Admin: Edit Return Window & Best Paired With Products"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Store Admin</span>
                  </button>

                  <button
                    onClick={() => setCurrentView('home')}
                    className="inline-flex items-center space-x-1.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#962949] hover:text-[#80223d] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2]" />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Hero 2-Column Split */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-6 lg:py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left: Minimum 6 images gallery with hover zoom & lightbox */}
                <div className="lg:col-span-7">
                  <ProductGallery product={selectedProduct} />
                </div>

                {/* Right: Sticky product information & purchase details */}
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
                    onOpenSizeGuide={() => setSizeGuideOpen(true)}
                    onOpenReviews={() => setReviewsOpen(true)}
                    onOpenReturnsPolicy={() => handleNavigatePage('returns')}
                    returnDays={returnDays}
                  />
                </div>
              </div>

              {/* "Best paired with" cross-sell section */}
              <BestPairedWith
                currentProduct={selectedProduct}
                allProducts={allProducts}
                pairedIds={pairedProductMap[selectedProduct?.id || '']}
                onAddToBag={(item) =>
                  handleAddToBag(item.sizes[0] || 'Free Size', item.color, item)
                }
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            </div>

            {/* Product Craft Details Section */}
            <TheDetailsSection />

            {/* Bottom: "similar style" scrollable row */}
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
              <SimilarStyleCarousel
                currentProduct={selectedProduct}
                allProducts={allProducts}
                onSelectProduct={handleSelectProduct}
                onAddToBag={(item) =>
                  handleAddToBag(item.sizes[0] || '1-2 Y', item.color, item)
                }
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            </div>
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

      {/* Sizing Pop-up Modal for Clothes */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onViewFullPage={() => {
          setSizeGuideOpen(false);
          handleNavigatePage('size-guide');
        }}
        productName={selectedProduct?.name}
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

      {/* Store Admin Settings Modal (Editable Return Days & Best Paired With) */}
      <AdminProductSettingsModal
        isOpen={adminSettingsOpen}
        onClose={() => setAdminSettingsOpen(false)}
        returnDays={returnDays}
        onUpdateReturnDays={handleUpdateReturnDays}
        allProducts={allProducts}
        currentProduct={selectedProduct}
        pairedProductMap={pairedProductMap}
        onUpdatePairedProducts={handleUpdatePairedProducts}
      />

      {/* WhatsApp Concierge / Floating Help */}
      <FloatingChat />
    </div>
  );
}
