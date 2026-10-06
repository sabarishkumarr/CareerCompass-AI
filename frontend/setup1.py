import os
import sys

base_dir = r"c:\sabarish\Projects\Career Compass\frontend"

files_to_create = {
    "tailwind.config.js": """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4c4ff',
          300: '#a5a5ff',
          400: '#8b8bf5',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}""",
    "src/index.css": """@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    @apply bg-slate-50 text-slate-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  .btn-secondary {
    @apply bg-white hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-lg border border-slate-200 transition-colors duration-200;
  }
  .btn-danger {
    @apply bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
  .card {
    @apply bg-white rounded-xl shadow-sm border border-slate-100 p-6;
  }
  .input-field {
    @apply w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all;
  }
  .label {
    @apply block text-sm font-medium text-slate-700 mb-1;
  }
  .badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
  }
  .badge-green { @apply badge bg-green-100 text-green-800; }
  .badge-blue { @apply badge bg-blue-100 text-blue-800; }
  .badge-yellow { @apply badge bg-yellow-100 text-yellow-800; }
  .badge-red { @apply badge bg-red-100 text-red-800; }
  .badge-purple { @apply badge bg-purple-100 text-purple-800; }
  .badge-gray { @apply badge bg-slate-100 text-slate-700; }
}""",
    "src/main.jsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)""",
    "src/App.jsx": """import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentProfile from './pages/student/StudentProfile'
import StudentSkills from './pages/student/StudentSkills'
import CareerIntelligence from './pages/student/CareerIntelligence'
import SkillGapPage from './pages/student/SkillGapPage'
import LearningRoadmap from './pages/student/LearningRoadmap'
import OpportunitiesPage from './pages/student/OpportunitiesPage'
import ApplicationsPage from './pages/student/ApplicationsPage'
import PlacementReadiness from './pages/student/PlacementReadiness'
import IndustryDashboard from './pages/industry/IndustryDashboard'
import CompanyProfile from './pages/industry/CompanyProfile'
import MyOpportunities from './pages/industry/MyOpportunities'
import CreateOpportunity from './pages/industry/CreateOpportunity'
import ApplicantsPage from './pages/industry/ApplicantsPage'
import CandidateSearch from './pages/industry/CandidateSearch'
import AcademiaDashboard from './pages/academia/AcademiaDashboard'
import StudentAnalytics from './pages/academia/StudentAnalytics'
import SkillAnalytics from './pages/academia/SkillAnalytics'
import PlacementAnalytics from './pages/academia/PlacementAnalytics'
import IndustryDemand from './pages/academia/IndustryDemand'
import TrainingRecommendations from './pages/academia/TrainingRecommendations'

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/app/dashboard" replace />
  return children
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={user ? <Navigate to="/app/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/app/dashboard" /> : <Register />} />
      
      <Route path="/app" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={
          user?.role === 'STUDENT' ? <StudentDashboard /> :
          user?.role === 'INDUSTRY' ? <IndustryDashboard /> :
          user?.role === 'ACADEMIA' ? <AcademiaDashboard /> :
          <Navigate to="/login" />
        } />

        <Route path="profile" element={<ProtectedRoute roles={['STUDENT']}><StudentProfile /></ProtectedRoute>} />
        <Route path="skills" element={<ProtectedRoute roles={['STUDENT']}><StudentSkills /></ProtectedRoute>} />
        <Route path="career" element={<ProtectedRoute roles={['STUDENT']}><CareerIntelligence /></ProtectedRoute>} />
        <Route path="skill-gap" element={<ProtectedRoute roles={['STUDENT']}><SkillGapPage /></ProtectedRoute>} />
        <Route path="roadmap" element={<ProtectedRoute roles={['STUDENT']}><LearningRoadmap /></ProtectedRoute>} />
        <Route path="opportunities" element={<ProtectedRoute roles={['STUDENT']}><OpportunitiesPage /></ProtectedRoute>} />
        <Route path="applications" element={<ProtectedRoute roles={['STUDENT']}><ApplicationsPage /></ProtectedRoute>} />
        <Route path="placement" element={<ProtectedRoute roles={['STUDENT']}><PlacementReadiness /></ProtectedRoute>} />
        
        <Route path="company" element={<ProtectedRoute roles={['INDUSTRY']}><CompanyProfile /></ProtectedRoute>} />
        <Route path="my-opportunities" element={<ProtectedRoute roles={['INDUSTRY']}><MyOpportunities /></ProtectedRoute>} />
        <Route path="create-opportunity" element={<ProtectedRoute roles={['INDUSTRY']}><CreateOpportunity /></ProtectedRoute>} />
        <Route path="applicants" element={<ProtectedRoute roles={['INDUSTRY']}><ApplicantsPage /></ProtectedRoute>} />
        <Route path="candidates" element={<ProtectedRoute roles={['INDUSTRY']}><CandidateSearch /></ProtectedRoute>} />
        
        <Route path="students" element={<ProtectedRoute roles={['ACADEMIA']}><StudentAnalytics /></ProtectedRoute>} />
        <Route path="skill-analytics" element={<ProtectedRoute roles={['ACADEMIA']}><SkillAnalytics /></ProtectedRoute>} />
        <Route path="placement-analytics" element={<ProtectedRoute roles={['ACADEMIA']}><PlacementAnalytics /></ProtectedRoute>} />
        <Route path="industry-demand" element={<ProtectedRoute roles={['ACADEMIA']}><IndustryDemand /></ProtectedRoute>} />
        <Route path="training" element={<ProtectedRoute roles={['ACADEMIA']}><TrainingRecommendations /></ProtectedRoute>} />

        <Route index element={<Navigate to="dashboard" />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
""",
    "src/context/AuthContext.jsx": """import { createContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
import toast from 'react-hot-toast'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('cc_token')
    const savedUser = localStorage.getItem('cc_user')
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (e) {
        localStorage.removeItem('cc_token')
        localStorage.removeItem('cc_user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { token, ...userData } = response.data.data
    localStorage.setItem('cc_token', token)
    localStorage.setItem('cc_user', JSON.stringify(userData))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    return userData
  }, [])

  const register = useCallback(async (formData) => {
    const response = await api.post('/auth/register', formData)
    const { token, ...userData } = response.data.data
    localStorage.setItem('cc_token', token)
    localStorage.setItem('cc_user', JSON.stringify(userData))
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('cc_token')
    localStorage.removeItem('cc_user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }, [])

  const updateUser = useCallback((updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('cc_user', JSON.stringify(updated))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}""",
    "src/hooks/useAuth.js": """import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}""",
    "src/services/api.js": """import axios from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cc_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cc_token')
      localStorage.removeItem('cc_user')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      toast.error('Access denied')
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again.')
    } else if (!error.response) {
      toast.error('Network error. Check your connection.')
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
}

export const studentAPI = {
  getDashboard: () => api.get('/students/dashboard'),
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
  getSkills: () => api.get('/students/skills'),
  addSkill: (data) => api.post('/students/skills', data),
  removeSkill: (skillId) => api.delete(`/students/skills/${skillId}`),
  getProjects: () => api.get('/students/projects'),
  addProject: (data) => api.post('/students/projects', data),
  deleteProject: (id) => api.delete(`/students/projects/${id}`),
  getInternships: () => api.get('/students/internships'),
  addInternship: (data) => api.post('/students/internships', data),
  deleteInternship: (id) => api.delete(`/students/internships/${id}`),
  getPlacementPrediction: () => api.get('/students/placement-prediction'),
  getCareerAnalysis: () => api.get('/students/career-analysis'),
  getSkillGap: (careerId) => api.get(`/students/skill-gap/${careerId}`),
  getRoadmap: () => api.get('/students/roadmap'),
  generateRoadmap: (careerId) => api.post(`/students/roadmap/generate/${careerId}`),
  completeRoadmapItem: (itemId) => api.put(`/students/roadmap/items/${itemId}/complete`),
}

export const opportunityAPI = {
  getAll: (params) => api.get('/opportunities', { params }),
  getById: (id) => api.get(`/opportunities/${id}`),
  create: (data) => api.post('/opportunities', data),
  update: (id, data) => api.put(`/opportunities/${id}`, data),
  delete: (id) => api.delete(`/opportunities/${id}`),
  getMy: () => api.get('/opportunities/my'),
  getMatch: (id) => api.get(`/opportunities/${id}/match`),
}

export const applicationAPI = {
  apply: (data) => api.post('/applications', data),
  getMyApplications: () => api.get('/applications/my'),
  withdraw: (id) => api.put(`/applications/${id}/withdraw`),
  getForOpportunity: (opportunityId) => api.get(`/applications/opportunity/${opportunityId}`),
  updateStatus: (id, status, notes) => api.put(`/applications/${id}/status`, { status, notes }),
  getIndustryApplications: () => api.get('/applications/industry'),
}

export const industryAPI = {
  getDashboard: () => api.get('/industry/dashboard'),
  getProfile: () => api.get('/industry/profile'),
  updateProfile: (data) => api.put('/industry/profile', data),
  getCandidates: (params) => api.get('/industry/candidates', { params }),
  getCandidateDetail: (studentId) => api.get(`/industry/candidates/${studentId}`),
  getRankedCandidates: (opportunityId) => api.get(`/industry/opportunities/${opportunityId}/ranked`),
  evaluateCandidate: (appId, data) => api.post(`/industry/applications/${appId}/evaluate`, data),
}

export const academiaAPI = {
  getDashboard: () => api.get('/academia/dashboard'),
  getStudents: (params) => api.get('/academia/students', { params }),
  getStudentAnalytics: () => api.get('/academia/student-analytics'),
  getSkillAnalytics: () => api.get('/academia/skill-analytics'),
  getPlacementAnalytics: () => api.get('/academia/placement-analytics'),
  getIndustryDemand: () => api.get('/academia/industry-demand'),
  getTrainingRecommendations: () => api.get('/academia/training-recommendations'),
}

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  getCount: () => api.get('/notifications/count'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
}

export const mlAPI = {
  health: () => api.get('/ml/health'),
  predictPlacement: (data) => api.post('/ml/predict-placement', data),
  skillGap: (data) => api.post('/ml/skill-gap', data),
  careerRecommendation: (data) => api.post('/ml/career-recommendation', data),
}

export const skillsAPI = {
  getAll: () => api.get('/skills'),
  getByCategory: (category) => api.get(`/skills/category/${category}`),
  search: (query) => api.get(`/skills/search?q=${query}`),
}

export const careersAPI = {
  getAll: () => api.get('/careers'),
  getById: (id) => api.get(`/careers/${id}`),
}"""
}

for path, content in files_to_create.items():
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Created essential config files and components")
