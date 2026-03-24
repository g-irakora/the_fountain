import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard',   label: 'Dashboard',       icon: '🏠' },
  { path: '/goals',       label: 'My Goals',         icon: '🎯' },
  { path: '/business',    label: 'Business Plan',    icon: '📊' },
  { path: '/mentorship',  label: 'Mentorship',       icon: '🤝' },
  { path: '/community',   label: 'Community',        icon: '💬' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>⛲ FOUNTAIN</h2>
        <p>Empowering African Youth</p>
      </div>

      <div className="sidebar-user">
        <div className="avatar" style={{ background: '#E8621A' }}>
          {user?.avatar || user?.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="user-info">
          <p>{user?.name}</p>
          <p>{user?.role}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-logout">
        <button onClick={handleLogout}>↩ Sign Out</button>
      </div>
    </aside>
  );
}
