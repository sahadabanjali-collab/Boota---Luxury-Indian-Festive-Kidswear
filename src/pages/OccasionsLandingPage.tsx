import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  Heart,
  ShoppingCart,
  ArrowRight,
  Sparkles,
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
  brandStoryImage,
} from '../assets/images';

interface OccasionsLandingPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  onNavigateHome: () => void;
  initialFilter?: string;
}

// ============================================================================
// 1. Ganesh Chaturthi Products (matching video 00:00 - 00:02)
// ============================================================================
const ganeshChaturthiProducts: Product[] = [
  {
    id: 'ganpati-dhoti-kurta-set',
    name: 'Ganpati Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2250,
    mrp: 2690,
    discountPercent: 16,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 44,
    description: 'Auspicious yellow hand-block printed kurta with readymade pre-pleated dhoti pants and gentle soft elastic waistband.',
  },
  {
    id: 'boy-ganesha-kurta-yellow',
    name: 'Boy Ganesha Kurta Set - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3290,
    mrp: 3890,
    discountPercent: 15,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: 'Pure Chanderi',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 52,
    description: 'Radiant turmeric yellow chanderi silk kurta with delicate golden zari motifs and matching ivory churidar pants.',
  },
  {
    id: 'boy-ganesha-kurta-cream',
    name: 'Boy Ganesha Kurta Set - Cream',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3290,
    mrp: 3890,
    discountPercent: 15,
    image: productImages.flatlay,
    hoverImage: productImages.back,
    galleryImages: [productImages.flatlay, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Cream',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Heirloom cream raw-silk blend kurta detailed with Ganesha embroidered motif and maroon piping accents.',
  },
  {
    id: 'ganesh-blessing-kurta-pyjama',
    name: 'Ganesh Blessing Kurta Pyjama Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'White',
    badge: 'Soft Mulmul',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 26,
    description: 'Featherlight pure mulmul white kurta with subtle golden embroidery and non-pinch comfort pyjama bottoms.',
  },
  {
    id: 'little-jugnu-3pc-bundi',
    name: 'Little Jugnu 3 Pc Bundi Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2490,
    mrp: 2990,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Orange',
    badge: 'Festive Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 31,
    description: 'Tangerine orange bundi jacket set over a crisp cotton-silk kurta and tailored matching straight trousers.',
  },
  {
    id: 'little-jugnu-dhoti-kurta',
    name: 'Little Jugnu Dhoti Kurta Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.back,
    galleryImages: [productImages.pattu, productImages.back],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Peach',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Ganesh Chaturthi', 'Baby ceremonies'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 46,
    description: 'Peach comfort cotton kurta with traditional gold foil border and easy slide-on ready pleated dhoti.',
  },
  {
    id: 'baby-boy-yellow-bandhani-set',
    name: 'Yellow Printed Bandhani Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1200,
    mrp: 1490,
    discountPercent: 19,
    image: productImages.bandhani,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.bandhani, productImages.flatlay],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 19,
    description: 'Cheerful mustard yellow bandhani printed cotton kurta with breathable cotton mulmul pyjama pants.',
  },
  {
    id: 'lures-stripes-dhoti-kurta',
    name: 'Lures Stripes Dhoti Kurta Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2050,
    discountPercent: 18,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Green',
    badge: 'Soft Mulmul',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Ganesh Chaturthi', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 22,
    description: 'Refreshing mint green woven stripe kurta with soft gold lurex accents and pre-stitched white dhoti.',
  },
];

// ============================================================================
// 2. Navratri & Durga Puja Products (matching video 00:03 - 00:05)
// ============================================================================
const navratriProducts: Product[] = [
  {
    id: 'devi-durga-coord-cream',
    name: 'Devi Durga Co-ord Set - Cream',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Cream',
    badge: 'Handcrafted',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 39,
    description: 'Ethereal cream crop choli and gathered festive skirt with intricate temple threadwork and mirror details.',
  },
  {
    id: 'devi-durga-coord-red',
    name: 'Devi Durga Co-ord Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 3250,
    mrp: 3890,
    discountPercent: 16,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Red',
    badge: 'Festive Twirl',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Navratri', 'Festive', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 48,
    description: 'Sindoor red celebratory top and flared palazzo set with golden gotta patti borders and tassel tie-ups.',
  },
  {
    id: 'devi-durga-angrakha-red',
    name: 'Devi Durga Angrakha Set - Red',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 3450,
    mrp: 4100,
    discountPercent: 16,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Red',
    badge: 'Pure Silk Blend',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Puja', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 43,
    description: 'Traditional crimson angrakha featuring authentic gota work, handmade latkans and twirling sharara pants.',
  },
  {
    id: 'devi-durga-lehenga-red',
    name: 'Devi Durga Lehenga Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 4290,
    mrp: 4990,
    discountPercent: 14,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '6-7 Y'],
    color: 'Red',
    badge: 'Heirloom Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Wedding', 'Festive'],
    ageGroup: '3Y+',
    rating: 5.0,
    reviewCount: 56,
    description: 'Regal red pure chanderi silk lehenga with heavy zari hem, puff sleeve choli and tissue net dupatta.',
  },
  {
    id: 'desi-girl-sari-set-pink',
    name: "D' Desi Girl Sari Set - Pink",
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3392,
    mrp: 3990,
    discountPercent: 15,
    image: productImages.pattu,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.pattu, productImages.sharara],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.8,
    reviewCount: 37,
    description: 'Ready-to-wear pre-stitched baby sari set in hot pink chiffon with elastic waist for non-slip festive dancing.',
  },
  {
    id: 'desi-girl-sari-set-blue',
    name: "D' Desi Girl Sari Set - Blue",
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 3392,
    mrp: 3990,
    discountPercent: 15,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['2-3 Y', '3-4 Y', '4-5 Y', '5-6 Y'],
    color: 'Blue',
    badge: 'Sale',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive'],
    ageGroup: '3Y+',
    rating: 4.9,
    reviewCount: 34,
    description: 'Royal sapphire blue pre-draped sari with sparkling gold sequin border and halter sweetheart blouse.',
  },
  {
    id: 'hoot-raani-coord-set',
    name: 'Hoot Raani Co-ord Set',
    collection: 'Boota Play',
    category: 'GIRLS INDO WESTERN WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.front, productImages.flatlay],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Brown',
    badge: 'Twirl Ready',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Navratri', 'Birthday'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 25,
    description: 'Whimsical printed peplum kurti with flared tiered sharara trousers for comfortable garba celebration.',
  },
  {
    id: 'hawa-mahal-kurta-set',
    name: 'Hawa Mahal Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1790,
    mrp: 2190,
    discountPercent: 18,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Pink',
    badge: 'Hand Block',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Navratri', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 42,
    description: 'Dusty rose Jaipur hand-blocked kurti with scalloped border and featherlight mulmul straight pants.',
  },
];

// ============================================================================
// 3. Dussehra & Diwali Products (matching video 00:06 - 00:09)
// ============================================================================
const dussehraDiwaliProducts: Product[] = [
  {
    id: 'hanuman-blessing-kurta-yellow',
    name: 'Hanuman Blessing Kurta Pyjama - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.detail,
    galleryImages: [productImages.front, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Yellow',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Dussehra', 'Diwali', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 50,
    description: 'Sun yellow festive organic cotton kurta with hand-embroidered blessing motif and soft drawstring pyjamas.',
  },
  {
    id: 'jai-shri-ram-kurta-red',
    name: 'Jai Shri Ram Kurta Pyjama Set - Red',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.back,
    galleryImages: [productImages.sharara, productImages.back],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y', '3-4 Y'],
    color: 'Red',
    badge: 'Auspicious Edit',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Dussehra', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 61,
    description: 'Deep crimson silk-cotton kurta with gold kiran lace trim, designed for Dussehra and Diwali festivities.',
  },
  {
    id: 'jai-shri-ram-kurta-yellow',
    name: 'Jai Shri Ram Kurta Pyjama - Yellow',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Yellow',
    badge: 'Soft Mulmul',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Dussehra', 'Diwali', 'Puja'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 33,
    description: 'Marigold yellow auspicious festive kurti set with featherlight lining and easy dressing front buttons.',
  },
  {
    id: 'divine-bow-dhoti-cream',
    name: 'Divine Bow Dhoti Kurta Set - Cream',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.detail,
    hoverImage: productImages.front,
    galleryImages: [productImages.detail, productImages.front],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: 'Bestseller',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Dussehra', 'Diwali'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 47,
    description: 'Cream silk blend angrakha with delicate hand-tied side tassels and festive ready-to-wear dhoti trousers.',
  },
  {
    id: 'firecracker-nehru-red',
    name: 'Firecracker Nehru Jacket Set - Red',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1890,
    discountPercent: 21,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Red',
    badge: 'Brocade Silk',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Diwali', 'Festive', 'Wedding'],
    ageGroup: '1-3Y',
    rating: 4.9,
    reviewCount: 38,
    description: 'Celebratory red brocade nehru waistcoat layered over an ivory kurta and comfortable churidar.',
  },
  {
    id: 'firecracker-nehru-pink',
    name: 'Firecracker Nehru Jacket Set - Pink',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1890,
    discountPercent: 21,
    image: productImages.sharara,
    hoverImage: productImages.detail,
    galleryImages: [productImages.sharara, productImages.detail],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '5-6 Y'],
    color: 'Pink',
    badge: 'Pure Chanderi',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Diwali', 'Festive'],
    ageGroup: '1-3Y',
    rating: 4.8,
    reviewCount: 29,
    description: 'Fuchsia pink floral zari jacket with wooden carved buttons, perfect for Diwali evening gatherings.',
  },
  {
    id: 'firecracker-nehru-yellow',
    name: 'Firecracker Nehru Jacket Set - Yellow',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1890,
    discountPercent: 21,
    image: productImages.bandhani,
    hoverImage: productImages.front,
    galleryImages: [productImages.bandhani, productImages.front],
    sizes: ['1-2 Y', '2-3 Y', '3-4 Y', '4-5 Y'],
    color: 'Yellow',
    badge: 'Silk Blend',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Diwali', 'Festive'],
    ageGroup: '1-3Y',
    rating: 5.0,
    reviewCount: 41,
    description: 'Golden yellow festive vest with mandarin collar, soft cotton lining and matching bottoms.',
  },
  {
    id: 'pataka-baby-girl-angrakha-pink',
    name: 'Pataka Baby Girl Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 2450,
    mrp: 2990,
    discountPercent: 18,
    image: productImages.pattu,
    hoverImage: productImages.detail,
    galleryImages: [productImages.pattu, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Pink',
    badge: 'Gota Borders',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Diwali', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 54,
    description: 'Playful baby pink angrakha kurti with authentic golden gota borders and soft flared tulip pants.',
  },
];

// ============================================================================
// 4. Baby Ceremonies Products (Milestones, Naming, Annaprashan & Mundan)
// ============================================================================
const babyCeremoniesProducts: Product[] = [
  {
    id: 'annaprashan-angrakha-yellow',
    name: 'Annaprashan First Food Angrakha Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1790,
    mrp: 2190,
    discountPercent: 18,
    image: productImages.flatlay,
    hoverImage: productImages.detail,
    galleryImages: [productImages.flatlay, productImages.detail],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Yellow',
    badge: 'Organic Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Annaprashan', 'Puja'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 46,
    description: 'Traditional turmeric yellow side-tie angrakha with organic mulmul lining for baby’s sacred first food milestone.',
  },
  {
    id: 'mundan-silk-dhoti-kurta',
    name: 'Mundan Silk Dhoti Kurta Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2190,
    mrp: 2650,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.back,
    galleryImages: [productImages.front, productImages.back],
    sizes: ['0-3 M', '6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Cream',
    badge: 'Soft Lining',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Mundan', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 39,
    description: 'Pristine ivory chanderi silk kurta with pure zari borders and skin-soft seamless lining for baby’s head shaving ceremony.',
  },
  {
    id: 'naming-ceremony-peplum-jhabla',
    name: 'Naming Ceremony Peplum Jhabla Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1490,
    mrp: 1790,
    discountPercent: 17,
    image: productImages.sharara,
    hoverImage: productImages.front,
    galleryImages: [productImages.sharara, productImages.front],
    sizes: ['000M (<2.5 KG)', '00M (2.5-3.5 KG)', '0M (3-5.2 KG)', '3-6 M'],
    color: 'Peach',
    badge: 'Pure Mulmul',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Baby Welcome & Naming'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 33,
    description: 'Ultra-gentle pastel peach jhabla top with matching bloomer shorts crafted from chemical-free organic cotton.',
  },
  {
    id: 'heirloom-baby-welcome-set',
    name: 'Heirloom Baby Welcome Romper Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 1850,
    mrp: 2250,
    discountPercent: 18,
    image: productImages.detail,
    hoverImage: productImages.flatlay,
    galleryImages: [productImages.detail, productImages.flatlay],
    sizes: ['00M (2.5-3.5 KG)', '0M (3-5.2 KG)', '3-6 M'],
    color: 'Pink',
    badge: 'Soft Seams',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Baby Welcome & Naming'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 28,
    description: 'Blush pink celebratory newborn outfit with front overlap snaps for effortless changing and Zero-scratch tags.',
  },
  {
    id: 'kesariya-baby-dhoti-set',
    name: 'Kesariya Baby Dhoti Kurta Set',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1690,
    mrp: 2050,
    discountPercent: 18,
    image: productImages.bandhani,
    hoverImage: productImages.detail,
    galleryImages: [productImages.bandhani, productImages.detail],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Orange',
    badge: 'Pure Cotton',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.8,
    reviewCount: 31,
    description: 'Auspicious kesariya orange traditional dhoti set with hand-tied golden cord latkans.',
  },
  {
    id: 'gulab-kalli-baby-sharara',
    name: 'Gulab Kalli Baby Sharara Set',
    collection: 'Boota Play',
    category: 'GIRLS ETHNIC WEAR',
    price: 2150,
    mrp: 2590,
    discountPercent: 17,
    image: productImages.pattu,
    hoverImage: productImages.front,
    galleryImages: [productImages.pattu, productImages.front],
    sizes: ['0M (3-5.2 KG)', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Pink',
    badge: 'Baby Safe',
    isBestSeller: true,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Festive'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 27,
    description: 'Rose petal pink tier peplum top with elasticated gathered sharara pants for picture-perfect milestone memories.',
  },
  {
    id: 'swarnam-pattu-pavadai-set',
    name: 'Swarnam Pattu Pavadai Set',
    collection: 'Boota Luxe',
    category: 'GIRLS ETHNIC WEAR',
    price: 2590,
    mrp: 3100,
    discountPercent: 16,
    image: productImages.back,
    hoverImage: productImages.detail,
    galleryImages: [productImages.back, productImages.detail],
    sizes: ['6-12 M', '1-2 Y', '2-3 Y'],
    color: 'Green',
    badge: 'Silk Heritage',
    isBestSeller: true,
    isNewArrival: false,
    occasions: ['Baby ceremonies', 'Annaprashan', 'Festive'],
    ageGroup: '0-12M',
    rating: 5.0,
    reviewCount: 40,
    description: 'Traditional green and golden woven pattu pavadai lehenga set with pure zari borders and soft cotton lining.',
  },
  {
    id: 'shree-angrakha-dhoti-pants',
    name: 'Shree Angrakha & Dhoti Pants',
    collection: 'Boota Desi',
    category: 'GIRLS ETHNIC WEAR',
    price: 1990,
    mrp: 2390,
    discountPercent: 17,
    image: productImages.front,
    hoverImage: productImages.sharara,
    galleryImages: [productImages.front, productImages.sharara],
    sizes: ['0-3 M', '3-6 M', '6-12 M', '1-2 Y'],
    color: 'Cream',
    badge: 'Hand Stitched',
    isBestSeller: false,
    isNewArrival: true,
    occasions: ['Baby ceremonies', 'Puja'],
    ageGroup: '0-12M',
    rating: 4.9,
    reviewCount: 24,
    description: 'Cream angrakha with maroon piping and pre-draped dhoti trousers designed for effortless comfort.',
  },
];

// Circular category bubbles matching video
const occasionBubbles = [
  {
    id: 'all',
    label: 'ALL OCCASIONS',
    image: productImages.flatlay,
    tagline: 'All Festive Occasions',
  },
  {
    id: 'ganesh-chaturthi',
    label: 'GANESH CHATURTHI',
    image: ageBaby,
    tagline: 'Ganpati Celebrations',
  },
  {
    id: 'navratri',
    label: 'NAVRATRI',
    image: ageKids,
    tagline: '9 Nights of Twirls',
  },
  {
    id: 'diwali',
    label: 'DUSSEHRA & DIWALI',
    image: heroDesiDesktop,
    tagline: 'Auspicious Lights Edit',
  },
  {
    id: 'baby-ceremonies',
    label: 'BABY CEREMONIES',
    image: ageToddler,
    tagline: 'Milestones & Pujas',
  },
];

export const OccasionsLandingPage: React.FC<OccasionsLandingPageProps> = ({
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
          scrollToSection(`occasion-${initialFilter}`);
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
        scrollToSection(`occasion-${id}`);
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
            <span className="text-[#2B2224] font-semibold">upcoming occasions</span>
          </div>

          <div className="hidden sm:block text-[12px] text-[#962949] font-medium tracking-wide">
            Handcrafted Festive Occasion Wear by Boota
          </div>
        </div>
      </div>

      {/* Main Header Title matching video: "upcoming occasions" in navy serif lowercase */}
      <div className="pt-6 sm:pt-8 pb-3 text-center px-4">
        <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-bold text-[#142B6F] tracking-tight leading-none lowercase">
          upcoming occasions
        </h1>
      </div>

      {/* Circular Quick Occasion Bubbles Row */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-4 mb-6">
        <div className="flex items-center justify-center gap-5 sm:gap-8 md:gap-11 overflow-x-auto pb-2 no-scrollbar">
          {occasionBubbles.map((bubble) => {
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

                {/* Category Label */}
                <span
                  className={`mt-2 text-[11px] sm:text-[12px] md:text-[12.5px] font-bold tracking-wider uppercase text-center transition-colors max-w-[110px] leading-tight ${
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
            <span>
              Viewing{' '}
              {occasionBubbles.find((b) => b.id === selectedFilter)?.label ||
                selectedFilter}{' '}
              only
            </span>
            <button
              onClick={() => setSelectedFilter('all')}
              className="hover:text-[#962949] p-0.5 rounded-full cursor-pointer ml-1"
              title="Show all occasions"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className="text-[13px] text-[#962949] hover:underline font-semibold cursor-pointer"
          >
            Show All Occasions →
          </button>
        </div>
      )}

      {/* OCCASION SECTIONS matching video layout */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-16 sm:space-y-24">
        {/* ============================================================== */}
        {/* SECTION 1: GANESH CHATURTHI (matching video 00:00 - 00:02) */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'ganesh-chaturthi') && (
          <section id="occasion-ganesh-chaturthi" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner matching video */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={ageBaby}
                    alt="Ganesh Chaturthi Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Auspicious Blessings
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Ganesh Chaturthi
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Handcrafted turmeric dhoti sets and blessing kurta pyjamas tailored in soft Jaipur cotton.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('ganesh-chaturthi')}
                      className="px-5 py-2.5 bg-[#142B6F] hover:bg-[#1a3891] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
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
                  {ganeshChaturthiProducts.map((product) => {
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
        {/* SECTION 2: NAVRATRI (matching video 00:03 - 00:05) */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'navratri') && (
          <section id="occasion-navratri" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner matching video */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={ageKids}
                    alt="Navratri Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      9 Nights of Dance
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Navratri
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Celebratory flared lehengas, mirror accents, pre-draped saris and twirling garba co-ords.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('navratri')}
                      className="px-5 py-2.5 bg-[#142B6F] hover:bg-[#1a3891] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
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
                  {navratriProducts.map((product) => {
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
                              <span
                                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-[3px] text-white shadow-2xs ${
                                  product.badge.toLowerCase().includes('sale')
                                    ? 'bg-[#E11D48]'
                                    : 'bg-[#962949]'
                                }`}
                              >
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
        {/* SECTION 3: DUSSEHRA & DIWALI (matching video 00:06 - 00:09) */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'diwali') && (
          <section id="occasion-diwali" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner matching video */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={heroDesiDesktop}
                    alt="Dussehra and Diwali Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Grand Lights Celebration
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Dussehra & Diwali
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Auspicious festive silk sets, radiant firecracker nehru jackets and heritage gota kurtis.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('diwali')}
                      className="px-5 py-2.5 bg-[#142B6F] hover:bg-[#1a3891] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
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
                  {dussehraDiwaliProducts.map((product) => {
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
        {/* SECTION 4: BABY CEREMONIES (Milestones, Mundan & Annaprashan) */}
        {/* ============================================================== */}
        {(selectedFilter === 'all' || selectedFilter === 'baby-ceremonies') && (
          <section id="occasion-baby-ceremonies" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Feature Vertical Banner */}
              <div className="lg:col-span-4 xl:col-span-3 h-full">
                <div className="relative rounded-[6px] overflow-hidden border border-[#E8DADD] bg-[#FAF6F4] h-[340px] sm:h-[420px] lg:h-full min-h-[400px] flex flex-col justify-end p-6 group">
                  <img
                    src={brandStoryImage}
                    alt="Baby Ceremonies Collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/85 via-[#2B2224]/30 to-transparent" />

                  <div className="relative z-10 text-white">
                    <span className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#F9D0D6] block mb-1">
                      Sacred Milestones
                    </span>
                    <h3 className="font-serif text-[28px] sm:text-[32px] font-bold leading-tight mb-2">
                      Baby Ceremonies
                    </h3>
                    <p className="text-[12.5px] text-white/90 leading-relaxed mb-4">
                      Soft organic mulmul jhablas, Annaprashan angrakhas & seamless Mundan dhoti sets.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleBubbleClick('baby-ceremonies')}
                      className="px-5 py-2.5 bg-[#142B6F] hover:bg-[#1a3891] text-white text-[12px] font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
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
                  {babyCeremoniesProducts.map((product) => {
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
