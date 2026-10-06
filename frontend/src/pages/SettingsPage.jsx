import React, { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import toast from 'react-hot-toast'
import { Shield, Bell, Lock, Key, Save, CheckCircle2 } from 'lucide-react'

export default function SettingsPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notifPreferences, setNotifPreferences] = useState({
    emailAlerts: true,
    recruiterMessages: true,
    matchingOpportunities: true,
    curriculumUpdates: false,
  })
  const [saving, setSaving] = useState(false)

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error('New passwords do not match')
    }
    if (passwords.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters')
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      toast.success('Security credentials updated successfully!')
    }, 600)
  }

  const handleToggle = (key) => {
    setNotifPreferences((prev) => {
      const updated = { ...prev, [key]: !prev[key] }
      toast.success('Notification preferences updated')
      return updated
    })
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <PageHeader
        title="Account & System Settings"
        description="Configure authentication credentials, notification dispatches, and privacy controls."
        badge="Security & Preferences"
      />

      {/* Security & Password Form */}
      <form onSubmit={handlePasswordSubmit} className="card p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Key className="w-4 h-4 text-sky-600" />
          <h3 className="font-bold text-slate-900 text-sm">Security Credentials</h3>
        </div>

        <div>
          <label className="label">Current Password</label>
          <input
            type="password"
            required
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            placeholder="••••••••"
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">New Password (min 6 chars)</label>
            <input
              type="password"
              required
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              placeholder="••••••••"
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Confirm New Password</label>
            <input
              type="password"
              required
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="input-field"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-xs flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Updating...' : 'Update Password'}</span>
          </button>
        </div>
      </form>

      {/* Notification Preferences */}
      <div className="card p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Bell className="w-4 h-4 text-sky-600" />
          <h3 className="font-bold text-slate-900 text-sm">Notification Dispatches</h3>
        </div>

        <div className="space-y-3">
          {[
            {
              key: 'emailAlerts',
              title: 'Email Dispatch Summary',
              desc: 'Receive instant email alerts when your application stage updates.',
            },
            {
              key: 'recruiterMessages',
              title: 'Recruiter Direct Contact',
              desc: 'Permit verified corporate recruiters to invite you directly for technical interviews.',
            },
            {
              key: 'matchingOpportunities',
              title: 'High-Match Opportunity Alerts',
              desc: 'Notify me when opportunities matching >80% of my skills are published.',
            },
            {
              key: 'curriculumUpdates',
              title: 'Institutional Training Interventions',
              desc: 'Updates regarding university workshops, bootcamps, and curriculum modules.',
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100/50 transition-colors"
            >
              <div className="pr-4">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
                  notifPreferences[item.key] ? 'bg-sky-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifPreferences[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
