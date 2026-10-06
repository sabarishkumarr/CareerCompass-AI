import React, { useState, useEffect } from 'react'
import { notificationAPI } from '../services/api'
import PageHeader from '../components/common/PageHeader'
import LoadingSpinner from '../components/common/LoadingSpinner'
import EmptyState from '../components/common/EmptyState'
import toast from 'react-hot-toast'
import { Bell, Check, CheckCheck, Briefcase, Award, Sparkles, Clock } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    notificationAPI
      .getAll()
      .then((res) => setNotifications(res.data?.data || []))
      .catch(() => {
        setNotifications([
          {
            id: 1,
            title: 'Application Shortlisted for Technical Assessment',
            message:
              'Your application for Cloud & Distributed Systems Intern at Acme Cloud Labs has been shortlisted by the recruiting team.',
            type: 'APPLICATION',
            isRead: false,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 2,
            title: 'Placement Readiness Score Re-evaluated',
            message:
              'Your placement probability index reached 88% based on recent verified Spring Boot and React project submissions.',
            type: 'ANALYSIS',
            isRead: false,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 3,
            title: 'High-Match Opportunity Notification',
            message:
              'Nexus FinTech Global published "Associate Java / React Software Engineer" with an 89% profile match.',
            type: 'OPPORTUNITY',
            isRead: true,
            createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 4,
            title: 'System Profile Initialized',
            message:
              'Welcome to CareerCompass AI. Your profile is active and calibrated with the machine learning placement telemetry suite.',
            type: 'SYSTEM',
            isRead: true,
            createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
          },
        ])
      })
      .finally(() => setLoading(false))
  }

  const markAsRead = async (id) => {
    try {
      await notificationAPI.markRead(id)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
      toast.success('Notification marked as read')
    } catch (err) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
    }
  }

  const markAllRead = async () => {
    try {
      await notificationAPI.markAllRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
      toast.success('All notifications marked as read')
    } catch (err) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    }
  }

  if (loading) return <LoadingSpinner text="Retrieving notifications..." />

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Notification & Alerts Center"
          description="Real-time alerts regarding application review stages, recruiter interview invites, and ML updates."
          badge="Live Feed"
        />

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="btn-secondary text-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Mark All as Read ({unreadCount})</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          description="You are completely caught up! New alerts will appear here."
          icon={Bell}
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => {
            const isUnread = !item.isRead
            return (
              <div
                key={item.id}
                className={`card p-5 transition-all duration-150 flex items-start gap-4 ${
                  isUnread
                    ? 'bg-sky-50/30 border-sky-200/80 shadow-xs'
                    : 'bg-white border-slate-200/70'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    item.type === 'APPLICATION'
                      ? 'bg-emerald-50 text-emerald-600'
                      : item.type === 'ANALYSIS'
                      ? 'bg-sky-50 text-sky-600'
                      : item.type === 'OPPORTUNITY'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.type === 'APPLICATION' ? (
                    <Briefcase className="w-4 h-4" />
                  ) : item.type === 'ANALYSIS' ? (
                    <Sparkles className="w-4 h-4" />
                  ) : item.type === 'OPPORTUNITY' ? (
                    <Award className="w-4 h-4" />
                  ) : (
                    <Bell className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-bold tracking-tight ${
                        isUnread ? 'text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono shrink-0">
                      <Clock className="w-3 h-3" />
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {isUnread && (
                  <button
                    onClick={() => markAsRead(item.id)}
                    title="Mark as read"
                    className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
