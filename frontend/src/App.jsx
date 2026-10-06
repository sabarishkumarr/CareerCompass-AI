import { Routes, Route, Navigate } from 'react-router-dom'
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
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'

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
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        <Route index element={<Navigate to="dashboard" />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
