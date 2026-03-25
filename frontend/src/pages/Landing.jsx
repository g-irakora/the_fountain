import React from 'react';
import { useNavigate } from 'react-router-dom';
import { USERS } from '../data/mockData';
import {
  IconTarget, IconChart, IconUsers, IconMessage,
  IconBookOpen, IconDollar, IconArrowRight,
} from '../components/Icons';

const FEATURES = [
  { Icon: IconTarget,   title: 'Goal Setting',          desc: 'Set realistic, achievable goals and break them into clear milestones. Track every step of your progress.' },
  { Icon: IconChart,    title: 'Business Planning',      desc: 'Build your business plan with guided templates. Track income and expenses from day one.' },
  { Icon: IconUsers,    title: 'Mentorship',             desc: 'Connect with experienced mentors who have walked the path. Get practical, honest guidance.' },
  { Icon: IconMessage,  title: 'Community',              desc: 'Share wins, learn from others, and stay grounded in a community that believes in your potential.' },
  { Icon: IconBookOpen, title: 'Learning Resources',     desc: 'Access curated guides and tips on entrepreneurship, finance, and leadership.' },
  { Icon: IconDollar,   title: 'Financial Tracking',     desc: 'Understand your numbers. Know your revenue, expenses, and profit at a glance.' },
];

export default function Landing() {
  const navigate  = useNavigate();
  const demoUsers = USERS.filter((u) => u.role !== 'admin');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="logo">FOUNTAIN</div>
        <div className="nav-links">
          <button
            className="btn btn-ghost btn-sm"
            style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">For African Youth &middot; By African Youth</div>
          <h1>
            Be the <span>Fountain</span>,<br />Not the Stream
          </h1>
          <p>
            Empower yourself to become a creator, entrepreneur, and leader.
            Set realistic goals, build your business, connect with mentors,
            and join a community of young Africans taking charge of their future.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Start Your Journey
              <IconArrowRight size={16} color="#fff" />
            </button>
            <button
              className="btn btn-outline btn-lg"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Right side visual */}
        <div className="hero-visual">
          {/* Platform stats card */}
          <div className="hero-card">
            <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              Platform Overview
            </p>
            {[
              { label: 'Youth Registered',  value: '1,240+', color: '#E8621A' },
              { label: 'Mentors Available', value: '86',     color: '#2D6A4F' },
              { label: 'Business Plans',    value: '342',    color: '#F4A261' },
              { label: 'Goals Completed',   value: '890+',   color: '#27ae60' },
            ].map((s) => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                <span style={{ fontSize: '1rem', fontWeight: '700', fontFamily: 'Poppins, sans-serif', color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Goal progress mini-card */}
          <div className="hero-card" style={{ marginTop: '16px' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
              Sample Goal Progress
            </p>
            {[
              { label: 'Launch Organic Farm',     pct: 50, color: '#E8621A' },
              { label: 'Complete Business Course', pct: 50, color: '#1a73e8' },
              { label: 'Build Emergency Fund',     pct: 25, color: '#27ae60' },
            ].map((g) => (
              <div key={g.label} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>{g.label}</span>
                  <span style={{ fontSize: '0.75rem', color: g.color, fontWeight: '700' }}>{g.pct}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '99px', height: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${g.pct}%`, height: '100%', background: g.color, borderRadius: '99px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Everything You Need to Succeed</h2>
        <p className="sub">Tools built for young African entrepreneurs and creators</p>
        <div className="features-grid">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">
                <Icon size={24} color="#E8621A" />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To empower African youth to become self-directed learners, ethical leaders,
          and innovative entrepreneurs who set realistic, achievable goals — helping them
          take practical steps toward financial freedom rather than waiting to be saved.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
          "Not everyone can be an employee. Be the fountain that others benefit from."
        </p>
        <button
          className="btn btn-primary btn-lg"
          style={{ marginTop: '8px' }}
          onClick={() => navigate('/register')}
        >
          Join the Movement
        </button>
      </section>

      {/* Demo users */}
      <section className="users-demo">
        <h2>Try the App</h2>
        <p className="sub">Use one of these pre-set accounts to explore the platform</p>
        <div className="demo-cards">
          {demoUsers.map((u) => {
            const roleColor = u.role === 'mentor' ? '#2D6A4F' : u.role === 'entrepreneur' ? '#1a73e8' : '#E8621A';
            return (
              <div className="demo-card" key={u.id}>
                <div className="avatar avatar-lg" style={{ background: roleColor, margin: '0 auto 12px' }}>
                  {u.avatar}
                </div>
                <h4>{u.name}</h4>
                <div className="role-badge">{u.role}</div>
                <p>{u.bio.slice(0, 60)}{u.bio.length > 60 ? '...' : ''}</p>
                <code style={{ display: 'block', marginBottom: '4px' }}>{u.email}</code>
                <code>{u.password}</code>
                <button
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '12px', width: '100%' }}
                  onClick={() => navigate('/login')}
                >
                  Login as {u.role}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>
          &copy; 2025 <span>The Fountain</span> &middot; Built for African Youth &middot; African Leadership University
        </p>
        <p style={{ marginTop: '6px', fontSize: '0.78rem' }}>
          React &middot; Flask &middot; MySQL
        </p>
      </footer>

    </div>
  );
}
