import React, { useState, useEffect } from 'react'
import { studentAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import ProgressBar from '../../components/common/ProgressBar'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  User,
  BookOpen,
  Link as LinkIcon,
  Save,
  Edit3,
  Code2,
  Share2,
  Globe,
  Sparkles,
  Phone,
  GraduationCap,
  Building,
} from 'lucide-react'

export default function StudentProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = () => {
    studentAPI
      .getProfile()
      .then((res) => {
        const p = res.data?.data || {}
        setProfile(p)
        setFormData({
          firstName: p.firstName || '',
          lastName: p.lastName || '',
          phone: p.phone || '',
          college: p.college || '',
          degree: p.degree || '',
          department: p.department || '',
          graduationYear: p.graduationYear || 2025,
          cgpa: p.cgpa || 8.0,
          preferredCareer: p.preferredCareer || '',
          bio: p.bio || '',
          githubUrl: p.githubUrl || '',
          linkedinUrl: p.linkedinUrl || '',
          portfolioUrl: p.portfolioUrl || '',
        })
      })
      .catch(() => {
        const mock = {
          firstName: 'Sabarish',
          lastName: 'Kumar',
          college: 'Chennai Institute of Technology',
          degree: 'B.E. Computer Science and Engineering',
          department: 'Computer Science & Engineering',
          graduationYear: 2025,
          cgpa: 8.85,
          preferredCareer: 'Full-Stack Distributed Systems Engineer',
          profileCompletion: 90,
          bio: 'Undergraduate engineer specializing in Java Spring Boot, React, and Machine Learning placement telemetry.',
          githubUrl: 'https://github.com/sabarishexe',
          linkedinUrl: 'https://linkedin.com/in/sabarish-kumar',
          portfolioUrl: 'https://sabarish.dev',
        }
        setProfile(mock)
        setFormData(mock)
      })
      .finally(() => setLoading(false))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await studentAPI.updateProfile(formData)
      if (res.data?.data) {
        setProfile(res.data.data)
      } else {
        setProfile((prev) => ({ ...prev, ...formData }))
      }
      setIsEditing(false)
      toast.success('Academic profile updated successfully!')
    } catch (err) {
      toast.error('Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner text="Retrieving student profile details..." />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Profile & Academic Credentials"
        description="Maintain verified institutional records, CGPA, graduation timeline, and portfolio links."
        badge="Verified Student"
        action={
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`btn-secondary text-xs flex items-center gap-2 ${
              isEditing ? 'bg-slate-100 border-slate-300' : ''
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Information'}</span>
          </button>
        }
      />

      {/* Completion Meter */}
      <div className="card p-6 bg-gradient-to-r from-sky-50/70 to-indigo-50/70 border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Profile Completeness Score</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Profiles with 90%+ completeness receive 3.4x higher corporate visibility.
            </p>
          </div>
          <span className="text-xl font-extrabold text-sky-700">
            {profile?.profileCompletion || 90}%
          </span>
        </div>
        <ProgressBar
          value={profile?.profileCompletion || 90}
          color="blue"
          showLabel={false}
          size="md"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Details Card */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <User className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm">Personal Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  disabled={!isEditing}
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
              <div>
                <label className="label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  disabled={!isEditing}
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="label">Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  disabled={!isEditing}
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="label">Professional Bio / Summary</label>
              <textarea
                name="bio"
                rows="3"
                disabled={!isEditing}
                value={formData.bio || ''}
                onChange={handleChange}
                placeholder="Highlight your technical strengths, open-source work, and core goals..."
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
          </div>

          {/* Academic Background Card */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm">Academic Background</h3>
            </div>

            <div>
              <label className="label">Institution / University</label>
              <input
                type="text"
                name="college"
                disabled={!isEditing}
                value={formData.college || ''}
                onChange={handleChange}
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Degree</label>
                <input
                  type="text"
                  name="degree"
                  disabled={!isEditing}
                  value={formData.degree || ''}
                  onChange={handleChange}
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
              <div>
                <label className="label">Department</label>
                <input
                  type="text"
                  name="department"
                  disabled={!isEditing}
                  value={formData.department || ''}
                  onChange={handleChange}
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  disabled={!isEditing}
                  value={formData.graduationYear || 2025}
                  onChange={handleChange}
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
              <div>
                <label className="label">Cumulative CGPA (10-pt)</label>
                <input
                  type="number"
                  step="0.01"
                  name="cgpa"
                  disabled={!isEditing}
                  value={formData.cgpa || 8.0}
                  onChange={handleChange}
                  className="input-field disabled:bg-slate-50 disabled:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="label">Target Career Goal</label>
              <input
                type="text"
                name="preferredCareer"
                disabled={!isEditing}
                value={formData.preferredCareer || ''}
                onChange={handleChange}
                placeholder="e.g. Distributed Systems Engineer, Full-Stack Developer"
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
          </div>
        </div>

        {/* Links Card */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <LinkIcon className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">Portfolio & External Profiles</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-slate-400" /> GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                disabled={!isEditing}
                value={formData.githubUrl || ''}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
            <div>
              <label className="label flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-slate-400" /> LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                disabled={!isEditing}
                value={formData.linkedinUrl || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
            <div>
              <label className="label flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> Portfolio Website
              </label>
              <input
                type="url"
                name="portfolioUrl"
                disabled={!isEditing}
                value={formData.portfolioUrl || ''}
                onChange={handleChange}
                placeholder="https://myportfolio.dev"
                className="input-field disabled:bg-slate-50 disabled:text-slate-600"
              />
            </div>
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