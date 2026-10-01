import React, { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide?: () => void;
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onOpenAccount }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#962949] text-[#FFFFFF] pt-16 pb-12">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-[56px]">
        {/* Main Footer 4 Columns with 24px gutters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pb-14 border-b border-[#FFFFFF]/20">
          {/* Col 1: Contact */}
          <div>
            <h4 className="font-serif font-semibold text-[22px] mb-4 text-[#FFFFFF]">
              Contact
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#F9D0D6] font-normal leading-[1.6]">
              <li>
                <a
                  href="tel:+917291947602"
                  className="hover:text-[#FFFFFF] transition-colors"
                >
                  +91 72919 47602
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@boota.in"
                  className="hover:text-[#FFFFFF] transition-colors"
                >
                  hello@boota.in
                </a>
              </li>
              <li className="text-[#F9D0D6]/80">[Registered business address]</li>
              <li className="text-[#F9D0D6]/80 pt-1">Mon-Sat, 10 am - 7 pm</li>
            </ul>
          </div>

          {/* Col 2: Know Us */}
          <div>
            <h4 className="font-serif font-semibold text-[22px] mb-4 text-[#FFFFFF]">
              Know Us
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#F9D0D6] font-normal">
              <li>
                <a href="#about" className="hover:text-[#FFFFFF] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#why-boota" className="hover:text-[#FFFFFF] transition-colors">
                  Why Choose Boota?
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#FFFFFF] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#gift-card" className="hover:text-[#FFFFFF] transition-colors">
                  Gift Card
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Help */}
          <div>
            <h4 className="font-serif font-semibold text-[22px] mb-4 text-[#FFFFFF]">
              Help
            </h4>
            <ul className="space-y-2.5 text-[14px] text-[#F9D0D6] font-normal">
              <li>
                <button
                  onClick={onOpenAccount}
                  className="hover:text-[#FFFFFF] transition-colors cursor-pointer text-left"
                >
                  My Account
                </button>
              </li>
              <li>
                <a href="#track-order" className="hover:text-[#FFFFFF] transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#return-exchange-req" className="hover:text-[#FFFFFF] transition-colors">
                  Return / Exchange Request
                </a>
              </li>
              <li>
                <a href="#return-exchange-policy" className="hover:text-[#FFFFFF] transition-colors">
                  Return / Exchange Policy
                </a>
              </li>
              <li>
                <a href="#shipping-policy" className="hover:text-[#FFFFFF] transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFFFFF] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#size-guide" className="hover:text-[#FFFFFF] transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-[#FFFFFF] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-[#FFFFFF] transition-colors">
                  Wholesale Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Subscribe & Social */}
          <div>
            <h4 className="font-serif font-semibold text-[22px] mb-4 text-[#FFFFFF]">
              Subscribe to our email
            </h4>

            {subscribed ? (
              <div className="bg-[#FFFFFF]/15 text-[#FFFFFF] text-[13px] p-3 rounded-[4px] mb-6">
                Thank you for subscribing to Boota!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center mb-8">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FFFFFF]/15 border border-[#FFFFFF]/30 rounded-[4px] text-[#FFFFFF] placeholder-[#F9D0D6]/70 px-3.5 py-2.5 text-[13.5px] focus:outline-none focus:border-[#FFFFFF] transition-colors pr-16"
                />
                <button
                  type="submit"
                  className="absolute right-1 px-3 py-1.5 text-[13px] font-semibold tracking-[0.06em] uppercase text-[#FFFFFF] hover:text-[#F9D0D6] transition-colors cursor-pointer"
                >
                  JOIN
                </button>
              </form>
            )}

            <div className="mt-6">
              <h5 className="font-serif font-semibold text-[17px] mb-3 text-[#FFFFFF]">
                Join our social community
              </h5>
              <div className="flex items-center space-x-3 text-[#FFFFFF]">
                <div
                  className="w-8 h-8 rounded-[4px] border border-[#FFFFFF]/30 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </div>
                <div
                  className="w-8 h-8 rounded-[4px] border border-[#FFFFFF]/30 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </div>
                <div
                  className="w-8 h-8 rounded-[4px] border border-[#FFFFFF]/30 flex items-center justify-center font-serif font-bold text-xs"
                  aria-label="Pinterest"
                >
                  P
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between text-[13px] text-[#F9D0D6]/80 font-normal gap-4">
          <div>
            <div className="text-[#FFFFFF]/90">
              © 2026 [Registered business name]. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                UPI
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                Visa
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                Mastercard
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                RuPay
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                Net Banking
              </span>
              <span className="border border-[#FFFFFF]/40 rounded-[4px] px-2.5 py-0.5 text-[11px] text-[#FFFFFF] tracking-wide">
                COD
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#terms" className="hover:text-[#FFFFFF] transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#privacy" className="hover:text-[#FFFFFF] transition-colors">
              Privacy Policy
            </a>
            <a href="#cancellation" className="hover:text-[#FFFFFF] transition-colors">
              Cancellation &amp; Refund
            </a>
            <a href="#grievance" className="hover:text-[#FFFFFF] transition-colors">
              Grievance Redressal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
