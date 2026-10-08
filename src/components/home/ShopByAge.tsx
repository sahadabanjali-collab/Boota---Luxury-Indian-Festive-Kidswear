import React from 'react';
import { ageTilesData } from '../../assets/images';
import { ArrowUpRight } from 'lucide-react';

interface ShopByAgeProps {
  onSelectAge?: (ageTag: string) => void;
}

export const ShopByAge: React.FC<ShopByAgeProps> = ({ onSelectAge }) => {
  return (
    <section className="w-full pt-8 md:pt-10 lg:pt-12 pb-5 md:pb-8 lg:pb-10 bg-[#FFFFFF]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
          <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-1.5">
            Find the Perfect Fit
          </span>
          <h2 className="font-serif text-[28px] md:text-[34px] text-[#2B2224] font-medium tracking-tight mb-2">
            Shop by Age
          </h2>
          <p className="text-[13.5px] md:text-[14.5px] text-[#6F6265] leading-relaxed">
            Thoughtfully tailored sizes with irritation-free inner linings and flexible movement for every stage.
          </p>
        </div>

        {/* High-impact Portrait Cards matching screenshot dimensions */}
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7 lg:gap-8 justify-center">
          {ageTilesData.map((tile) => (
            <div
              key={tile.id}
              onClick={() => onSelectAge && onSelectAge(tile.tag)}
              className="group relative cursor-pointer overflow-hidden rounded-[8px] border border-[#E8DADD] bg-[#FAF6F4] transition-all duration-300 hover:shadow-lg hover:border-[#962949]/40 flex flex-col"
            >
              {/* Tall Portrait Image Container matching screenshot */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#FAF6F4] relative">
                <img
                  src={tile.image}
                  alt={`Boota ${tile.title} Collection (${tile.ageRange})`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Light ivory/white shade on the lower portion of the image behind the name */}
                <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3 bg-gradient-to-t from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent flex flex-col items-center justify-end text-center transition-all duration-300">
                  <h3 className="font-serif font-bold text-[18px] sm:text-[20px] md:text-[22px] text-[#962949] tracking-tight leading-tight m-0 group-hover:scale-[1.02] transition-transform">
                    {tile.title}
                  </h3>
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#6F6265] tracking-wide mt-1">
                    {tile.ageRange}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
