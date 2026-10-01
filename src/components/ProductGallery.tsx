import React, { useState } from 'react';
import { X } from 'lucide-react';
import { productImages } from '../assets/images';

interface GalleryItem {
  id: string;
  src: string;
  bg: string;
  label: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'front',
    src: productImages.front,
    bg: '#F9D0D6',
    label: 'Product photo · Front view on model',
    alt: 'Gulnar Silk Lehenga Set - Front view on model',
  },
  {
    id: 'back',
    src: productImages.back,
    bg: '#F9D0D6',
    label: 'Product photo · Back view',
    alt: 'Gulnar Silk Lehenga Set - Back view with latkan dori',
  },
  {
    id: 'detail',
    src: productImages.detail,
    bg: '#F9D0D6',
    label: 'Product photo · Close-up of hand-finished details',
    alt: 'Gulnar Silk Lehenga Set - Close-up of hand-finished gota details',
  },
  {
    id: 'flatlay',
    src: productImages.flatlay,
    bg: '#F9D0D6',
    label: 'Product photo · Full outfit and accessories',
    alt: 'Gulnar Silk Lehenga Set - Full outfit flat lay with accessories',
  },
];

export const ProductGallery: React.FC = () => {
  const [activeModalImage, setActiveModalImage] = useState<GalleryItem | null>(null);

  return (
    <div className="w-full">
      {/* 2x2 Grid with 24px gutters matching design system */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalImage(item)}
            className="group relative aspect-[4/5] overflow-hidden cursor-pointer border border-[#E8DADD] rounded-[4px] bg-[#F9D0D6]"
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-102"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />

            {/* Bottom-left label matching exact Figma design */}
            <div className="absolute bottom-3 left-3 z-10 pointer-events-none bg-[#FFFFFF] border border-[#E8DADD] px-2.5 py-1 rounded-[4px]">
              <span className="text-[12px] font-sans text-[#6F6265] font-medium tracking-wide">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal */}
      {activeModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-[#2B2224]/80 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-[#FFFFFF] border border-[#E8DADD] rounded-[4px] overflow-hidden"
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-[#FFFFFF] hover:bg-[#F9D0D6] border border-[#E8DADD] rounded-[4px] text-[#2B2224] cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeModalImage.src}
              alt={activeModalImage.alt}
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
            <div className="p-4 bg-[#FFFFFF] border-t border-[#E8DADD] flex items-center justify-between text-[13px] text-[#6F6265]">
              <span className="font-serif font-semibold text-[18px] text-[#962949]">
                Gulnar Silk Lehenga Set
              </span>
              <span>{activeModalImage.label}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
