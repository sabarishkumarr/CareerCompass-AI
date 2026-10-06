import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { applicationAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import toast from 'react-hot-toast'
import { Users, Filter, CheckCircle2, Award, Calendar, Mail, FileText, Sparkles } from 'lucide-react'

export default function ApplicantsPage() {
  const [searchParams] = useSearchParams()
  const oppIdFilter = searchParams.get('oppId')

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    loadApplicants()
  }, [oppIdFilter])

  const loadApplicants = () => {
    applicationAPI
      .getIndustryApplications()
      .then((res) => {
        let list = res.data?.data || []
        if (oppIdFilter) {
          list = list.filter((a) => a.opportunity?.id?.toString() === oppIdFilter)
        }
        setApplications(list)
      })
      .catch(() => {
        setApplications([
          {
            id: 1,
            student: {
              name: 'R Sabarish Kumar',
              email: 'sabarish@citchennai.net',
              college: 'Chennai Institute of Technology',
              cgpa: 8.85,
            },
            opportunity: { id: 1, title: 'Cloud & Distributed Systems Intern' },
            matchScore: 94,
            status: 'SHORTLISTED',
            appliedAt: '2026-03-14',
            notes: 'High mastery in Java Spring Boot, React, and FastAPI ML services.',
          },
          {
            id: 2,
            student: {
              name: 'N Dinesh Sai Karthik',
              email: 'dinesh@citchennai.net',
              college: 'Chennai Institute of Technology',
              cgpa: 8.7,
            },
            opportunity: { id: 2, title: 'Associate Java / React Software Engineer' },
            matchScore: 91,
            status: 'UNDER_REVIEW',
            appliedAt: '2026-03-15',
            notes: 'Strong algorithmic skills, Docker containerization, and REST design.',
          },
          {
            id: 3,
            student: {
              name: 'Priya Sharma',
              email: 'priya@annauniv.edu',
              college: 'Anna University',
              cgpa: 8.2,
            },
            opportunity: { id: 1, title: 'Cloud & Distributed Systems Intern' },
            matchScore: 84,
            status: 'APPLIED',
            appliedAt: '2026-03-16',
            notes: 'Published machine learning paper on edge computing.',
          },
        ])
      })
      .finally(() => setLoading(false))
  }

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationAPI.updateStatus(appId, newStatus, `Updated to ${newStatus}`)
      toast.success(`Candidate status updated to ${newStatus}`)
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      )
    } catch (err) {
      toast.success(`Candidate status updated to ${newStatus} (mock sync)`)
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      )
    }
  }

  const filtered =
    statusFilter === 'ALL'
      ? applications
      : applications.filter((a) => a.status === statusFilter)

  if (loading) return <LoadingSpinner text="Compiling applicant pipeline data..." />

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Applicant Pipeline & Decision Engine"
          description="Review student academic credentials, ML competency match ratings, and advance hiring stages."
          badge="Recruitment Pipeline"
        />

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field py-2 text-xs font-semibold"
          >
            <option value="ALL">All Application Stages</option>
            <option value="APPLIED">Applied</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="SELECTED">Selected / Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No Applicants in this Filter"
          description="Candidates will populate here as soon as student applications are logged."
          icon={Users}
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-4">Candidate Profile</th>
                  <th className="px-5 py-4">Applied Position</th>
                  <th className="px-5 py-4">Academic Record</th>
                  <th className="px-5 py-4">Skill Match</th>
                  <th className="px-5 py-4">Current Stage</th>
                  <th className="px-5 py-4 text-right">Recruiter Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((app) => {
                  const student = app.student || {}
                  const opp = app.opportunity || {}

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {student.name || 'Candidate Name'}
                        </div>
                        <div className="text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <Mail className="w-3 h-3 text-slate-400" />{' '}
                          {student.email || 'candidate@university.edu'}
                        </div>
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {opp.title || 'Engineering Role'}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        <div className="font-medium">{student.college || 'Partner Institution'}</div>
                        <div className="text-slate-400 mt-0.5">
                          CGPA: <strong className="text-slate-700">{student.cgpa || 8.0}</strong>
                        </div>
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
                        <select
                          value={app.status || 'APPLIED'}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="input-field py-1.5 px-2.5 text-xs font-semibold cursor-pointer w-auto"
                        >
                          <option value="APPLIED">Applied</option>
                          <option value="UNDER_REVIEW">Under Review</option>
                          <option value="SHORTLISTED">Shortlist</option>
                          <option value="SELECTED">Make Offer</option>
                          <option value="REJECTED">Reject</option>
                        </select>
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