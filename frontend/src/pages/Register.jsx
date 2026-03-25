import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLES = [
  { value: 'youth',        label: 'Youth',        desc: 'I want to grow and start my journey'   },
  { value: 'mentor',       label: 'Mentor',        desc: 'I want to guide and inspire others'    },
  { value: 'entrepreneur', label: 'Entrepreneur',  desc: 'I run or am building a business'       },
];

export default function Register() {
  const [form, setForm]       = useState({ name: '', email: '', password: '', role: 'youth', bio: '', skills: '', location: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const { register }          = useAuth();
  const navigate              = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register(form);
      if (result.success) navigate('/dashboard');
      else setError(result.error);
      setLoading(false);
    }, 700);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1A1A2E 0%, #16213e 60%, #0f3460 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', color: '#F4A261', letterSpacing: '2px', fontWeight: '800' }}>
            FOUNTAIN
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '4px' }}>
            Join the community of young African creators.
          </p>
        </div>

        <div className="card" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.3rem' }}>Create Your Account</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={submit}>
            {/* Role selection */}
            <div className="form-group">
              <label>I am a...</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                {ROLES.map((r) => (
                  <div
                    key={r.value}
                    onClick={() => setForm({ ...form, role: r.value })}
                    style={{
                      border: `2px solid ${form.role === r.value ? '#E8621A' : '#e8e8f0'}`,
                      borderRadius: '10px',
                      padding: '14px 8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: form.role === r.value ? '#fff8f3' : '#fff',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div
                      style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: form.role === r.value ? '#E8621A' : '#e8e8f0',
                        margin: '0 auto 8px',
                        transition: 'background 0.2s',
                      }}
                    />
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: form.role === r.value ? '#E8621A' : '#4a4a6a' }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-control" name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input className="form-control" name="location" value={form.location} onChange={handle} placeholder="City, Country" />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input className="form-control" type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" name="password" value={form.password} onChange={handle} placeholder="Minimum 6 characters" required />
            </div>

            <div className="form-group">
              <label>Skills / Expertise</label>
              <input className="form-control" name="skills" value={form.skills} onChange={handle} placeholder="e.g. Marketing, Agriculture, Technology" />
            </div>

            <div className="form-group">
              <label>Short Bio</label>
              <textarea className="form-control" name="bio" value={form.bio} onChange={handle} placeholder="Tell us a little about yourself and your goals..." rows={3} />
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: '8px' }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.87rem', color: '#8888aa' }}>
            Already have an account?{' '}
            <span style={{ color: '#E8621A', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/login')}>
              Sign In
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
