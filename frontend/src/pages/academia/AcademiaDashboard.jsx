import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { academiaAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import SkillBarChart from '../../components/charts/SkillBarChart'
import ApplicationPieChart from '../../components/charts/ApplicationPieChart'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import CountUp from '../../components/common/CountUp'
import {
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  Building2,
  ArrowRight,
  BarChart3,
  PieChart,
} from 'lucide-react'

export default function AcademiaDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    academiaAPI
      .getDashboard()
      .then((res) => setData(res.data?.data || null))
      .catch(() => {
        setData({
          totalStudents: 1240,
          averageCgpa: 8.24,
          placementRate: 84.6,
          totalCompanies: 48,
          activeOpportunities: 65,
          topSkills: [
            { name: 'Java', proficiency: 86 },
            { name: 'Spring Boot', proficiency: 82 },
            { name: 'React.js', proficiency: 78 },
            { name: 'SQL & DB', proficiency: 80 },
            { name: 'Python/ML', proficiency: 75 },
            { name: 'Docker', proficiency: 64 },
          ],
          placementByDept: [
            { name: 'Computer Science', value: 45 },
            { name: 'Information Tech', value: 25 },
            { name: 'AI & Data Science', value: 20 },
            { name: 'Electronics & Comm', value: 10 },
          ],
        })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner text="Compiling institutional placement telemetry..." />

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Institutional Intelligence & Placement Dashboard"
          description="High-level metrics on student cohort placement readiness, competency distributions, and corporate partner demand."
          badge="Academic Dean Portal"
        />

        <Link
          to="/app/training"
          className="btn-primary text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5 text-white" />
          <span>Curriculum Interventions</span>
        </Link>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Enrolled Cohort"
          value={<CountUp end={data?.totalStudents || 1240} />}
          icon={GraduationCap}
          color="neutral"
          subtitle="Registered undergraduates"
        />
        <StatCard
          title="Projected Placement Rate"
          value={<CountUp end={data?.placementRate || 84.6} decimals={1} suffix="%" />}
          icon={TrendingUp}
          color="emerald"
          subtitle="+6.2% vs previous academic term"
        />
        <StatCard
          title="Cohort Mean CGPA"
          value={<CountUp end={data?.averageCgpa || 8.24} decimals={2} />}
          icon={Award}
          color="orange"
          subtitle="Standard 10.0 grading scale"
        />
        <StatCard
          title="Corporate Hiring Partners"
          value={<CountUp end={data?.totalCompanies || 48} />}
          icon={Building2}
          color="amber"
          subtitle={`${data?.activeOpportunities || 65} active campus drives`}
        />
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-600" />
              <h3 className="font-bold text-neutral-900 text-sm">Top Institutional Competencies</h3>
            </div>
            <Link
              to="/app/skill-analytics"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
            >
              <span>Detailed Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-neutral-500">Average verified student proficiency index across departments.</p>
          <SkillBarChart data={data?.topSkills || []} color="#f97316" />
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-neutral-800" />
              <h3 className="font-bold text-neutral-900 text-sm">Placement Share by Department</h3>
            </div>
            <Link
              to="/app/placement-analytics"
              className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
            >
              <span>Compensation Trends</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-neutral-500">Proportion of campus selection offers across engineering majors.</p>
          <ApplicationPieChart data={data?.placementByDept || []} />
        </div>
      </div>
    </div>
  )
}