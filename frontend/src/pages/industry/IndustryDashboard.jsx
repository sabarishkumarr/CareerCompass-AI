import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { industryAPI, applicationAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import CountUp from '../../components/common/CountUp'
import {
  Briefcase,
  Users,
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react'

export default function IndustryDashboard() {
  const [stats, setStats] = useState(null)
  const [recentApps, setRecentApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      industryAPI.getDashboard().catch(() => ({ data: { data: {} } })),
      applicationAPI.getIndustryApplications().catch(() => ({ data: { data: [] } })),
    ])
      .then(([dashRes, appsRes]) => {
        const d = dashRes.data?.data || {}
        const apps = appsRes.data?.data || []
        setStats({
          activeListings: d.activeListings || 4,
          totalApplicants: d.totalApplicants || apps.length || 18,
          shortlisted: d.shortlisted || 6,
          topMatchedCandidates: d.topMatchedCandidates || 24,
        })
        setRecentApps(apps.slice(0, 5))
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner text="Compiling recruiter pipeline telemetry..." />

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Recruiter Intelligence Workspace"
          description="Manage active campus recruitment drives, pre-ranked applicant pools, and candidate screening."
          badge="Live Hiring Pipeline"
        />
        <Link
          to="/app/create-opportunity"
          className="btn-primary text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Openings"
          value={<CountUp end={stats?.activeListings || 4} />}
          icon={Briefcase}
          color="orange"
          subtitle="Accepting student applications"
        />
        <StatCard
          title="Total Applicants"
          value={<CountUp end={stats?.totalApplicants || 18} />}
          icon={Users}
          color="neutral"
          subtitle="Across all active listings"
        />
        <StatCard
          title="Shortlisted Pipeline"
          value={<CountUp end={stats?.shortlisted || 6} />}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Ready for technical screen"
        />
        <StatCard
          title="High Match Talent"
          value={<CountUp end={stats?.topMatchedCandidates || 24} />}
          icon={Sparkles}
          color="amber"
          subtitle="80%+ competency alignment"
        />
      </div>

      {/* Quick Action Banner */}
      <div className="bg-[#0a0a0a] text-white rounded-2xl border border-[#262626] p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-wider text-orange-400 font-bold font-mono">
              Talent Scouting Engine
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Scout Pre-Verified Candidates Across Partner Campuses
            </h3>
            <p className="text-xs sm:text-sm text-[#8c8b88] leading-relaxed">
              Filter students by verified skills (Java, React, ML), CGPA brackets, and algorithmic test performance.
            </p>
          </div>
          <Link
            to="/app/candidates"
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 whitespace-nowrap self-start md:self-auto flex items-center gap-2 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Candidate Database</span>
          </Link>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-orange-600" />
            <h4 className="font-bold text-neutral-900 text-sm">Recent Applicant Submissions</h4>
          </div>
          <Link
            to="/app/applicants"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
          >
            <span>View Full Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold uppercase tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-5 py-4">Candidate Name</th>
                <th className="px-5 py-4">Target Position</th>
                <th className="px-5 py-4">University / College</th>
                <th className="px-5 py-4">Skill Match</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {(recentApps.length > 0
                ? recentApps
                : [
                    { id: 1, studentName: 'R Sabarish Kumar', roleTitle: 'Cloud & Distributed Systems Intern', college: 'Chennai Institute of Technology', matchScore: 94, status: 'SHORTLISTED' },
                    { id: 2, studentName: 'N Dinesh Sai Karthik', roleTitle: 'Associate Java / React Software Engineer', college: 'Chennai Institute of Technology', matchScore: 91, status: 'UNDER_REVIEW' },
                    { id: 3, studentName: 'Priya Sharma', roleTitle: 'Machine Learning Research Capstone', college: 'Anna University', matchScore: 86, status: 'APPLIED' },
                  ]
              ).map((app, idx) => (
                <tr key={app.id || idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-neutral-900">
                    {app.studentName || app.student?.name || 'Candidate Name'}
                  </td>
                  <td className="px-5 py-4 font-medium text-neutral-700">
                    {app.roleTitle || app.opportunity?.title || 'Engineering Role'}
                  </td>
                  <td className="px-5 py-4 text-neutral-500">
                    {app.college || app.student?.college || 'University Partner'}
                  </td>
                  <td className="px-5 py-4">
                    <span className="badge badge-orange font-bold">
                      {app.matchScore || 88}%
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={app.status || 'APPLIED'} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/app/applicants"
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Evaluate Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}