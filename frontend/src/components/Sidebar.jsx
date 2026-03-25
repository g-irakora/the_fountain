import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  IconDashboard, IconTarget, IconChart,
  IconUsers, IconMessage, IconLogout,
} from './Icons';

const NAV_ITEMS = [
  { path: '/dashboard',  label: 'Dashboard',     Icon: IconDashboard },
  { path: '/goals',      label: 'My Goals',      Icon: IconTarget    },
  { path: '/business',   label: 'Business Plan', Icon: IconChart     },
  { path: '/mentorship', label: 'Mentorship',    Icon: IconUsers     },
  { path: '/community',  label: 'Community',     Icon: IconMessage   },
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
        <h2>FOUNTAIN</h2>
        <p>Empowering African Youth</p>
      </div>

      <div className="sidebar-user">
        <div className="avatar" style={{ background: '#E8621A' }}>
          {user?.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="user-info">
          <p>{user?.name}</p>
          <p>{user?.role}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ path, label, Icon }) => (
          <button
            key={path}
            className={`nav-item ${pathname === path ? 'active' : ''}`}
            onClick={() => navigate(path)}
          >
            <span className="icon">
              <Icon size={16} color="currentColor" />
            </span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-logout">
        <button onClick={handleLogout}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <IconLogout size={15} color="currentColor" />
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}
