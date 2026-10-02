import React, { useState } from 'react';
import { occasionsData } from '../../data/products';
import { ArrowUpRight } from 'lucide-react';

interface ShopByOccasionProps {
  onSelectOccasion?: (occasionTag: string) => void;
}

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({ onSelectOccasion }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredOccasions =
    activeFilter === 'All'
      ? occasionsData
      : occasionsData.filter((occ) => occ.tag.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className="w-full py-16 md:py-24 bg-[#FFFDF9] border-b border-[#E8DADD]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
            Festive Celebrations
          </span>
          <h2 className="font-serif text-[30px] md:text-[38px] text-[#2B2224] font-medium tracking-tight mb-3">
            Shop by Occasion
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6F6265] leading-relaxed">
            From sacred rituals and haldi laughter to grand wedding evenings, discover attire crafted for joyful memories.
          </p>

          {/* Seasonal Occasion Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {['All', 'Wedding', 'Haldi', 'Sangeet', 'Baby ceremonies', 'Festive Celebrations'].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[#962949] text-white shadow-2xs'
                      : 'bg-white border border-[#E8DADD] text-[#2B2224] hover:border-[#962949] hover:text-[#962949]'
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* 6 Visual Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {filteredOccasions.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion && onSelectOccasion(occ.tag)}
              className="group relative cursor-pointer overflow-hidden rounded-[4px] border border-[#E8DADD] bg-white transition-all duration-300 hover:shadow-md hover:border-[#962949]/30 flex flex-col"
            >
              {/* Image Frame */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF6F4] relative">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/80 via-[#2B2224]/20 to-transparent transition-opacity duration-300 group-hover:opacity-85" />
              </div>

              {/* Title & Arrow */}
              <div className="absolute inset-0 p-3.5 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[15px] sm:text-[16px] font-medium leading-tight group-hover:text-[#F9D0D6] transition-colors">
                    {occ.title}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
