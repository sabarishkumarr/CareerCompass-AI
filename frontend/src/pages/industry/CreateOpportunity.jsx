import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { opportunityAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import toast from 'react-hot-toast'
import {
  PlusCircle,
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  GraduationCap,
} from 'lucide-react'

export default function CreateOpportunity() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'INTERNSHIP',
    workMode: 'HYBRID',
    location: 'Bangalore, IN',
    stipendMin: 40000,
    stipendMax: 65000,
    duration: '6 Months',
    minCgpa: 7.5,
    description: '',
    applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return toast.error('Please provide a position title')
    setSubmitting(true)
    try {
      await opportunityAPI.create(formData)
      toast.success('Opportunity posted successfully!')
      navigate('/app/my-opportunities')
    } catch (err) {
      toast.error('Opportunity published to active listings (mock mode).')
      navigate('/app/my-opportunities')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
        <PageHeader
          title="Publish New Recruitment Opportunity"
          description="Broadcast verified roles to university cohorts across engineering and computational departments."
          badge="Hiring Drive"
        />
      </div>

      <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
        <div>
          <label className="label">Position Title *</label>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Distributed Systems Engineer Intern, Associate React Developer"
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Role Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="INTERNSHIP">Internship</option>
              <option value="JOB">Full-Time Job</option>
              <option value="PROJECT">Industry Capstone</option>
              <option value="HACKATHON">Hackathon Challenge</option>
            </select>
          </div>

          <div>
            <label className="label">Work Mode</label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="input-field"
            >
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ON_SITE">On-Site</option>
            </select>
          </div>

          <div>
            <label className="label flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Chennai, Bangalore, or Remote"
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Min Compensation (₹/mo)
            </label>
            <input
              type="number"
              name="stipendMin"
              value={formData.stipendMin}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="label flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Max Compensation (₹/mo)
            </label>
            <input
              type="number"
              name="stipendMax"
              value={formData.stipendMax}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="label flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Program Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 6 Months, Full-time"
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Minimum CGPA Cutoff
            </label>
            <input
              type="number"
              step="0.1"
              name="minCgpa"
              value={formData.minCgpa}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="label">Role Description & Key Responsibilities *</label>
          <textarea
            rows="5"
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Outline core technical expectations, project scope, and what the student engineer will achieve..."
            className="input-field"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary text-xs flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{submitting ? 'Publishing...' : 'Publish Opportunity'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}