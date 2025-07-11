import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Start transition
    setIsTransitioning(true);
    
    // Update children after transition starts
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div className="relative min-h-screen" style={{ margin: 0, padding: 0 }}>
      {/* Subtle Transition Overlay */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
          isTransitioning 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/5 to-secondary/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
        
        {/* Center Content */}
        <div className="flex items-center justify-center h-full relative z-10">
          <div className="text-center transform transition-all duration-500 ease-out">
            {/* Elegant Loading Spinner */}
            <div className="relative mb-8">
              <div className="w-16 h-16 border-2 border-primary/30 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-primary rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute inset-2 w-12 h-12 border-2 border-transparent border-t-secondary rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
            
            {/* Minimalist Logo */}
            <div className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-primary/20 transform hover:scale-105 transition-transform duration-300">
              <div className="text-primary font-bold text-xl tracking-wide">
                FirstClass
              </div>
              <div className="text-secondary text-xs font-light tracking-widest">
                c o u r i e r
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 scale-95 blur-sm' 
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;