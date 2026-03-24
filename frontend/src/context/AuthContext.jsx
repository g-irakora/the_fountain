import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('fountain_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const { password: _p, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('fountain_user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  };

  const register = (data) => {
    const exists = USERS.find((u) => u.email === data.email);
    if (exists) return { success: false, error: 'Email already in use.' };
    const newUser = {
      id: USERS.length + 10,
      name: data.name,
      email: data.email,
      role: data.role || 'youth',
      bio: data.bio || '',
      skills: data.skills || '',
      location: data.location || '',
      avatar: data.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
    };
    USERS.push({ ...newUser, password: data.password });
    setUser(newUser);
    localStorage.setItem('fountain_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fountain_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
