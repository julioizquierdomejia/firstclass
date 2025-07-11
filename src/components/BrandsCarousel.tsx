import React, { useState, useEffect } from 'react';

const BrandsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const brands = [
    {
      name: "Golden Goose",
      logo: "https://logos-world.net/wp-content/uploads/2023/01/Golden-Goose-Logo.png",
      category: "Fashion",
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "Versace",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Versace-Logo.png",
      category: "Luxury",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "New Balance",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png",
      category: "Sports",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Shein",
      logo: "https://logos-world.net/wp-content/uploads/2022/04/Shein-Logo.png",
      category: "Fashion",
      color: "from-pink-500 to-red-500"
    },
    {
      name: "Jomashop",
      logo: "https://cdn.worldvectorlogo.com/logos/jomashop.svg",
      category: "Watches",
      color: "from-gray-700 to-gray-900"
    },
    {
      name: "Karl Lagerfeld",
      logo: "https://logos-world.net/wp-content/uploads/2022/01/Karl-Lagerfeld-Logo.png",
      category: "Fashion",
      color: "from-black to-gray-800"
    },
    {
      name: "Mango",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Mango-Logo.png",
      category: "Fashion",
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Foot Locker",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Foot-Locker-Logo.png",
      category: "Sports",
      color: "from-red-600 to-black"
    },
    {
      name: "Reebok",
      logo: "https://logos-world.net/wp-content/uploads/2020/06/Reebok-Logo.png",
      category: "Sports",
      color: "from-red-500 to-blue-600"
    },
    {
      name: "Sunglass Hut",
      logo: "https://logos-world.net/wp-content/uploads/2022/12/Sunglass-Hut-Logo.png",
      category: "Accessories",
      color: "from-yellow-500 to-orange-600"
    },
    {
      name: "Apple",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png",
      category: "Technology",
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Armani",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Armani-Logo.png",
      category: "Luxury",
      color: "from-black to-gray-700"
    }
  ];

  // Duplicate brands for seamless infinite scroll
  const extendedBrands = [...brands, ...brands, ...brands];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % brands.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, brands.length]);

  // Calculate visible brands (show 6 on desktop, 3 on tablet, 2 on mobile)
  const getVisibleBrands = () => {
    const startIndex = currentIndex;
    const visibleCount = 6;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % brands.length;
      result.push(brands[index]);
    }
    
    return result;
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % brands.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + brands.length) % brands.length);
  };

  return (
    <div className="relative">
      {/* Main Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Brands Grid */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {getVisibleBrands().map((brand, index) => (
              <div
                key={`${brand.name}-${currentIndex}-${index}`}
                className="group relative"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInScale 0.6s ease-out forwards'
                }}
              >
                {/* Brand Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 hover:border-primary/20 group cursor-pointer relative overflow-hidden">
                  
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Brand Logo Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-white transition-colors duration-300 overflow-hidden">
                      {/* Fallback to text logo if image fails */}
                      <div className="w-12 h-12 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-700 group-hover:text-primary transition-colors duration-300">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Brand Name */}
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 text-center leading-tight">
                      {brand.name}
                    </h3>
                    
                    {/* Category Badge */}
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300 mt-1">
                      {brand.category}
                    </span>
                  </div>

                  {/* Hover Effect Dots */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Floating Animation Elements */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 hover:border-primary/20"
          aria-label="Previous brands"
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-200 hover:border-primary/20"
          aria-label="Next brands"
        >
          <svg className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Infinite Scroll Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {brands.slice(0, 6).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 1) % 6 === index 
                ? 'bg-primary scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to brand group ${index + 1}`}
          />
        ))}
      </div>

      {/* Popular Brands Highlight */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl px-8 py-4 border border-primary/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Más populares:</span>
          </div>
          <div className="flex items-center space-x-4 text-sm font-semibold">
            <span className="text-primary">Amazon</span>
            <span className="text-gray-300">•</span>
            <span className="text-secondary">Apple</span>
            <span className="text-gray-300">•</span>
            <span className="text-primary">Nike</span>
            <span className="text-gray-300">•</span>
            <span className="text-secondary">Walmart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add the fadeInScale animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;
document.head.appendChild(style);

export default BrandsCarousel;