import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { loginWithFetch, loginWithAxios, storage, LoginResponse } from '../utils/apiClient';

interface LoginFormProps {
  onLoginSuccess?: (data: any) => void;
  onLoginError?: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginError }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [requestMethod, setRequestMethod] = useState<'fetch' | 'axios'>('fetch');
  const [debugMode, setDebugMode] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    setApiResponse(null);

    try {
      let result: LoginResponse;
      
      if (requestMethod === 'fetch') {
        result = await loginWithFetch({
          email: formData.email,
          password: formData.password
        });
      } else {
        result = await loginWithAxios({
          email: formData.email,
          password: formData.password
        });
      }

      // Set debug response for display
      if (debugMode) {
        setApiResponse(result.data);
      }
      
      if (result.success) {
        // Store authentication data
        if (result.token) {
          storage.setToken(result.token);
        }
        if (result.user) {
          storage.setUser(result.user);
        }
        
        setSuccess(`¡Login exitoso con ${requestMethod.toUpperCase()}! Bienvenido ${result.user?.name || 'Usuario'}.`);
        onLoginSuccess?.(result);
      } else {
        setError(result.error || 'Error desconocido en el login');
        onLoginError?.(result.error || 'Error desconocido');
      }

    } catch (error) {
      console.error('❌ Error inesperado:', error);
      setError(`Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      onLoginError?.(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
        <p className="text-gray-600">Accede a tu cuenta FirstClass</p>
      </div>

      {/* Method Selector */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Método de prueba:
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setRequestMethod('fetch')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              requestMethod === 'fetch'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fetch API
          </button>
          <button
            type="button"
            onClick={() => setRequestMethod('axios')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              requestMethod === 'axios'
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Axios
          </button>
        </div>
      </div>

      {/* Debug Mode Toggle */}
      <div className="mb-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={debugMode}
            onChange={(e) => setDebugMode(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm font-medium text-gray-700">
            Mostrar información de debug
          </span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Correo electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
              placeholder="tu@email.com"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
              placeholder="Tu contraseña"
              required
              disabled={isLoading}
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
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Éxito</p>
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin w-5 h-5 mr-3" />
              Iniciando sesión...
            </>
          ) : (
            <>
              Iniciar sesión con {requestMethod === 'fetch' ? 'Fetch' : 'Axios'}
            </>
          )}
        </button>
      </form>

      {/* API Response Debug */}
      {debugMode && apiResponse && (
        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Respuesta de la API (Debug)
          </h3>
          <pre className="text-xs bg-white p-3 rounded-lg border overflow-x-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}

      {/* Test Credentials */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">💡 Información de prueba:</h3>
        <p className="text-blue-800 text-sm mb-3">
          Este formulario se conecta a la API externa real. Usa cualquier credenciales para probar:
        </p>
        <div className="bg-white p-3 rounded-lg border border-blue-200">
          <p className="text-xs font-mono text-gray-700 mb-1">
            <strong>URL:</strong> https://firstclass.multitrack.trackingpremium.us/login
          </p>
          <p className="text-xs font-mono text-gray-700 mb-1">
            <strong>Método:</strong> POST
          </p>
          <p className="text-xs font-mono text-gray-700">
            <strong>Content-Type:</strong> application/json | application/x-www-form-urlencoded
          </p>
        </div>
        <p className="text-blue-800 text-sm mt-3">
          La respuesta se muestra en la consola del navegador y opcionalmente en la sección de debug.
        </p>
      </div>
      
      {/* Additional Debug Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">🔧 Información de Debug:</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• ✅ Se prueban ambos Content-Types (JSON y Form-encoded)</p>
          <p>• ✅ Se manejan respuestas JSON y texto plano automáticamente</p>
          <p>• ✅ Se capturan errores de CORS, red y servidor</p>
          <p>• ✅ Se almacenan tokens y datos de usuario automáticamente</p>
          <p>• ✅ Manejo robusto de errores con fallbacks</p>
          <p>• Revisa la consola del navegador (F12) para logs detallados</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;