import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { INITIAL_POSTS } from '../data/mockData';
import { IconHeart, IconMessage, IconStar, IconLightbulb, IconHelpCircle } from '../components/Icons';

const CATEGORY_META = {
  all:           { label: 'All Posts',       color: '#4a4a6a' },
  success_story: { label: 'Success Stories', color: '#E8621A' },
  tip:           { label: 'Tips & Advice',   color: '#2D6A4F' },
  question:      { label: 'Questions',       color: '#1a73e8' },
};

const ROLE_COLORS = { youth: '#E8621A', mentor: '#2D6A4F', entrepreneur: '#1a73e8', admin: '#9b59b6' };

function PostCard({ post, currentUser, onLike, onComment }) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment]           = useState('');
  const meta = CATEGORY_META[post.category] || CATEGORY_META.tip;

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onComment(post.id, comment);
    setComment('');
  };

  const CategoryIcon = post.category === 'success_story'
    ? IconStar
    : post.category === 'tip'
    ? IconLightbulb
    : IconHelpCircle;

  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="avatar" style={{ background: ROLE_COLORS[post.authorRole] || '#E8621A' }}>
            {post.avatar}
          </div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '0.92rem' }}>{post.author}</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="badge" style={{ background: `${ROLE_COLORS[post.authorRole]}18`, color: ROLE_COLORS[post.authorRole] }}>
                {post.authorRole}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#8888aa' }}>
                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: meta.color, fontWeight: '600' }}>
          <CategoryIcon size={14} color={meta.color} />
          {meta.label}
        </div>
      </div>

      {/* Content */}
      <p style={{ fontSize: '0.92rem', color: '#1A1A2E', lineHeight: '1.7', marginBottom: '14px' }}>{post.content}</p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #e8e8f0' }}>
        <button
          onClick={() => onLike(post.id)}
          style={{
            background: post.liked ? '#fff2eb' : 'transparent',
            border: `1px solid ${post.liked ? '#E8621A' : '#e8e8f0'}`,
            borderRadius: '8px', padding: '6px 14px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '0.85rem', fontWeight: '600',
            color: post.liked ? '#E8621A' : '#4a4a6a',
            transition: 'all 0.2s',
          }}
        >
          <IconHeart size={14} color={post.liked ? '#E8621A' : '#4a4a6a'} filled={post.liked} />
          {post.likes}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          style={{ background: 'transparent', border: '1px solid #e8e8f0', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem', color: '#4a4a6a', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}
        >
          <IconMessage size={14} color="#4a4a6a" />
          {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #e8e8f0' }}>
          {post.comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <div className="avatar avatar-sm" style={{ background: '#2D6A4F' }}>{c.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ background: '#fafaf7', borderRadius: '8px', padding: '10px 12px' }}>
                  <p style={{ fontWeight: '700', fontSize: '0.82rem', marginBottom: '2px' }}>{c.author}</p>
                  <p style={{ fontSize: '0.85rem', color: '#1A1A2E' }}>{c.content}</p>
                </div>
                <p style={{ fontSize: '0.72rem', color: '#8888aa', marginTop: '3px', paddingLeft: '4px' }}>
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          <form onSubmit={submitComment} style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <div className="avatar avatar-sm" style={{ background: ROLE_COLORS[currentUser?.role] || '#E8621A', flexShrink: 0 }}>
              {currentUser?.avatar}
            </div>
            <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
              <input
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary btn-sm">Post</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts]       = useState(INITIAL_POSTS);
  const [filter, setFilter]     = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [postForm, setPostForm] = useState({ content: '', category: 'tip' });

  const createPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      userId: user.id,
      author: user.name,
      authorRole: user.role,
      avatar: user.avatar,
      content: postForm.content,
      category: postForm.category,
      likes: 0,
      liked: false,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostForm({ content: '', category: 'tip' });
    setShowModal(false);
  };

  const likePost = (postId) =>
    setPosts(posts.map((p) =>
      p.id === postId ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
    ));

  const addComment = (postId, content) => {
    const newComment = { id: Date.now(), author: user.name, avatar: user.avatar, content, createdAt: new Date().toISOString() };
    setPosts(posts.map((p) => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
  };

  const filtered    = filter === 'all' ? posts : posts.filter((p) => p.category === filter);
  const totalLikes  = posts.reduce((s, p) => s + p.likes, 0);

  const statItems = [
    { value: posts.length,                                               label: 'Total Posts',     color: '#1A1A2E' },
    { value: posts.filter((p) => p.category === 'success_story').length, label: 'Success Stories', color: '#E8621A' },
    { value: posts.filter((p) => p.category === 'tip').length,           label: 'Tips Shared',     color: '#2D6A4F' },
    { value: totalLikes,                                                  label: 'Total Likes',     color: '#1a73e8' },
  ];

  const POST_TYPES = [
    { value: 'success_story', label: 'Success Story', Icon: IconStar        },
    { value: 'tip',           label: 'Tip / Advice',  Icon: IconLightbulb   },
    { value: 'question',      label: 'Question',      Icon: IconHelpCircle  },
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem' }}>Community</h1>
            <p style={{ color: '#8888aa', marginTop: '4px' }}>Share your journey, inspire others, and learn together.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Share Post</button>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: '24px' }}>
          {statItems.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon" style={{ background: `${s.color}12`, border: `1px solid ${s.color}28` }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
              </div>
              <div className="stat-info">
                <p style={{ color: s.color }}>{s.value}</p>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="filter-bar">
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <button key={key} className={`filter-tag ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
              {meta.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <IconMessage size={20} color="#1a73e8" />
            </div>
            <h3>No posts yet</h3>
            <p>Be the first to share something with the community.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Share Your Story</button>
          </div>
        ) : (
          filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onLike={likePost}
              onComment={addComment}
            />
          ))
        )}

        {/* Create Post Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Share with the Community</h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <div className="avatar" style={{ background: ROLE_COLORS[user?.role] || '#E8621A' }}>{user?.avatar}</div>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '0.92rem' }}>{user?.name}</p>
                  <span className="badge" style={{ background: `${ROLE_COLORS[user?.role]}18`, color: ROLE_COLORS[user?.role], textTransform: 'capitalize' }}>{user?.role}</span>
                </div>
              </div>
              <form onSubmit={createPost}>
                <div className="form-group">
                  <label>Post Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {POST_TYPES.map(({ value, label, Icon }) => (
                      <div
                        key={value}
                        onClick={() => setPostForm({ ...postForm, category: value })}
                        style={{
                          border: `2px solid ${postForm.category === value ? '#E8621A' : '#e8e8f0'}`,
                          borderRadius: '10px', padding: '12px 8px', textAlign: 'center',
                          cursor: 'pointer', background: postForm.category === value ? '#fff8f3' : '#fff',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                          <Icon size={18} color={postForm.category === value ? '#E8621A' : '#8888aa'} />
                        </div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', color: postForm.category === value ? '#E8621A' : '#4a4a6a' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>What's on your mind?</label>
                  <textarea
                    className="form-control"
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder={
                      postForm.category === 'success_story' ? 'Share a win, milestone, or breakthrough...'
                      : postForm.category === 'tip'         ? 'Share a practical tip others can benefit from...'
                      : 'Ask a question the community can help answer...'
                    }
                    rows={5}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Post to Community</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
