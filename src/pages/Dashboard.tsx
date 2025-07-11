import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  TrendingUp, 
  Award, 
  LogOut, 
  Settings,
  Bell,
  Search,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  Coffee,
  Target,
  Zap
} from 'lucide-react';
import { getUser, getToken, logout, isAuthenticated } from '../utils/multitrackApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación al cargar el componente
    if (!isAuthenticated()) {
      navigate('/mi-cuenta');
      return;
    }

    // Obtener datos del usuario
    const userData = getUser();
    const token = getToken();
    
    console.log('👤 Usuario logueado:', userData);
    console.log('🔑 Token:', token);
    
    setUser(userData);
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/mi-cuenta');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error de Sesión</h2>
          <p className="text-gray-600 mb-6">No se pudo cargar la información del usuario.</p>
          <button
            onClick={() => navigate('/mi-cuenta')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            Volver al Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Multitrack</h1>
                <p className="text-sm text-gray-500">Panel de control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                ¡Bienvenido de vuelta, {user.name || user.email}! 🎉
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Tu sesión está activa y conectada a Multitrack API
              </p>
              <div className="flex items-center space-x-6 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sesión activa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Conectado ahora</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-white/80 text-sm">ID: {user.id || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Envíos Totales",
              value: "24",
              change: "+12%",
              icon: Package,
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "En Tránsito",
              value: "3",
              change: "+2",
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "Entregados",
              value: "21",
              change: "+5",
              icon: CheckCircle,
              color: "from-purple-500 to-violet-500"
            },
            {
              title: "Rating",
              value: "4.9",
              change: "⭐",
              icon: Star,
              color: "from-yellow-500 to-orange-500"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Connection Status */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Estado de Conexión API</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Multitrack API</p>
                    <p className="text-sm text-green-700">Conectado exitosamente</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Autenticación</p>
                    <p className="text-sm text-blue-700">Token JWT válido</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-purple-900">Servicios</p>
                    <p className="text-sm text-purple-700">Tracking disponible</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Información del Usuario</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-semibold text-gray-900">{user.name || 'No especificado'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Award className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">ID de Usuario</p>
                  <p className="font-semibold text-gray-900 font-mono">{user.id || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Última conexión</p>
                  <p className="font-semibold text-gray-900">Ahora mismo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200 group">
              <Search className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-left">
                <p className="font-semibold text-blue-900">Rastrear Envío</p>
                <p className="text-sm text-blue-700">Buscar paquetes</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200 group">
              <Package className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-left">
                <p className="font-semibold text-green-900">Nuevo Envío</p>
                <p className="text-sm text-green-700">Crear orden</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200 group">
              <Settings className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-left">
                <p className="font-semibold text-purple-900">Configuración</p>
                <p className="text-sm text-purple-700">Ajustes de cuenta</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;