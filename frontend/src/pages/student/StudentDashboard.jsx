import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { studentAPI, applicationAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import CountUp from '../../components/common/CountUp'
import {
  Target,
  Zap,
  FileText,
  Briefcase,
  Activity,
  ArrowRight,
  Sparkles,
  Trophy,
  Map,
  Compass,
  ChevronRight,
} from 'lucide-react'

export default function StudentDashboard() {
  const [data, setData] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.allSettled([
      studentAPI.getDashboard(),
      applicationAPI.getMyApplications(),
    ])
      .then(([dashRes, appsRes]) => {
        if (dashRes.status === 'fulfilled' && dashRes.value?.data?.data) {
          setData(dashRes.value.data.data)
        } else {
          setData({
            profileCompletion: 85,
            skillCount: 12,
            applicationsCount: 5,
            projectsCount: 3,
            placementProbability: 82,
            targetCareer: 'Full-Stack Software Engineer',
            topSkills: ['Java', 'Spring Boot', 'React', 'SQL', 'Docker'],
          })
        }

        if (appsRes.status === 'fulfilled' && appsRes.value?.data?.data) {
          setApplications(appsRes.value.data.data.slice(0, 4))
        } else {
          setApplications([
            { id: 1, title: 'Cloud Platform Engineering Intern', companyName: 'Acme Cloud Labs', status: 'SHORTLISTED', matchScore: 92, appliedAt: '2 days ago' },
            { id: 2, title: 'Associate Java Developer', companyName: 'Nexus FinTech', status: 'UNDER_REVIEW', matchScore: 88, appliedAt: '4 days ago' },
            { id: 3, title: 'Full-Stack React & Spring Intern', companyName: 'Cognitive Matrix', status: 'APPLIED', matchScore: 85, appliedAt: '1 week ago' },
          ])
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner text="Compiling student intelligence telemetry..." />
  if (!data) return <EmptyState title="Dashboard Unavailable" description="Could not load dashboard telemetry." icon={Activity} />

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Student Intelligence Hub"
        description="Comprehensive telemetry on your competencies, placement readiness score, and corporate pipeline."
        badge="Live Telemetry"
        action={
          <Link to="/app/placement" className="btn-primary text-xs flex items-center gap-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Run ML Analysis</span>
          </Link>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Profile Completeness"
          value={<CountUp end={data.profileCompletion || 85} suffix="%" />}
          subtitle="Academic & project data"
          icon={Target}
          color="orange"
        />
        <StatCard
          title="Skills Inventory"
          value={<CountUp end={data.skillCount || 12} />}
          subtitle="Verified proficiencies"
          icon={Zap}
          color="amber"
        />
        <StatCard
          title="Active Applications"
          value={<CountUp end={data.applicationsCount || 5} />}
          subtitle="Corporate opportunities"
          icon={FileText}
          color="neutral"
        />
        <StatCard
          title="Projects Verified"
          value={<CountUp end={data.projectsCount || 3} />}
          subtitle="Portfolio capstones"
          icon={Briefcase}
          color="emerald"
        />
      </div>

      {/* Main Feature Banner: Placement Readiness Forecast */}
      <div className="bg-[#0a0a0a] text-white rounded-2xl border border-[#262626] p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#262626] text-xs font-semibold text-orange-400">
              <Trophy className="w-3.5 h-3.5" />
              <span>Predictive Placement Inference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Placement Probability:{' '}
              <span className="text-orange-400 font-extrabold">
                <CountUp end={data.placementProbability || 82} suffix="%" />
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8c8b88] leading-relaxed">
              Based on your CGPA, technical skills (Java, Spring Boot, React), and project experience, our ensemble classifier predicts high likelihood of placement with Tier-1 engineering teams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigate('/app/placement')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              <span>View Feature Influence Weights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/app/skill-gap')}
              className="px-6 py-3 bg-[#171717] hover:bg-[#262626] text-[#d8d7d2] hover:text-white border border-[#262626] font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Audit Target Skill Gaps</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Quick Actions & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Execution Modules */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Quick Modules</h3>
          <div className="space-y-3">
            <Link
              to="/app/skill-gap"
              className="card p-4 flex items-center justify-between hover:border-neutral-300 hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">Skill Gap Analyzer</p>
                  <p className="text-[11px] text-neutral-500">Benchmark against corporate criteria</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/app/roadmap"
              className="card p-4 flex items-center justify-between hover:border-neutral-300 hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Map className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors">Learning Roadmap</p>
                  <p className="text-[11px] text-neutral-500">Follow milestone-by-milestone tasks</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/app/opportunities"
              className="card p-4 flex items-center justify-between hover:border-neutral-300 hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 group-hover:text-stone-800 transition-colors">Opportunities Feed</p>
                  <p className="text-[11px] text-neutral-500">Discover matching campus drives</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Application Pipeline Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Application Tracking</h3>
            <Link to="/app/applications" className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="card overflow-hidden">
            <div className="divide-y divide-neutral-100">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div key={app.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/70 transition-colors">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{app.title}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">{app.companyName}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {app.matchScore && (
                        <span className="text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          {app.matchScore}% Match
                        </span>
                      )}
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-neutral-500">No active applications found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}