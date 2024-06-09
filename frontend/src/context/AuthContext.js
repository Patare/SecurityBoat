import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['x-auth-token'] = auth.token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
    setAuth((prevAuth) => ({ ...prevAuth, loading: false }));
  }, [auth.token]);

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setAuth((prevAuth) => ({ ...prevAuth, token: res.data.token, isAuthenticated: true }));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, role } = res.data;
      setAuth({ token, role });
      return role;
    } catch (err) {
      console.error(err.response.data);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false, loading: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
