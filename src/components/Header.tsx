import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { MegaMenu, NavTab } from './MegaMenu';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

const navTabs: NavTab[] = ['GIRL', 'COLLECTION', 'OCCASIONS', 'ACCESSORIES', 'SALE'];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
}) => {
  const [activeTab, setActiveTab] = useState<NavTab | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<NavTab | null>(null);

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

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative bg-[#FFFFFF] border-b border-[#E8DADD] sticky top-0 z-30">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] h-20 flex items-center justify-between">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-[#2B2224] hover:text-[#962949] cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>

          <a
            href="/"
            className="font-serif font-semibold text-[32px] sm:text-[38px] tracking-tight text-[#962949] hover:opacity-95 transition-opacity"
          >
            Boota
          </a>
        </div>

        {/* Center: Desktop Navigation (Manrope Medium, 13-14px, letter-spacing 0.04em) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <div
                key={tab}
                className="relative py-7"
                onMouseEnter={() => setActiveTab(tab)}
              >
                <button
                  onClick={() => setActiveTab(activeTab === tab ? null : tab)}
                  className={`text-[13.5px] font-medium tracking-[0.04em] uppercase transition-colors cursor-pointer ${
                    isActive ? 'text-[#962949]' : 'text-[#2B2224] hover:text-[#962949]'
                  }`}
                >
                  {tab}
                </button>
                {isActive && (
                  <span className="absolute bottom-5 left-0 right-0 h-[2px] bg-[#962949]" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-[#2B2224]">
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 hover:text-[#962949] transition-colors cursor-pointer rounded-[4px]"
            aria-label="Search collection"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          {/* Account */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-1.5 text-[13.5px] font-medium tracking-[0.04em] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer p-1.5 rounded-[4px]"
            aria-label="My Account"
          >
            <User className="w-[18px] h-[18px] stroke-[1.8]" />
            <span className="hidden sm:inline-block">My Account</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1.5 hover:text-[#962949] transition-colors cursor-pointer rounded-[4px]"
            aria-label="Wishlist"
          >
            <Heart className="w-[18px] h-[18px] stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#962949] text-[#FFFFFF] text-[10px] font-semibold rounded-[4px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-1.5 hover:text-[#962949] transition-colors cursor-pointer rounded-[4px]"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#962949] text-[#FFFFFF] text-[10px] font-semibold rounded-[4px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu activeTab={activeTab} onClose={() => setActiveTab(null)} />

      {/* Mobile Drawer (matching "new navbar.jpg" exactly) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col md:hidden overflow-y-auto">
          {/* Header Row */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#E8DADD] shrink-0 bg-[#FFFFFF]">
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif font-semibold text-[32px] tracking-tight text-[#962949]"
            >
              Boota
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
                          <div>
                            <h5 className="font-serif font-semibold text-[15px] text-[#962949] mb-1.5">
                              Sale
                            </h5>
                            <ul className="space-y-1.5 pl-1 text-[#6F6265]">
                              <li><a href="#all-sale" onClick={handleItemClick} className="hover:text-[#962949] block py-0.5 font-medium text-[#962949]">All Sale</a></li>
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
              className="flex items-center gap-3 w-full text-left hover:text-[#962949] transition-colors cursor-pointer"
            >
              <User className="w-[19px] h-[19px] stroke-[1.8] text-[#2B2224]" />
              <span className="font-medium">My Account</span>
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

            <a
              href="#track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-[#962949] transition-colors py-0.5 font-medium"
            >
              Track Order
            </a>

            <a
              href="tel:+917291947002"
              className="block hover:text-[#962949] transition-colors py-0.5 text-[#2B2224] font-medium"
            >
              Contact Us · +91 72919 47002
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

