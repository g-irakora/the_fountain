import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { INITIAL_GOALS } from '../data/mockData';

const CATEGORIES = ['all', 'business', 'education', 'finance', 'personal', 'health'];
const CAT_COLORS = { business: '#E8621A', education: '#1a73e8', finance: '#27ae60', personal: '#9b59b6', health: '#e91e8c' };

const STATUS_BADGE = { active: 'badge-primary', completed: 'badge-success', paused: 'badge-warning' };

function GoalCard({ goal, onToggleMilestone, onChangeStatus, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const done  = goal.milestones.filter((m) => m.isCompleted).length;
  const total = goal.milestones.length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>{goal.title}</h3>
            <span className={`badge ${STATUS_BADGE[goal.status]}`}>{goal.status}</span>
            <span className="badge" style={{ background: `${CAT_COLORS[goal.category]}18`, color: CAT_COLORS[goal.category] }}>
              {goal.category}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#4a4a6a', marginBottom: '8px' }}>{goal.description}</p>
          <p style={{ fontSize: '0.78rem', color: '#8888aa' }}>Target: {goal.targetDate}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
          <select
            value={goal.status}
            onChange={(e) => onChangeStatus(goal.id, e.target.value)}
            style={{ padding: '4px 8px', border: '1px solid #e8e8f0', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer' }}
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => onDelete(goal.id)} style={{ background: '#fdecea', border: 'none', borderRadius: '6px', padding: '4px 10px', color: '#e74c3c', cursor: 'pointer', fontSize: '0.85rem' }}>
            🗑
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.8rem', color: '#4a4a6a' }}>Progress — {done}/{total} milestones</span>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: CAT_COLORS[goal.category] || '#E8621A' }}>{pct}%</span>
        </div>
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${pct}%`, background: CAT_COLORS[goal.category] || '#E8621A' }} />
        </div>
      </div>

      {/* Milestones */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ background: 'none', border: 'none', fontSize: '0.82rem', color: '#E8621A', fontWeight: '600', cursor: 'pointer', padding: 0 }}
      >
        {expanded ? '▲ Hide milestones' : '▼ Show milestones'}
      </button>

      {expanded && (
        <div style={{ marginTop: '12px', padding: '12px', background: '#fafaf7', borderRadius: '8px' }}>
          {goal.milestones.length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: '#8888aa' }}>No milestones yet.</p>
          ) : (
            goal.milestones.map((m) => (
              <label key={m.id} className={`checkbox-row ${m.isCompleted ? 'done' : ''}`}>
                <input
                  type="checkbox"
                  checked={m.isCompleted}
                  onChange={() => onToggleMilestone(goal.id, m.id)}
                />
                <span style={{ flex: 1, fontSize: '0.87rem' }}>{m.title}</span>
                {m.dueDate && <span style={{ fontSize: '0.75rem', color: '#8888aa' }}>{m.dueDate}</span>}
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function Goals() {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(null); // goalId
  const [form, setForm] = useState({ title: '', description: '', category: 'business', targetDate: '' });
  const [milestoneForm, setMilestoneForm] = useState({ title: '', dueDate: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleM = (e) => setMilestoneForm({ ...milestoneForm, [e.target.name]: e.target.value });

  const addGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      userId: 1,
      title: form.title,
      description: form.description,
      category: form.category,
      targetDate: form.targetDate,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      milestones: [],
    };
    setGoals([newGoal, ...goals]);
    setForm({ title: '', description: '', category: 'business', targetDate: '' });
    setShowModal(false);
  };

  const addMilestone = (e) => {
    e.preventDefault();
    setGoals(goals.map((g) =>
      g.id === showMilestoneModal
        ? { ...g, milestones: [...g.milestones, { id: Date.now(), title: milestoneForm.title, isCompleted: false, dueDate: milestoneForm.dueDate }] }
        : g
    ));
    setMilestoneForm({ title: '', dueDate: '' });
    setShowMilestoneModal(null);
  };

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals(goals.map((g) =>
      g.id === goalId
        ? { ...g, milestones: g.milestones.map((m) => m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m) }
        : g
    ));
  };

  const changeStatus = (goalId, status) => {
    setGoals(goals.map((g) => g.id === goalId ? { ...g, status } : g));
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter((g) => g.id !== goalId));
  };

  const filtered = filter === 'all' ? goals : goals.filter((g) => g.category === filter);
  const activeCount    = goals.filter((g) => g.status === 'active').length;
  const completedCount = goals.filter((g) => g.status === 'completed').length;
  const allMilestones  = goals.flatMap((g) => g.milestones);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>My Goals 🎯</h1>
            <p style={{ color: '#8888aa', marginTop: '4px' }}>Set realistic goals and track every step forward.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {showMilestoneModal === null && (
              <button className="btn btn-ghost btn-sm" onClick={() => setShowMilestoneModal(goals[0]?.id || null)} disabled={goals.length === 0}>
                + Milestone
              </button>
            )}
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Goal</button>
          </div>
        </div>

        {/* Summary */}
        <div className="stats-grid" style={{ marginBottom: '24px' }}>
          {[
            { icon: '🎯', value: goals.length, label: 'Total Goals' },
            { icon: '⚡', value: activeCount, label: 'Active' },
            { icon: '✅', value: completedCount, label: 'Completed' },
            { icon: '🏁', value: `${allMilestones.filter((m) => m.isCompleted).length}/${allMilestones.length}`, label: 'Milestones Done' },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-info"><p>{s.value}</p><p>{s.label}</p></div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="filter-bar">
          {CATEGORIES.map((c) => (
            <button key={c} className={`filter-tag ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Goals list */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>No goals yet</h3>
            <p>Set your first goal and start making progress today.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Create Your First Goal</button>
          </div>
        ) : (
          filtered.map((g) => (
            <div key={g.id}>
              <GoalCard
                goal={g}
                onToggleMilestone={toggleMilestone}
                onChangeStatus={changeStatus}
                onDelete={deleteGoal}
              />
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginBottom: '16px', marginTop: '-8px' }}
                onClick={() => setShowMilestoneModal(g.id)}
              >
                + Add Milestone to this goal
              </button>
            </div>
          ))
        )}

        {/* New Goal Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Create New Goal</h2>
              <form onSubmit={addGoal}>
                <div className="form-group">
                  <label>Goal Title</label>
                  <input className="form-control" name="title" value={form.title} onChange={handle} placeholder="e.g. Launch my bakery business" required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" name="description" value={form.description} onChange={handle} placeholder="What do you want to achieve and why?" />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" name="category" value={form.category} onChange={handle}>
                      <option value="business">Business</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="personal">Personal</option>
                      <option value="health">Health</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Target Date</label>
                    <input className="form-control" type="date" name="targetDate" value={form.targetDate} onChange={handle} required />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Goal</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Milestone Modal */}
        {showMilestoneModal !== null && (
          <div className="modal-overlay" onClick={() => setShowMilestoneModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Add Milestone</h2>
              <p style={{ color: '#8888aa', fontSize: '0.87rem', marginBottom: '20px' }}>
                Goal: <strong>{goals.find((g) => g.id === showMilestoneModal)?.title}</strong>
              </p>
              <form onSubmit={addMilestone}>
                <div className="form-group">
                  <label>Milestone Title</label>
                  <input className="form-control" name="title" value={milestoneForm.title} onChange={handleM} placeholder="e.g. Register the business" required />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input className="form-control" type="date" name="dueDate" value={milestoneForm.dueDate} onChange={handleM} />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowMilestoneModal(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Milestone</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
