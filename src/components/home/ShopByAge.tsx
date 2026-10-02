import React from 'react';
import { ageTilesData } from '../../assets/images';
import { ArrowUpRight } from 'lucide-react';

interface ShopByAgeProps {
  onSelectAge?: (ageTag: string) => void;
}

export const ShopByAge: React.FC<ShopByAgeProps> = ({ onSelectAge }) => {
  return (
    <section className="w-full py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E8DADD]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
            Find the Perfect Fit
          </span>
          <h2 className="font-serif text-[30px] md:text-[36px] text-[#2B2224] font-medium tracking-tight mb-3">
            Shop by Age
          </h2>
          <p className="text-[14px] md:text-[15px] text-[#6F6265] leading-relaxed">
            Thoughtfully tailored sizes with irritation-free inner linings and flexible movement for every stage.
          </p>
        </div>

        {/* 3 Visual Tiles Grid with 4:5 ratio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ageTilesData.map((tile) => (
            <div
              key={tile.id}
              onClick={() => onSelectAge && onSelectAge(tile.tag)}
              className="group relative cursor-pointer overflow-hidden rounded-[4px] border border-[#E8DADD] bg-[#F9D0D6]/20 transition-all duration-300 hover:shadow-lg hover:border-[#962949]/30"
            >
              {/* 4:5 Image Container */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF6F4] relative">
                <img
                  src={tile.image}
                  alt={`Boota ${tile.title} Collection (${tile.ageRange})`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2224]/75 via-[#2B2224]/15 to-transparent transition-opacity duration-300 group-hover:opacity-85" />
              </div>

              {/* Tile Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-[26px] md:text-[28px] font-medium text-white group-hover:text-[#F9D0D6] transition-colors">
                    {tile.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#962949] group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>

                <div className="text-[13.5px] font-medium text-[#F9D0D6] tracking-wide mb-1">
                  {tile.ageRange}
                </div>

                <p className="text-[12.5px] text-white/80 line-clamp-1">
                  {tile.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
