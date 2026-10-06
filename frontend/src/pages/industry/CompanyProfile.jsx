import React, { useState, useEffect } from 'react'
import { industryAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Calendar,
  Save,
  Edit3,
  Briefcase,
  ShieldCheck,
} from 'lucide-react'

export default function CompanyProfile() {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    industryAPI
      .getProfile()
      .then((res) => {
        const c = res.data?.data || {}
        setCompany(c)
        setFormData({
          name: c.name || '',
          industry: c.industry || '',
          headquarters: c.headquarters || '',
          companySize: c.companySize || '',
          foundedYear: c.foundedYear || 2019,
          website: c.website || '',
          description: c.description || '',
        })
      })
      .catch(() => {
        const mock = {
          name: 'Acme Cloud Labs & Systems',
          industry: 'Cloud Infrastructure & Distributed AI',
          headquarters: 'Bangalore, IN',
          companySize: '200-500',
          foundedYear: 2019,
          website: 'https://acmecloudlabs.io',
          description:
            'Building high-throughput cloud virtualization platforms, microservice orchestration tools, and low-latency inference gateways.',
        }
        setCompany(mock)
        setFormData(mock)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await industryAPI.updateProfile(formData)
      if (res.data?.data) {
        setCompany(res.data.data)
      } else {
        setCompany((prev) => ({ ...prev, ...formData }))
      }
      setIsEditing(false)
      toast.success('Company profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update company profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner text="Retrieving organization records..." />

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Organization Profile & Corporate Brand"
          description="Manage institutional recruiting details presented to university applicants and placement departments."
          badge="Verified Corporate Partner"
        />
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className={`btn-secondary text-xs flex items-center gap-2 self-start sm:self-auto ${
            isEditing ? 'bg-slate-100 border-slate-300' : ''
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Information'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">Company Overview & Identity</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Organization Name</label>
              <input
                type="text"
                name="name"
                disabled={!isEditing}
                value={formData.name || ''}
                onChange={handleChange}
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>

            <div>
              <label className="label">Industry Sector</label>
              <input
                type="text"
                name="industry"
                disabled={!isEditing}
                value={formData.industry || ''}
                onChange={handleChange}
                placeholder="e.g. Cloud Infrastructure, FinTech"
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="label">About the Organization</label>
            <textarea
              rows="4"
              name="description"
              disabled={!isEditing}
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Describe your engineering culture, tech stack, and career progression pathways..."
              className="input-field disabled:bg-slate-50 disabled:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Headquarters Location
              </label>
              <input
                type="text"
                name="headquarters"
                disabled={!isEditing}
                value={formData.headquarters || ''}
                onChange={handleChange}
                placeholder="City, Country"
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>

            <div>
              <label className="label flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Employee Count
              </label>
              <select
                name="companySize"
                disabled={!isEditing}
                value={formData.companySize || '200-500'}
                onChange={handleChange}
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              >
                <option value="1-50">1-50 employees</option>
                <option value="50-200">50-200 employees</option>
                <option value="200-500">200-500 employees</option>
                <option value="500-1000">500-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>

            <div>
              <label className="label flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Year Established
              </label>
              <input
                type="number"
                name="foundedYear"
                disabled={!isEditing}
                value={formData.foundedYear || 2019}
                onChange={handleChange}
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="label flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> Corporate Website
            </label>
            <input
              type="url"
              name="website"
              disabled={!isEditing}
              value={formData.website || ''}
              onChange={handleChange}
              placeholder="https://company.com"
              className="input-field disabled:bg-slate-50 disabled:text-slate-600"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary text-xs flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  )
}