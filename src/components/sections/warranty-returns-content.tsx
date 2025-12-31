"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type TabType = 'warranty' | 'returns' | 'shipping';

interface TabConfig {
  id: TabType;
  label: string;
}

const TABS: TabConfig[] = [
  { id: 'warranty', label: 'Warranty' },
  { id: 'returns', label: 'Returns' },
  { id: 'shipping', label: 'Shipping' },
];

const WarrantyReturnsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('warranty');

  const renderContent = () => {
    switch (activeTab) {
      case 'warranty':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-[24px] font-semibold text-white mb-4">Product Warranty</h3>
            <p className="text-[15px] leading-[1.6] text-white mb-6">
              All our products come with a comprehensive warranty to ensure your peace of mind.
            </p>
            
            <h4 className="text-[18px] font-medium text-white mb-3">Coverage Period</h4>
            <ul className="list-disc pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">Standard warranty: 1 year from date of purchase</li>
              <li className="text-[15px]">Extended warranty available for purchase</li>
              <li className="text-[15px]">Covers manufacturing defects and workmanship issues</li>
            </ul>

            <h4 className="text-[18px] font-medium text-white mb-3">What's Covered</h4>
            <ul className="list-disc pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">Manufacturing defects</li>
              <li className="text-[15px]">Material defects</li>
              <li className="text-[15px]">Workmanship issues</li>
            </ul>

            <h4 className="text-[18px] font-medium text-white mb-3">What's Not Covered</h4>
            <ul className="list-disc pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">Normal wear and tear</li>
              <li className="text-[15px]">Accidental damage</li>
              <li className="text-[15px]">Misuse or abuse</li>
              <li className="text-[15px]">Unauthorized repairs</li>
            </ul>

            <p className="text-[15px] leading-[1.6] text-white">
              <strong className="font-bold">To claim your warranty:</strong> Contact our customer service team with your order number and proof of purchase.
            </p>
          </div>
        );
      case 'returns':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-[24px] font-semibold text-white mb-4">Return Policy</h3>
            <p className="text-[15px] leading-[1.6] text-white mb-6">
              We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
            </p>

            <h4 className="text-[18px] font-medium text-white mb-3">Return Window</h4>
            <ul className="list-disc pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">30-day return period from delivery date</li>
              <li className="text-[15px]">Items must be unused and in original packaging</li>
              <li className="text-[15px]">All tags and labels must be attached</li>
            </ul>

            <h4 className="text-[18px] font-medium text-white mb-3">Return Process</h4>
            <ol className="list-decimal pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">Contact our customer service team</li>
              <li className="text-[15px]">Receive your return authorization number</li>
              <li className="text-[15px]">Pack the item securely with all original materials</li>
              <li className="text-[15px]">Ship the item back using our prepaid label</li>
            </ol>

            <h4 className="text-[18px] font-medium text-white mb-3">Refund Timeline</h4>
            <p className="text-[15px] leading-[1.6] text-white mb-6">
              Refunds are processed within 2-3 business days after we receive your return. The refund will be issued to your original payment method.
            </p>

            <p className="text-[15px] leading-[1.6] text-white">
              <strong className="font-bold">Note:</strong> Return shipping is free for defective items. Customer is responsible for return shipping costs for non-defective returns.
            </p>
          </div>
        );
      case 'shipping':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-[24px] font-semibold text-white mb-4">Shipping Information</h3>
            <p className="text-[15px] leading-[1.6] text-white mb-6">
              We offer fast and reliable shipping to ensure your order arrives safely and on time.
            </p>

            <h4 className="text-[18px] font-medium text-white mb-3">Shipping Options</h4>
            <ul className="list-disc pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">Standard Shipping: 5-7 business days</li>
              <li className="text-[15px]">Express Shipping: 2-3 business days</li>
              <li className="text-[15px]">Overnight Shipping: 1 business day</li>
            </ul>

            <h4 className="text-[18px] font-medium text-white mb-3">Shipping Costs</h4>
            <ul className="list-disc pl-5 mb-6 text-white space-y-2">
              <li className="text-[15px]">Free standard shipping on orders over Rs. 10,000</li>
              <li className="text-[15px]">Flat rate shipping available for all orders</li>
              <li className="text-[15px]">Express and overnight rates calculated at checkout</li>
            </ul>

            <h4 className="text-[18px] font-medium text-white mb-3">International Shipping</h4>
            <p className="text-[15px] leading-[1.6] text-white mb-6">
              We ship to select international destinations. Delivery times and costs vary by location. Customs fees and import duties are the responsibility of the customer.
            </p>

            <h4 className="text-[18px] font-medium text-white mb-3">Order Tracking</h4>
            <p className="text-[15px] leading-[1.6] text-white">
              You'll receive a tracking number via email once your order ships. Track your package anytime through our website or the carrier's tracking portal.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-[#000c1d] py-20 px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] font-semibold text-white mb-2">Warranty & Returns</h1>
          <div className="text-[16px] text-[#b0b0b0]">Everything you need to know about our policies</div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-1 mb-0 relative z-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-8 py-4 text-[16px] font-medium rounded-t-[12px] transition-all duration-200 animate-hover-lift cursor-pointer",
                activeTab === tab.id
                  ? "bg-[#001224] text-white border-x border-t border-white/10"
                  : "bg-[#031023] text-[#b0b0b0] hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="content-panel min-h-[400px]">
          <div className="max-w-none">
            {renderContent()}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .content-panel {
          background-color: #001224;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 40px;
          position: relative;
        }

        .animate-hover-lift:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .content-panel {
            padding: 24px;
          }
          
          .flex-wrap {
            gap: 4px;
          }
          
          button {
            flex: 1 1 auto;
            min-width: 100px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default WarrantyReturnsContent;
