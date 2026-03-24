// Pre-set users for login
export const USERS = [
  {
    id: 1,
    name: 'Amara Diallo',
    email: 'youth@fountain.com',
    password: 'youth123',
    role: 'youth',
    bio: 'Aspiring entrepreneur from Dakar, passionate about agri-tech.',
    skills: 'Marketing, Social Media, Basic Accounting',
    location: 'Dakar, Senegal',
    avatar: 'AD',
  },
  {
    id: 2,
    name: 'Dr. Kwame Asante',
    email: 'mentor@fountain.com',
    password: 'mentor123',
    role: 'mentor',
    bio: 'Business strategist with 15 years helping African startups scale.',
    skills: 'Business Strategy, Finance, Leadership',
    location: 'Accra, Ghana',
    avatar: 'KA',
  },
  {
    id: 3,
    name: 'Zainab Okonkwo',
    email: 'entrepreneur@fountain.com',
    password: 'entre123',
    role: 'entrepreneur',
    bio: 'Founder of EduBridge, an edtech startup serving rural Nigeria.',
    skills: 'Product Development, Team Building, Fundraising',
    location: 'Lagos, Nigeria',
    avatar: 'ZO',
  },
  {
    id: 4,
    name: 'Admin User',
    email: 'admin@fountain.com',
    password: 'admin123',
    role: 'admin',
    bio: 'Platform administrator.',
    skills: 'Administration, Analytics',
    location: 'Kigali, Rwanda',
    avatar: 'AU',
  },
];

// Extra mentors visible to youth
export const ALL_MENTORS = [
  {
    id: 2,
    name: 'Dr. Kwame Asante',
    role: 'mentor',
    bio: 'Business strategist with 15 years helping African startups scale.',
    skills: 'Business Strategy, Finance, Leadership',
    location: 'Accra, Ghana',
    avatar: 'KA',
    expertise: 'Business & Finance',
    sessions: 48,
  },
  {
    id: 5,
    name: 'Fatima Al-Hassan',
    role: 'mentor',
    bio: 'Tech entrepreneur and investor focused on women-led startups.',
    skills: 'Technology, Investment, Mentorship',
    location: 'Nairobi, Kenya',
    avatar: 'FA',
    expertise: 'Tech & Investment',
    sessions: 62,
  },
  {
    id: 6,
    name: 'Chidi Eze',
    role: 'mentor',
    bio: 'Agricultural innovator running a successful agri-tech cooperative.',
    skills: 'Agriculture, Cooperative Models, Rural Development',
    location: 'Enugu, Nigeria',
    avatar: 'CE',
    expertise: 'Agriculture & Cooperatives',
    sessions: 35,
  },
  {
    id: 7,
    name: 'Naledi Dlamini',
    role: 'mentor',
    bio: 'Marketing expert who has scaled brands across Southern Africa.',
    skills: 'Marketing, Branding, Digital Growth',
    location: 'Johannesburg, South Africa',
    avatar: 'ND',
    expertise: 'Marketing & Branding',
    sessions: 29,
  },
];

// Initial goals for youth user
export const INITIAL_GOALS = [
  {
    id: 1,
    userId: 1,
    title: 'Launch My Organic Farm Business',
    description: 'Start a small organic farm that supplies local restaurants and markets.',
    category: 'business',
    targetDate: '2025-12-31',
    status: 'active',
    createdAt: '2025-01-10',
    milestones: [
      { id: 1, title: 'Research local market demand', isCompleted: true, dueDate: '2025-02-01' },
      { id: 2, title: 'Secure a small plot of land', isCompleted: true, dueDate: '2025-03-01' },
      { id: 3, title: 'Register the business officially', isCompleted: false, dueDate: '2025-04-01' },
      { id: 4, title: 'First harvest and sale', isCompleted: false, dueDate: '2025-08-01' },
    ],
  },
  {
    id: 2,
    userId: 1,
    title: 'Complete Online Business Course',
    description: 'Finish a 3-month online entrepreneurship certificate.',
    category: 'education',
    targetDate: '2025-06-30',
    status: 'active',
    createdAt: '2025-01-15',
    milestones: [
      { id: 5, title: 'Enroll in course', isCompleted: true, dueDate: '2025-01-20' },
      { id: 6, title: 'Complete Module 1: Business Fundamentals', isCompleted: true, dueDate: '2025-02-15' },
      { id: 7, title: 'Complete Module 2: Finance Basics', isCompleted: false, dueDate: '2025-03-15' },
      { id: 8, title: 'Final project submission', isCompleted: false, dueDate: '2025-06-20' },
    ],
  },
  {
    id: 3,
    userId: 1,
    title: 'Save $500 Emergency Fund',
    description: 'Build a financial safety net before reinvesting in the business.',
    category: 'finance',
    targetDate: '2025-09-01',
    status: 'active',
    createdAt: '2025-02-01',
    milestones: [
      { id: 9, title: 'Open dedicated savings account', isCompleted: true, dueDate: '2025-02-10' },
      { id: 10, title: 'Save first $100', isCompleted: true, dueDate: '2025-03-01' },
      { id: 11, title: 'Save $250 (halfway)', isCompleted: false, dueDate: '2025-05-01' },
      { id: 12, title: 'Reach $500 target', isCompleted: false, dueDate: '2025-09-01' },
    ],
  },
];

// Initial business plans
export const INITIAL_BUSINESS_PLANS = [
  {
    id: 1,
    userId: 1,
    businessName: 'GreenRoot Organics',
    description: 'An organic produce farm supplying restaurants and local markets in Dakar with fresh, chemical-free vegetables.',
    industry: 'Agriculture',
    targetMarket: 'Local restaurants, health-conscious households, and urban markets in Dakar.',
    revenueModel: 'Direct sales to restaurants (60%), farmers market stalls (25%), online orders (15%).',
    status: 'active',
    createdAt: '2025-01-12',
    financials: [
      { id: 1, type: 'income', amount: 350, category: 'Sales', description: 'Tomato batch - Restaurant Teranga', date: '2025-02-15' },
      { id: 2, type: 'income', amount: 120, category: 'Sales', description: 'Farmers market weekend', date: '2025-03-02' },
      { id: 3, type: 'expense', amount: 80, category: 'Seeds & Supplies', description: 'Organic seeds purchase', date: '2025-01-20' },
      { id: 4, type: 'expense', amount: 45, category: 'Transport', description: 'Delivery fuel cost', date: '2025-02-28' },
      { id: 5, type: 'income', amount: 200, category: 'Sales', description: 'Bulk lettuce order', date: '2025-03-10' },
      { id: 6, type: 'expense', amount: 60, category: 'Equipment', description: 'Irrigation pipes', date: '2025-03-05' },
    ],
  },
];

// Community posts
export const INITIAL_POSTS = [
  {
    id: 1,
    userId: 3,
    author: 'Zainab Okonkwo',
    authorRole: 'entrepreneur',
    avatar: 'ZO',
    content: 'Just closed our Series A round! EduBridge is now serving 50,000 rural students across Nigeria. Started with zero funding and a dream. To every young person reading this — your idea matters. Start small, stay consistent. You are not a stream waiting to be filled. Be the fountain!',
    category: 'success_story',
    likes: 142,
    liked: false,
    createdAt: '2025-03-15T10:30:00',
    comments: [
      { id: 1, author: 'Amara Diallo', avatar: 'AD', content: 'This is so inspiring! Congratulations!', createdAt: '2025-03-15T11:00:00' },
      { id: 2, author: 'Dr. Kwame Asante', avatar: 'KA', content: 'Proud of you Zainab. This is what resilience looks like.', createdAt: '2025-03-15T12:00:00' },
    ],
  },
  {
    id: 2,
    userId: 2,
    author: 'Dr. Kwame Asante',
    authorRole: 'mentor',
    avatar: 'KA',
    content: 'TIP: Before you seek investors, validate your idea with 10 paying customers. Revenue is the best pitch deck. Many youth waste months building perfect presentations when 10 sales would be more convincing than any slide.',
    category: 'tip',
    likes: 89,
    liked: false,
    createdAt: '2025-03-14T09:00:00',
    comments: [
      { id: 3, author: 'Fatima Al-Hassan', avatar: 'FA', content: 'Absolutely agree. Traction beats everything.', createdAt: '2025-03-14T09:45:00' },
    ],
  },
  {
    id: 3,
    userId: 1,
    author: 'Amara Diallo',
    authorRole: 'youth',
    avatar: 'AD',
    content: 'Question for the community: What is the best way to register a small agri-business in Senegal? I have my first farm plot but not sure about the legal steps. Any guidance would be appreciated!',
    category: 'question',
    likes: 23,
    liked: false,
    createdAt: '2025-03-13T14:00:00',
    comments: [
      { id: 4, author: 'Chidi Eze', avatar: 'CE', content: 'Visit the APIX office in Dakar — they have a one-stop shop for business registration. Takes about 3 days and costs around 50,000 CFA.', createdAt: '2025-03-13T15:00:00' },
    ],
  },
  {
    id: 4,
    userId: 5,
    author: 'Fatima Al-Hassan',
    authorRole: 'mentor',
    avatar: 'FA',
    content: 'Success story: One of my mentees, Kofi, started a mobile phone repair shop 8 months ago with just $200. He now employs 3 people and earns $1,200/month. He did not wait for the perfect moment. He started with what he had. That is the fountain mindset.',
    category: 'success_story',
    likes: 201,
    liked: false,
    createdAt: '2025-03-12T08:00:00',
    comments: [],
  },
  {
    id: 5,
    userId: 6,
    author: 'Chidi Eze',
    authorRole: 'mentor',
    avatar: 'CE',
    content: 'TIP: In agriculture, focus on crops with short harvest cycles first (tomatoes, spinach, green beans). You get cash flow faster, build confidence, and reinvest into larger crops. Start small, learn fast, grow steady.',
    category: 'tip',
    likes: 67,
    liked: false,
    createdAt: '2025-03-11T11:00:00',
    comments: [
      { id: 5, author: 'Amara Diallo', avatar: 'AD', content: 'This is exactly what I needed to hear. Starting with tomatoes this season!', createdAt: '2025-03-11T13:00:00' },
    ],
  },
];

// Mentorship requests
export const INITIAL_MENTORSHIP_REQUESTS = [
  {
    id: 1,
    mentorId: 2,
    menteeId: 1,
    mentorName: 'Dr. Kwame Asante',
    menteeName: 'Amara Diallo',
    status: 'active',
    message: 'I would love guidance on financial planning for my agri-business.',
    createdAt: '2025-02-20',
  },
];

// Dashboard stats per role
export const getDashboardStats = (role) => {
  if (role === 'youth') {
    return {
      goals: { value: 3, label: 'Active Goals', icon: '🎯' },
      milestones: { value: 4, label: 'Milestones Done', icon: '✅' },
      mentors: { value: 1, label: 'Active Mentors', icon: '🤝' },
      posts: { value: 3, label: 'Community Posts', icon: '💬' },
    };
  }
  if (role === 'mentor') {
    return {
      mentees: { value: 12, label: 'Active Mentees', icon: '👥' },
      sessions: { value: 48, label: 'Sessions Done', icon: '📋' },
      pending: { value: 3, label: 'Pending Requests', icon: '⏳' },
      posts: { value: 15, label: 'Tips Shared', icon: '💡' },
    };
  }
  if (role === 'entrepreneur') {
    return {
      businesses: { value: 2, label: 'Businesses', icon: '🏢' },
      revenue: { value: '$12,400', label: 'Total Revenue', icon: '💰' },
      employees: { value: 8, label: 'Team Members', icon: '👷' },
      posts: { value: 7, label: 'Stories Shared', icon: '🌟' },
    };
  }
  return {
    users: { value: 1240, label: 'Total Users', icon: '👤' },
    mentors: { value: 86, label: 'Mentors', icon: '🎓' },
    businesses: { value: 342, label: 'Business Plans', icon: '📊' },
    posts: { value: 891, label: 'Community Posts', icon: '💬' },
  };
};

export const RECENT_ACTIVITY = [
  { id: 1, text: 'Completed milestone: "Research local market demand"', time: '2 days ago', icon: '✅' },
  { id: 2, text: 'New comment on your community post', time: '3 days ago', icon: '💬' },
  { id: 3, text: 'Dr. Kwame accepted your mentorship request', time: '1 week ago', icon: '🤝' },
  { id: 4, text: 'Added financial record: Revenue $350', time: '1 week ago', icon: '💰' },
  { id: 5, text: 'Goal "Complete Online Business Course" updated', time: '2 weeks ago', icon: '🎯' },
];
