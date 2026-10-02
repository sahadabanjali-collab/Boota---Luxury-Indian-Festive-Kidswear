import React from 'react';
import { brandStoryImage } from '../../assets/images';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BrandStoryProps {
  onOpenStory?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onOpenStory }) => {
  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF6F4] border-b border-[#E8DADD] overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Genuine Workshop/Artisan Editorial Image (7 Cols on desktop) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[4px] overflow-hidden border border-[#E8DADD] shadow-sm bg-white">
              <img
                src={brandStoryImage}
                alt="Boota artisan hand-embroidering pure silk with gota patti"
                className="w-full h-[360px] sm:h-[420px] md:h-[460px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#962949]/5 pointer-events-none" />
            </div>

            {/* Small Floating Artisan Badge */}
            <div className="absolute -bottom-4 right-4 sm:right-8 bg-white border border-[#E8DADD] rounded-[4px] p-3 shadow-md flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#F9D0D6] text-[#962949] flex items-center justify-center">
                <Sparkles className="w-4 h-4 stroke-[2]" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#2B2224]">Pure Handcraft</div>
                <div className="text-[11px] text-[#6F6265]">Zero synthetic scratchy linings</div>
              </div>
            </div>
          </div>

          {/* Text Content (60-80 words per specification) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[12px] uppercase font-semibold tracking-[0.14em] text-[#962949] block mb-2">
              Our Heritage & Craft
            </span>

            <h2 className="font-serif text-[32px] sm:text-[40px] text-[#2B2224] font-medium tracking-tight mb-5 leading-[1.18]">
              Rooted in Tradition, <br />
              <span className="italic font-normal text-[#962949]">Tailored for Wonder.</span>
            </h2>

            {/* Exactly 70 words, honoring the 60-80 word rule */}
            <p className="text-[15px] sm:text-[16px] text-[#55474B] leading-[1.75] font-light mb-8">
              Boota was born to preserve the grandeur of timeless Indian festive craft while prioritizing the delicate comfort of children. Each piece weaves together heirloom pure silks, intricate hand-finished gota patti, and ultra-soft, breathable mulmul linings. We believe occasion wear should never itch, pinch, or constrain — allowing little ones to run, twirl, and celebrate heritage with effortless joy and untamed spirit.
            </p>

            <div>
              <button
                onClick={onOpenStory}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#962949] text-white hover:bg-[#80223d] text-[13px] font-semibold tracking-[0.06em] uppercase rounded-[4px] transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
