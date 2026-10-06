const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const filesToCreate = {
    "src/layouts/AppLayout.jsx": `import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LayoutDashboard, User, Zap, Compass, Target, Map, Briefcase, FileText, Trophy, Building, Users, Search, BarChart2, TrendingUp, BookOpen, Bell, LogOut } from 'lucide-react'

export default function AppLayout() {
  const { user, logout } = useAuth()

  const studentLinks = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/app/profile', icon: User, label: 'My Profile' },
    { to: '/app/skills', icon: Zap, label: 'Skills' },
    { to: '/app/career', icon: Compass, label: 'Career Intelligence' },
    { to: '/app/skill-gap', icon: Target, label: 'Skill Gap' },
    { to: '/app/roadmap', icon: Map, label: 'Learning Roadmap' },
    { to: '/app/opportunities', icon: Briefcase, label: 'Opportunities' },
    { to: '/app/applications', icon: FileText, label: 'Applications' },
    { to: '/app/placement', icon: Trophy, label: 'Placement Readiness' },
  ]

  const industryLinks = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/app/company', icon: Building, label: 'Company Profile' },
    { to: '/app/my-opportunities', icon: Briefcase, label: 'My Opportunities' },
    { to: '/app/create-opportunity', icon: FileText, label: 'Post Opportunity' },
    { to: '/app/applicants', icon: Users, label: 'Applicants' },
    { to: '/app/candidates', icon: Search, label: 'Candidate Search' },
  ]

  const academiaLinks = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/app/students', icon: Users, label: 'Student Analytics' },
    { to: '/app/skill-analytics', icon: BarChart2, label: 'Skill Analytics' },
    { to: '/app/placement-analytics', icon: TrendingUp, label: 'Placement Analytics' },
    { to: '/app/industry-demand', icon: Building, label: 'Industry Demand' },
    { to: '/app/training', icon: BookOpen, label: 'Training Recommendations' },
  ]

  const links = user?.role === 'STUDENT' ? studentLinks : user?.role === 'INDUSTRY' ? industryLinks : academiaLinks

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="w-64 bg-slate-800 text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 font-bold text-xl border-b border-slate-700">CareerCompass AI</div>
        <nav className="flex-1 overflow-y-auto py-4">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => \`flex items-center px-6 py-3 text-sm font-medium transition-colors \${isActive ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}\`}>
              <link.icon className="w-5 h-5 mr-3" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
          <div className="flex items-center">
             <div className="md:hidden font-bold text-xl text-primary-600">CareerCompass</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-500">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-700">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}`,
    "src/layouts/AuthLayout.jsx": `import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">CareerCompass AI</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          <Outlet />
        </div>
      </div>
    </div>
  )
}`,
    "src/components/common/StatCard.jsx": `export default function StatCard({ title, value, subtitle, icon: Icon, color = 'indigo', trend }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <div className="card flex items-start gap-4">
      <div className={\`p-3 rounded-lg \${colors[color]}\`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {trend && <p className={\`text-xs mt-1 \${trend > 0 ? 'text-green-600' : 'text-red-600'}\`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </p>}
      </div>
    </div>
  )
}`,
    "src/components/common/ProgressBar.jsx": `export default function ProgressBar({ value, max = 100, color = 'primary', showLabel = true, size = 'md' }) {
  const pct = Math.min(Math.round((value / max) * 100), 100)
  const colors = { primary: 'bg-primary-600', green: 'bg-green-500', yellow: 'bg-yellow-500', red: 'bg-red-500' }
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  return (
    <div>
      {showLabel && <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>Progress</span><span>{pct}%</span>
      </div>}
      <div className={\`w-full bg-slate-200 rounded-full \${heights[size]}\`}>
        <div className={\`\${colors[color]} \${heights[size]} rounded-full transition-all duration-500\`} style={{ width: \`\${pct}%\` }} />
      </div>
    </div>
  )
}`,
    "src/components/common/StatusBadge.jsx": `const STATUS_STYLES = {
  APPLIED: 'badge-blue',
  UNDER_REVIEW: 'badge-yellow',
  SHORTLISTED: 'badge-purple',
  INTERVIEW: 'badge-purple',
  SELECTED: 'badge-green',
  REJECTED: 'badge-red',
  WITHDRAWN: 'badge-gray',
  ACTIVE: 'badge-green',
  CLOSED: 'badge-red',
  DRAFT: 'badge-gray',
}

export default function StatusBadge({ status }) {
  return (
    <span className={STATUS_STYLES[status] || 'badge-gray'}>
      {status?.replace('_', ' ')}
    </span>
  )
}`,
    "src/components/common/LoadingSpinner.jsx": `export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className={\`animate-spin rounded-full border-b-2 border-primary-600 \${sizes[size]}\`} />
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  )
}`,
    "src/components/common/EmptyState.jsx": `export default function EmptyState({ title, description, action, icon: Icon }) {
  return (
    <div className="text-center py-12">
      {Icon && <Icon className="mx-auto h-12 w-12 text-slate-300 mb-4" />}
      <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
      <p className="text-slate-500 mt-1 text-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}`,
    "src/components/common/Modal.jsx": `import { X } from 'lucide-react'
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null
  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-2xl', xl: 'max-w-4xl' }
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" />
        <div className={\`relative bg-white rounded-2xl shadow-xl w-full \${sizes[size]} p-6\`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}`,
    "src/components/common/PageHeader.jsx": `export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-slate-500 mt-1 text-sm">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}`,
    "src/components/charts/SkillBarChart.jsx": `import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SkillBarChart({ data, dataKey = 'proficiency', nameKey = 'name' }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} angle={-35} textAnchor="end" />
        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}`,
    "src/components/charts/ApplicationPieChart.jsx": `import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export default function ApplicationPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({name, percent}) => \`\${name} \${(percent*100).toFixed(0)}%\`}>
          {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
    const fullPath = path.join(baseDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Layouts and Components generated");
