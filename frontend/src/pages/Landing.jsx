import React from 'react';
import { useNavigate } from 'react-router-dom';
import { USERS } from '../data/mockData';

export default function Landing() {
  const navigate = useNavigate();

  const demoUsers = USERS.filter((u) => u.role !== 'admin');

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="logo">⛲ FOUNTAIN</div>
        <div className="nav-links">
          <button className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => navigate('/login')}>
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
          <div className="hero-badge">🌍 For African Youth • By African Youth</div>
          <h1>
            Be the <span>Fountain</span>,<br />Not the Stream
          </h1>
          <p>
            Empower yourself to become a creator, entrepreneur, and leader.
            Set realistic goals, build your business, connect with mentors,
            and join a community of young Africans taking charge of their future.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              Start Your Journey →
            </button>
            <button className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Everything You Need to Succeed</h2>
        <p className="sub">Tools built specifically for young African entrepreneurs and creators</p>
        <div className="features-grid">
          {[
            { icon: '🎯', title: 'Goal Setting', desc: 'Set realistic, achievable goals and break them into actionable milestones. Track every step of your journey.' },
            { icon: '📊', title: 'Business Planning', desc: 'Build your business plan with guided templates. Track income and expenses to stay profitable.' },
            { icon: '🤝', title: 'Mentorship', desc: 'Connect with experienced mentors who have walked the path. Get real, practical guidance.' },
            { icon: '💬', title: 'Community', desc: 'Share your wins, learn from others, and stay inspired by a community that believes in your potential.' },
            { icon: '📚', title: 'Learning Resources', desc: 'Access curated guides, tips, and tutorials on entrepreneurship, finance, and leadership.' },
            { icon: '💰', title: 'Financial Tracking', desc: 'Manage your business finances simply. Know your revenue, expenses, and profit at a glance.' },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
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
          take practical steps that lead to financial freedom rather than getting stuck
          trying to solve unrealistic problems.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
          "Not everyone can be an employee. Be the fountain that others benefit from."
        </p>
        <button className="btn btn-primary btn-lg" style={{ marginTop: '8px' }} onClick={() => navigate('/register')}>
          Join the Movement
        </button>
      </section>

      {/* Demo users */}
      <section className="users-demo">
        <h2>Try the App</h2>
        <p className="sub">Use one of these pre-set accounts to explore the platform</p>
        <div className="demo-cards">
          {demoUsers.map((u) => (
            <div className="demo-card" key={u.id}>
              <div className="avatar avatar-lg" style={{ background: u.role === 'mentor' ? '#2D6A4F' : u.role === 'entrepreneur' ? '#1a73e8' : '#E8621A' }}>
                {u.avatar}
              </div>
              <h4>{u.name}</h4>
              <div className="role-badge">{u.role}</div>
              <p>{u.bio.slice(0, 60)}…</p>
              <code>📧 {u.email}</code>
              <code>🔑 {u.password}</code>
              <button
                className="btn btn-outline btn-sm"
                style={{ marginTop: '12px', width: '100%' }}
                onClick={() => navigate('/login')}
              >
                Login as {u.role}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 <span>The Fountain</span> · Built for African Youth · African Leadership University</p>
        <p style={{ marginTop: '6px', fontSize: '0.78rem' }}>
          Powered by React · Flask · MySQL
        </p>
      </footer>
    </div>
  );
}
