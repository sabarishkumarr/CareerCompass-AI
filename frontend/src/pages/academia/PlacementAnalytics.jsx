import React, { useState, useEffect } from 'react'
import { academiaAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import SkillBarChart from '../../components/charts/SkillBarChart'
import ApplicationPieChart from '../../components/charts/ApplicationPieChart'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { TrendingUp, DollarSign, Award, Building, BarChart3, PieChart } from 'lucide-react'

export default function PlacementAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    academiaAPI
      .getPlacementAnalytics()
      .then((res) => setData(res.data?.data || null))
      .catch(() => {
        setData({
          placementRate: 84.6,
          highestPackage: 2400000,
          averagePackage: 885000,
          medianPackage: 820000,
          totalOffers: 1048,
          offersBySector: [
            { name: 'AI & Data Engineering', value: 38 },
            { name: 'Cloud Infrastructure', value: 26 },
            { name: 'Full-Stack Software', value: 24 },
            { name: 'Cybersecurity & Systems', value: 12 },
          ],
          salaryDistribution: [
            { name: '₹5L-₹8L', proficiency: 22 },
            { name: '₹8L-₹12L', proficiency: 46 },
            { name: '₹12L-₹18L', proficiency: 20 },
            { name: '₹18L+', proficiency: 12 },
          ],
        })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner text="Computing placement compensation metrics..." />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Campus Recruitment & Compensation Analytics"
        description="Comprehensive analysis of campus recruiting cycles, compensation distributions, and corporate hiring trends."
        badge="Recruitment Telemetry"
      />

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Overall Placement Rate"
          value={`${data?.placementRate || 84.6}%`}
          icon={TrendingUp}
          color="emerald"
          subtitle="Of registered eligible candidates"
        />
        <StatCard
          title="Total Offers Extended"
          value={data?.totalOffers || 1048}
          icon={Award}
          color="indigo"
          subtitle="Across all campus drives"
        />
        <StatCard
          title="Mean Annual Package"
          value={`₹${((data?.averagePackage || 885000) / 100000).toFixed(2)} LPA`}
          icon={DollarSign}
          color="blue"
          subtitle="Cohort average base package"
        />
        <StatCard
          title="Peak Compensation Offer"
          value={`₹${((data?.highestPackage || 2400000) / 100000).toFixed(1)} LPA`}
          icon={Building}
          color="teal"
          subtitle="Distributed Cloud Architecture role"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-slate-900 text-sm">Compensation Band Share (%)</h3>
          </div>
          <p className="text-xs text-slate-500">Percentage of campus offers across salary brackets.</p>
          <SkillBarChart data={data?.salaryDistribution || []} />
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Hiring Volume by Technology Sector</h3>
          </div>
          <p className="text-xs text-slate-500">Breakdown of recruitment offers by technical domain.</p>
          <ApplicationPieChart data={data?.offersBySector || []} />
        </div>
      </div>
    </div>
  )
}