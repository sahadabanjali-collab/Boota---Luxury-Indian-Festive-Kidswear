import React from 'react';
import { productImages } from '../../assets/images';
import { ArrowRight } from 'lucide-react';

interface ShopByCollectionProps {
  onSelectCollection?: (collectionName: string) => void;
}

export const ShopByCollection: React.FC<ShopByCollectionProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'boota-desi',
      name: 'Boota Desi',
      tagline: 'Traditional Indian Ethnic Styles',
      description: 'Heritage angrakhas, hand-blocked bandhani ghararas & nostalgic festive silhouettes.',
      image: productImages.bandhani,
      badge: 'Heritage',
    },
    {
      id: 'boota-play',
      name: 'Boota Play',
      tagline: 'Playful & Modern Kidswear',
      description: 'Twirl-worthy peplums and easy-wear kurtis designed for uninhibited games and comfort.',
      image: productImages.sharara,
      badge: 'Everyday Twirls',
    },
    {
      id: 'boota-luxe',
      name: 'Boota Luxe',
      tagline: 'Premium & Luxury Collection',
      description: 'Opulent pure silks, hand-worked gota patti & heirloom zari brocades for wedding milestones.',
      image: productImages.front,
      badge: 'Heirloom Craft',
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#FFFFFF] border-b border-[#E8DADD]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
            Curated Universes
          </span>
          <h2 className="font-serif text-[30px] md:text-[38px] text-[#2B2224] font-medium tracking-tight mb-3">
            Shop by Collection
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6F6265] leading-relaxed">
            From playful everyday festivities to regal wedding heirloom sets, explore Boota’s signature craftsmanship.
          </p>
        </div>

        {/* 3 Large Editorial Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection && onSelectCollection(col.name)}
              className="group relative cursor-pointer overflow-hidden rounded-[4px] border border-[#E8DADD] bg-[#FAF6F4] flex flex-col transition-all duration-300 hover:shadow-lg hover:border-[#962949]/40"
            >
              {/* Editorial Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F9D0D6]/20">
                <img
                  src={col.image}
                  alt={`Boota ${col.name} collection`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/80 via-[#2B2224]/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 text-[#962949] text-[11px] font-semibold uppercase tracking-[0.08em] rounded-[2px] backdrop-blur-xs">
                  {col.badge}
                </div>
              </div>

              {/* Text Information */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <div className="text-[12px] uppercase tracking-[0.1em] text-[#F9D0D6] font-semibold mb-1">
                  {col.tagline}
                </div>
                <h3 className="font-serif text-[28px] md:text-[32px] font-medium text-white mb-2 group-hover:text-[#F9D0D6] transition-colors">
                  {col.name}
                </h3>
                <p className="text-[13px] text-white/85 leading-relaxed mb-4 line-clamp-2 font-light">
                  {col.description}
                </p>

                <div className="inline-flex items-center text-[12.5px] font-semibold uppercase tracking-[0.06em] text-white group-hover:text-[#F9D0D6] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
