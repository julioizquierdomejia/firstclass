import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Phone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      badge: "FirstClass Express",
      title: "Envíos Seguros",
      titleHighlight: "desde y hacia",
      titleSuffix: "Estados Unidos",
      description: "Servicio de mensajería internacional de primera clase para personas, empresas y negocios con la mejor tecnología y seguimiento en tiempo real.",
      primaryButton: "Regístrate Gratis",
      secondaryButton: "Contacta un asesor",
      image: "https://images.pexels.com/photos/5025639/pexels-photo-5025639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      bgGradient: "from-primary via-primary-dark to-secondary"
    },
    {
      id: 2,
      badge: "Casillero Virtual",
      title: "Tu dirección",
      titleHighlight: "personal en",
      titleSuffix: "Miami, Florida",
      description: "Obtén tu casillero virtual en Miami y accede a miles de tiendas estadounidenses. Compra productos originales al mejor precio y recíbelos en tu país.",
      primaryButton: "Crear Casillero",
      secondaryButton: "Ver beneficios",
      image: "https://images.pexels.com/photos/4246148/pexels-photo-4246148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      bgGradient: "from-secondary via-secondary-dark to-primary"
    },
    {
      id: 3,
      badge: "Empresas",
      title: "Soluciones",
      titleHighlight: "empresariales",
      titleSuffix: "especializadas",
      description: "Servicios de importación y exportación para empresas. Asesoría personalizada en trámites aduaneros y logística internacional optimizada.",
      primaryButton: "Servicios Empresariales",
      secondaryButton: "Hablar con experto",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      bgGradient: "from-gray-900 via-black to-gray-800"
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="h-screen relative overflow-hidden" style={{ margin: 0, padding: 0, position: 'relative', top: 0 }}>
      {/* Background with gradient and image */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.bgGradient} transition-all duration-1000 ease-in-out`}>
        <div className="absolute inset-0 opacity-20">
          <img
            src={currentSlideData.image}
            alt="Background"
            className="w-full h-full object-cover transition-all duration-1000"
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 lg:p-4 rounded-full transition-all duration-300 group hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 lg:p-4 rounded-full transition-all duration-300 group hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center mb-6">
                <span 
                  key={`badge-${currentSlide}`}
                  className="bg-primary text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-base font-medium shadow-lg backdrop-blur-sm animate-hero-badge"
                >
                  {currentSlideData.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                <span 
                  key={`title1-${currentSlide}`}
                  className="block animate-hero-title-line-1"
                >
                  {currentSlideData.title}
                </span>
                <span 
                  key={`title2-${currentSlide}`}
                  className="block text-primary-light animate-hero-title-line-2"
                >
                  {currentSlideData.titleHighlight}
                </span>
                <span 
                  key={`title3-${currentSlide}`}
                  className="block animate-hero-title-line-3"
                >
                  {currentSlideData.titleSuffix}
                </span>
              </h1>

              {/* Description */}
              <p 
                key={`desc-${currentSlide}`}
                className="text-xl lg:text-2xl text-white/90 mb-8 lg:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-hero-description"
              >
                {currentSlideData.description}
              </p>

              {/* Buttons */}
              <div 
                key={`buttons-${currentSlide}`}
                className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start animate-hero-buttons"
              >
                <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-lg lg:text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center shadow-xl group">
                  {currentSlideData.primaryButton}
                  <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-lg lg:text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center group">
                  <MessageCircle className="mr-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform duration-200" />
                  {currentSlideData.secondaryButton}
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="flex justify-center lg:justify-end">
              <div 
                key={`visual-${currentSlide}`}
                className="relative max-w-lg w-full animate-hero-visual"
              >
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 border border-white/20">
                  <div className="aspect-square bg-white/20 rounded-2xl overflow-hidden">
                    <img
                      src={currentSlideData.image}
                      alt="Hero visual"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  
                  {/* Floating info card */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-hero-info-card">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-900 font-semibold text-sm">Envío en proceso</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 flex flex-col space-y-2 animate-hero-dots">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-3 h-3 bg-white/40 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    ></div>
                  ))}
                </div>
                
                {/* Additional decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary rounded-full animate-bounce animate-hero-accent-1"></div>
                <div className="absolute top-1/4 -left-6 w-4 h-4 bg-secondary rounded-full animate-pulse animate-hero-accent-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;