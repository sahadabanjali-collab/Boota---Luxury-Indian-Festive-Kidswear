import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (term: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const popularSearches = [
    'Gulnar Silk Lehenga',
    'Chanderi Suit Sets',
    'Baby Annaprashan Kurta',
    'Diwali Edit',
    'Haldi Yellow Outfits',
    'Sharara Sets',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative max-w-2xl mx-auto mt-16 p-4">
        <div className="bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] p-6">
          <div className="flex items-center justify-between border-b border-[#E8DADD] pb-3">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-[#6F6265]" />
              <input
                type="text"
                autoFocus
                placeholder="Search lehengas, suit sets, festive collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-[14px] outline-none text-[#2B2224] placeholder-[#6F6265] bg-transparent"
              />
            </div>
            <button
              onClick={onClose}
              className="text-[#6F6265] hover:text-[#2B2224] p-1 rounded-[4px] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5">
            <span className="text-[12px] uppercase tracking-[0.06em] text-[#6F6265] font-semibold block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    onSelectItem(term);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E8DADD] hover:border-[#962949] hover:bg-[#F9D0D6]/40 text-[13px] text-[#2B2224] hover:text-[#962949] rounded-[4px] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
