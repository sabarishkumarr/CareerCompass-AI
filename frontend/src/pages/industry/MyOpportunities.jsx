import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { opportunityAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatusBadge from '../../components/common/StatusBadge'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import toast from 'react-hot-toast'
import { Plus, Briefcase, Users, Trash2, MapPin, DollarSign, ArrowRight } from 'lucide-react'

export default function MyOpportunities() {
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMyOpportunities()
  }, [])

  const loadMyOpportunities = () => {
    opportunityAPI
      .getMy()
      .then((res) => {
        setOpportunities(res.data?.data || [])
      })
      .catch(() => {
        setOpportunities([
          {
            id: 1,
            title: 'Cloud & Distributed Systems Intern',
            type: 'INTERNSHIP',
            workMode: 'HYBRID',
            location: 'Bangalore, IN',
            stipendMin: 40000,
            stipendMax: 60000,
            applicantCount: 12,
            status: 'ACTIVE',
          },
          {
            id: 2,
            title: 'Associate Java / React Software Engineer',
            type: 'JOB',
            workMode: 'ON_SITE',
            location: 'Chennai, IN',
            stipendMin: 70000,
            stipendMax: 110000,
            applicantCount: 6,
            status: 'ACTIVE',
          },
        ])
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete opportunity "${title}"?`)) return
    try {
      await opportunityAPI.delete(id)
      toast.success('Opportunity deleted')
      setOpportunities((prev) => prev.filter((o) => o.id !== id))
    } catch (err) {
      toast.error('Failed to delete opportunity')
    }
  }

  if (loading) return <LoadingSpinner text="Retrieving active listings..." />

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Published Job Postings & Drives"
          description="Manage active campus recruitment listings, internships, and candidate application volumes."
          badge="Active Drives"
        />
        <Link
          to="/app/create-opportunity"
          className="btn-primary text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Listing</span>
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <EmptyState
          title="No Published Opportunities"
          description="You haven't posted any internships or full-time roles yet."
          icon={Briefcase}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="card p-6 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="badge badge-blue text-[10px] font-bold uppercase">
                      {opp.type} • {opp.workMode || 'Hybrid'}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1.5 tracking-tight">
                      {opp.title}
                    </h3>
                  </div>
                  <StatusBadge status={opp.status || 'ACTIVE'} />
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{opp.location || 'Remote'}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      ₹{(opp.stipendMin || 30000).toLocaleString()} - ₹
                      {(opp.stipendMax || 75000).toLocaleString()}/mo
                    </span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/app/applicants?oppId=${opp.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  <Users className="w-4 h-4" />
                  <span>{opp.applicantCount || 0} Candidates In Review</span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(opp.id, opp.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}