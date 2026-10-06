const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const filesToCreate = {
    "src/pages/Landing.jsx": `import { Link } from 'react-router-dom'
import { Zap, Users, Building, TrendingUp } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="h-16 flex items-center justify-between px-6 lg:px-12 bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-slate-100">
        <div className="font-bold text-2xl text-primary-600">CareerCompass AI</div>
        <div className="space-x-4">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>
      
      <main className="pt-24 lg:pt-32">
        <section className="px-6 lg:px-12 py-20 text-center bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white rounded-3xl mx-4 lg:mx-12 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">Navigate Your Career With <span className="text-yellow-400">Intelligence</span></h1>
            <p className="text-xl lg:text-2xl mb-10 text-primary-100">The AI-powered platform bridging the gap between academia and industry. Get personalized learning roadmaps and land your dream role.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="bg-white text-primary-700 hover:bg-slate-50 font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105">Get Started Free</Link>
              <Link to="/login" className="bg-primary-800/50 hover:bg-primary-800 text-white border border-primary-500 font-bold py-3 px-8 rounded-full text-lg transition-colors">Login to Dashboard</Link>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Empowering Every Stakeholder</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Zap size={32} /></div>
              <h3 className="text-xl font-bold mb-3">Student Intelligence</h3>
              <p className="text-slate-500">Discover your skill gaps, follow AI-generated learning roadmaps, and track your placement readiness score.</p>
            </div>
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Building size={32} /></div>
              <h3 className="text-xl font-bold mb-3">Industry Collaboration</h3>
              <p className="text-slate-500">Post opportunities, discover top talent effortlessly, and filter candidates by verified skill match scores.</p>
            </div>
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><TrendingUp size={32} /></div>
              <h3 className="text-xl font-bold mb-3">Academia Analytics</h3>
              <p className="text-slate-500">Monitor student progress, analyze skill distributions, and adapt curriculum to match industry demand.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-primary-600 mb-2">10,000+</p>
              <p className="text-slate-600 font-medium">Students</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary-600 mb-2">500+</p>
              <p className="text-slate-600 font-medium">Companies</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary-600 mb-2">85%</p>
              <p className="text-slate-600 font-medium">Placement Rate</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary-600 mb-2">5,000+</p>
              <p className="text-slate-600 font-medium">Skills Tracked</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <p className="text-xl font-bold text-white mb-4">CareerCompass AI</p>
        <p>© 2024 CareerCompass AI. All rights reserved.</p>
      </footer>
    </div>
  )
}`,
    "src/pages/Login.jsx": `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  const demoCreds = [
    { role: 'Student', email: 'student@careercompass.com', pass: 'Student@123' },
    { role: 'Industry', email: 'industry@careercompass.com', pass: 'Industry@123' },
    { role: 'Academia', email: 'admin@careercompass.com', pass: 'Admin@123' }
  ]

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-primary-600 to-primary-900 text-white p-12 flex-col justify-between">
        <h1 className="text-3xl font-bold">CareerCompass AI</h1>
        <div>
          <h2 className="text-5xl font-bold mb-6">Welcome Back</h2>
          <p className="text-xl text-primary-100">Continue your journey with the most intelligent career navigation platform.</p>
        </div>
        <p className="text-sm text-primary-200">© 2024 CareerCompass AI</p>
      </div>
      <div className="flex-1 flex flex-col justify-center p-8 md:p-24 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 md:hidden">CareerCompass AI</h2>
          <h3 className="text-2xl font-semibold mb-8">Sign in to your account</h3>
          
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-field" placeholder="name@example.com" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-field" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account? <Link to="/register" className="text-primary-600 hover:underline font-medium">Register here</Link>
          </p>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Demo Credentials</h4>
            <div className="space-y-3">
              {demoCreds.map(cred => (
                <div key={cred.role} className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm flex justify-between items-center cursor-pointer hover:bg-slate-100" onClick={() => { setEmail(cred.email); setPassword(cred.pass); }}>
                  <div>
                    <span className="font-semibold block">{cred.role}</span>
                    <span className="text-slate-500">{cred.email}</span>
                  </div>
                  <span className="text-primary-600 font-mono text-xs bg-primary-50 px-2 py-1 rounded">Use</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`,
    "src/pages/Register.jsx": `import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'STUDENT', companyName: '' })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(formData)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary-600 mb-2">CareerCompass AI</h2>
          <h3 className="text-xl font-semibold text-slate-900">Create an account</h3>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">First Name</label>
              <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required className="input-field" />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Email Address</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="input-field" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="input-field" minLength={6} />
          </div>
          <div>
            <label className="label">Account Type</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="input-field">
              <option value="STUDENT">Student</option>
              <option value="INDUSTRY">Industry / Employer</option>
              <option value="ACADEMIA">Academia / Admin</option>
            </select>
          </div>
          
          {formData.role === 'INDUSTRY' && (
            <div>
              <label className="label">Company Name</label>
              <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} required className="input-field" />
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-4">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-primary-600 hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  )
}`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
    const fullPath = path.join(baseDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Pages generated");
