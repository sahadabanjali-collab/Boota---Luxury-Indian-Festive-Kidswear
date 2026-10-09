import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  X,
  Tag,
} from 'lucide-react';
import {
  productImages,
  heroFestiveDesktop,
  heroDesiDesktop,
  heroLuxeDesktop,
  brandStoryImage,
} from '../assets/images';

interface SaleLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialFilter?: string;
}

// ============================================================================
// 1. BOOTA DESI SALE PRODUCTS (Handcrafted Heritage Festive Wear on Sale)
// ============================================================================
const bootaDesiSaleProducts: Product[] = [
  {
    id: 'sale-desi-gulmohar-kurta',
    name: 'Gulmohar Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2390,
    discountPercent: 29,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Haldi', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Auspicious yellow hand-block printed cotton kurta with relaxed pyjama pants on special festive sale.',
  },
  {
    id: 'sale-desi-gulika-suit-set',
    name: 'Gulika Suit Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1890,
    mrp: 2790,
    discountPercent: 32,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: '32% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 42,
    description: 'Blush pink floral hand-blocked kurta with delicate scalloped lace trims and tapered pants.',
  },
  {
    id: 'sale-desi-bandhani-gharara',
    name: 'Bandhani Gharara Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2890,
    discountPercent: 31,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Red',
    badge: '31% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Karwa Chauth', 'Diwali', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 47,
    description: 'Traditional crimson red bandhani print gharara with matching peplum kurti and handmade gota tassels.',
  },
  {
    id: 'sale-desi-marigold-angrakha',
    name: 'Marigold Angrakha & Dhoti Pants',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1750,
    mrp: 2450,
    discountPercent: 28,
    image: productImages.flatlay,
    hoverImage: productImages.front,
    galleryImages: [productImages.flatlay, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: '28% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Haldi', 'Puja', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 29,
    description: 'Side-tie angrakha with hand-twisted tassels and soft elasticated dhoti bottoms.',
  },
  {
    id: 'sale-desi-kesariya-lehenga',
    name: 'Kesariya Cotton Lehenga Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2190,
    mrp: 2990,
    discountPercent: 26,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Orange',
    badge: '26% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Navratri', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 34,
    description: 'Saffron orange flared lehenga with lightweight mulmul dupatta and breathable choli top.',
  },
  {
    id: 'sale-desi-niloufer-anarkali',
    name: 'Niloufer Cotton Anarkali Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1950,
    mrp: 2690,
    discountPercent: 27,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Blue',
    badge: '27% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Festive', 'Mehendi', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.8,
    reviewCount: 22,
    description: 'Indigo and sky-blue block printed tier anarkali with soft cotton churidar pants.',
  },
  {
    id: 'sale-desi-rudra-kurta-pyjama',
    name: 'Rudra Boys Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1590,
    mrp: 2190,
    discountPercent: 27,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Cream',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Puja', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Natural unbleached cotton kurta with maroon piping accents and easy slide-on pyjama pants.',
  },
  {
    id: 'sale-desi-amoli-peplum-sharara',
    name: 'Amoli Peplum Sharara Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2090,
    mrp: 2890,
    discountPercent: 27,
    image: productImages.front,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.front, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Green',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 36,
    description: 'Emerald green block-printed peplum top paired with two-tier gather sharara pants.',
  },
];

// ============================================================================
// 2. BOOTA PLAY SALE PRODUCTS (Everyday Twirls, Dresses & Easy-care Co-ords)
// ============================================================================
const bootaPlaySaleProducts: Product[] = [
  {
    id: 'sale-play-roohi-twirl-dress',
    name: 'Roohi Tier Twirl Dress',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1390,
    mrp: 1990,
    discountPercent: 30,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: '30% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Full-flare cotton twirl dress with gentle flutter sleeves and wood button back closure.',
  },
  {
    id: 'sale-play-titli-skirt-top-set',
    name: 'Titli Skirt & Top Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1550,
    mrp: 2200,
    discountPercent: 29,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Peach',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Party', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 32,
    description: 'Pastel peach peplum crop top paired with gathered cotton skirt and soft waist elastic.',
  },
  {
    id: 'sale-play-bhavna-coord-set',
    name: 'Bhavna Daily Co-ord Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1290,
    mrp: 1850,
    discountPercent: 30,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Mint Green',
    badge: '30% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 28,
    description: 'Ultra-breathable mint green printed shirt with matching relaxed shorts for all-day adventures.',
  },
  {
    id: 'sale-play-chulbuli-jumpsuit',
    name: 'Chulbuli Cotton Jumpsuit',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1450,
    mrp: 2050,
    discountPercent: 29,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 35,
    description: 'Comfortable sleeveless cotton jumpsuit with shoulder bow ties and pocket detail.',
  },
  {
    id: 'sale-play-zari-pocket-kurti',
    name: 'Playful Pocket Kurti Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1390,
    mrp: 1950,
    discountPercent: 28,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Pink',
    badge: '28% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Playtime', 'Festive', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.7,
    reviewCount: 24,
    description: 'Short twirl kurti with roomy hidden pockets and lightweight pedal pusher pants.',
  },
  {
    id: 'sale-play-neel-kurta-shorts',
    name: 'Neel Kurta & Shorts Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1250,
    mrp: 1750,
    discountPercent: 28,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Blue',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 30,
    description: 'Sky blue short sleeve band collar kurta with comfortable drawstring shorts.',
  },
  {
    id: 'sale-play-soni-pari-frock',
    name: 'Soni Pari Ruffle Frock',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 1490,
    mrp: 2100,
    discountPercent: 29,
    image: productImages.back,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.back, productImages.sharara],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Lilac',
    badge: '29% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Party', 'Playtime', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 26,
    description: 'Lilac organic cotton dress with tier ruffled hemline and soft mulmul underlay.',
  },
  {
    id: 'sale-play-breeze-angrakha-top',
    name: 'Breeze Angrakha Casual Top',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 990,
    mrp: 1450,
    discountPercent: 31,
    image: productImages.flatlay,
    hoverImage: productImages.front,
    galleryImages: [productImages.flatlay, productImages.front],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'White',
    badge: '31% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Playtime', 'Casual', 'Sale'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 41,
    description: 'Pure mulmul daily crossover top with gentle side snap buttons and contrasting piping.',
  },
];

// ============================================================================
// 3. BOOTA LUXE SALE PRODUCTS (Pure Chanderi, Handworked Gota Patti & Zari)
// ============================================================================
const bootaLuxeSaleProducts: Product[] = [
  {
    id: 'sale-luxe-chandrika-chanderi-lehenga',
    name: 'Chandrika Chanderi Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2990,
    mrp: 4190,
    discountPercent: 28,
    image: productImages.back,
    hoverImage: productImages.front,
    galleryImages: [productImages.back, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Maroon',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Diwali', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 52,
    description: 'Regal maroon pure Chanderi silk lehenga with real silver-gold zari border and soft silk dupatta.',
  },
  {
    id: 'sale-luxe-swarnam-pattu-pavadai',
    name: 'Swarnam Pattu Pavadai Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2690,
    mrp: 3790,
    discountPercent: 29,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Green',
    badge: '29% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Annaprashan', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 48,
    description: 'Emerald green South Indian pure zari woven pattu pavadai with heirloom brocade border and pure cotton lining.',
  },
  {
    id: 'sale-luxe-little-jugnu-3pc-bundi',
    name: 'Little Jugnu 3 Pc Bundi Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2390,
    mrp: 3290,
    discountPercent: 27,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Orange',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Wedding', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 39,
    description: 'Festive brocade bundi vest over a crisp ivory kurta and matching tapered silk trousers.',
  },
  {
    id: 'sale-luxe-ananya-gota-patti-sharara',
    name: 'Ananya Gota Patti Sharara Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2790,
    mrp: 3890,
    discountPercent: 28,
    image: productImages.sharara,
    hoverImage: productImages.bandhani,
    galleryImages: [productImages.sharara, productImages.bandhani],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Peach',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 41,
    description: 'Handworked Jaipur gota patti borders on pure tissue georgette peplum kurti and matching flared sharara.',
  },
  {
    id: 'sale-luxe-rajkumari-brocade-choli',
    name: 'Rajkumari Brocade Choli Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2890,
    mrp: 3990,
    discountPercent: 27,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Gold',
    badge: '27% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Wedding', 'Reception', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 33,
    description: 'Woven Benarasi brocade choli with heavy gathered lehenga skirt in champagne gold tones.',
  },
  {
    id: 'sale-luxe-mundan-chanderi-dhoti',
    name: 'Mundan Chanderi Dhoti Kurta Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2090,
    mrp: 2890,
    discountPercent: 27,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: '27% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Mundan', 'Puja', 'Sale'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 37,
    description: 'Pristine raw-silk blend kurta with delicate embroidery and seamless skin-safe lining.',
  },
  {
    id: 'sale-luxe-sitara-organza-lehenga',
    name: 'Sitara Pure Organza Lehenga Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3190,
    mrp: 4450,
    discountPercent: 28,
    image: productImages.detail,
    hoverImage: productImages.pattu,
    galleryImages: [productImages.detail, productImages.pattu],
    sizes: ['3-4 Y', '4-5 Y', '5-6 Y', '6-7 Y'],
    color: 'Lilac',
    badge: '28% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 30,
    description: 'Whisper-light pure silk organza lehenga hand-embroidered with micro sequins and scalloped borders.',
  },
  {
    id: 'sale-luxe-navratan-sherwani-set',
    name: 'Navratan Baby Sherwani Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2690,
    mrp: 3690,
    discountPercent: 27,
    image: productImages.bandhani,
    hoverImage: productImages.front,
    galleryImages: [productImages.bandhani, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Ivory',
    badge: '27% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 25,
    description: 'Ivory textured silk sherwani jacket with antique gold buttons and pre-pleated churidar pants.',
  },
];

// ============================================================================
// 4. SPECIAL OFFERS & LAST CHANCE (Sibling Sets, Baby Welcome & Archive Reductions)
// ============================================================================
const specialOffersProducts: Product[] = [
  {
    id: 'sale-special-baby-welcome-romper',
    name: 'Heirloom Baby Welcome Romper Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1390,
    mrp: 2250,
    discountPercent: 38,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['00M (2.5-3.5 KG)', '0M (3-5.2 KG)', '3-6 M'],
    color: 'Pink',
    badge: '38% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Naming', 'Sale'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 46,
    description: 'Blush pink celebratory newborn outfit with front overlap snaps for effortless changing and zero scratch tags.',
  },
  {
    id: 'sale-special-ganpati-dhoti-kurta',
    name: 'Ganpati Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2690,
    discountPercent: 37,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: '37% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 52,
    description: 'Auspicious yellow hand-block printed kurta with readymade pre-pleated dhoti pants and gentle elastic waist.',
  },
  {
    id: 'sale-special-sibling-duo-yellow',
    name: 'Festive Sibling Match Kurta Duo',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2490,
    mrp: 3890,
    discountPercent: 36,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Yellow',
    badge: '36% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Festive', 'Haldi', 'Sale'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 39,
    description: 'Coordinated brother-sister festive look in hand-spun cotton Chanderi with delicate golden zari accents.',
  },
  {
    id: 'sale-special-peach-chiffon-sharara',
    name: 'Peach Chiffon Sharara Ensemble',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1890,
    mrp: 2990,
    discountPercent: 36,
    image: productImages.sharara,
    hoverImage: productImages.back,
    galleryImages: [productImages.sharara, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '4-5 Y'],
    color: 'Peach',
    badge: '36% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Wedding', 'Festive', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 43,
    description: 'Soft layered peach chiffon sharara with gota accents and butter-soft mulmul lining.',
  },
  {
    id: 'sale-special-naming-ceremony-peplum',
    name: 'Naming Ceremony Peplum Jhabla',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1190,
    mrp: 1790,
    discountPercent: 33,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['000M (<2.5 KG)', '00M (2.5-3.5 KG)', '0M (3-5.2 KG)'],
    color: 'Peach',
    badge: '33% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Naming', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 37,
    description: 'Ultra-gentle pastel peach jhabla top with matching bloomer shorts crafted from chemical-free organic cotton.',
  },
  {
    id: 'sale-special-lures-stripes-dhoti',
    name: 'Lures Stripes Dhoti Kurta Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1390,
    mrp: 2050,
    discountPercent: 32,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: '32% OFF',
    isBestSeller: false,
    isNewArrival: false,
    occasions: ['Festive', 'Puja', 'Sale'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 27,
    description: 'Woven zari stripe kurta paired with ready-to-wear cotton dhoti pants for effortless festive dressing.',
  },
  {
    id: 'sale-special-kesariya-dhoti-kurta',
    name: 'Kesariya Baby Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1290,
    mrp: 2050,
    discountPercent: 37,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M'],
    color: 'Orange',
    badge: '37% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Festive', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 31,
    description: 'Auspicious kesariya orange traditional dhoti set with hand-tied golden cord latkans.',
  },
  {
    id: 'sale-special-gulab-kalli-sharara',
    name: 'Gulab Kalli Baby Sharara Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2590,
    discountPercent: 34,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Pink',
    badge: '34% OFF',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Festive', 'Sale'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 33,
    description: 'Rose petal pink tier peplum top with elasticated gathered sharara pants for picture-perfect memories.',
  },
];

// Circular category bubbles matching video and girl page
const saleBubbles = [
  {
    id: 'all',
    label: 'ALL SALE',
    image: productImages.flatlay,
    tagline: 'Up to 40% Off',
  },
  {
    id: 'desi',
    label: 'BOOTA DESI SALE',
    image: heroDesiDesktop,
    tagline: 'Festive & Heritage',
  },
  {
    id: 'play',
    label: 'BOOTA PLAY SALE',
    image: productImages.sharara,
    tagline: 'Twirls & Everyday',
  },
  {
    id: 'luxe',
    label: 'BOOTA LUXE SALE',
    image: heroLuxeDesktop,
    tagline: 'Pure Silks & Zari',
  },
  {
    id: 'special',
    label: 'SPECIAL OFFERS',
    image: brandStoryImage,
    tagline: 'Last Chance & Bundles',
  },
];

export const SaleLandingPage: React.FC<SaleLandingPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onNavigateHome,
  initialFilter = 'all',
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);

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
          scrollToSection(`sale-${initialFilter}`);
        }, 80);
      }
    }
  }, [initialFilter]);

  const handleBubbleClick = (id: string) => {
    setSelectedFilter(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        scrollToSection(`sale-${id}`);
      }, 50);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-20 font-manrope">
      {/* Breadcrumb Bar matching reference video */}
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
            <span className="text-[#2B2224] font-semibold">sale</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-[#962949] font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#962949]" />
            <span>Handcrafted Heirloom Kids Wear On Special Offer</span>
          </div>
        </div>
      </div>

      {/* Main Header Title matching video: "sale" in boota maroon serif lowercase */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#962949] tracking-tight leading-none lowercase">
          sale
        </h1>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#6F6265] max-w-xl mx-auto mt-2">
          Discover handcrafted festive heirlooms, pure cotton twirls &amp; ceremonial silks at special archive prices.
        </p>
      </div>

      {/* Circular Sale Category Bubbles Row matching video */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-4">
        <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-10 overflow-x-auto pb-2 no-scrollbar">
          {saleBubbles.map((bubble) => {
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
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full overflow-hidden border-2 transition-all duration-200 p-0.5 ${
                    isSelected
                      ? 'border-[#962949] ring-2 ring-[#962949]/20 scale-105 shadow-sm'
                      : 'border-[#E8DADD] hover:border-[#962949]/60'
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
                  className={`mt-2 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase text-center transition-colors max-w-[110px] leading-tight ${
                    isSelected ? 'text-[#962949]' : 'text-[#2B2224] group-hover:text-[#962949]'
                  }`}
                >
                  {bubble.label}
                </span>

                {/* Tagline */}
                <span className="text-[10px] text-[#6F6265] mt-0.5 hidden sm:block">
                  {bubble.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Pill when filtered */}
      {selectedFilter !== 'all' && (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mb-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#962949]/10 text-[#962949] text-[13px] font-semibold">
            <span>
              Viewing {saleBubbles.find((b) => b.id === selectedFilter)?.label || 'Filtered Sale'} only
            </span>
            <button
              onClick={() => setSelectedFilter('all')}
              className="hover:text-[#7A1F3B] p-0.5 rounded-full cursor-pointer ml-1"
              title="Show all sale collections"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className="text-[13px] text-[#962949] hover:underline font-semibold cursor-pointer"
          >
            Show All Sale Collections →
          </button>
        </div>
      )}

      {/* SALE COLLECTION SECTIONS */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-16 sm:space-y-24">
        {/* ============================================================== */}
        {/* SECTION 1: BOOTA DESI SALE */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'desi') && (
          <section id="sale-desi" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroDesiDesktop}
                    alt="Boota Desi Sale"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Heritage Festive Edit
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Boota Desi Sale
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Hand-blocked bandhani ghararas, angrakhas & pure Jaipur cotton ethnic sets up to 35% off.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('desi')}
                      className="px-5 py-2.5 bg-[#962949] hover:bg-[#7A1F3B] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>VIEW ALL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid (2 rows of 4 = 8 products) */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {bootaDesiSaleProducts.map((product) => {
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
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer line-clamp-1"
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
                              className="p-1.5 rounded-full bg-[#962949]/10 hover:bg-[#962949] text-[#962949] hover:text-white transition-colors cursor-pointer shadow-2xs"
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
        {/* SECTION 2: BOOTA PLAY SALE */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'play') && (
          <section id="sale-play" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroFestiveDesktop}
                    alt="Boota Play Sale"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Playful Everyday Comfort
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Boota Play Sale
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Featherlight cotton twirl dresses, co-ords & easy-care playwear crafted for unrestricted childhood laughter.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('play')}
                      className="px-5 py-2.5 bg-[#962949] hover:bg-[#7A1F3B] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>VIEW ALL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid (2 rows of 4 = 8 products) */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {bootaPlaySaleProducts.map((product) => {
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
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer line-clamp-1"
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
                              className="p-1.5 rounded-full bg-[#962949]/10 hover:bg-[#962949] text-[#962949] hover:text-white transition-colors cursor-pointer shadow-2xs"
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
        {/* SECTION 3: BOOTA LUXE SALE */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'luxe') && (
          <section id="sale-luxe" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroLuxeDesktop}
                    alt="Boota Luxe Sale"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Grand Ceremonial Silks
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Boota Luxe Sale
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Opulent pure Chanderi silks, hand-worked gota patti lehengas & heirloom brocades for wedding milestones.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('luxe')}
                      className="px-5 py-2.5 bg-[#962949] hover:bg-[#7A1F3B] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>VIEW ALL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid (2 rows of 4 = 8 products) */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {bootaLuxeSaleProducts.map((product) => {
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
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer line-clamp-1"
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
                              className="p-1.5 rounded-full bg-[#962949]/10 hover:bg-[#962949] text-[#962949] hover:text-white transition-colors cursor-pointer shadow-2xs"
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
        {/* SECTION 4: SPECIAL OFFERS & LAST CHANCE */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'special') && (
          <section id="sale-special" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={brandStoryImage}
                    alt="Special Offers & Bundles"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Limited Quantities &amp; Sets
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Special Offers
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Sibling duo match sets, baby welcome milestone rompers &amp; seasonal clearance markdowns up to 38% off.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('special')}
                      className="px-5 py-2.5 bg-[#962949] hover:bg-[#7A1F3B] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>VIEW ALL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 4-Column Product Grid (2 rows of 4 = 8 products) */}
              <div className="lg:col-span-8 xl:col-span-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {specialOffersProducts.map((product) => {
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
                            className="font-sans font-medium text-[13px] sm:text-[13.5px] text-[#2B2224] hover:text-[#962949] transition-colors cursor-pointer line-clamp-1"
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
                              className="p-1.5 rounded-full bg-[#962949]/10 hover:bg-[#962949] text-[#962949] hover:text-white transition-colors cursor-pointer shadow-2xs"
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
