import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ExternalLink, 
  ArrowLeft,
  ChevronDown,
  Package,
  Smartphone,
  Shirt,
  Watch,
  Home,
  Gamepad2,
  Baby,
  Car,
  Heart,
  Book,
  Music,
  Camera,
  Dumbbell,
  Palette,
  Gift,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Award,
  Crown,
  Zap
} from 'lucide-react';

const TiendasDisponibles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isVisible, setIsVisible] = useState({});
  const [filteredStores, setFilteredStores] = useState([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'Todas las tiendas', icon: ShoppingBag, color: 'from-primary to-secondary', count: 0 },
    { id: 'fashion', name: 'Moda & Accesorios', icon: Shirt, color: 'from-pink-500 to-rose-500', count: 0 },
    { id: 'technology', name: 'Tecnología', icon: Smartphone, color: 'from-blue-500 to-cyan-500', count: 0 },
    { id: 'sports', name: 'Deportes & Fitness', icon: Dumbbell, color: 'from-green-500 to-emerald-500', count: 0 },
    { id: 'luxury', name: 'Lujo & Premium', icon: Crown, color: 'from-purple-500 to-violet-500', count: 0 },
    { id: 'watches', name: 'Relojes & Joyería', icon: Watch, color: 'from-yellow-500 to-orange-500', count: 0 },
    { id: 'home', name: 'Hogar & Jardín', icon: Home, color: 'from-teal-500 to-cyan-500', count: 0 },
    { id: 'beauty', name: 'Belleza & Cuidado', icon: Heart, color: 'from-red-500 to-pink-500', count: 0 },
    { id: 'books', name: 'Libros & Educación', icon: Book, color: 'from-indigo-500 to-blue-500', count: 0 }
  ];

  const stores = [
    // Fashion & Accessories
    {
      id: 1,
      name: "Golden Goose",
      category: "fashion",
      description: "Zapatillas de lujo italianas con diseño vintage y artesanal",
      logo: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.8,
      isPopular: true,
      isPremium: true,
      specialOffer: "Envío gratis en compras +$300",
      tags: ["Lujo", "Zapatillas", "Italiano"]
    },
    {
      id: 2,
      name: "Versace",
      category: "luxury",
      description: "Casa de moda italiana de alta costura y accesorios de lujo",
      logo: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.9,
      isPopular: true,
      isPremium: true,
      specialOffer: "Colección exclusiva disponible",
      tags: ["Alta Costura", "Lujo", "Italiano"]
    },
    {
      id: 3,
      name: "New Balance",
      category: "sports",
      description: "Calzado deportivo y ropa atlética de alta calidad",
      logo: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.7,
      isPopular: true,
      specialOffer: "20% descuento en running",
      tags: ["Deportes", "Running", "Calidad"]
    },
    {
      id: 4,
      name: "Shein",
      category: "fashion",
      description: "Moda rápida y tendencias actuales a precios accesibles",
      logo: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.3,
      isPopular: true,
      specialOffer: "Hasta 70% descuento",
      tags: ["Tendencias", "Accesible", "Variedad"]
    },
    {
      id: 5,
      name: "Jomashop",
      category: "watches",
      description: "Relojes de lujo y joyería con garantía oficial",
      logo: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.6,
      isPremium: true,
      specialOffer: "Garantía internacional incluida",
      tags: ["Relojes", "Joyería", "Garantía"]
    },
    {
      id: 6,
      name: "Karl Lagerfeld",
      category: "luxury",
      description: "Diseños icónicos de moda y accesorios de lujo",
      logo: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.8,
      isPremium: true,
      specialOffer: "Edición limitada disponible",
      tags: ["Diseñador", "Icónico", "Lujo"]
    },
    {
      id: 7,
      name: "Mango",
      category: "fashion",
      description: "Moda contemporánea europea para hombre y mujer",
      logo: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.5,
      isPopular: true,
      specialOffer: "Nueva colección primavera",
      tags: ["Europeo", "Contemporáneo", "Elegante"]
    },
    {
      id: 8,
      name: "Foot Locker",
      category: "sports",
      description: "La mayor selección de zapatillas deportivas y streetwear",
      logo: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.6,
      isPopular: true,
      specialOffer: "Lanzamientos exclusivos",
      tags: ["Zapatillas", "Streetwear", "Exclusivos"]
    },
    {
      id: 9,
      name: "Reebok",
      category: "sports",
      description: "Equipamiento deportivo y lifestyle para todos los deportes",
      logo: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.4,
      specialOffer: "Crossfit collection disponible",
      tags: ["Fitness", "Crossfit", "Lifestyle"]
    },
    {
      id: 10,
      name: "Sunglass Hut",
      category: "fashion",
      description: "La mayor colección de gafas de sol de marcas premium",
      logo: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.7,
      specialOffer: "Protección UV garantizada",
      tags: ["Gafas", "Premium", "Protección"]
    },
    {
      id: 11,
      name: "Apple",
      category: "technology",
      description: "Tecnología innovadora: iPhone, iPad, Mac y accesorios",
      logo: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.9,
      isPopular: true,
      isPremium: true,
      specialOffer: "Últimos modelos disponibles",
      tags: ["Innovación", "Premium", "Garantía"]
    },
    {
      id: 12,
      name: "Armani",
      category: "luxury",
      description: "Elegancia italiana en moda, fragancias y accesorios",
      logo: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.8,
      isPremium: true,
      specialOffer: "Colección Giorgio Armani",
      tags: ["Elegancia", "Italiano", "Sofisticado"]
    },
    {
      id: 13,
      name: "Amazon",
      category: "technology",
      description: "Todo lo que necesitas: electrónicos, hogar, libros y más",
      logo: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.5,
      isPopular: true,
      specialOffer: "Prime shipping disponible",
      tags: ["Variedad", "Rápido", "Confiable"]
    },
    {
      id: 14,
      name: "Nike",
      category: "sports",
      description: "Just Do It - Equipamiento deportivo de élite mundial",
      logo: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.8,
      isPopular: true,
      specialOffer: "Air Jordan collection",
      tags: ["Élite", "Innovación", "Icónico"]
    },
    {
      id: 15,
      name: "Walmart",
      category: "home",
      description: "Productos para el hogar, electrónicos y más a precios bajos",
      logo: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.2,
      isPopular: true,
      specialOffer: "Precios bajos todos los días",
      tags: ["Económico", "Variedad", "Hogar"]
    },
    {
      id: 16,
      name: "Sephora",
      category: "beauty",
      description: "Cosméticos y productos de belleza de marcas premium",
      logo: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.7,
      isPopular: true,
      specialOffer: "Beauty insider rewards",
      tags: ["Belleza", "Premium", "Variedad"]
    }
    ,
    {
      id: 17,
      name: "Adidas",
      category: "sports",
      description: "Impossible is Nothing - Ropa y calzado deportivo innovador",
      logo: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.7,
      isPopular: true,
      specialOffer: "Boost technology disponible",
      tags: ["Deportes", "Innovación", "Calidad"]
    },
    {
      id: 18,
      name: "Zara",
      category: "fashion",
      description: "Moda española contemporánea para toda la familia",
      logo: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.4,
      isPopular: true,
      specialOffer: "Nueva temporada disponible",
      tags: ["Moda", "Contemporáneo", "Español"]
    },
    {
      id: 19,
      name: "Samsung",
      category: "technology",
      description: "Tecnología Galaxy: smartphones, tablets y wearables",
      logo: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.6,
      isPopular: true,
      specialOffer: "Galaxy S24 disponible",
      tags: ["Smartphones", "Innovación", "Galaxy"]
    },
    {
      id: 20,
      name: "Coach",
      category: "luxury",
      description: "Bolsos y accesorios de cuero de lujo americano",
      logo: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.8,
      isPremium: true,
      specialOffer: "Colección Heritage disponible",
      tags: ["Lujo", "Cuero", "Americano"]
    },
    {
      id: 21,
      name: "Rolex",
      category: "watches",
      description: "Relojes suizos de lujo y precisión excepcional",
      logo: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.9,
      isPremium: true,
      specialOffer: "Modelos exclusivos disponibles",
      tags: ["Lujo", "Suizo", "Precisión"]
    },
    {
      id: 22,
      name: "IKEA",
      category: "home",
      description: "Muebles y decoración escandinava para el hogar",
      logo: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.3,
      isPopular: true,
      specialOffer: "Nuevas colecciones disponibles",
      tags: ["Muebles", "Escandinavo", "Diseño"]
    },
    {
      id: 23,
      name: "MAC Cosmetics",
      category: "beauty",
      description: "Maquillaje profesional y productos de belleza premium",
      logo: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.6,
      specialOffer: "Colección limitada disponible",
      tags: ["Maquillaje", "Profesional", "Premium"]
    },
    {
      id: 24,
      name: "Barnes & Noble",
      category: "books",
      description: "La mayor librería de Estados Unidos con millones de títulos",
      logo: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.5,
      specialOffer: "Envío gratis en libros",
      tags: ["Libros", "Educación", "Cultura"]
    },
    {
      id: 25,
      name: "Under Armour",
      category: "sports",
      description: "Ropa deportiva de alto rendimiento para atletas",
      logo: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.5,
      specialOffer: "HeatGear technology",
      tags: ["Deportes", "Rendimiento", "Atletas"]
    },
    {
      id: 26,
      name: "Victoria's Secret",
      category: "fashion",
      description: "Lencería, ropa interior y productos de belleza femeninos",
      logo: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.4,
      isPopular: true,
      specialOffer: "Pink collection disponible",
      tags: ["Lencería", "Femenino", "Belleza"]
    },
    {
      id: 27,
      name: "Sony",
      category: "technology",
      description: "Electrónicos de consumo: PlayStation, cámaras, audio",
      logo: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.7,
      specialOffer: "PlayStation 5 disponible",
      tags: ["Gaming", "Audio", "Cámaras"]
    },
    {
      id: 28,
      name: "Tiffany & Co.",
      category: "luxury",
      description: "Joyería de lujo y diamantes desde 1837",
      logo: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.9,
      isPremium: true,
      specialOffer: "Colección Blue Box disponible",
      tags: ["Joyería", "Diamantes", "Lujo"]
    },
    {
      id: 29,
      name: "Williams Sonoma",
      category: "home",
      description: "Artículos de cocina y hogar de alta calidad",
      logo: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.6,
      specialOffer: "Utensilios profesionales",
      tags: ["Cocina", "Hogar", "Calidad"]
    },
    {
      id: 30,
      name: "Ulta Beauty",
      category: "beauty",
      description: "La mayor selección de cosméticos y productos de belleza",
      logo: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      rating: 4.5,
      isPopular: true,
      specialOffer: "Rewards program disponible",
      tags: ["Cosméticos", "Belleza", "Variedad"]
    }
  ];

  // Update category counts
  useEffect(() => {
    // Initialize with all stores
    let filtered = stores;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(store => store.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredStores(filtered);
  }, []);

  // Filter stores based on category and search
  useEffect(() => {
    let filtered = stores;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(store => store.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredStores(filtered);
  }, [selectedCategory, searchTerm]);

  // Update category counts dynamically
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return stores.length;
    return stores.filter(store => store.category === categoryId).length;
  };

  // Enhanced category filtering with smooth transitions
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Smooth scroll to stores section
    const storesSection = document.getElementById('stores-section');
    if (storesSection) {
      storesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const StoreCard = ({ store, index }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer border border-gray-100 hover:border-primary/20 overflow-hidden animate-slide-in-bottom`}
      data-animate
      id={`store-${store.id}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Store Header */}
      <div className="relative p-6 pb-4">
        {/* Premium Badge */}
        {store.isPremium && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
            <Crown className="w-3 h-3 mr-1" />
            PREMIUM
          </div>
        )}
        
        {/* Popular Badge */}
        {store.isPopular && !store.isPremium && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
            <TrendingUp className="w-3 h-3 mr-1" />
            POPULAR
          </div>
        )}

        {/* Logo Container */}
        <div className="w-full h-48 bg-gray-50 rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
          <img
            src={store.logo}
            alt={store.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl hidden items-center justify-center">
            <span className="text-3xl font-bold text-primary">
              {store.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Store Info */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
          {store.name}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {store.description}
        </p>


        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {store.tags.slice(0, 3).map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>


        {/* Action Button */}
        <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center group/btn">
          <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
          Visitar tienda
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" style={{ margin: 0, padding: 0 }}>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden" style={{ margin: 0, padding: 0, position: 'relative', top: 0 }}>
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs className="text-white/80" />
          </div>

          {/* Breadcrumb */}
          <div 
            className={`flex items-center space-x-2 text-white/80 mb-8 transition-all duration-1000 ${isVisible['breadcrumb'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            data-animate
            id="breadcrumb"
          >
            <Link to="/casillero-virtual" className="hover:text-white transition-colors duration-200 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Casillero Virtual
            </Link>
            <span>/</span>
            <span className="text-white font-medium">Tiendas Disponibles</span>
          </div>

          <div className="text-center">
            <div 
              className={`inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-medium mb-8 transition-all duration-1000 delay-200 ${isVisible['hero-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-badge"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Directorio de Tiendas
            </div>

            <h1 
              className={`text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 delay-400 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-title"
            >
              <span className="block">Más de</span>
              <span className="block text-5xl lg:text-7xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                10,000 Tiendas
              </span>
              <span className="block">Disponibles</span>
            </h1>

            <p 
              className={`text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-600 ${isVisible['hero-desc'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-desc"
            >
              Compra en las mejores tiendas de Estados Unidos y recibe tus productos en Perú con FirstClass Courier
            </p>

            {/* Stats */}
            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${isVisible['hero-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-stats"
            >
              {[
                { number: "10,000+", label: "Tiendas disponibles", icon: ShoppingBag },
                { number: "50+", label: "Categorías diferentes", icon: Grid },
                { number: "24/7", label: "Soporte especializado", icon: Award }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      <Icon className="w-8 h-8 text-white mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-white/80">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 lg:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar tiendas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 transition-colors duration-200"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-semibold text-primary">{filteredStores.length}</span> tiendas encontradas
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`transition-all duration-1000 ${isVisible['categories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="categories"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                const count = getCategoryCount(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group ${
                      isActive 
                        ? 'bg-white shadow-lg border-2 border-primary' 
                        : 'bg-white hover:shadow-md border border-gray-200'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-sm font-semibold mb-1 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-900 group-hover:text-primary'}`}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {count} tiendas
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stores Grid */}
      <section id="stores-section" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Category Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedCategory === 'all' 
                    ? 'Todas las tiendas' 
                    : categories.find(cat => cat.id === selectedCategory)?.name
                  }
                </h2>
                <p className="text-gray-600">
                  {filteredStores.length} {filteredStores.length === 1 ? 'tienda encontrada' : 'tiendas encontradas'}
                  {searchTerm && ` para "${searchTerm}"`}
                </p>
              </div>
              
              {/* Quick Filter Buttons */}
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={() => {
                    const popularStores = filteredStores.filter(store => store.isPopular);
                    if (popularStores.length > 0) {
                      setFilteredStores(popularStores);
                    }
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Populares
                </button>
                <button
                  onClick={() => {
                    const premiumStores = filteredStores.filter(store => store.isPremium);
                    if (premiumStores.length > 0) {
                      setFilteredStores(premiumStores);
                    }
                  }}
                  className="bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center"
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </button>
                <button
                  onClick={() => {
                    // Reset filters
                    let filtered = stores;
                    if (selectedCategory !== 'all') {
                      filtered = filtered.filter(store => store.category === selectedCategory);
                    }
                    if (searchTerm) {
                      filtered = filtered.filter(store => 
                        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        store.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                      );
                    }
                    setFilteredStores(filtered);
                  }}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>

          {filteredStores.length > 0 ? (
            <>
              {/* Stores Grid */}
              <div className={`grid gap-6 transition-all duration-500 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 lg:grid-cols-2'
              }`}>
                {filteredStores.map((store, index) => (
                  <StoreCard key={`${store.id}-${selectedCategory}-${searchTerm}`} store={store} index={index} />
                ))}
              </div>
              
              {/* Load More Button (Simulated) */}
              {filteredStores.length >= 8 && (
                <div className="text-center mt-12">
                  <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center mx-auto group">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Cargar más tiendas
                    <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-200" />
                  </button>
                  <p className="text-gray-500 mt-3 text-sm">
                    Mostrando {filteredStores.length} de {stores.length} tiendas disponibles
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 relative overflow-hidden">
                <Search className="w-16 h-16 text-gray-400" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse"></div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {searchTerm ? 'No se encontraron tiendas' : 'No hay tiendas en esta categoría'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `No encontramos tiendas que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
                  : 'Esta categoría estará disponible pronto. Mientras tanto, explora nuestras otras categorías.'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver todas las tiendas
                </button>
                
                <button
                  onClick={() => {
                    setSelectedCategory('fashion');
                    const storesSection = document.getElementById('stores-section');
                    if (storesSection) {
                      storesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  <Shirt className="mr-2 h-5 w-5" />
                  Explorar moda
                </button>
              </div>
              
              {/* Suggested Categories */}
              <div className="mt-12">
                <p className="text-gray-500 mb-6">O explora estas categorías populares:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['technology', 'sports', 'luxury'].map(catId => {
                    const category = categories.find(cat => cat.id === catId);
                    if (!category) return null;
                    const Icon = category.icon;
                    return (
                      <button
                        key={catId}
                        onClick={() => handleCategoryChange(catId)}
                        className={`bg-gradient-to-br ${category.color} text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center group`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Stores Section */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tiendas destacadas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Las tiendas más populares entre nuestros usuarios
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStores.map((store, index) => (
                store.isPopular && index < 4 ? (
                  <div key={store.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border border-gray-100 hover:border-primary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-primary">{store.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center group-hover:text-primary transition-colors duration-300">
                      {store.name}
                    </h3>
                    <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2">
                      {store.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(store.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{store.rating}</span>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shopping Tips Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Consejos para comprar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Maximiza tus compras con estos consejos de nuestros expertos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💡",
                title: "Consolida tus compras",
                description: "Agrupa múltiples pedidos para ahorrar en envío y aprovechar mejor el límite de peso."
              },
              {
                icon: "🔍",
                title: "Compara precios",
                description: "Usa nuestro buscador para encontrar las mejores ofertas en diferentes tiendas."
              },
              {
                icon: "📦",
                title: "Revisa las políticas",
                description: "Cada tienda tiene diferentes políticas de devolución y garantía. Léelas antes de comprar."
              }
            ].map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div 
            className={`transition-all duration-1000 ${isVisible['cta-final'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="cta-final"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para comenzar a comprar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Abre tu casillero virtual gratis y accede a todas estas tiendas increíbles
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/casillero-virtual"
                className="bg-white hover:bg-gray-100 text-gray-900 px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl flex items-center justify-center group"
              >
                <Package className="mr-3 h-6 w-6 text-primary" />
                Abrir mi casillero
                <Zap className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <p className="text-white/80 mt-6 text-lg">
              ✅ Sin costos de apertura • ✅ Sin mensualidades • ✅ Solo pagas cuando envías
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TiendasDisponibles;