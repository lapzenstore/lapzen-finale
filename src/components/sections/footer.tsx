"use client";

import React from 'react';
import { Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

/**
 * FooterSection Component
 * 
 * Clones the comprehensive footer of Lapzen with:
 * - Dark background with red grid animation/pattern
 * - Detailed contact information (Shop, WhatsApp, Email)
 * - Categorized product links with bullet indicators
 * - Account management links
 * - Corporate policy and informational links
 * - Google Maps location embed for Hafeez Centre, Lahore
 * - Social media integration
 * - Sticky floating WhatsApp contact button
 */
const FooterSection = () => {
  return (
    <footer className="relative bg-[#0c1221] text-white pt-[60px] pb-[40px] overflow-hidden font-sans">
      {/* Grid Pattern Overlay - Technical red grid defined in globals.css */}
      <div className="absolute inset-0 footer-grid-pattern opacity-[0.25] pointer-events-none" />
      
          {/* Moving Red Lines Effect - Multiple layers for "more lines" */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.2]">
            <div className="absolute inset-0 footer-moving-lines" />
            <div className="absolute inset-0 footer-moving-lines [animation-delay:1s]" />
            <div className="absolute inset-0 footer-moving-lines [animation-delay:2s]" />
            <div className="absolute inset-0 footer-moving-lines-h" />
            <div className="absolute inset-0 footer-moving-lines-h [animation-delay:1.5s]" />
            <div className="absolute inset-0 footer-moving-lines-h [animation-delay:3s]" />
            <div className="absolute inset-0 footer-moving-lines-h [animation-delay:4.5s]" />
          </div>


      
      {/* Main Footer Content */}
      <div className="container relative z-10 mx-auto px-5 md:px-[20px] max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-[30px] gap-y-[40px] mb-[48px]">
          
          {/* Column 1: Contact Us */}
          <div className="flex flex-col">
            <h2 className="footer-heading text-white !w-[118px] !h-[62px]">Contact Us</h2>
            <div className="space-y-[15px]">
              <div className="text-[14px] leading-[1.6]">
                <p className="font-bold text-white mb-1">Our Shop</p>
                <p className="opacity-80">Hafeez Centre, Lahore</p>
              </div>
              <div>
                <a
                  href="https://wa.me/923090009022"
                  className="flex items-center gap-[10px] text-[14px] opacity-80 hover:opacity-100 transition-opacity duration-300">

                  <Phone size={14} className="flex-shrink-0" />
                  <span>+92 309 0009022</span>
                </a>
              </div>
              <div>
                <a
                  href="mailto:lapzen.store@gmail.com"
                  className="flex items-center gap-[10px] text-[14px] opacity-80 hover:opacity-100 transition-opacity duration-300">

                  <Mail size={14} className="flex-shrink-0" />
                  <span>lapzen.store@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col">
            <h2 className="footer-heading text-white !w-[101.1%] !h-[35px]">Products</h2>
            <ul className="list-none p-0 m-0">
              {['Acer', 'Apple', 'Dell', 'HP', 'Lenovo', 'Toshiba'].map((product) =>
              <li key={product}>
                  <a
                  href={`https://lapzen.store/brands/${product.toLowerCase()}`}
                  className="footer-link flex items-center gap-2">

                    <span className="text-[8px] leading-none">•</span>
                    {product}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Account */}
          <div className="flex flex-col">
            <h2 className="footer-heading text-white">Account</h2>
            <ul className="list-none p-0 m-0">
                {[
                { label: 'Sign Up', href: '/signup' },
                { label: 'My Account', href: '/login' },
                { label: 'Shopping Cart', href: '/cart' },
                { label: 'Order History', href: '/login' }].
                map((link) =>
              <li key={link.label}>
                  <a
                  href={link.href}
                  className="footer-link flex items-center gap-2">

                    <span className="text-[8px] leading-none">•</span>
                    {link.label}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Corporate */}
          <div className="flex flex-col">
            <h2 className="footer-heading !w-[268px] !h-[45px] text-white">Corporate</h2>
            <ul className="list-none p-0 m-0">
                {[
              { label: 'About Us', href: '/about' },
              { label: 'Warranty & Returns', href: '/warranty' },
              { label: 'Shipping Policy', href: '/warranty' },
              { label: 'FAQs', href: '/faqs' }].
              map((link) =>
              <li key={link.label}>
                  <a
                  href={link.href}
                  className="footer-link flex items-center gap-2">

                    <span className="text-[8px] leading-none">•</span>
                    {link.label}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 5: Our Location */}
          <div className="flex flex-col lg:col-span-1">
            <h2 className="footer-heading text-white">Our Location</h2>
            <div className="w-full h-[140px] border border-white/10 overflow-hidden shadow-inner bg-[#000]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.319431366537!2d74.3405693746962!3d31.51538554738996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904591c5de257%3A0xe0409258a61a2dd4!2sHafeez%20Center!5e0!3m2!1sen!2s!4v1756732465975!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps: Lapzen Location">
              </iframe>
            </div>
          </div>

            {/* Column 6: Follow Us */}
            <div className="flex flex-col">
              <h2 className="footer-heading text-white">Follow Us</h2>
                <div className="flex items-center gap-[15px]">
                  <a
                    href="https://web.facebook.com/lap.lapzen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-gradient-to-tr hover:from-[#002b5c] hover:to-[#ff0000] hover:shadow-[0_0_15px_rgba(0,43,92,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                    aria-label="Facebook">

                    <Facebook size={18} fill="currentColor" strokeWidth={0} />
                  </a>
                  <a
                    href="https://www.instagram.com/lapzenstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-gradient-to-tr hover:from-[#002b5c] hover:to-[#ff0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                    aria-label="Instagram">

                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://x.com/lapzenstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-gradient-to-tr hover:from-[#002b5c] hover:to-[#ff0000] hover:shadow-[0_0_15px_rgba(0,43,92,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
                    aria-label="Twitter">

                    <Twitter size={18} fill="currentColor" strokeWidth={0} />
                  </a>
                </div>

            </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-[30px] border-t border-white/10 flex justify-between items-center text-[12px] opacity-60">
          <p className="font-medium tracking-tight">© Lapzen | All Rights Reserved.</p>
        </div>
      </div>

      {/* WhatsApp Sticky Floating Icon */}
      <a
        href="https://wa.me/923090009022"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[24px] right-[24px] z-[50] bg-[#25D366] text-white p-[12px] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp">

        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          className="drop-shadow-sm group-hover:drop-shadow-md">

          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>);

};

export default FooterSection;