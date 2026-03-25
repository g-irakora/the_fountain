import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { ALL_MENTORS, INITIAL_MENTORSHIP_REQUESTS } from '../data/mockData';
import { IconUsers, IconInbox, IconCheckCircle, IconClock } from '../components/Icons';

const STATUS_STYLES = {
  pending:   { badge: 'badge-warning',   label: 'Pending'   },
  active:    { badge: 'badge-success',   label: 'Active'    },
  completed: { badge: 'badge-secondary', label: 'Completed' },
  declined:  { badge: 'badge-danger',    label: 'Declined'  },
};

export default function Mentorship() {
  const { user } = useAuth();
  const [requests, setRequests]           = useState(INITIAL_MENTORSHIP_REQUESTS);
  const [showRequestModal, setShowRequestModal] = useState(null);
  const [message, setMessage]             = useState('');
  const [tab, setTab]                     = useState(user?.role === 'mentor' ? 'requests' : 'browse');
  const [successMsg, setSuccessMsg]       = useState('');

  const isMentor = user?.role === 'mentor';

  const sendRequest = (e) => {
    e.preventDefault();
    const already = requests.find((r) => r.mentorId === showRequestModal.id && r.menteeId === user.id && r.status !== 'declined');
    if (already) {
      setSuccessMsg('You already have a request with this mentor.');
      setShowRequestModal(null);
      return;
    }
    const newReq = {
      id: Date.now(),
      mentorId: showRequestModal.id,
      menteeId: user.id,
      mentorName: showRequestModal.name,
      menteeName: user.name,
      status: 'pending',
      message,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRequests([newReq, ...requests]);
    setMessage('');
    setShowRequestModal(null);
    setSuccessMsg(`Mentorship request sent to ${newReq.mentorName}.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const respondToRequest = (id, status) =>
    setRequests(requests.map((r) => r.id === id ? { ...r, status } : r));

  const myRequests = isMentor
    ? requests.filter((r) => r.mentorId === user.id)
    : requests.filter((r) => r.menteeId === user.id);

  const mentorStats = isMentor ? [
    { value: requests.filter((r) => r.mentorId === user.id && r.status === 'pending').length,   label: 'Pending Requests', color: '#f39c12', Icon: IconInbox },
    { value: requests.filter((r) => r.mentorId === user.id && r.status === 'active').length,    label: 'Active Mentees',   color: '#2D6A4F', Icon: IconUsers },
    { value: requests.filter((r) => r.mentorId === user.id && r.status === 'completed').length, label: 'Completed',        color: '#27ae60', Icon: IconCheckCircle },
    { value: ALL_MENTORS.find((m) => m.id === user.id)?.sessions || 0,                         label: 'Total Sessions',   color: '#1a73e8', Icon: IconClock },
  ] : [
    { value: ALL_MENTORS.length,                                               label: 'Available Mentors',  color: '#2D6A4F', Icon: IconUsers },
    { value: myRequests.filter((r) => r.status === 'pending').length,          label: 'Pending Requests',   color: '#f39c12', Icon: IconInbox },
    { value: myRequests.filter((r) => r.status === 'active').length,           label: 'Active Mentors',     color: '#27ae60', Icon: IconCheckCircle },
    { value: myRequests.filter((r) => r.status === 'completed').length,        label: 'Completed',          color: '#1a73e8', Icon: IconClock },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem' }}>Mentorship</h1>
          <p style={{ color: '#8888aa', marginTop: '4px' }}>
            {isMentor ? 'Manage your mentees and incoming requests.' : 'Find a mentor who can guide your journey.'}
          </p>
        </div>

        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '24px' }}>
          {mentorStats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon" style={{ background: `${s.color}12`, border: `1px solid ${s.color}28` }}>
                <s.Icon size={16} color={s.color} />
              </div>
              <div className="stat-info">
                <p style={{ color: s.color }}>{s.value}</p>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#e8e8f0', padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
          {!isMentor && (
            <button
              onClick={() => setTab('browse')}
              style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.87rem', background: tab === 'browse' ? '#fff' : 'transparent', color: tab === 'browse' ? '#E8621A' : '#4a4a6a', boxShadow: tab === 'browse' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
            >
              Browse Mentors
            </button>
          )}
          <button
            onClick={() => setTab('requests')}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '0.87rem', background: tab === 'requests' ? '#fff' : 'transparent', color: tab === 'requests' ? '#E8621A' : '#4a4a6a', boxShadow: tab === 'requests' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s' }}
          >
            {isMentor ? 'Requests & Mentees' : 'My Requests'}
          </button>
        </div>

        {/* Browse mentors */}
        {tab === 'browse' && !isMentor && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {ALL_MENTORS.map((mentor) => {
              const hasRequest = myRequests.find((r) => r.mentorId === mentor.id && r.status !== 'declined');
              return (
                <div key={mentor.id} className="card" style={{ textAlign: 'center' }}>
                  <div className="avatar avatar-lg" style={{ margin: '0 auto 12px', background: '#2D6A4F' }}>
                    {mentor.avatar}
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{mentor.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#E8621A', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {mentor.expertise}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#4a4a6a', marginBottom: '10px', lineHeight: '1.5' }}>{mentor.bio}</p>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {mentor.skills.split(', ').map((s) => (
                      <span key={s} className="badge badge-secondary">{s}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#8888aa', marginBottom: '14px' }}>
                    {mentor.location} &middot; {mentor.sessions} sessions
                  </p>
                  {hasRequest ? (
                    <span className={`badge ${STATUS_STYLES[hasRequest.status]?.badge}`} style={{ padding: '8px 20px' }}>
                      {STATUS_STYLES[hasRequest.status]?.label}
                    </span>
                  ) : (
                    <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => setShowRequestModal(mentor)}>
                      Request Mentorship
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Requests tab */}
        {tab === 'requests' && (
          myRequests.length === 0 ? (
            <div className="empty-state">
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#e8f4ef', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <IconUsers size={20} color="#2D6A4F" />
              </div>
              <h3>{isMentor ? 'No requests yet' : 'No mentorship requests yet'}</h3>
              <p>{isMentor ? 'Requests from youth will appear here.' : 'Browse mentors and send your first request.'}</p>
              {!isMentor && <button className="btn btn-primary" onClick={() => setTab('browse')}>Browse Mentors</button>}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {myRequests.map((r) => (
                <div key={r.id} className="card card-sm">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div className="avatar" style={{ background: isMentor ? '#E8621A' : '#2D6A4F' }}>
                        {isMentor ? r.menteeName?.slice(0, 2).toUpperCase() : r.mentorName?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                          {isMentor ? r.menteeName : r.mentorName}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: '#4a4a6a', margin: '2px 0' }}>
                          {r.message || 'No message provided.'}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#8888aa' }}>{r.createdAt}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                      <span className={`badge ${STATUS_STYLES[r.status]?.badge}`}>
                        {STATUS_STYLES[r.status]?.label}
                      </span>
                      {isMentor && r.status === 'pending' && (
                        <>
                          <button className="btn btn-secondary btn-sm" onClick={() => respondToRequest(r.id, 'active')}>Accept</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => respondToRequest(r.id, 'declined')}>Decline</button>
                        </>
                      )}
                      {isMentor && r.status === 'active' && (
                        <button className="btn btn-ghost btn-sm" onClick={() => respondToRequest(r.id, 'completed')}>Mark Complete</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Request Modal */}
        {showRequestModal && (
          <div className="modal-overlay" onClick={() => setShowRequestModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Request Mentorship</h2>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px', background: '#fafaf7', borderRadius: '10px', marginBottom: '20px' }}>
                <div className="avatar avatar-lg" style={{ background: '#2D6A4F' }}>{showRequestModal.avatar}</div>
                <div>
                  <p style={{ fontWeight: '700' }}>{showRequestModal.name}</p>
                  <p style={{ fontSize: '0.82rem', color: '#E8621A', fontWeight: '600' }}>{showRequestModal.expertise}</p>
                  <p style={{ fontSize: '0.78rem', color: '#8888aa' }}>{showRequestModal.location}</p>
                </div>
              </div>
              <form onSubmit={sendRequest}>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Introduce yourself and explain what you hope to learn..."
                    rows={4}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowRequestModal(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Send Request</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
