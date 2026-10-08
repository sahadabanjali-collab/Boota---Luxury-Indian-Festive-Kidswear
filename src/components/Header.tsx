import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown, RotateCcw } from 'lucide-react';
import { MegaMenu, NavTab } from './MegaMenu';
import { bootaLogo } from '../assets/images';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  currentView?: string;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateHome?: () => void;
  onNavigatePage?: (page: string) => void;
  onSelectCategory?: (category: string) => void;
}

const navTabs: NavTab[] = ['GIRL', 'COLLECTION', 'OCCASIONS', 'ACCESSORIES', 'SALE'];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  currentView = 'home',
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onNavigateHome,
  onNavigatePage,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<NavTab | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<NavTab | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sticky shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileAccordion = (tab: NavTab) => {
    setOpenMobileAccordion((prev) => (prev === tab ? null : tab));
  };

  const handleItemClick = (e: React.MouseEvent, category?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(null);
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <header
      onMouseLeave={() => setActiveTab(null)}
      className={`relative bg-[#FFFFFF] border-b border-[#E8DADD] sticky top-0 z-30 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-xs' : ''
      }`}
    >
      <div
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between transition-all duration-300 relative ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
      >
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-[#2B2224] hover:text-[#962949] cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>

          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-90 transition-opacity pr-2 py-1 shrink-0 cursor-pointer"
            aria-label="Boota Homepage"
          >
            <img
              src={bootaLogo}
              alt="Boota"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? 'h-10 sm:h-11 w-auto max-h-11' : 'h-12 sm:h-13 w-auto max-h-13'
              }`}
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Center: Desktop Navigation in Title Case matching reference */}
        <nav className="hidden md:flex items-center justify-center space-x-7 lg:space-x-8 xl:space-x-10 absolute left-1/2 -translate-x-1/2">
          {navTabs.map((tab) => {
            const isActive =
              activeTab === tab ||
              (tab === 'GIRL' && currentView === 'girl') ||
              (tab === 'ACCESSORIES' && currentView === 'accessories') ||
              (tab === 'COLLECTION' && currentView === 'collection') ||
              (tab === 'OCCASIONS' && (currentView === 'occasions' || currentView as string === 'occasion')) ||
              (tab === 'SALE' && currentView === 'sale');
            const label = tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase();
            return (
              <div
                key={tab}
                className="relative py-7 shrink-0"
                onMouseEnter={() => setActiveTab(tab)}
              >
                <button
                  onClick={() => {
                    if (tab === 'GIRL') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('girl');
                    } else if (tab === 'ACCESSORIES') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('accessories');
                    } else if (tab === 'COLLECTION') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('collection');
                    } else if (tab === 'OCCASIONS') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('occasions');
                    } else if (tab === 'SALE') {
                      setActiveTab(null);
                      if (onNavigatePage) onNavigatePage('sale');
                    } else {
                      setActiveTab(activeTab === tab ? null : tab);
                    }
                  }}
                  className={`text-[15px] lg:text-[15.5px] font-medium tracking-normal transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#962949]' : 'text-[#2B2224] hover:text-[#962949]'
                  }`}
                >
                  {label}
                </button>
                {isActive && (
                  <span className="absolute bottom-5 left-0 right-0 h-[2px] bg-[#962949] rounded-full" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Actions - 4 icons pushed all the way to the right */}
        <div className="ml-auto flex items-center space-x-5 lg:space-x-6 text-[#2B2224] shrink-0 justify-end z-10">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full"
            aria-label="Search collection"
            title="Search"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* User / My Account Icon */}
          <button
            onClick={onOpenAccount}
            className="p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full"
            aria-label="My Account"
            title="My Account"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#962949] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-1 hover:text-[#962949] transition-colors cursor-pointer rounded-full flex items-center justify-center"
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
            {cartCount !== undefined && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 bg-[#962949] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu
        activeTab={activeTab}
        onClose={() => setActiveTab(null)}
        onSelectCategory={onSelectCategory}
      />

      {/* Mobile Drawer (matching "new navbar.jpg" exactly) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col md:hidden overflow-y-auto">
          {/* Header Row */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#E8DADD] shrink-0 bg-[#FFFFFF]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="flex items-center py-1"
              aria-label="Boota Homepage"
            >
              <img
                src={bootaLogo}
                alt="Boota"
                className="h-10 w-auto object-contain max-h-10"
                referrerPolicy="no-referrer"
              />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#2B2224] hover:text-[#962949] cursor-pointer rounded-[4px]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>

          {/* Accordion Categories */}
          <div className="divide-y divide-[#E8DADD] border-b border-[#E8DADD]">
            {/* Home Item */}
            <div className="w-full">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateHome) {
                    onNavigateHome();
                  }
                }}
                className={`w-full py-4 px-6 flex items-center justify-between text-left cursor-pointer transition-colors ${
                  currentView === 'home'
                    ? 'text-[#962949] font-semibold bg-[#FFF9FA]'
                    : 'text-[#000000] hover:text-[#962949]'
                }`}
              >
                <span className="text-[14.5px] font-medium tracking-[0.05em] uppercase">
                  Home
                </span>
                {currentView === 'home' && (
                  <span className="w-2 h-2 rounded-full bg-[#962949]" />
                )}
              </button>
            </div>

            {navTabs.map((tab) => {
              const isOpen = openMobileAccordion === tab;
              const isSale = tab === 'SALE';

              return (
                <div key={tab} className="w-full">
                  <button
                    onClick={() => toggleMobileAccordion(tab)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span className="text-[14.5px] font-medium tracking-[0.05em] uppercase text-[#000000]">
                      {tab}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-[#000000] ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Accordion Content with details filled from Desktop Screenshots */}
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 space-y-4 bg-[#FFFDF9] border-t border-[#E8DADD]/60 text-[13.5px]">
                      {tab === 'GIRL' && (
                        <div className="space-y-4 pt-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (onNavigatePage) onNavigatePage('girl');
                            }}
                            className="w-full text-left font-bold text-[#142B6F] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Girls Collection</span>
                            <span>→</span>
                          </button>
                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Boota Desi
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#suit-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Suit Sets</a></li>
                              <li><a href="#lehenga-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Lehenga Sets</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Boota Play
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#dresses" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Dresses</a></li>
                              <li><a href="#top-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Top Sets</a></li>
                              <li><a href="#tops" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Tops</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Shop by Age
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#baby-age" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Baby (0-12 months)</a></li>
                              <li><a href="#toddler-age" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Toddler (1-3 years)</a></li>
                              <li><a href="#kids-age" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Kids (3+ years)</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Accessories
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#hair-acc" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Hair Accessories</a></li>
                              <li><a href="#bangles" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Bangles</a></li>
                              <li><a href="#jewellery" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Jewellery</a></li>
                              <li><a href="#bags" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Bags</a></li>
                              <li><a href="#sale" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5 text-[#962949] font-medium">Sale</a></li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'COLLECTION' && (
                        <div className="space-y-4 pt-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (onNavigatePage) onNavigatePage('collection');
                            }}
                            className="w-full text-left font-bold text-[#142B6F] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Boota Collections</span>
                            <span>→</span>
                          </button>
                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Boota Desi
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#suit-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Suit Sets</a></li>
                              <li><a href="#lehenga-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Lehenga Sets</a></li>
                              <li><a href="#sharara-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Sharara Sets</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Boota Play
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#dresses" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Dresses</a></li>
                              <li><a href="#top-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Top Sets</a></li>
                              <li><a href="#co-ords" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Co-ords</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Boota Luxe
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#festive-lehengas" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Festive Lehengas</a></li>
                              <li><a href="#occasion-sets" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Occasion Sets</a></li>
                              <li><a href="#silk-edit" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5 font-medium text-[#962949]">Silk Edit</a></li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'OCCASIONS' && (
                        <div className="space-y-4 pt-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (onNavigatePage) onNavigatePage('occasions');
                            }}
                            className="w-full text-left font-bold text-[#142B6F] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Upcoming Occasions</span>
                            <span>→</span>
                          </button>
                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Baby Ceremonies
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#baby-welcome" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Baby Welcome &amp; Naming</a></li>
                              <li><a href="#mundan" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Head Shave: Mundan</a></li>
                              <li><a href="#annaprashan" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">First Food: Annaprashan</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Upcoming Occasions
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#ganesh-chaturthi" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Ganesh Chaturthi</a></li>
                              <li><a href="#navratri" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Navratri &amp; Durga Puja</a></li>
                              <li><a href="#diwali" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5 font-medium text-[#962949]">Diwali</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Wedding
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#mehendi" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Mehendi</a></li>
                              <li><a href="#haldi" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Haldi</a></li>
                              <li><a href="#sangeet" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Sangeet</a></li>
                              <li><a href="#wedding" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5 font-medium text-[#962949]">Wedding</a></li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'ACCESSORIES' && (
                        <div className="space-y-4 pt-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (onNavigatePage) onNavigatePage('accessories');
                            }}
                            className="w-full text-left font-bold text-[#142B6F] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Accessories Collection</span>
                            <span>→</span>
                          </button>
                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Baby
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#swaddles" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Swaddles</a></li>
                              <li><a href="#pillows" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Mustard Seed Pillows</a></li>
                              <li><a href="#toys" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Toys</a></li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Girl
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#hair-accessories" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Hair Accessories</a></li>
                              <li><a href="#bags" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Bags</a></li>
                              <li><a href="#bangles" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Bangles</a></li>
                              <li><a href="#jewellery" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Jewellery</a></li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {tab === 'SALE' && (
                        <div className="space-y-4 pt-2">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (onNavigatePage) onNavigatePage('sale');
                            }}
                            className="w-full text-left font-bold text-[#142B6F] text-[13.5px] py-1 border-b border-[#E8DADD] flex items-center justify-between cursor-pointer"
                          >
                            <span>Explore All Sale Collections</span>
                            <span>→</span>
                          </button>
                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Sale
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li>
                                <button
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    if (onNavigatePage) onNavigatePage('sale');
                                  }}
                                  className="hover:text-[#962949] block py-0.5 font-medium text-[#962949] text-left cursor-pointer"
                                >
                                  All Sale
                                </button>
                              </li>
                              <li><a href="#first-time" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">First Time on Sale</a></li>
                              <li><a href="#special-prices" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5">Special Prices</a></li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Utility Items matching 'new navbar.jpg' */}
          <div className="pt-5 pb-8 px-6 space-y-3.5 text-[15px] text-[#2B2224] shrink-0 bg-[#FFFFFF]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="block w-full text-left hover:text-[#962949] transition-colors cursor-pointer py-1"
            >
              <span className="font-medium whitespace-nowrap text-[15px] inline-block">My Account</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigatePage) onNavigatePage('returns');
              }}
              className="flex items-center gap-3 w-full text-left text-[#962949] font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-[19px] h-[19px] stroke-[1.8] text-[#962949]" />
              <span>Track, Return or Exchange</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWishlist();
              }}
              className="flex items-center gap-3 w-full text-left hover:text-[#962949] transition-colors cursor-pointer"
            >
              <Heart className="w-[19px] h-[19px] stroke-[1.8] text-[#2B2224]" />
              <span className="font-medium">Wishlist</span>
            </button>

            <div className="pt-2 border-t border-[#E8DADD]/60 space-y-2 text-[14px]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('about');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                About Boota
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('why-boota');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Why Choose Boota?
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('blog');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Blog &amp; Festive Guides
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('gift-card');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Gift Cards
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('size-guide');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                Size Guide
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('faq');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer"
              >
                FAQ &amp; Help
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigatePage) onNavigatePage('contact');
                }}
                className="block text-left w-full hover:text-[#962949] transition-colors py-0.5 font-medium cursor-pointer text-[#962949]"
              >
                Contact Concierge · +91 7291947002
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

