import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { label: 'Youth — Uwimana Aline',       email: 'youth@fountain.com',          password: 'youth123',  color: '#E8621A' },
  { label: 'Mentor — Dr. Nsengimana',     email: 'mentor@fountain.com',         password: 'mentor123', color: '#2D6A4F' },
  { label: 'Entrepreneur — Ingabire',     email: 'entrepreneur@fountain.com',   password: 'entre123',  color: '#1a73e8' },
];

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { login }             = useAuth();
  const navigate              = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) navigate('/dashboard');
      else setError(result.error);
      setLoading(false);
    }, 600);
  };

  const quickLogin = (email, password) => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) navigate('/dashboard');
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1A1A2E 0%, #16213e 60%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', color: '#F4A261', letterSpacing: '2px', fontWeight: '800' }}>
            FOUNTAIN
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '4px' }}>Welcome back. Sign in to continue.</p>
        </div>

        <div className="card" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Sign In</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email Address</label>
              <input className="form-control" type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" name="password" value={form.password} onChange={handle} placeholder="Enter your password" required />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: '8px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <hr className="divider" />

          <p style={{ fontSize: '0.8rem', color: '#8888aa', marginBottom: '12px', textAlign: 'center' }}>
            Try a demo account
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DEMO_ACCOUNTS.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => quickLogin(u.email, u.password)}
                style={{
                  padding: '9px 12px',
                  border: `1.5px solid ${u.color}`,
                  borderRadius: '8px',
                  background: 'transparent',
                  color: u.color,
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = u.color; e.currentTarget.style.color = '#fff'; }}
                onMouseOut={(e)  => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = u.color; }}
              >
                {u.label}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.87rem', color: '#8888aa' }}>
            No account?{' '}
            <span style={{ color: '#E8621A', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/register')}>
              Create one
            </span>
          </p>
        </div>

        <p
          style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Back to home
        </p>
      </div>
    </div>
  );
}
