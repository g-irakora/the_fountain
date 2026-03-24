import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, RECENT_ACTIVITY, INITIAL_GOALS } from '../data/mockData';

const QUICK_ACTIONS = {
  youth: [
    { label: 'Set a New Goal', icon: '🎯', path: '/goals' },
    { label: 'Build Business Plan', icon: '📊', path: '/business' },
    { label: 'Find a Mentor', icon: '🤝', path: '/mentorship' },
    { label: 'Join the Community', icon: '💬', path: '/community' },
  ],
  mentor: [
    { label: 'View Requests', icon: '📬', path: '/mentorship' },
    { label: 'Share a Tip', icon: '💡', path: '/community' },
    { label: 'Community Feed', icon: '💬', path: '/community' },
    { label: 'My Goals', icon: '🎯', path: '/goals' },
  ],
  entrepreneur: [
    { label: 'My Businesses', icon: '🏢', path: '/business' },
    { label: 'Share Story', icon: '🌟', path: '/community' },
    { label: 'Set a Goal', icon: '🎯', path: '/goals' },
    { label: 'Mentorship', icon: '🤝', path: '/mentorship' },
  ],
  admin: [
    { label: 'Community', icon: '💬', path: '/community' },
    { label: 'Mentorship', icon: '🤝', path: '/mentorship' },
    { label: 'Goals', icon: '🎯', path: '/goals' },
    { label: 'Business Plans', icon: '📊', path: '/business' },
  ],
};

const GREETING_MESSAGES = {
  youth: 'Ready to take the next step toward your goals today?',
  mentor: 'Your guidance is changing lives. Thank you for being a fountain.',
  entrepreneur: 'Every business you build creates opportunities for others.',
  admin: 'Platform overview at a glance.',
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = getDashboardStats(user?.role);
  const actions = QUICK_ACTIONS[user?.role] || QUICK_ACTIONS.youth;

  // Goal progress for youth
  const activeGoals = INITIAL_GOALS.filter((g) => g.status === 'active');
  const totalMilestones = activeGoals.flatMap((g) => g.milestones).length;
  const doneMilestones  = activeGoals.flatMap((g) => g.milestones).filter((m) => m.isCompleted).length;
  const overallProgress = totalMilestones > 0 ? Math.round((doneMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>
            Hello, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: '#8888aa', fontSize: '0.95rem' }}>
            {GREETING_MESSAGES[user?.role]}
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {Object.values(stats).map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info">
                <p>{s.value}</p>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginBottom: '24px' }}>
          {/* Quick Actions */}
          <div className="card">
            <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {actions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  style={{
                    padding: '14px', border: '1.5px solid #e8e8f0', borderRadius: '10px',
                    background: '#fff', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '10px',
                    fontSize: '0.85rem', fontWeight: '600', color: '#4a4a6a',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#E8621A'; e.currentTarget.style.background = '#fff8f3'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e8e8f0'; e.currentTarget.style.background = '#fff'; }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress (youth) or Profile card */}
          {user?.role === 'youth' ? (
            <div className="card">
              <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Goal Progress Overview</h3>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.87rem', color: '#4a4a6a' }}>Overall completion</span>
                  <span style={{ fontSize: '0.87rem', fontWeight: '700', color: '#E8621A' }}>{overallProgress}%</span>
                </div>
                <div className="progress-wrap">
                  <div className="progress-bar" style={{ width: `${overallProgress}%` }} />
                </div>
              </div>
              {activeGoals.map((g) => {
                const done = g.milestones.filter((m) => m.isCompleted).length;
                const total = g.milestones.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                const catColors = { business: '#E8621A', education: '#1a73e8', finance: '#27ae60', personal: '#9b59b6' };
                return (
                  <div key={g.id} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1A1A2E' }}>{g.title}</span>
                      <span style={{ fontSize: '0.78rem', color: catColors[g.category] || '#E8621A' }}>{done}/{total}</span>
                    </div>
                    <div className="progress-wrap" style={{ height: '5px' }}>
                      <div className="progress-bar" style={{ width: `${pct}%`, background: catColors[g.category] || '#E8621A' }} />
                    </div>
                  </div>
                );
              })}
              <button className="btn btn-outline btn-sm" style={{ marginTop: '12px', width: '100%' }} onClick={() => navigate('/goals')}>
                Manage Goals →
              </button>
            </div>
          ) : (
            <div className="card">
              <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Your Profile</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div className="avatar avatar-lg" style={{ background: user?.role === 'mentor' ? '#2D6A4F' : '#1a73e8' }}>
                  {user?.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>{user?.name}</p>
                  <span className={`badge badge-${user?.role === 'mentor' ? 'secondary' : 'blue'}`} style={{ textTransform: 'capitalize' }}>{user?.role}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4a4a6a', marginBottom: '8px' }}>{user?.bio}</p>
              <p style={{ fontSize: '0.82rem', color: '#8888aa' }}>📍 {user?.location}</p>
              <p style={{ fontSize: '0.82rem', color: '#8888aa', marginTop: '4px' }}>🛠 {user?.skills}</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '12px 0',
                borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid #e8e8f0' : 'none'
              }}>
                <div style={{ fontSize: '1.2rem', width: '32px', height: '32px', background: '#fff8f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.87rem', color: '#1A1A2E' }}>{a.text}</p>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#8888aa', whiteSpace: 'nowrap' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
