import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { INITIAL_BUSINESS_PLANS } from '../data/mockData';
import { IconTrendingUp, IconTrendingDown, IconDollar } from '../components/Icons';

const INDUSTRIES = ['Agriculture', 'Technology', 'Retail', 'Education', 'Health', 'Services', 'Manufacturing', 'Finance'];

function FinancialSummary({ financials }) {
  const income   = financials.filter((f) => f.type === 'income').reduce((s, f)  => s + f.amount, 0);
  const expenses = financials.filter((f) => f.type === 'expense').reduce((s, f) => s + f.amount, 0);
  const profit   = income - expenses;

  const items = [
    { label: 'Total Income',   value: income,   color: '#27ae60', Icon: IconTrendingUp   },
    { label: 'Total Expenses', value: expenses,  color: '#e74c3c', Icon: IconTrendingDown },
    { label: 'Net Profit',     value: profit,    color: profit >= 0 ? '#27ae60' : '#e74c3c', Icon: IconDollar },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
      {items.map((s) => (
        <div key={s.label} style={{ padding: '14px', background: '#fafaf7', borderRadius: '10px', textAlign: 'center', border: `1px solid ${s.color}20` }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
            <s.Icon size={16} color={s.color} />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: '700', color: s.color, fontFamily: 'Poppins, sans-serif' }}>
            ${s.value.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8888aa', marginTop: '2px' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function BusinessPlan() {
  const [plans, setPlans]           = useState(INITIAL_BUSINESS_PLANS);
  const [activePlan, setActivePlan] = useState(INITIAL_BUSINESS_PLANS[0]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showFinModal,  setShowFinModal]  = useState(false);
  const [planForm, setPlanForm] = useState({ businessName: '', description: '', industry: 'Agriculture', targetMarket: '', revenueModel: '' });
  const [finForm,  setFinForm]  = useState({ type: 'income', amount: '', category: 'Sales', description: '', date: '' });

  const handleP = (e) => setPlanForm({ ...planForm, [e.target.name]: e.target.value });
  const handleF = (e) => setFinForm({ ...finForm,   [e.target.name]: e.target.value });

  const addPlan = (e) => {
    e.preventDefault();
    const newPlan = { id: Date.now(), userId: 1, ...planForm, status: 'draft', createdAt: new Date().toISOString().split('T')[0], financials: [] };
    const updated = [newPlan, ...plans];
    setPlans(updated);
    setActivePlan(newPlan);
    setPlanForm({ businessName: '', description: '', industry: 'Agriculture', targetMarket: '', revenueModel: '' });
    setShowPlanModal(false);
  };

  const addFinancial = (e) => {
    e.preventDefault();
    const record  = { id: Date.now(), type: finForm.type, amount: parseFloat(finForm.amount), category: finForm.category, description: finForm.description, date: finForm.date };
    const updated = plans.map((p) => p.id === activePlan.id ? { ...p, financials: [...p.financials, record] } : p);
    setPlans(updated);
    setActivePlan({ ...activePlan, financials: [...activePlan.financials, record] });
    setFinForm({ type: 'income', amount: '', category: 'Sales', description: '', date: '' });
    setShowFinModal(false);
  };

  const toggleStatus = (planId) => {
    const updated = plans.map((p) =>
      p.id === planId
        ? { ...p, status: p.status === 'draft' ? 'active' : p.status === 'active' ? 'completed' : 'draft' }
        : p
    );
    setPlans(updated);
    if (activePlan?.id === planId) setActivePlan(updated.find((p) => p.id === planId));
  };

  const STATUS_BADGE = { draft: 'badge-warning', active: 'badge-primary', completed: 'badge-success' };

  const planSections = activePlan ? [
    { label: 'Description',   value: activePlan.description   },
    { label: 'Industry',      value: activePlan.industry      },
    { label: 'Target Market', value: activePlan.targetMarket  },
    { label: 'Revenue Model', value: activePlan.revenueModel  },
  ] : [];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>Business Plans</h1>
            <p style={{ color: '#8888aa', marginTop: '4px' }}>Plan, track, and grow your business.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowPlanModal(true)}>+ New Plan</button>
        </div>

        {plans.length === 0 ? (
          <div className="empty-state">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fff2eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <IconTrendingUp size={20} color="#E8621A" />
            </div>
            <h3>No business plans yet</h3>
            <p>Every great business starts with a plan.</p>
            <button className="btn btn-primary" onClick={() => setShowPlanModal(true)}>Create Your First Plan</button>
          </div>
        ) : (
          <div className="grid-2">
            {/* Plan list */}
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '14px', color: '#4a4a6a', fontWeight: '600' }}>My Plans ({plans.length})</h3>
              {plans.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActivePlan(p)}
                  style={{
                    padding: '16px',
                    border: `2px solid ${activePlan?.id === p.id ? '#E8621A' : '#e8e8f0'}`,
                    borderRadius: '10px',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    background: activePlan?.id === p.id ? '#fff8f3' : '#fff',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '0.95rem' }}>{p.businessName}</h4>
                    <span className={`badge ${STATUS_BADGE[p.status]}`}>{p.status}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#4a4a6a', marginBottom: '6px' }}>
                    {p.description?.slice(0, 80)}{p.description?.length > 80 ? '…' : ''}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="badge badge-blue">{p.industry}</span>
                    <span style={{ fontSize: '0.75rem', color: '#8888aa' }}>{p.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active plan detail */}
            {activePlan && (
              <div>
                <div className="card" style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.15rem' }}>{activePlan.businessName}</h2>
                      <span className={`badge ${STATUS_BADGE[activePlan.status]}`} style={{ marginTop: '4px', display: 'inline-block' }}>{activePlan.status}</span>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(activePlan.id)}>
                      Change Status
                    </button>
                  </div>

                  {planSections.map((row) => (
                    <div key={row.label} style={{ marginBottom: '14px' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#8888aa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{row.label}</p>
                      <p style={{ fontSize: '0.88rem', color: '#1A1A2E', lineHeight: '1.5' }}>{row.value || '—'}</p>
                    </div>
                  ))}
                </div>

                {/* Financials */}
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1rem' }}>Financial Tracker</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowFinModal(true)}>+ Add Record</button>
                  </div>

                  <FinancialSummary financials={activePlan.financials} />

                  {activePlan.financials.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#8888aa', fontSize: '0.85rem', padding: '16px' }}>
                      No records yet. Start tracking income and expenses.
                    </p>
                  ) : (
                    activePlan.financials.map((f) => (
                      <div
                        key={f.id}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e8e8f0' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {f.type === 'income'
                            ? <IconTrendingUp size={15} color="#27ae60" />
                            : <IconTrendingDown size={15} color="#e74c3c" />
                          }
                          <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>{f.description}</p>
                            <p style={{ fontSize: '0.75rem', color: '#8888aa' }}>{f.category} · {f.date}</p>
                          </div>
                        </div>
                        <span style={{ fontWeight: '700', color: f.type === 'income' ? '#27ae60' : '#e74c3c', fontFamily: 'Poppins, sans-serif' }}>
                          {f.type === 'income' ? '+' : '-'}${f.amount.toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* New Plan Modal */}
        {showPlanModal && (
          <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>New Business Plan</h2>
              <form onSubmit={addPlan}>
                <div className="form-group">
                  <label>Business Name</label>
                  <input className="form-control" name="businessName" value={planForm.businessName} onChange={handleP} placeholder="e.g. GreenRoot Organics" required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" name="description" value={planForm.description} onChange={handleP} placeholder="What does this business do?" />
                </div>
                <div className="form-group">
                  <label>Industry</label>
                  <select className="form-control" name="industry" value={planForm.industry} onChange={handleP}>
                    {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Target Market</label>
                  <textarea className="form-control" name="targetMarket" value={planForm.targetMarket} onChange={handleP} placeholder="Who are your customers?" rows={2} />
                </div>
                <div className="form-group">
                  <label>Revenue Model</label>
                  <textarea className="form-control" name="revenueModel" value={planForm.revenueModel} onChange={handleP} placeholder="How will the business make money?" rows={2} />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowPlanModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Plan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Financial Record Modal */}
        {showFinModal && (
          <div className="modal-overlay" onClick={() => setShowFinModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Add Financial Record</h2>
              <form onSubmit={addFinancial}>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Type</label>
                    <select className="form-control" name="type" value={finForm.type} onChange={handleF}>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Amount ($)</label>
                    <input className="form-control" type="number" step="0.01" name="amount" value={finForm.amount} onChange={handleF} placeholder="0.00" required />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" name="category" value={finForm.category} onChange={handleF}>
                      {['Sales', 'Services', 'Investment', 'Seeds & Supplies', 'Transport', 'Equipment', 'Marketing', 'Salaries', 'Rent', 'Other'].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input className="form-control" type="date" name="date" value={finForm.date} onChange={handleF} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input className="form-control" name="description" value={finForm.description} onChange={handleF} placeholder="Brief description of this record" />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowFinModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Record</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
