import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Sparkles, ArrowRight, User, Mail, Lock, Building, AlertCircle, Loader2 } from 'lucide-react'
import Logo from '../components/common/Logo'

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'STUDENT',
    companyName: '',
  })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(formData)
      navigate('/app/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check the provided information.')
    } finally {
      setLoading(false)
    }
  }

  const roleOptions = [
    { value: 'STUDENT', title: 'Student', desc: 'Personalized roadmaps & placement scoring' },
    { value: 'INDUSTRY', title: 'Employer / Recruiter', desc: 'Post opportunities & search verified talent' },
    { value: 'ACADEMIA', title: 'Academic Admin', desc: 'Monitor cohort performance & demand trends' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link to="/" className="inline-flex justify-center mb-6">
          <Logo size="lg" showText={true} />
        </Link>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Create Your Platform Account
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-[#8c8b88]">
          Join the empirical placement intelligence ecosystem
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-[#fafaf7] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-neutral-200">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium flex items-center gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Select Pills */}
            <div>
              <label className="label">Select Account Role</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: opt.value })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.role === opt.value
                        ? 'border-orange-500 bg-orange-50/70 text-neutral-900 ring-1 ring-orange-500'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-neutral-900">{opt.title}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="label">First Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    placeholder="Sabarish"
                    className="input-field pl-9"
                  />
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>
              <div>
                <label className="label">Last Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    placeholder="Kumar"
                    className="input-field pl-9"
                  />
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="student@careercompass.com"
                  className="input-field pl-9"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="label">Password (min 6 characters)</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="input-field pl-9"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
            </div>

            {formData.role === 'INDUSTRY' && (
              <div>
                <label className="label">Organization / Company Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    placeholder="Acme Technologies Inc."
                    className="input-field pl-9"
                  />
                  <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Profile...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Already have an active account?{' '}
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}