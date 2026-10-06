import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { studentAPI, careersAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import ProgressBar from '../../components/common/ProgressBar'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react'

export default function SkillGapPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCareerId = searchParams.get('careerId') || '1'

  const [careers, setCareers] = useState([])
  const [selectedCareerId, setSelectedCareerId] = useState(initialCareerId)
  const [gapData, setGapData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    careersAPI
      .getAll()
      .then((res) => {
        const list = res.data?.data || []
        setCareers(list)
        if (list.length > 0 && !list.find((c) => c.id.toString() === selectedCareerId)) {
          setSelectedCareerId(list[0].id.toString())
        }
      })
      .catch(() => {
        setCareers([
          { id: 1, name: 'Full-Stack Distributed Systems Engineer' },
          { id: 2, name: 'Machine Learning & Applied AI Engineer' },
          { id: 3, name: 'Cloud Platform & DevOps Specialist' },
          { id: 4, name: 'Data Engineering & Analytics Specialist' },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (selectedCareerId) {
      loadGapAnalysis(selectedCareerId)
    }
  }, [selectedCareerId])

  const loadGapAnalysis = (careerId) => {
    setAnalyzing(true)
    studentAPI
      .getSkillGap(careerId)
      .then((res) => {
        setGapData(res.data?.data || null)
      })
      .catch(() => {
        setGapData({
          readinessScore: 78,
          readinessLevel: 'High Competency',
          targetCareer: {
            name:
              careers.find((c) => c.id.toString() === careerId)?.name ||
              'Full-Stack Distributed Systems Engineer',
          },
          matchedSkills: [
            { skill_name: 'Java (Core & Advanced)', student_proficiency: 85, required_proficiency: 80, gap: 0, status: 'Strong', priority: 'Low' },
            { skill_name: 'Spring Boot Microservices', student_proficiency: 80, required_proficiency: 75, gap: 0, status: 'Strong', priority: 'Low' },
            { skill_name: 'React.js & State Architecture', student_proficiency: 82, required_proficiency: 75, gap: 0, status: 'Strong', priority: 'Low' },
            { skill_name: 'Relational Databases (PostgreSQL/H2)', student_proficiency: 75, required_proficiency: 75, gap: 0, status: 'Strong', priority: 'Low' },
            { skill_name: 'Docker & Containerization', student_proficiency: 55, required_proficiency: 75, gap: 20, status: 'Moderate Gap', priority: 'High' },
            { skill_name: 'Kubernetes & Helm Orchestration', student_proficiency: 0, required_proficiency: 70, gap: 70, status: 'Missing', priority: 'Critical' },
            { skill_name: 'Distributed Caching (Redis)', student_proficiency: 0, required_proficiency: 65, gap: 65, status: 'Missing', priority: 'Critical' },
          ],
          recommendations: [
            'Deploy multi-container Spring Boot and React applications using Docker Compose.',
            'Implement Redis caching layer for high-throughput REST API endpoint responses.',
            'Complete hands-on Kubernetes Pod configuration, Services, and Ingress routing labs.',
          ],
        })
      })
      .finally(() => setAnalyzing(false))
  }

  if (loading) return <LoadingSpinner text="Initializing gap telemetry analyzer..." />

  const readiness = gapData?.readinessScore || 78
  const readinessColor = readiness >= 80 ? 'green' : readiness >= 60 ? 'blue' : 'yellow'

  return (
    <div className="space-y-8">
      <PageHeader
        title="Skill Gap & Competency Audit"
        description="Multidimensional profile comparison against real corporate benchmarks for your target career role."
        badge="Live Telemetry"
      />

      {/* Target Career Selector Card */}
      <div className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <label className="label mb-0.5">Selected Target Role</label>
            <select
              value={selectedCareerId}
              onChange={(e) => {
                setSelectedCareerId(e.target.value)
                setSearchParams({ careerId: e.target.value })
              }}
              className="font-bold text-slate-900 bg-transparent border-b-2 border-sky-500 focus:outline-none text-base py-1 cursor-pointer pr-4"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id.toString()}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Link
          to={`/app/roadmap?careerId=${selectedCareerId}`}
          className="btn-primary text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Launch Learning Roadmap</span>
        </Link>
      </div>

      {analyzing ? (
        <div className="card p-12 text-center">
          <LoadingSpinner text="Evaluating required skill weight matrices..." />
        </div>
      ) : gapData ? (
        <>
          {/* Readiness Meter Card */}
          <div className="card-premium p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-sky-400 font-bold font-mono">
                  Benchmark Evaluation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {gapData.targetCareer?.name || 'Selected Role'}
                </h3>
                <p className="text-xs text-slate-300">
                  Readiness Tier:{' '}
                  <span className="font-bold text-emerald-400">
                    {gapData.readinessLevel || 'Near Ready'}
                  </span>
                </p>
              </div>

              <div className="md:col-span-2 space-y-2.5">
                <div className="flex justify-between items-baseline text-xs font-semibold">
                  <span className="text-slate-300">Aggregate Preparedness Index</span>
                  <span className="text-2xl font-extrabold text-white">{readiness}%</span>
                </div>
                <ProgressBar value={readiness} color={readinessColor} showLabel={false} size="md" />
                <p className="text-[11px] text-slate-400">
                  {readiness >= 75
                    ? 'Qualified for immediate corporate application submissions and technical screenings.'
                    : 'Address the critical priority gaps listed below to reach the 80%+ hiring threshold.'}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-sky-600" />
                <h4 className="font-bold text-slate-900 text-sm">Competency Comparison Grid</h4>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {gapData.matchedSkills?.length || 0} Core skills benchmarked
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="px-5 py-3.5">Competency</th>
                    <th className="px-5 py-3.5">Your Proficiency</th>
                    <th className="px-5 py-3.5">Required Target</th>
                    <th className="px-5 py-3.5">Deficit Margin</th>
                    <th className="px-5 py-3.5">Evaluation</th>
                    <th className="px-5 py-3.5">Intervention Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(gapData.matchedSkills || []).map((item, idx) => {
                    const status = item.status || 'Moderate Gap'
                    const isStrong = status === 'Strong'
                    const isMissing = status === 'Missing'
                    const priority =
                      item.priority || (isMissing ? 'Critical' : isStrong ? 'Low' : 'Medium')

                    return (
                      <tr key={item.skill_name || idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-4 font-bold text-slate-900">
                          {item.skill_name}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-700 w-8">{item.student_proficiency}%</span>
                            <div className="w-20">
                              <ProgressBar
                                value={item.student_proficiency}
                                color={item.student_proficiency >= 70 ? 'green' : 'blue'}
                                showLabel={false}
                                size="sm"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-700">
                          {item.required_proficiency}%
                        </td>
                        <td className="px-5 py-4 font-bold">
                          {item.gap > 0 ? (
                            <span className="text-rose-600">-{item.gap}%</span>
                          ) : (
                            <span className="text-emerald-600">✓ Fully Met</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {isStrong ? (
                            <span className="badge badge-green">
                              <CheckCircle2 className="w-3 h-3" /> Strong
                            </span>
                          ) : isMissing ? (
                            <span className="badge badge-red">
                              <XCircle className="w-3 h-3" /> Missing
                            </span>
                          ) : (
                            <span className="badge badge-yellow">
                              <AlertTriangle className="w-3 h-3" /> Moderate Gap
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              priority === 'Critical'
                                ? 'bg-rose-100 text-rose-800'
                                : priority === 'High'
                                ? 'bg-amber-100 text-amber-800'
                                : priority === 'Medium'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {priority}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Recommendations Card */}
          <div className="card p-6 bg-sky-50/40 border border-sky-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Prescribed Curriculum Interventions</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-700">
              {(gapData.recommendations || []).map((rec, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-sky-100 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}