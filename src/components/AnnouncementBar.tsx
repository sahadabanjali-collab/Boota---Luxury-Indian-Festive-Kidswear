import React, { useState, useEffect } from 'react';

const announcements = [
  'Easy 7-day size exchange',
  'Free shipping on prepaid orders above ₹1,499',
  'Cash on Delivery available across India',
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-[#F9D0D6] border-b border-[#E8DADD] text-[#962949] py-2 select-none">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px] flex items-center justify-center text-[13px] font-medium tracking-[0.04em]">
        <div className="text-center overflow-hidden whitespace-nowrap px-4">
          <span className="inline-block transition-opacity duration-300">
            {announcements[currentIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};
