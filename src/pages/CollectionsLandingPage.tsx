import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import {
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  productImages,
  heroFestiveDesktop,
  heroDesiDesktop,
  heroLuxeDesktop,
  ageBaby,
  ageToddler,
  ageKids,
} from '../assets/images';

interface CollectionsLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialFilter?: 'all' | 'desi' | 'play' | 'luxe';
}

// 1. Boota Desi Products
const bootaDesiProducts: Product[] = [
  {
    id: 'gulmohar-kurta-pyjama',
    name: 'Gulmohar Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Auspicious yellow hand-block printed cotton kurta with relaxed pyjama pants.',
  },
  {
    id: 'gulika-suit-set-desi',
    name: 'Gulika Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2290,
    mrp: 2790,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 42,
    description: 'Fuchsia pink peplum kurta with white gota borders and tulip sharara pants.',
  },
  {
    id: 'vasant-kurta-pyjama',
    name: 'Vasant Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1790,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Peach',
    badge: 'Soft Mulmul',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Puja', 'Baby ceremonies'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 22,
    description: 'Gentle organic mulmul kurta with hand-carved wooden buttons and non-pinch waist pants.',
  },
  {
    id: 'petal-grace-suit-set',
    name: 'Petal Grace Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2660,
    mrp: 3200,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: 'New',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Mehendi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Sage green tiered peplum with delicate rose petal motifs and matching flared bottoms.',
  },
  {
    id: 'heritage-bloom-dhoti-set',
    name: 'Heritage Bloom Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1790,
    mrp: 2190,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Green',
    badge: 'Hand Block',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Festive', 'Annaprashan'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 19,
    description: 'Mint green hand-blocked kurta with ready-to-wear pre-pleated dhoti pants.',
  },
  {
    id: 'parampara-dhoti-kurta-set',
    name: 'Parampara Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Purple',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 27,
    description: 'Lilac and gold bordered angrakha with contrast purple dhoti pants.',
  },
  {
    id: 'peach-blossom-angrakha-desi',
    name: 'Peach Blossom Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2620,
    mrp: 3150,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Peach',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 54,
    description: 'Peach side-tie angrakha with authentic gota work and twirl sharara pants.',
  },
  {
    id: 'purple-blossom-angrakha-desi',
    name: 'Purple Blossom Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2620,
    mrp: 3150,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Purple',
    badge: 'Few Pcs Left',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 36,
    description: 'Royal violet peplum top with hand-tied dori latkans and scalloped gharara pants.',
  },
];

// 2. Boota Play Products
const bootaPlayProducts: Product[] = [
  {
    id: 'candy-stripe-peplum',
    name: 'Candy Stripe Peplum Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1390,
    mrp: 1690,
    discountPercent: 18,
    image: productImages.back,
    hoverImage: productImages.front,
    galleryImages: [productImages.back, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Pink',
    badge: 'Everyday Twirls',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Play', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 29,
    description: 'Vibrant candy striped peplum with elasticated ankle trousers for uninhibited games.',
  },
  {
    id: 'bow-belle-top-pant',
    name: 'Bow Belle Top & Pant Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1650,
    mrp: 1990,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Peach',
    badge: 'Play Friendly',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Party', 'Play'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 24,
    description: 'Soft pastel peplum with back bow accent and ultra-comfortable relaxed culottes.',
  },
  {
    id: 'little-miss-stripe-set',
    name: 'Little Miss Stripe Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1450,
    mrp: 1750,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.flatlay, productImages.sharara],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Green',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Day Out', 'Play'],
    ageGroup: '1-3Y',
    rating: 4.7,
    reviewCount: 18,
    description: 'Mint and ivory striped breezy summer set tailored in featherlight voile.',
  },
  {
    id: 'gulabo-lehenga-play',
    name: 'Gulabo Lehenga Set with Bandana',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 4050,
    mrp: 4890,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Matching Bandana',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 47,
    description: 'Playful floral printed tiered lehenga with halter top and matching soft bandana.',
  },
  {
    id: 'amaya-suit-play',
    name: 'Amaya Suit Set - Lime Green',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2290,
    mrp: 2790,
    discountPercent: 18,
    image: productImages.sharara,
    hoverImage: productImages.back,
    galleryImages: [productImages.sharara, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 33,
    description: 'Lime green cotton-silk peplum with scalloped trim and stretch-fit comfort pants.',
  },
  {
    id: 'noor-kurta-play',
    name: 'Noor Kurta Set - Lavender',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1990,
    mrp: 2450,
    discountPercent: 19,
    image: productImages.pattu,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.pattu, productImages.flatlay],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Purple',
    badge: 'Soft Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Everyday Twirls', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 20,
    description: 'Pastel lavender A-line kurti with loose elasticated pajama pants.',
  },
  {
    id: 'mini-meadow-bandana-set',
    name: 'Mini Meadow Bandana Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1290,
    mrp: 1590,
    discountPercent: 19,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Purple',
    badge: 'New Arrival',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Play', 'Picnic'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 16,
    description: 'Floral printed comfort top with matching bandana and easy stretch bottoms.',
  },
  {
    id: 'cheetah-twirl-jhabla',
    name: 'Cheetah Twirl Jhabla Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1195,
    mrp: 1450,
    discountPercent: 18,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M'],
    color: 'Yellow',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Daily Comfort', 'Play'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 28,
    description: 'Playful hand-printed jhabla top with matching bloomers in pure organic cotton.',
  },
];

// 3. Boota Luxe Products
const bootaLuxeProducts: Product[] = [
  {
    id: 'gulnar-silk-lehenga-luxe',
    name: 'Gulnar Silk Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2899,
    mrp: 3499,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y', '6-7 Y'],
    color: 'Pink',
    badge: 'Pure Silk',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Grand Occasion'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 65,
    description: 'Heirloom Rani pink pure silk lehenga set with intricate hand-embroidered gota work.',
  },
  {
    id: 'noorani-tissue-sharara-luxe',
    name: 'Noorani Tissue Sharara Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3199,
    mrp: 3799,
    discountPercent: 16,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Peach',
    badge: 'Heirloom Craft',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 52,
    description: 'Opulent peach tissue chanderi peplum top with tiered sharara pants and kiran lace.',
  },
  {
    id: 'kanak-banarasi-pattu-luxe',
    name: 'Kanak Banarasi Pattu Pavada',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3399,
    mrp: 3999,
    discountPercent: 15,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y', '7-8 Y'],
    color: 'Green',
    badge: 'Heritage Brocade',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Milestones'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 38,
    description: 'Traditional brocade pattu pavada with temple zari border and contrast magenta choli.',
  },
  {
    id: 'chandani-chanderi-luxe',
    name: 'Chandani Chanderi Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2999,
    mrp: 3599,
    discountPercent: 17,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Handloom',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Blush pink handloom chanderi silk lehenga with delicate zari buttis and mulmul lining.',
  },
  {
    id: 'inara-peplum-luxe',
    name: 'Inara Peplum Sharara Set',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2550,
    mrp: 3100,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Peach',
    badge: 'Popular',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 35,
    description: 'Powder pink peplum kurta with dabka work and voluminous gathered sharara.',
  },
  {
    id: 'aparajita-suit-luxe',
    name: 'Aparajita Suit Set - Violet',
    collection: 'Boota Luxe',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.bandhani,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.bandhani, productImages.sharara],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '6-7 Y'],
    color: 'Purple',
    badge: 'Regal Edit',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Wedding', 'Reception'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 29,
    description: 'Royal violet silk kurti with pre-draped dhoti skirt and pure zari brocade accents.',
  },
  {
    id: 'gulbahar-bundi-luxe',
    name: 'Gulbahar 3 Pc Bundi Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 4290,
    mrp: 4990,
    discountPercent: 14,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'White',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Sangeet'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 41,
    description: 'Cream silk kurta with hand-embroidered floral bundi jacket and straight trousers.',
  },
  {
    id: 'rose-garden-kurta-luxe',
    name: 'Rose Garden Kurta Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2490,
    mrp: 2990,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: 'Pure Silk Blend',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 22,
    description: 'Ivory chanderi kurta with delicate miniature rose embroidery and silk pyjama pants.',
  },
];

// Circular category bubbles matching video
const collectionBubbles = [
  {
    id: 'all',
    label: 'ALL',
    image: productImages.flatlay,
    tagline: 'All Boota Collections',
  },
  {
    id: 'desi',
    label: 'DESI',
    image: productImages.bandhani,
    tagline: 'Boota Desi',
  },
  {
    id: 'play',
    label: 'PLAY',
    image: productImages.sharara,
    tagline: 'Boota Play',
  },
  {
    id: 'luxe',
    label: 'LUXE',
    image: productImages.front,
    tagline: 'Boota Luxe',
  },
];

export const CollectionsLandingPage: React.FC<CollectionsLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
  initialFilter = 'all',
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'desi' | 'play' | 'luxe'>(
    initialFilter
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (initialFilter) {
      setSelectedFilter(initialFilter);
      if (initialFilter !== 'all') {
        setTimeout(() => {
          scrollToSection(`collection-${initialFilter}`);
        }, 80);
      }
    }
  }, [initialFilter]);

  const handleBubbleClick = (id: string) => {
    setSelectedFilter(id as any);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        scrollToSection(`collection-${id}`);
      }, 50);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-20 font-manrope">
      {/* Breadcrumb Bar */}
      <div className="w-full border-b border-[#E8DADD]/60 bg-[#FAF6F4]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 flex items-center justify-between text-[12.5px] text-[#6F6265]">
          <div className="flex items-center space-x-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#962949] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#2B2224] font-semibold">all collections</span>
          </div>

          <div className="hidden sm:block text-[12px] text-[#962949] font-medium tracking-wide">
            Boota Signature Curations
          </div>
        </div>
      </div>

      {/* Main Header Title matching video: "all collections" */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#142B6F] tracking-tight leading-none lowercase">
          all collections
        </h1>
      </div>

      {/* Circular Collection Bubbles Row matching video: DESI, PLAY, LUXE */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-8">
        <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto pb-2 no-scrollbar">
          {collectionBubbles.map((bubble) => {
            const isSelected = selectedFilter === bubble.id;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => handleBubbleClick(bubble.id)}
                className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-hidden"
              >
                {/* Circular Image with active ring */}
                <div
                  className={`w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-200 p-0.5 ${
                    isSelected
                      ? 'border-[#142B6F] ring-2 ring-[#142B6F]/20 scale-105 shadow-sm'
                      : 'border-[#E8DADD] hover:border-[#142B6F]/60'
                  }`}
                >
                  <img
                    src={bubble.image}
                    alt={bubble.label}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Uppercase Category Label */}
                <span
                  className={`mt-2 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-center transition-colors ${
                    isSelected ? 'text-[#142B6F]' : 'text-[#2B2224] group-hover:text-[#142B6F]'
                  }`}
                >
                  {bubble.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Pill when filtered */}
      {selectedFilter !== 'all' && (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mb-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142B6F]/10 text-[#142B6F] text-[13px] font-semibold">
            <span>Viewing Boota {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} only</span>
            <button
              onClick={() => setSelectedFilter('all')}
              className="hover:text-[#962949] p-0.5 rounded-full cursor-pointer ml-1"
              title="Show all collections"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className="text-[13px] text-[#962949] hover:underline font-semibold cursor-pointer"
          >
            Show All Collections →
          </button>
        </div>
      )}

      {/* COLLECTION SECTIONS */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-16 sm:space-y-24">
        {/* ============================================================== */}
        {/* SECTION 1: BOOTA DESI */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'desi') && (
          <section id="collection-desi" className="scroll-mt-28">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#2B2224] tracking-tight">
                Boota Desi
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-1">
                Heritage angrakhas, hand-blocked bandhani ghararas & nostalgic festive silhouettes tailored in breathable Jaipur cotton.
              </p>
            </div>

            {/* Layout: Left Feature Banner + Right Product Grid matching video */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[380px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroDesiDesktop}
                    alt="Boota Desi Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />
                  
                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Cotton Prints & Gota
                    </span>
                    <h3 className="font-serif text-[26px] sm:text-[30px] font-bold leading-tight mb-2">
                      Hawamahal
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Festive block prints and breezy angrakhas designed for all-day comfort.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToSection('collection-desi')}
                      className="px-4 py-2 bg-white text-[#2B2224] hover:bg-[#F9D0D6] text-[11.5px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {bootaDesiProducts.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    return (
                      <div key={product.id} className="group flex flex-col relative">
                        {/* Image Frame */}
                        <div className="relative aspect-[3/4] w-full bg-[#FAF6F4] rounded-[4px] overflow-hidden border border-[#E8DADD]/70 transition-all duration-300">
                          <div
                            onClick={() => onSelectProduct(product)}
                            className="w-full h-full cursor-pointer relative overflow-hidden"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
                                product.hoverImage ? 'group-hover:opacity-0 transition-opacity duration-300' : ''
                              }`}
                              loading="lazy"
                            />
                            {product.hoverImage && (
                              <img
                                src={product.hoverImage}
                                alt={`${product.name} view`}
                                className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                              />
                            )}
                          </div>

                          {/* Badge */}
                          {product.badge && (
                            <div className="absolute top-2 left-2 pointer-events-none">
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-[3px] text-white bg-[#962949] shadow-2xs">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          {/* Heart Wishlist */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(product.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2B2224] hover:text-[#962949] shadow-2xs transition-colors cursor-pointer"
                            aria-label="Toggle wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 stroke-[1.8] ${
                                isWishlisted ? 'fill-[#962949] text-[#962949]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="pt-2 pb-1 flex flex-col justify-between flex-1">
                          <h4
                            onClick={() => onSelectProduct(product)}
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#142B6F] transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-baseline space-x-1.5">
                              <span className="font-bold text-[13.5px] sm:text-[14px] text-[#2B2224]">
                                Rs. {product.price.toLocaleString('en-IN')}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[11.5px] text-[#6F6265] line-through">
                                  Rs. {product.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="p-1.5 rounded-full bg-[#142B6F]/10 hover:bg-[#142B6F] text-[#142B6F] hover:text-white transition-colors cursor-pointer shadow-2xs"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* SECTION 2: BOOTA PLAY */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'play') && (
          <section id="collection-play" className="scroll-mt-28">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#2B2224] tracking-tight">
                Boota Play
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-1">
                Twirl-worthy peplums, breezy sets, and cheerful celebratory kurtis made for joyful celebrations and endless games.
              </p>
            </div>

            {/* Layout: Left Feature Banner + Right Product Grid matching video */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[380px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroFestiveDesktop}
                    alt="Boota Play Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />
                  
                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Floral Prints & Twirls
                    </span>
                    <h3 className="font-serif text-[26px] sm:text-[30px] font-bold leading-tight mb-2">
                      Phool Bahaar
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Vibrant blooms, featherlight mulmul linings, and non-pinch comfort waists.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToSection('collection-play')}
                      className="px-4 py-2 bg-white text-[#2B2224] hover:bg-[#F9D0D6] text-[11.5px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {bootaPlayProducts.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    return (
                      <div key={product.id} className="group flex flex-col relative">
                        {/* Image Frame */}
                        <div className="relative aspect-[3/4] w-full bg-[#FAF6F4] rounded-[4px] overflow-hidden border border-[#E8DADD]/70 transition-all duration-300">
                          <div
                            onClick={() => onSelectProduct(product)}
                            className="w-full h-full cursor-pointer relative overflow-hidden"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
                                product.hoverImage ? 'group-hover:opacity-0 transition-opacity duration-300' : ''
                              }`}
                              loading="lazy"
                            />
                            {product.hoverImage && (
                              <img
                                src={product.hoverImage}
                                alt={`${product.name} view`}
                                className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                              />
                            )}
                          </div>

                          {/* Badge */}
                          {product.badge && (
                            <div className="absolute top-2 left-2 pointer-events-none">
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-[3px] text-white bg-[#142B6F] shadow-2xs">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          {/* Heart Wishlist */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(product.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2B2224] hover:text-[#962949] shadow-2xs transition-colors cursor-pointer"
                            aria-label="Toggle wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 stroke-[1.8] ${
                                isWishlisted ? 'fill-[#962949] text-[#962949]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="pt-2 pb-1 flex flex-col justify-between flex-1">
                          <h4
                            onClick={() => onSelectProduct(product)}
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#142B6F] transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-baseline space-x-1.5">
                              <span className="font-bold text-[13.5px] sm:text-[14px] text-[#2B2224]">
                                Rs. {product.price.toLocaleString('en-IN')}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[11.5px] text-[#6F6265] line-through">
                                  Rs. {product.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="p-1.5 rounded-full bg-[#142B6F]/10 hover:bg-[#142B6F] text-[#142B6F] hover:text-white transition-colors cursor-pointer shadow-2xs"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* SECTION 3: BOOTA LUXE */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'luxe') && (
          <section id="collection-luxe" className="scroll-mt-28">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#2B2224] tracking-tight">
                Boota Luxe
              </h2>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-1">
                Opulent pure silks, hand-worked gota patti & heirloom zari brocades for wedding milestones and grand family festivities.
              </p>
            </div>

            {/* Layout: Left Feature Banner + Right Product Grid matching video */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[380px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroLuxeDesktop}
                    alt="Boota Luxe Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />
                  
                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Pure Heirloom Silks
                    </span>
                    <h3 className="font-serif text-[26px] sm:text-[30px] font-bold leading-tight mb-2">
                      Chandrika Luxe
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Pure Chanderi silk with handmade gota patti and soft mulmul lining.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToSection('collection-luxe')}
                      className="px-4 py-2 bg-white text-[#2B2224] hover:bg-[#F9D0D6] text-[11.5px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {bootaLuxeProducts.map((product) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    return (
                      <div key={product.id} className="group flex flex-col relative">
                        {/* Image Frame */}
                        <div className="relative aspect-[3/4] w-full bg-[#FAF6F4] rounded-[4px] overflow-hidden border border-[#E8DADD]/70 transition-all duration-300">
                          <div
                            onClick={() => onSelectProduct(product)}
                            className="w-full h-full cursor-pointer relative overflow-hidden"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
                                product.hoverImage ? 'group-hover:opacity-0 transition-opacity duration-300' : ''
                              }`}
                              loading="lazy"
                            />
                            {product.hoverImage && (
                              <img
                                src={product.hoverImage}
                                alt={`${product.name} view`}
                                className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                              />
                            )}
                          </div>

                          {/* Badge */}
                          {product.badge && (
                            <div className="absolute top-2 left-2 pointer-events-none">
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-[3px] text-white bg-[#2E6B4F] shadow-2xs">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          {/* Heart Wishlist */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(product.id);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#2B2224] hover:text-[#962949] shadow-2xs transition-colors cursor-pointer"
                            aria-label="Toggle wishlist"
                          >
                            <Heart
                              className={`w-4 h-4 stroke-[1.8] ${
                                isWishlisted ? 'fill-[#962949] text-[#962949]' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="pt-2 pb-1 flex flex-col justify-between flex-1">
                          <h4
                            onClick={() => onSelectProduct(product)}
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#142B6F] transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-baseline space-x-1.5">
                              <span className="font-bold text-[13.5px] sm:text-[14px] text-[#2B2224]">
                                Rs. {product.price.toLocaleString('en-IN')}
                              </span>
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[11.5px] text-[#6F6265] line-through">
                                  Rs. {product.mrp.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                              }}
                              className="p-1.5 rounded-full bg-[#142B6F]/10 hover:bg-[#142B6F] text-[#142B6F] hover:text-white transition-colors cursor-pointer shadow-2xs"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
