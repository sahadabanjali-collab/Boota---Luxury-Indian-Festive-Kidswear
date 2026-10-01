import React, { useState } from 'react';
import { Star, Truck, ChevronDown, ChevronUp, Heart } from 'lucide-react';

interface ProductDetailsProps {
  onAddToBag: (size: string, color: string) => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
  onOpenSizeGuide?: () => void;
  onOpenReviews: () => void;
}

const sizes = ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'];

interface ColorOption {
  name: string;
  hex: string;
}

const colors: ColorOption[] = [
  { name: 'Rani Pink', hex: '#962949' },
  { name: 'Haldi Yellow', hex: '#E5A93B' },
];

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
  onOpenReviews,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('1-2 Y');
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    productDetails: true,
    fabricCare: false,
    shippingExchange: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAdd = () => {
    onAddToBag(selectedSize, selectedColor.name);
  };

  return (
    <div className="w-full flex flex-col justify-start">
      {/* Category / Subtitle */}
      <span className="text-[13px] font-sans uppercase tracking-[0.06em] text-[#6F6265] font-medium">
        Boota Luxe
      </span>

      {/* H1 Heading: Cormorant Garamond Semibold (48-56px desktop, 34-40px mobile, line-height 1.1) */}
      <h1 className="text-h1 mt-1.5 mb-2">
        Gulnar Silk Lehenga Set
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <button
          onClick={onOpenReviews}
          className="text-[13.5px] text-[#6F6265] hover:text-[#962949] transition-colors underline cursor-pointer"
        >
          4.9 · 18 reviews
        </button>
      </div>

      {/* Price: Manrope Semibold */}
      <div className="mt-4">
        <div className="text-[26px] font-semibold text-[#962949] tracking-tight">
          ₹2,899
        </div>
        <div className="text-[13px] text-[#6F6265] mt-0.5">Inclusive of all taxes</div>
      </div>

      <div className="my-6 border-t border-[#E8DADD]" />

      {/* Colour Selector */}
      <div>
        <div className="flex items-center justify-between text-[13.5px] mb-2.5">
          <span className="uppercase tracking-[0.06em] font-semibold text-[#2B2224]">
            COLOUR
          </span>
          <span className="text-[#6F6265] font-medium">{selectedColor.name}</span>
        </div>

        <div className="flex items-center gap-3">
          {colors.map((c) => {
            const isSelected = selectedColor.name === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                aria-label={`Select color ${c.name}`}
                className={`relative w-8 h-8 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-[#962949] scale-105'
                    : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-[13.5px] mb-2.5">
          <span className="uppercase tracking-[0.06em] font-semibold text-[#2B2224]">
            SELECT SIZE
          </span>
          <button
            type="button"
            className="text-[#6F6265] hover:text-[#962949] underline transition-colors cursor-pointer text-[13px] font-medium"
          >
            SIZE GUIDE
          </button>
        </div>

        {/* Size Buttons Row: border-radius 4px, Manrope Semibold */}
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((s) => {
            const isSelected = selectedSize === s;
            return (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`py-2.5 text-[13px] font-semibold rounded-[4px] border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#962949] text-[#FFFFFF] border-[#962949]'
                    : 'bg-[#FFFFFF] text-[#2B2224] border-[#E8DADD] hover:bg-[#962949] hover:text-[#FFFFFF] hover:border-[#962949]'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Size guidance note: Manrope Regular 13px, Muted Taupe */}
        <p className="text-[13px] text-[#6F6265] mt-2.5 leading-relaxed">
          Fits true to age. If she is between sizes, choose the next size up.
        </p>
      </div>

      {/* Action Buttons: Add to Bag + Wishlist (Manrope Semibold, 13-14px, letter-spacing 0.06em) */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#962949] hover:bg-[#7A1F3B] text-[#FFFFFF] py-3.5 px-6 text-[13.5px] uppercase font-semibold tracking-[0.06em] rounded-[4px] transition-colors cursor-pointer"
        >
          ADD TO BAG
        </button>

        <button
          onClick={onToggleWishlist}
          aria-label="Add to Wishlist"
          className={`flex items-center justify-center gap-2 px-5 py-3.5 border rounded-[4px] text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors cursor-pointer ${
            isWishlisted
              ? 'border-[#962949] text-[#962949] bg-[#F9D0D6]'
              : 'border-[#E8DADD] text-[#2B2224] hover:border-[#962949] hover:text-[#962949]'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-[#962949] text-[#962949]' : 'text-[#6F6265]'
            }`}
          />
          <span className="whitespace-nowrap">
            {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
          </span>
        </button>
      </div>

      {/* Delivery details badge: Soft Blush accent background, Soft Border */}
      <div className="flex items-start gap-3 mt-8 p-4 bg-[#F9D0D6]/35 border border-[#E8DADD] rounded-[4px]">
        <Truck className="w-5 h-5 text-[#962949] shrink-0 mt-0.5" />
        <div className="text-[13px]">
          <div className="font-semibold text-[#2B2224]">Delivery in 3-7 days</div>
          <div className="text-[#6F6265] mt-0.5">Free prepaid shipping above ₹1,499</div>
        </div>
      </div>

      {/* Accordions */}
      <div className="mt-8 border-t border-[#E8DADD] divide-y divide-[#E8DADD]">
        {/* Accordion 1: PRODUCT DETAILS */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion('productDetails')}
            className="w-full flex items-center justify-between text-[13.5px] font-semibold uppercase tracking-[0.06em] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span>PRODUCT DETAILS</span>
            {openAccordions.productDetails ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.productDetails && (
            <div className="mt-3 text-[14px] leading-relaxed text-[#2B2224]">
              A hand-finished festive set with a soft cotton lining, comfortable elasticated waist
              and delicate gota detailing.
            </div>
          )}
        </div>

        {/* Accordion 2: FABRIC & CARE */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion('fabricCare')}
            className="w-full flex items-center justify-between text-[13.5px] font-semibold uppercase tracking-[0.06em] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span>FABRIC &amp; CARE</span>
            {openAccordions.fabricCare ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.fabricCare && (
            <div className="mt-3 text-[14px] leading-relaxed text-[#2B2224] space-y-2">
              <p>• <span className="font-medium">Fabric:</span> Pure Silk Chanderi base with 100% Breathable Cotton Mulmul lining.</p>
              <p>• <span className="font-medium">Work:</span> Traditional hand-finished Gota Patti &amp; zari thread border.</p>
              <p>• <span className="font-medium">Care:</span> Dry clean only. Warm iron on reverse side on silk setting.</p>
            </div>
          )}
        </div>

        {/* Accordion 3: SHIPPING & EXCHANGE */}
        <div className="py-4">
          <button
            onClick={() => toggleAccordion('shippingExchange')}
            className="w-full flex items-center justify-between text-[13.5px] font-semibold uppercase tracking-[0.06em] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer"
          >
            <span>SHIPPING &amp; EXCHANGE</span>
            {openAccordions.shippingExchange ? (
              <ChevronUp className="w-4 h-4 text-[#6F6265]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6F6265]" />
            )}
          </button>
          {openAccordions.shippingExchange && (
            <div className="mt-3 text-[14px] leading-relaxed text-[#2B2224] space-y-2">
              <p>• Dispatched within 24-48 hours. Standard doorstep delivery in 3-7 business days across India.</p>
              <p>• Free prepaid shipping on all orders above ₹1,499.</p>
              <p>• Seamless 7-day size exchange from delivery date with free doorstep pickup.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
