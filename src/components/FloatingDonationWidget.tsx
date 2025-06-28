import React, { useState } from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingDonationWidget = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDonationClick = () => {
    navigate('/donation');
  };

  return (
    <>
      {/* Floating Donation Widget */}
      <div className="fixed right-6 bottom-6 z-40 floating-donation-widget">
        {/* Main Donation Button Container - Make entire area clickable */}
        <div
          className={`relative transition-all duration-300 cursor-pointer ${
            isExpanded ? 'transform scale-110' : ''
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={handleDonationClick}
        >
          {/* Sparkles Animation */}
          {isExpanded && (
            <div className="absolute inset-0 pointer-events-none donation-sparkles">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${1 + Math.random() * 1}s`
                  }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-400 sparkle" />
                </div>
              ))}
            </div>
          )}

          {/* Main Button */}
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-3xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 donation-pulse">
            <Heart className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Tooltip */}
          {isExpanded && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-fade-in-left donation-tooltip">
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4" />
                <span>Make a Donation</span>
              </div>
              {/* Arrow */}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          )}

          {/* Ripple Effect - Remove pointer events to prevent interference */}
          <div className="absolute inset-0 rounded-full animate-ping bg-orange-400 opacity-20 pointer-events-none"></div>
          
          {/* Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none floating-hearts">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-heart opacity-60 heart pointer-events-none"
                style={{
                  left: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`
                }}
              >
                <Heart className="h-3 w-3 text-pink-400 fill-current" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Amount Buttons (appear on hover) */}
        {isExpanded && (
          <div className="absolute bottom-20 right-0 space-y-2 animate-slide-in-up">
            {[51, 101, 501].map((amount, index) => (
              <button
                key={amount}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click
                  handleDonationClick();
                }}
                className="block w-12 h-12 bg-white text-orange-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs font-bold hover:scale-110 border-2 border-orange-200 hover:border-orange-400 quick-amount-enter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                ₹{amount}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingDonationWidget;