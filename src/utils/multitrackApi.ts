// Multitrack API Client
import axios from 'axios';

const API_BASE_URL = 'https://developers.multitrack.trackingpremium.us';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: any;
  error?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    [key: string]: any;
  };
}

// Configurar axios con interceptores
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para agregar token a las requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('multitrack_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('multitrack_token');
      localStorage.removeItem('multitrack_user');
      window.location.href = '/mi-cuenta';
    }
    return Promise.reject(error);
  }
);

// Función de login
export const loginToMultitrack = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log('🚀 [MULTITRACK] Iniciando login...');
  console.log('📧 Email:', credentials.email);
  console.log('🔗 URL:', `${API_BASE_URL}/auth/login`);

  try {
    // Intentar diferentes endpoints posibles para login
    const possibleEndpoints = [
      '/auth/login',
      '/api/auth/login',
      '/login',
      '/api/login',
      '/customer/login',
      '/api/customer/login'
    ];

    let lastError = null;

    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`🔄 Probando endpoint: ${endpoint}`);
        
        const response = await apiClient.post(endpoint, {
          email: credentials.email,
          password: credentials.password
        });

        console.log(`✅ [${endpoint}] Status:`, response.status);
        console.log(`✅ [${endpoint}] Response:`, response.data);

        // Si llegamos aquí, el endpoint funcionó
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          
          // Extraer token de diferentes posibles ubicaciones
          const token = data.token || 
                       data.access_token || 
                       data.jwt || 
                       data.authToken || 
                       data.data?.token ||
                       data.data?.access_token;

          // Extraer información del usuario
          const user = data.user || 
                      data.customer || 
                      data.data?.user || 
                      data.data?.customer || {
                        id: data.id || 'unknown',
                        email: credentials.email,
                        name: data.name || data.username || 'Usuario'
                      };

          if (token) {
            // Guardar en localStorage
            localStorage.setItem('multitrack_token', token);
            localStorage.setItem('multitrack_user', JSON.stringify(user));
            
            return {
              success: true,
              data: data,
              token: token,
              user: user
            };
          } else {
            // Respuesta exitosa pero sin token, podría ser que el login sea diferente
            return {
              success: true,
              data: data,
              user: user
            };
          }
        }
      } catch (endpointError) {
        console.log(`❌ [${endpoint}] Error:`, endpointError);
        lastError = endpointError;
        continue; // Probar siguiente endpoint
      }
    }

    // Si llegamos aquí, ningún endpoint funcionó
    throw lastError || new Error('No se pudo conectar con ningún endpoint de login');

  } catch (error) {
    console.error('❌ [MULTITRACK] Error general:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      console.log('🌐 Request Config:', axiosError.config);
      console.log('📊 Error Status:', axiosError.response?.status);
      console.log('📄 Error Data:', axiosError.response?.data);
      
      let errorMessage = 'Error de conexión';
      
      if (axiosError.response) {
        // El servidor respondió con un error
        const status = axiosError.response.status;
        const data = axiosError.response.data;
        
        switch (status) {
          case 401:
            errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
            break;
          case 403:
            errorMessage = 'Acceso denegado. Tu cuenta podría estar bloqueada.';
            break;
          case 404:
            errorMessage = 'Servicio no encontrado. La API podría estar en mantenimiento.';
            break;
          case 422:
            errorMessage = data?.message || 'Datos de login inválidos.';
            break;
          case 429:
            errorMessage = 'Demasiados intentos. Espera unos minutos antes de intentar de nuevo.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor. Intenta más tarde.';
            break;
          default:
            errorMessage = data?.message || data?.error || `Error ${status}: ${axiosError.message}`;
        }
      } else if (axiosError.request) {
        // La request se hizo pero no hubo respuesta
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else {
        // Error en la configuración de la request
        errorMessage = axiosError.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    } else {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }
};

// Función para obtener información del usuario autenticado
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/api/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo perfil de usuario:', error);
    throw error;
  }
};

// Función para hacer logout
export const logout = () => {
  localStorage.removeItem('multitrack_token');
  localStorage.removeItem('multitrack_user');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('multitrack_token');
  return !!token;
};

// Función para obtener el token actual
export const getToken = (): string | null => {
  return localStorage.getItem('multitrack_token');
};

// Función para obtener el usuario actual
export const getUser = (): any | null => {
  const user = localStorage.getItem('multitrack_user');
  return user ? JSON.parse(user) : null;
};

export default {
  loginToMultitrack,
  getCurrentUser,
  logout,
  isAuthenticated,
  getToken,
  getUser,
  apiClient
};