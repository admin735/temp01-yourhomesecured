import React from 'react';

export const MovingBanner: React.FC = () => {
  const bannerItems = [
    "🏠 $384/year average insurance savings with monitored systems",
    "🛡️ 97% of smart security device owners report satisfaction",
    "📊 Homes without security are 300% more likely to be targeted",
    "🚨 Break-in occurs every 26 seconds in the U.S.",
    "💰 Professional monitoring averages $32/month - theft costs $5,000+",
    "🏘️ Over 60% feel as safe with DIY vs professional monitoring",
    "⚡ Over half of US consumers will use smart home tech by 2025",
    "🔒 Only 30% of U.S. homes currently have security systems"
  ];

  return (
    <div className="bg-blue-50 py-4 overflow-hidden whitespace-nowrap border-y border-blue-100">
      <div className="animate-scroll inline-block">
        {[...bannerItems, ...bannerItems].map((item, index) => (
          <span
            key={index}
            className="inline-block mx-8 text-blue-800 font-medium text-lg"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};