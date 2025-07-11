import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle, Loader, LogIn } from 'lucide-react';
import { loginToMultitrack, LoginResponse } from '../utils/multitrackApi';

interface MultitrackLoginFormProps {
  onLoginSuccess?: (data: any) => void;
  onLoginError?: (error: string) => void;
}

const MultitrackLoginForm: React.FC<MultitrackLoginFormProps> = ({ 
  onLoginSuccess, 
  onLoginError 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'julio.izquierdo.mejia@gmail.com', // Email de ejemplo precargado
    password: '12345678' // Contraseña de ejemplo precargada
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validación básica
  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError('Ingresa un email válido');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('La contraseña es requerida');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('🔐 Iniciando proceso de login...');
      
      const result: LoginResponse = await loginToMultitrack({
        email: formData.email.trim(),
        password: formData.password
      });

      if (result.success) {
        console.log('✅ Login exitoso:', result);
        
        setSuccess(`¡Login exitoso! Bienvenido ${result.user?.name || 'Usuario'}.`);
        
        // Llamar callback de éxito si existe
        if (onLoginSuccess) {
          onLoginSuccess(result);
        }
        
        // Mostrar mensaje de éxito por 2 segundos y luego redirigir
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        
      } else {
        console.error('❌ Login fallido:', result.error);
        const errorMessage = result.error || 'Error desconocido en el login';
        setError(errorMessage);
        
        // Mostrar alert para errores críticos
        alert(`Error de Login: ${errorMessage}`);
        
        if (onLoginError) {
          onLoginError(errorMessage);
        }
      }

    } catch (error) {
      console.error('❌ Error inesperado:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error inesperado';
      setError(errorMessage);
      
      // Mostrar alert para errores inesperados
      alert(`Error Inesperado: ${errorMessage}`);
      
      if (onLoginError) {
        onLoginError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
        <p className="text-gray-600">Accede a tu cuenta Multitrack</p>
      </div>

      {/* Información de prueba */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">🧪 Datos de Prueba:</h3>
        <p className="text-blue-800 text-sm mb-2">
          <strong>Email:</strong> julio.izquierdo.mejia@gmail.com
        </p>
        <p className="text-blue-800 text-sm mb-2">
          <strong>Contraseña:</strong> 12345678
        </p>
        <p className="text-blue-700 text-xs">
          Los campos ya están precargados para facilitar las pruebas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Correo electrónico *
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors duration-200 font-medium"
              placeholder="tu@email.com"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Contraseña *
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-colors duration-200 font-medium"
              placeholder="Tu contraseña"
              required
              disabled={isLoading}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error de Login</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">¡Éxito!</p>
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin w-6 h-6 mr-3" />
              Iniciando sesión...
            </>
          ) : (
            <>
              <LogIn className="w-6 h-6 mr-3" />
              Iniciar Sesión
            </>
          )}
        </button>
      </form>

      {/* API Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Información de la API
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Base URL:</strong> https://developers.multitrack.trackingpremium.us</p>
          <p><strong>Método:</strong> POST</p>
          <p><strong>Content-Type:</strong> application/json</p>
          <p><strong>Endpoints probados:</strong> /auth/login, /api/auth/login, /login, etc.</p>
          <p className="text-blue-600 font-medium mt-2">
            ✅ Se prueban múltiples endpoints automáticamente
          </p>
          <p className="text-green-600 font-medium">
            ✅ Manejo robusto de errores y respuestas
          </p>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Revisa la consola del navegador (F12) para logs detallados de la API
        </p>
      </div>
    </div>
  );
};

export default MultitrackLoginForm;