import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, RECENT_ACTIVITY, INITIAL_GOALS } from '../data/mockData';
import {
  IconTarget, IconChart, IconUsers, IconMessage,
  IconCheckCircle, IconActivity, IconBuilding,
  IconStar, IconInbox, IconFlag,
} from '../components/Icons';

const QUICK_ACTIONS = {
  youth: [
    { label: 'Set a New Goal',      Icon: IconTarget,       path: '/goals'      },
    { label: 'Build Business Plan', Icon: IconChart,        path: '/business'   },
    { label: 'Find a Mentor',       Icon: IconUsers,        path: '/mentorship' },
    { label: 'Join the Community',  Icon: IconMessage,      path: '/community'  },
  ],
  mentor: [
    { label: 'View Requests',    Icon: IconInbox,   path: '/mentorship' },
    { label: 'Share a Tip',      Icon: IconActivity, path: '/community'  },
    { label: 'Community Feed',   Icon: IconMessage,  path: '/community'  },
    { label: 'My Goals',         Icon: IconTarget,   path: '/goals'      },
  ],
  entrepreneur: [
    { label: 'My Businesses', Icon: IconBuilding, path: '/business'   },
    { label: 'Share Story',   Icon: IconStar,     path: '/community'  },
    { label: 'Set a Goal',    Icon: IconTarget,   path: '/goals'      },
    { label: 'Mentorship',    Icon: IconUsers,    path: '/mentorship' },
  ],
  admin: [
    { label: 'Community',     Icon: IconMessage,  path: '/community'  },
    { label: 'Mentorship',    Icon: IconUsers,    path: '/mentorship' },
    { label: 'Goals',         Icon: IconTarget,   path: '/goals'      },
    { label: 'Business Plans',Icon: IconChart,    path: '/business'   },
  ],
};

const GREETING_MESSAGES = {
  youth:        'Ready to take the next step toward your goals?',
  mentor:       'Your guidance is creating real impact.',
  entrepreneur: 'Every business you build opens doors for others.',
  admin:        'Platform overview.',
};

const ACTIVITY_COLORS = {
  milestone:  '#27ae60',
  comment:    '#1a73e8',
  mentorship: '#2D6A4F',
  finance:    '#E8621A',
  goal:       '#9b59b6',
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats   = getDashboardStats(user?.role);
  const actions = QUICK_ACTIONS[user?.role] || QUICK_ACTIONS.youth;

  const activeGoals      = INITIAL_GOALS.filter((g) => g.status === 'active');
  const totalMilestones  = activeGoals.flatMap((g) => g.milestones).length;
  const doneMilestones   = activeGoals.flatMap((g) => g.milestones).filter((m) => m.isCompleted).length;
  const overallProgress  = totalMilestones > 0 ? Math.round((doneMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>
            Hello, {user?.name?.split(' ')[0]}
          </h1>
          <p style={{ color: '#8888aa', fontSize: '0.95rem' }}>
            {GREETING_MESSAGES[user?.role]}
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {Object.values(stats).map((s) => (
            <div className="stat-card" key={s.label}>
              <div
                className="stat-icon"
                style={{
                  background: `${s.color}14`,
                  border: `1px solid ${s.color}30`,
                }}
              >
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: s.color,
                }} />
              </div>
              <div className="stat-info">
                <p style={{ color: s.color }}>{s.value}</p>
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
              {actions.map(({ label, Icon, path }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  style={{
                    padding: '14px 12px',
                    border: '1.5px solid #e8e8f0',
                    borderRadius: '10px',
                    background: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#4a4a6a',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#E8621A'; e.currentTarget.style.background = '#fff8f3'; e.currentTarget.style.color = '#E8621A'; }}
                  onMouseOut={(e)  => { e.currentTarget.style.borderColor = '#e8e8f0'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#4a4a6a'; }}
                >
                  <Icon size={16} color="currentColor" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Progress or Profile */}
          {user?.role === 'youth' ? (
            <div className="card">
              <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Goal Progress</h3>
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
                const done  = g.milestones.filter((m) => m.isCompleted).length;
                const total = g.milestones.length;
                const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
                const catColors = { business: '#E8621A', education: '#1a73e8', finance: '#27ae60', personal: '#9b59b6' };
                const c = catColors[g.category] || '#E8621A';
                return (
                  <div key={g.id} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#1A1A2E' }}>{g.title}</span>
                      <span style={{ fontSize: '0.78rem', color: c }}>{done}/{total}</span>
                    </div>
                    <div className="progress-wrap" style={{ height: '5px' }}>
                      <div className="progress-bar" style={{ width: `${pct}%`, background: c }} />
                    </div>
                  </div>
                );
              })}
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: '12px', width: '100%' }}
                onClick={() => navigate('/goals')}
              >
                Manage Goals
              </button>
            </div>
          ) : (
            <div className="card">
              <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Your Profile</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div
                  className="avatar avatar-lg"
                  style={{ background: user?.role === 'mentor' ? '#2D6A4F' : '#1a73e8' }}
                >
                  {user?.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>{user?.name}</p>
                  <span
                    className={`badge badge-${user?.role === 'mentor' ? 'secondary' : 'blue'}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4a4a6a', marginBottom: '10px' }}>{user?.bio}</p>
              <p style={{ fontSize: '0.82rem', color: '#8888aa' }}>{user?.location}</p>
              <p style={{ fontSize: '0.82rem', color: '#8888aa', marginTop: '4px' }}>{user?.skills}</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {RECENT_ACTIVITY.map((a, i) => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 0',
                  borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid #e8e8f0' : 'none',
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: ACTIVITY_COLORS[a.type] || '#E8621A',
                }} />
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
