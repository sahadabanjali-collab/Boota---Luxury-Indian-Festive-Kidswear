import React from 'react';

export type NavTab = 'GIRL' | 'COLLECTION' | 'OCCASIONS' | 'ACCESSORIES' | 'SALE';

interface MegaMenuProps {
  activeTab: NavTab | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E8DADD] z-40"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] py-8">
        {activeTab === 'GIRL' && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {/* Col 1 */}
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Boota Desi
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#suit-sets" className="hover:text-[#962949] transition-colors">
                    Suit Sets
                  </a>
                </li>
                <li>
                  <a href="#lehenga-sets" className="hover:text-[#962949] transition-colors">
                    Lehenga Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Boota Play
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#dresses" className="hover:text-[#962949] transition-colors">
                    Dresses
                  </a>
                </li>
                <li>
                  <a href="#top-sets" className="hover:text-[#962949] transition-colors">
                    Top Sets
                  </a>
                </li>
                <li>
                  <a href="#tops" className="hover:text-[#962949] transition-colors">
                    Tops
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Shop by Age
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#baby" className="hover:text-[#962949] transition-colors">
                    Baby (0-12 months)
                  </a>
                </li>
                <li>
                  <a href="#toddler" className="hover:text-[#962949] transition-colors">
                    Toddler (1-3 years)
                  </a>
                </li>
                <li>
                  <a href="#kids" className="hover:text-[#962949] transition-colors">
                    Kids (3+ years)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Accessories
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#hair-accessories" className="hover:text-[#962949] transition-colors">
                    Hair Accessories
                  </a>
                </li>
                <li>
                  <a href="#bangles" className="hover:text-[#962949] transition-colors">
                    Bangles
                  </a>
                </li>
                <li>
                  <a href="#jewellery" className="hover:text-[#962949] transition-colors">
                    Jewellery
                  </a>
                </li>
                <li>
                  <a href="#bags" className="hover:text-[#962949] transition-colors">
                    Bags
                  </a>
                </li>
                <li>
                  <a href="#sale" className="hover:text-[#962949] transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Photo Card */}
            <div>
              <div className="w-full aspect-[4/5] bg-[#F9D0D6] rounded-[4px] flex items-end p-3 border border-[#E8DADD] cursor-pointer">
                <span className="text-[12px] text-[#6F6265] font-medium">
                  Photo: New Arrivals
                </span>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="#new-arrivals"
                  className="font-serif font-semibold text-[15px] text-[#2B2224] hover:text-[#962949] transition-colors"
                >
                  New Arrivals
                </a>
              </div>
            </div>

            {/* Col 6: Photo Card */}
            <div>
              <div className="w-full aspect-[4/5] bg-[#F9D0D6]/70 rounded-[4px] flex items-end p-3 border border-[#E8DADD] cursor-pointer">
                <span className="text-[12px] text-[#6F6265] font-medium">
                  Photo: Bestsellers
                </span>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="#bestsellers"
                  className="font-serif font-semibold text-[15px] text-[#2B2224] hover:text-[#962949] transition-colors"
                >
                  Bestsellers
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'COLLECTION' && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Boota Desi
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#suit-sets" className="hover:text-[#962949] transition-colors">
                    Suit Sets
                  </a>
                </li>
                <li>
                  <a href="#lehenga-sets" className="hover:text-[#962949] transition-colors">
                    Lehenga Sets
                  </a>
                </li>
                <li>
                  <a href="#sharara-sets" className="hover:text-[#962949] transition-colors">
                    Sharara Sets
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Boota Play
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#dresses" className="hover:text-[#962949] transition-colors">
                    Dresses
                  </a>
                </li>
                <li>
                  <a href="#top-sets" className="hover:text-[#962949] transition-colors">
                    Top Sets
                  </a>
                </li>
                <li>
                  <a href="#co-ords" className="hover:text-[#962949] transition-colors">
                    Co-ords
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Boota Luxe
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#festive-lehengas" className="hover:text-[#962949] transition-colors">
                    Festive Lehengas
                  </a>
                </li>
                <li>
                  <a href="#occasion-sets" className="hover:text-[#962949] transition-colors">
                    Occasion Sets
                  </a>
                </li>
                <li>
                  <a href="#silk-edit" className="hover:text-[#962949] transition-colors">
                    Silk Edit
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 md:col-start-6">
              <div className="w-full aspect-[4/5] bg-[#F9D0D6] rounded-[4px] flex items-end p-3 border border-[#E8DADD] cursor-pointer">
                <span className="text-[12px] text-[#6F6265] font-medium">
                  Photo: All Collections
                </span>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="#all-collections"
                  className="font-serif font-semibold text-[15px] text-[#2B2224] hover:text-[#962949] transition-colors"
                >
                  All Collections
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'OCCASIONS' && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Baby Ceremonies
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#baby-welcome" className="hover:text-[#962949] transition-colors">
                    Baby Welcome &amp; Naming
                  </a>
                </li>
                <li>
                  <a href="#head-shave" className="hover:text-[#962949] transition-colors">
                    Head Shave: Mundan
                  </a>
                </li>
                <li>
                  <a href="#first-food" className="hover:text-[#962949] transition-colors">
                    First Food: Annaprashan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Upcoming Occasions
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#ganesh-chaturthi" className="hover:text-[#962949] transition-colors">
                    Ganesh Chaturthi
                  </a>
                </li>
                <li>
                  <a href="#navratri" className="hover:text-[#962949] transition-colors">
                    Navratri &amp; Durga Puja
                  </a>
                </li>
                <li>
                  <a href="#diwali" className="hover:text-[#962949] transition-colors">
                    Diwali
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Wedding
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#mehendi" className="hover:text-[#962949] transition-colors">
                    Mehendi
                  </a>
                </li>
                <li>
                  <a href="#haldi" className="hover:text-[#962949] transition-colors">
                    Haldi
                  </a>
                </li>
                <li>
                  <a href="#sangeet" className="hover:text-[#962949] transition-colors">
                    Sangeet
                  </a>
                </li>
                <li>
                  <a href="#wedding" className="hover:text-[#962949] transition-colors">
                    Wedding
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 md:col-start-6">
              <div className="w-full aspect-[4/5] bg-[#F9D0D6] rounded-[4px] flex items-end p-3 border border-[#E8DADD] cursor-pointer">
                <span className="text-[12px] text-[#6F6265] font-medium">
                  Photo: The Diwali Edit
                </span>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="#diwali-edit"
                  className="font-serif font-semibold text-[15px] text-[#2B2224] hover:text-[#962949] transition-colors"
                >
                  The Diwali Edit
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ACCESSORIES' && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Baby
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#swaddles" className="hover:text-[#962949] transition-colors">
                    Swaddles
                  </a>
                </li>
                <li>
                  <a href="#mustard-pillows" className="hover:text-[#962949] transition-colors">
                    Mustard Seed Pillows
                  </a>
                </li>
                <li>
                  <a href="#toys" className="hover:text-[#962949] transition-colors">
                    Toys
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Girl
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#hair-acc" className="hover:text-[#962949] transition-colors">
                    Hair Accessories
                  </a>
                </li>
                <li>
                  <a href="#bags" className="hover:text-[#962949] transition-colors">
                    Bags
                  </a>
                </li>
                <li>
                  <a href="#bangles" className="hover:text-[#962949] transition-colors">
                    Bangles
                  </a>
                </li>
                <li>
                  <a href="#jewellery" className="hover:text-[#962949] transition-colors">
                    Jewellery
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 md:col-start-6">
              <div className="w-full aspect-[4/5] bg-[#F9D0D6] rounded-[4px] flex items-end p-3 border border-[#E8DADD] cursor-pointer">
                <span className="text-[12px] text-[#6F6265] font-medium">
                  Photo: All Accessories
                </span>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="#all-accessories"
                  className="font-serif font-semibold text-[15px] text-[#2B2224] hover:text-[#962949] transition-colors"
                >
                  All Accessories
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SALE' && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div>
              <h4 className="font-serif font-semibold text-[17px] text-[#962949] mb-3">
                Sale
              </h4>
              <ul className="space-y-2 text-[14px] text-[#6F6265]">
                <li>
                  <a href="#all-sale" className="hover:text-[#962949] transition-colors">
                    All Sale
                  </a>
                </li>
                <li>
                  <a href="#first-time" className="hover:text-[#962949] transition-colors">
                    First Time on Sale
                  </a>
                </li>
                <li>
                  <a href="#special-prices" className="hover:text-[#962949] transition-colors">
                    Special Prices
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 md:col-start-6">
              <div className="w-full aspect-[4/5] bg-[#F9D0D6] rounded-[4px] flex items-end p-3 border border-[#E8DADD] cursor-pointer">
                <span className="text-[12px] text-[#6F6265] font-medium">
                  Photo: The Sale Edit
                </span>
              </div>
              <div className="mt-2 text-center">
                <a
                  href="#the-sale-edit"
                  className="font-serif font-semibold text-[15px] text-[#2B2224] hover:text-[#962949] transition-colors"
                >
                  The Sale Edit
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
