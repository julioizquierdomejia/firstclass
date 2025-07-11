// API Client utilities for FirstClass Courier
// Handles authentication and API communication

const API_BASE_URL = 'https://firstclass.multitrack.trackingpremium.us';

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

export interface ApiResponse<T = any> {
  status: number;
  data: T;
  headers?: Record<string, string>;
  success: boolean;
}

// Utility function to convert Headers to plain object
const headersToObject = (headers: Headers): Record<string, string> => {
  const obj: Record<string, string> = {};
  headers.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

// Login with fetch API
export const loginWithFetch = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log('🚀 [FETCH] Iniciando login...');
  console.log('📧 Email:', credentials.email);
  console.log('🔗 URL:', `${API_BASE_URL}/login`);

  try {
    // Test both content types
    const requests = [
      // JSON request
      {
        name: 'JSON',
        request: fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(credentials),
          mode: 'cors' as RequestMode,
        })
      },
      // Form-encoded request
      {
        name: 'FORM',
        request: (() => {
          const formData = new URLSearchParams();
          formData.append('email', credentials.email);
          formData.append('password', credentials.password);
          
          return fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: formData,
            mode: 'cors' as RequestMode,
          });
        })()
      }
    ];

    const responses = await Promise.allSettled(requests.map(r => r.request));
    const results: ApiResponse[] = [];

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const requestName = requests[i].name;

      if (response.status === 'fulfilled') {
        const res = response.value;
        console.log(`📊 [${requestName}] Status:`, res.status);
        console.log(`📋 [${requestName}] Headers:`, headersToObject(res.headers));

        let data;
        const contentType = res.headers.get('content-type') || '';
        
        try {
          if (contentType.includes('application/json')) {
            data = await res.json();
          } else {
            data = await res.text();
          }
        } catch (e) {
          data = { error: 'Failed to parse response', status: res.status };
        }

        console.log(`✅ [${requestName}] Response:`, data);

        results.push({
          status: res.status,
          data,
          headers: headersToObject(res.headers),
          success: res.status >= 200 && res.status < 400
        });
      } else {
        console.error(`❌ [${requestName}] Error:`, response.reason);
        results.push({
          status: 0,
          data: { error: response.reason?.message || 'Network error' },
          success: false
        });
      }
    }

    // Return the first successful response, or the first response if none successful
    const successfulResponse = results.find(r => r.success);
    const responseToReturn = successfulResponse || results[0];

    if (responseToReturn?.success) {
      return {
        success: true,
        data: responseToReturn.data,
        token: responseToReturn.data?.token || responseToReturn.data?.access_token,
        user: responseToReturn.data?.user || {
          id: responseToReturn.data?.id || 'demo-user',
          email: credentials.email,
          name: responseToReturn.data?.name || 'Usuario API'
        }
      };
    } else {
      return {
        success: false,
        error: responseToReturn?.data?.error || responseToReturn?.data?.message || 'Login failed',
        data: results
      };
    }

  } catch (error) {
    console.error('❌ [FETCH] Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Login with axios
export const loginWithAxios = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log('🚀 [AXIOS] Iniciando login...');
  console.log('📧 Email:', credentials.email);
  console.log('🔗 URL:', `${API_BASE_URL}/login`);

  try {
    const axios = (await import('axios')).default;

    // Test both content types
    const requests = [
      // JSON request
      {
        name: 'JSON',
        request: axios.post(`${API_BASE_URL}/login`, credentials, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          validateStatus: () => true, // Don't throw on 4xx/5xx
          timeout: 10000,
        })
      },
      // Form-encoded request
      {
        name: 'FORM',
        request: (() => {
          const formData = new URLSearchParams();
          formData.append('email', credentials.email);
          formData.append('password', credentials.password);
          
          return axios.post(`${API_BASE_URL}/login`, formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            validateStatus: () => true, // Don't throw on 4xx/5xx
            timeout: 10000,
          });
        })()
      }
    ];

    const responses = await Promise.allSettled(requests.map(r => r.request));
    const results: ApiResponse[] = [];

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const requestName = requests[i].name;

      if (response.status === 'fulfilled') {
        const res = response.value;
        console.log(`📊 [${requestName}] Status:`, res.status);
        console.log(`📋 [${requestName}] Headers:`, res.headers);
        console.log(`✅ [${requestName}] Response:`, res.data);

        results.push({
          status: res.status,
          data: res.data,
          headers: res.headers,
          success: res.status >= 200 && res.status < 400
        });
      } else {
        console.error(`❌ [${requestName}] Error:`, response.reason);
        
        // Handle axios errors
        if (axios.isAxiosError(response.reason)) {
          const axiosError = response.reason;
          console.log('🌐 Request Config:', axiosError.config);
          console.log('📊 Error Status:', axiosError.response?.status);
          console.log('📄 Error Data:', axiosError.response?.data);
          
          results.push({
            status: axiosError.response?.status || 0,
            data: axiosError.response?.data || { error: axiosError.message },
            headers: axiosError.response?.headers,
            success: false
          });
        } else {
          results.push({
            status: 0,
            data: { error: response.reason?.message || 'Network error' },
            success: false
          });
        }
      }
    }

    // Return the first successful response, or the first response if none successful
    const successfulResponse = results.find(r => r.success);
    const responseToReturn = successfulResponse || results[0];

    if (responseToReturn?.success) {
      return {
        success: true,
        data: responseToReturn.data,
        token: responseToReturn.data?.token || responseToReturn.data?.access_token,
        user: responseToReturn.data?.user || {
          id: responseToReturn.data?.id || 'demo-user',
          email: credentials.email,
          name: responseToReturn.data?.name || 'Usuario API'
        }
      };
    } else {
      return {
        success: false,
        error: responseToReturn?.data?.error || responseToReturn?.data?.message || 'Login failed',
        data: results
      };
    }

  } catch (error) {
    console.error('❌ [AXIOS] Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Generic API call function
export const apiCall = async <T = any>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    headers?: Record<string, string>;
    useAxios?: boolean;
  } = {}
): Promise<ApiResponse<T>> => {
  const {
    method = 'GET',
    data,
    headers = {},
    useAxios = false
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  
  if (useAxios) {
    try {
      const axios = (await import('axios')).default;
      const response = await axios({
        method,
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...headers
        },
        validateStatus: () => true,
        timeout: 10000,
      });

      return {
        status: response.status,
        data: response.data,
        headers: response.headers,
        success: response.status >= 200 && response.status < 400
      };
    } catch (error) {
      return {
        status: 0,
        data: { error: error instanceof Error ? error.message : 'Request failed' },
        success: false
      };
    }
  } else {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...headers
        },
        body: data ? JSON.stringify(data) : undefined,
        mode: 'cors',
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }

      return {
        status: response.status,
        data: responseData,
        headers: headersToObject(response.headers),
        success: response.status >= 200 && response.status < 400
      };
    } catch (error) {
      return {
        status: 0,
        data: { error: error instanceof Error ? error.message : 'Request failed' },
        success: false
      };
    }
  }
};

// Storage utilities for tokens and user data
export const storage = {
  setToken: (token: string) => {
    localStorage.setItem('firstclass_token', token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem('firstclass_token');
  },
  
  removeToken: () => {
    localStorage.removeItem('firstclass_token');
  },
  
  setUser: (user: any) => {
    localStorage.setItem('firstclass_user', JSON.stringify(user));
  },
  
  getUser: (): any | null => {
    const user = localStorage.getItem('firstclass_user');
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem('firstclass_user');
  },
  
  clear: () => {
    localStorage.removeItem('firstclass_token');
    localStorage.removeItem('firstclass_user');
  }
};

export default {
  loginWithFetch,
  loginWithAxios,
  apiCall,
  storage
};