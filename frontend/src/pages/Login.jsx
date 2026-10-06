import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Sparkles, ArrowRight, CheckCircle2, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'
import Logo from '../components/common/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/app/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const demoCreds = [
    { role: 'Student Portal', email: 'student@careercompass.com', pass: 'Student@123', desc: 'Sabarish Kumar • B.Tech CSE' },
    { role: 'Industry Recruiter', email: 'industry@careercompass.com', pass: 'Industry@123', desc: 'Acme Corp Talent Partner' },
    { role: 'Academic Admin', email: 'admin@careercompass.com', pass: 'Admin@123', desc: 'CIT Placement Cell Administrator' },
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0a] text-[#f4f3ef] font-sans">
      {/* Left Showcase Banner (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] p-12 lg:p-16 flex-col justify-between border-r border-[#262626] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Brand */}
        <Link to="/" className="inline-block z-10">
          <Logo size="lg" showText={true} />
        </Link>

        {/* Value Proposition */}
        <div className="max-w-md z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs text-orange-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Placement Acceleration</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Intelligent Bridge Between Campus Talent & Industry Demand
          </h2>
          <p className="text-[#8c8b88] text-sm leading-relaxed">
            Gain immediate access to verified skill evaluations, predictive placement probability models, and automated learning pathways.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-[#d8d7d2]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>81.84% ML test accuracy with 5-fold cross-validation</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#d8d7d2]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time talent ranking for hiring managers</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#d8d7d2]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Comprehensive cohort analytics for academic deans</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-[#5c5c5b] z-10">
          <span>Final PBL Java Project • Chennai Institute of Technology</span>
        </div>
      </div>

      {/* Right Login Container */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-[#fafaf7] text-neutral-900 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Brand */}
          <div className="lg:hidden mb-8">
            <Link to="/">
              <Logo size="md" showText={true} textClassName="text-neutral-900" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Sign in to your account</h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
              Enter your credentials or select a one-click demo role below.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Work / University Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@careercompass.com"
                  className="input-field pl-9"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="label mb-0">Password</label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-field pl-9"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2">
              Create an account
            </Link>
          </p>

          {/* Quick Demo Credentials Switcher */}
          <div className="mt-10 pt-8 border-t border-neutral-200">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              One-Click Demo Credentials
            </p>
            <div className="space-y-2">
              {demoCreds.map((cred) => (
                <button
                  type="button"
                  key={cred.role}
                  onClick={() => {
                    setEmail(cred.email)
                    setPassword(cred.pass)
                  }}
                  className="w-full text-left p-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">{cred.role}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">({cred.email})</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{cred.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-orange-600 group-hover:text-orange-700 px-2 py-1 bg-orange-50 rounded-md border border-orange-200">
                    Use
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}