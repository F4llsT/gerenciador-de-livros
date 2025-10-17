import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros comuns
export const setupResponseInterceptors = (navigate) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Tratamento de erros comuns
        if (error.response.status === 401) {
          // Token expirado ou inválido
          localStorage.removeItem('token');
          navigate('/login');
        } else if (error.response.status === 403) {
          // Acesso negado
          console.error('Acesso negado:', error.response.data);
        } else if (error.response.status === 404) {
          // Recurso não encontrado
          console.error('Recurso não encontrado:', error.response.data);
        } else if (error.response.status >= 500) {
          // Erro do servidor
          console.error('Erro no servidor:', error.response.data);
        }
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Sem resposta do servidor:', error.request);
      } else {
        // Erro ao configurar a requisição
        console.error('Erro ao configurar a requisição:', error.message);
      }
      return Promise.reject(error);
    }
  );
};

export default api;
