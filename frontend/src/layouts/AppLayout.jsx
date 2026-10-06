import React, { useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  LayoutDashboard,
  User,
  Zap,
  Compass,
  Target,
  Map,
  Briefcase,
  FileText,
  Trophy,
  Building,
  Users,
  Search,
  BarChart2,
  TrendingUp,
  BookOpen,
  Bell,
  LogOut,
  Settings,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

import Logo from '../components/common/Logo'

export default function AppLayout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const studentLinks = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/app/profile', icon: User, label: 'Student Profile' },
    { to: '/app/skills', icon: Zap, label: 'Skill Inventory' },
    { to: '/app/career', icon: Compass, label: 'Career Matching' },
    { to: '/app/skill-gap', icon: Target, label: 'Gap Analysis' },
    { to: '/app/roadmap', icon: Map, label: 'Learning Roadmap' },
    { to: '/app/opportunities', icon: Briefcase, label: 'Opportunities' },
    { to: '/app/applications', icon: FileText, label: 'My Applications' },
    { to: '/app/placement', icon: Trophy, label: 'Placement Readiness' },
  ]

  const industryLinks = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/app/company', icon: Building, label: 'Company Profile' },
    { to: '/app/my-opportunities', icon: Briefcase, label: 'My Job Postings' },
    { to: '/app/create-opportunity', icon: FileText, label: 'Post Opportunity' },
    { to: '/app/applicants', icon: Users, label: 'Applicant Pipeline' },
    { to: '/app/candidates', icon: Search, label: 'Talent Search' },
  ]

  const academiaLinks = [
    { to: '/app/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/app/students', icon: Users, label: 'Student Analytics' },
    { to: '/app/skill-analytics', icon: BarChart2, label: 'Skill Analytics' },
    { to: '/app/placement-analytics', icon: TrendingUp, label: 'Placement Analytics' },
    { to: '/app/industry-demand', icon: Building, label: 'Industry Demand' },
    { to: '/app/training', icon: BookOpen, label: 'Training Interventions' },
  ]

  const links =
    user?.role === 'STUDENT'
      ? studentLinks
      : user?.role === 'INDUSTRY'
      ? industryLinks
      : academiaLinks

  const roleLabels = {
    STUDENT: 'Student Portal',
    INDUSTRY: 'Recruiter Workspace',
    ACADEMIA: 'Academic Administration',
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#fafaf7] font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] text-[#d8d7d2] flex-col hidden lg:flex border-r border-[#262626] shrink-0">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#262626]">
          <Link to="/">
            <Logo size="md" showText={true} />
          </Link>
        </div>

        {/* Portal Identifier Tag */}
        <div className="px-5 pt-4 pb-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8c8b88] px-3 py-1.5 bg-[#141414] rounded-lg border border-[#262626] flex items-center justify-between">
            <span>{roleLabels[user?.role] || 'Dashboard'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-orange-500 text-white font-semibold shadow-sm shadow-orange-500/30'
                    : 'text-[#8c8b88] hover:text-white hover:bg-[#171717]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <link.icon className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:scale-110" />
                <span>{link.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-70 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* User Card in Sidebar */}
        <div className="p-3 border-t border-[#262626] bg-[#0d0d0d]">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#141414] border border-[#262626]">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 text-orange-400 font-bold text-xs flex items-center justify-center shrink-0">
              {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] text-[#8c8b88] truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="p-1.5 text-[#8c8b88] hover:text-rose-400 hover:bg-[#1f1f1f] rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-[#0a0a0a] text-[#d8d7d2] flex flex-col z-10 border-r border-[#262626]">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#262626]">
              <Logo size="sm" showText={true} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#8c8b88] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white font-semibold'
                        : 'text-[#8c8b88] hover:text-white hover:bg-[#171717]'
                    }`
                  }
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-[#262626]">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#171717] hover:bg-[#262626] text-white rounded-lg text-xs font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-800">CareerCompass</span>
              <span>/</span>
              <span className="capitalize text-neutral-600">{location.pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/app/notifications"
              className="relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
            </Link>
            <Link
              to="/app/settings"
              className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Account Settings"
            >
              <Settings className="w-4.5 h-4.5" />
            </Link>

            <div className="h-6 w-px bg-neutral-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-semibold text-xs flex items-center justify-center shadow-xs">
                {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-neutral-900 leading-tight">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[10px] font-medium text-neutral-500 capitalize">{user?.role?.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#fafaf7]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}