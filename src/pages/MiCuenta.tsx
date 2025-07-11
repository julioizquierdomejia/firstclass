import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import MultitrackLoginForm from '../components/MultitrackLoginForm';
import { storage } from '../utils/apiClient';
import { isAuthenticated, getUser, logout as multitrackLogout } from '../utils/multitrackApi';
import { 
  User, 
  Settings, 
  Package, 
  CreditCard, 
  Bell, 
  Shield, 
  LogOut,
  Edit,
  Eye,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  Star,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Coffee,
  Target,
  Zap
} from 'lucide-react';

const MiCuenta = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [userProfile, setUserProfile] = useState({
    name: 'Usuario Demo',
    email: 'demo@firstclass.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123 #45-67, Bogotá, Colombia',
    memberSince: '2023-01-15',
    totalShipments: 24,
    totalSaved: 1250
  });
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    // Check both old system and new Multitrack system
    const oldToken = storage.getToken();
    const oldUser = storage.getUser();
    const multitrackAuth = isAuthenticated();
    const multitrackUser = getUser();
    
    if ((oldToken && oldUser) || (multitrackAuth && multitrackUser)) {
      setIsLoggedIn(true);
      
      // Prefer Multitrack user data if available
      const userData = multitrackUser || oldUser;
      if (userData) {
        setUserProfile(prev => ({
          ...prev,
          name: userData.name || prev.name,
          email: userData.email || prev.email,
          // Add any other user data from the API
        }));
      }
      setActiveTab('dashboard');
    }
  }, []);

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

  const handleLoginSuccess = (data: any) => {
    console.log('✅ Login exitoso:', data);
    
    // Update user profile with data from Multitrack API
    if (data.user) {
      setUserProfile(prev => ({
        ...prev,
        name: data.user.name || prev.name,
        email: data.user.email || prev.email,
        // Add any other fields that come from the API
      }));
    }
    
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLoginError = (error: string) => {
    console.error('❌ Error en login:', error);
    // Aquí puedes manejar errores específicos de la API
    // Por ejemplo, mostrar mensajes específicos según el tipo de error
  };

  const handleLogout = () => {
    // Clear stored authentication data
    storage.clear();
    multitrackLogout(); // Also clear Multitrack auth
    setIsLoggedIn(false);
    setActiveTab('login');
    
    // Reset user profile to defaults
    setUserProfile({
      name: 'Usuario Demo',
      email: 'demo@firstclass.com',
      phone: '+57 300 123 4567',
      address: 'Calle 123 #45-67, Bogotá, Colombia',
      memberSince: '2023-01-15',
      totalShipments: 24,
      totalSaved: 1250
    });
  };

  const tabs = [
    { id: 'login', label: 'Login Multitrack', icon: User, show: !isLoggedIn },
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, show: isLoggedIn },
    { id: 'profile', label: 'Mi Perfil', icon: User, show: isLoggedIn },
    { id: 'shipments', label: 'Mis Envíos', icon: Package, show: isLoggedIn },
    { id: 'billing', label: 'Facturación', icon: CreditCard, show: isLoggedIn },
    { id: 'settings', label: 'Configuración', icon: Settings, show: isLoggedIn }
  ].filter(tab => tab.show);

  const recentShipments = [
    {
      id: 'FC-2024-001',
      status: 'En tránsito',
      origin: 'Miami, FL',
      destination: 'Bogotá, Colombia',
      date: '2024-01-15',
      value: '$125.50',
      statusColor: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'FC-2024-002',
      status: 'Entregado',
      origin: 'Miami, FL',
      destination: 'Medellín, Colombia',
      date: '2024-01-10',
      value: '$89.30',
      statusColor: 'text-green-600 bg-green-50'
    },
    {
      id: 'FC-2024-003',
      status: 'En aduana',
      origin: 'Miami, FL',
      destination: 'Cali, Colombia',
      date: '2024-01-08',
      value: '$156.75',
      statusColor: 'text-yellow-600 bg-yellow-50'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'login':
        return (
          <div className="max-w-2xl mx-auto">
            <MultitrackLoginForm 
              onLoginSuccess={handleLoginSuccess}
              onLoginError={handleLoginError}
            />
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">¡Bienvenido, {userProfile.name}!</h2>
                  <p className="text-white/90 text-lg">
                    Conectado a Multitrack API
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-white/80">
                    <span>🔐 Sesión Multitrack activa</span>
                    <span>•</span>
                    <span>📧 {userProfile.email}</span>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">Activo</span>
                </div>
                <h3 className="font-semibold text-gray-900">Estado API</h3>
                <p className="text-gray-600 text-sm">Multitrack conectado</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">JWT</span>
                </div>
                <h3 className="font-semibold text-gray-900">Token</h3>
                <p className="text-gray-600 text-sm">Autenticación válida</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">API</span>
                </div>
                <h3 className="font-semibold text-gray-900">Acceso</h3>
                <p className="text-gray-600 text-sm">Multitrack Premium</p>
              </div>
            </div>

            {/* API Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Información de la API</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 'api-url',
                    title: 'Base URL',
                    description: 'https://developers.multitrack.trackingpremium.us',
                    status: 'Conectado'
                  },
                  {
                    id: 'auth-method',
                    title: 'Autenticación',
                    description: 'JWT Token Bearer',
                    status: 'Válido'
                  },
                  {
                    id: 'endpoints',
                    title: 'Endpoints',
                    description: 'Customer Search, Tracking, etc.',
                    status: 'Disponible'
                  }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-50">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información Personal</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Nombre completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={userProfile.name}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-0"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={userProfile.email}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-0"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={userProfile.phone}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-0"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Dirección</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                      value={userProfile.address}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary focus:ring-0 resize-none"
                      rows={3}
                      disabled
                    />
                  </div>
                </div>

                <button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center">
                  <Edit className="w-5 h-5 mr-2" />
                  Editar Perfil (Próximamente)
                </button>
              </div>
            </div>
          </div>
        );

      case 'shipments':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Historial de Envíos</h3>
              
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div key={shipment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{shipment.id}</h4>
                        <p className="text-gray-600">{shipment.origin} → {shipment.destination}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${shipment.statusColor}`}>
                        {shipment.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Fecha de envío</p>
                        <p className="font-medium">{new Date(shipment.date).toLocaleDateString('es-ES')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valor</p>
                        <p className="font-medium">{shipment.value}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </button>
                        <button className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center">
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Facturación</h3>
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Funcionalidad en desarrollo</h4>
                <p className="text-gray-600">
                  La sección de facturación estará disponible pronto. Mientras tanto, puedes gestionar tus envíos desde el dashboard.
                </p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Configuración de Cuenta</h3>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Funcionalidad en desarrollo</h4>
                <p className="text-gray-600">
                  Las opciones de configuración avanzada estarán disponibles pronto.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center mx-auto"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs className="text-white/80" />
          </div>

          <div className="text-center">
            <div 
              className={`inline-flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white font-medium mb-8 border border-white/20 transition-all duration-1000 ${isVisible['hero-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-badge"
            >
              <User className="mr-3 h-6 w-6" />
              Mi Cuenta FirstClass
              <Coffee className="ml-3 h-6 w-6" />
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-title"
            >
              <span className="block">Gestiona tu</span>
              <span className="block text-6xl lg:text-8xl bg-gradient-to-r from-primary via-secondary to-yellow-400 bg-clip-text text-transparent">
                Experiencia
              </span>
              <span className="block">de Envíos</span>
            </h1>

            <p 
              className={`text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible['hero-desc'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-desc"
            >
              {isLoggedIn 
                ? `Bienvenido de vuelta, ${userProfile.name}. Gestiona tus envíos, perfil y configuraciones desde un solo lugar.`
                : 'Accede a tu cuenta para gestionar envíos, rastrear paquetes y configurar tu perfil personal.'}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-16 lg:top-20 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderTabContent()}
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div 
              className={`transition-all duration-1000 ${isVisible['cta-final'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="cta-final"
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                ¿Aún no tienes cuenta?
              </h2>
              <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Regístrate gratis y comienza a disfrutar de todos los beneficios de FirstClass Courier
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link
                  to="/casillero-virtual"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-16 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl flex items-center justify-center group"
                >
                  <Target className="mr-4 h-7 w-7" />
                  Crear cuenta gratis
                  <Zap className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: "✅", text: "Casillero virtual gratis" },
                  { icon: "✅", text: "Seguimiento en tiempo real" },
                  { icon: "✅", text: "API Multitrack completa" },
                  { icon: "✅", text: "Tracking en tiempo real" },
                  { icon: "✅", text: "Autenticación JWT segura" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center space-x-3 text-white/90 text-lg">
                    <span className="text-2xl">{benefit.icon}</span>
                    <span className="font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MiCuenta;