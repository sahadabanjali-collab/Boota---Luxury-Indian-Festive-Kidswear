import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SizeRow {
  size: string;
  age: string;
  chestIn: string;
  waistIn: string;
  lehengaLenIn: string;
  kurtiLenIn: string;
  chestCm: string;
  waistCm: string;
  lehengaLenCm: string;
  kurtiLenCm: string;
}

const sizeData: SizeRow[] = [
  {
    size: '1-2 Y',
    age: '12-24 mos',
    chestIn: '21"',
    waistIn: '18"-20"',
    lehengaLenIn: '18"',
    kurtiLenIn: '12"',
    chestCm: '53 cm',
    waistCm: '46-51 cm',
    lehengaLenCm: '46 cm',
    kurtiLenCm: '30 cm',
  },
  {
    size: '2-3 Y',
    age: '2-3 yrs',
    chestIn: '22"',
    waistIn: '19"-21"',
    lehengaLenIn: '20"',
    kurtiLenIn: '13"',
    chestCm: '56 cm',
    waistCm: '48-53 cm',
    lehengaLenCm: '51 cm',
    kurtiLenCm: '33 cm',
  },
  {
    size: '3-4 Y',
    age: '3-4 yrs',
    chestIn: '23"',
    waistIn: '20"-22"',
    lehengaLenIn: '22"',
    kurtiLenIn: '14"',
    chestCm: '58 cm',
    waistCm: '51-56 cm',
    lehengaLenCm: '56 cm',
    kurtiLenCm: '36 cm',
  },
  {
    size: '4-5 Y',
    age: '4-5 yrs',
    chestIn: '24"',
    waistIn: '21"-23"',
    lehengaLenIn: '24"',
    kurtiLenIn: '15"',
    chestCm: '61 cm',
    waistCm: '53-58 cm',
    lehengaLenCm: '61 cm',
    kurtiLenCm: '38 cm',
  },
  {
    size: '5-6 Y',
    age: '5-6 yrs',
    chestIn: '25.5"',
    waistIn: '22"-24"',
    lehengaLenIn: '26"',
    kurtiLenIn: '16"',
    chestCm: '65 cm',
    waistCm: '56-61 cm',
    lehengaLenCm: '66 cm',
    kurtiLenCm: '41 cm',
  },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#E8DADD] rounded-[4px] p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#6F6265] hover:text-[#2B2224] cursor-pointer rounded-[4px] p-1"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h3 className="font-serif font-semibold text-[24px] sm:text-[28px] text-[#962949]">
              Size Guide
            </h3>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8DADD]">
            <span className="text-[13px] font-medium text-[#2B2224]">Display Units:</span>
            <div className="flex items-center border border-[#E8DADD] p-0.5 rounded-[4px] text-[13px]">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 cursor-pointer font-semibold rounded-[4px] transition-colors ${
                  unit === 'inches'
                    ? 'bg-[#962949] text-[#FFFFFF]'
                    : 'text-[#6F6265] hover:text-[#2B2224]'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 cursor-pointer font-semibold rounded-[4px] transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#962949] text-[#FFFFFF]'
                    : 'text-[#6F6265] hover:text-[#2B2224]'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left">
              <thead>
                <tr className="bg-[#F9D0D6]/40 border-y border-[#E8DADD] text-[#2B2224]">
                  <th className="py-2.5 px-3 font-semibold uppercase tracking-[0.04em]">Size</th>
                  <th className="py-2.5 px-3 font-semibold uppercase tracking-[0.04em]">Age</th>
                  <th className="py-2.5 px-3 font-semibold uppercase tracking-[0.04em]">Chest</th>
                  <th className="py-2.5 px-3 font-semibold uppercase tracking-[0.04em]">Waist (Elastic)</th>
                  <th className="py-2.5 px-3 font-semibold uppercase tracking-[0.04em]">Lehenga Length</th>
                  <th className="py-2.5 px-3 font-semibold uppercase tracking-[0.04em]">Choli Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DADD] text-[#6F6265]">
                {sizeData.map((row) => (
                  <tr key={row.size} className="hover:bg-[#F9D0D6]/20">
                    <td className="py-2.5 px-3 font-semibold text-[#962949]">{row.size}</td>
                    <td className="py-2.5 px-3">{row.age}</td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.chestIn : row.chestCm}
                    </td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.waistIn : row.waistCm}
                    </td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.lehengaLenIn : row.lehengaLenCm}
                    </td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.kurtiLenIn : row.kurtiLenCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
