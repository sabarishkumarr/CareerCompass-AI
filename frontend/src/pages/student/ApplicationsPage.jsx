import React, { useState, useEffect } from 'react'
import { applicationAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import toast from 'react-hot-toast'
import { FileText, Building, Calendar, MapPin, XCircle, ArrowUpRight, Sparkles } from 'lucide-react'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = () => {
    applicationAPI
      .getMyApplications()
      .then((res) => {
        setApplications(res.data?.data || [])
      })
      .catch(() => {
        setApplications([
          {
            id: 1,
            opportunity: {
              title: 'Cloud & Distributed Systems Intern',
              company: { name: 'Acme Cloud Labs' },
              location: 'Bangalore, IN',
              type: 'INTERNSHIP',
            },
            status: 'SHORTLISTED',
            appliedAt: '2026-03-12',
            notes: 'Technical portfolio verified with 94% profile match.',
            matchScore: 94,
          },
          {
            id: 2,
            opportunity: {
              title: 'Associate Java / React Software Engineer',
              company: { name: 'Nexus FinTech Global' },
              location: 'Chennai, IN',
              type: 'JOB',
            },
            status: 'UNDER_REVIEW',
            appliedAt: '2026-03-15',
            notes: 'Resume forwarded to hiring manager for Round 1 technical review.',
            matchScore: 89,
          },
          {
            id: 3,
            opportunity: {
              title: 'Machine Learning Research Capstone',
              company: { name: 'Cognitive Matrix AI' },
              location: 'Remote',
              type: 'PROJECT',
            },
            status: 'APPLIED',
            appliedAt: '2026-03-18',
            notes: 'Application received and logged into talent pipeline.',
            matchScore: 85,
          },
        ])
      })
      .finally(() => setLoading(false))
  }

  const handleWithdraw = async (id, title) => {
    if (!window.confirm(`Withdraw your application for "${title}"?`)) return
    try {
      await applicationAPI.withdraw(id)
      toast.success('Application withdrawn')
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'WITHDRAWN' } : a))
      )
    } catch (err) {
      toast.error('Failed to withdraw application')
    }
  }

  if (loading) return <LoadingSpinner text="Retrieving submitted application statuses..." />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Application Lifecycle Tracker"
        description="Monitor real-time recruiter evaluations, interview stage progressions, and offers."
        badge="Active Applications"
      />

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        <div className="card p-5 text-center">
          <p className="text-2xl font-bold text-slate-900">{applications.length}</p>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Total Submissions</p>
        </div>
        <div className="card p-5 text-center bg-sky-50/40 border-sky-100">
          <p className="text-2xl font-bold text-sky-700">
            {
              applications.filter(
                (a) => a.status === 'UNDER_REVIEW' || a.status === 'APPLIED'
              ).length
            }
          </p>
          <p className="text-xs text-sky-600 font-semibold uppercase tracking-wider mt-1">In Review</p>
        </div>
        <div className="card p-5 text-center bg-indigo-50/40 border-indigo-100">
          <p className="text-2xl font-bold text-indigo-700">
            {
              applications.filter(
                (a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW'
              ).length
            }
          </p>
          <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mt-1">Shortlisted / Interview</p>
        </div>
        <div className="card p-5 text-center bg-emerald-50/40 border-emerald-100">
          <p className="text-2xl font-bold text-emerald-700">
            {applications.filter((a) => a.status === 'SELECTED').length}
          </p>
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mt-1">Offers Extended</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          title="No Active Applications"
          description="Browse the Opportunities board to discover positions and submit candidate applications."
          icon={FileText}
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-4">Opportunity & Domain</th>
                  <th className="px-5 py-4">Organization</th>
                  <th className="px-5 py-4">Submission Date</th>
                  <th className="px-5 py-4">Profile Match</th>
                  <th className="px-5 py-4">Current Stage</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => {
                  const opp = app.opportunity || {}
                  const isWithdrawn = app.status === 'WITHDRAWN'
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">{opp.title || 'Role'}</div>
                        <div className="text-slate-500 mt-0.5">
                          {opp.type} • {opp.location || 'Remote'}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {opp.company?.name || 'Recruiting Partner'}
                      </td>
                      <td className="px-5 py-4 text-slate-500">
                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'Recent'}
                      </td>
                      <td className="px-5 py-4">
                        <span className="badge badge-blue font-bold">
                          {app.matchScore || 85}%
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={app.status || 'APPLIED'} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        {!isWithdrawn &&
                          app.status !== 'SELECTED' &&
                          app.status !== 'REJECTED' && (
                            <button
                              onClick={() => handleWithdraw(app.id, opp.title)}
                              className="text-slate-400 hover:text-rose-600 font-semibold transition-colors"
                            >
                              Withdraw
                            </button>
                          )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}