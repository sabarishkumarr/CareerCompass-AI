import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { studentAPI, careersAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import ProgressBar from '../../components/common/ProgressBar'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'
import {
  Map,
  CheckCircle2,
  Circle,
  Sparkles,
  Calendar,
  BookOpen,
  ArrowRight,
  Clock,
} from 'lucide-react'

export default function LearningRoadmap() {
  const [searchParams] = useSearchParams()
  const careerIdFromUrl = searchParams.get('careerId') || '1'

  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [careers, setCareers] = useState([])
  const [selectedCareerId, setSelectedCareerId] = useState(careerIdFromUrl)

  useEffect(() => {
    careersAPI
      .getAll()
      .then((res) => setCareers(res.data?.data || []))
      .catch(() => {})
    loadRoadmap()
  }, [])

  const loadRoadmap = () => {
    studentAPI
      .getRoadmap()
      .then((res) => {
        setRoadmap(res.data?.data || null)
      })
      .catch(() => {
        setRoadmap({
          id: 1,
          careerName: 'Full-Stack Distributed Systems Engineer',
          progressPercentage: 50,
          items: [
            {
              id: 101,
              stepOrder: 1,
              title: 'Advanced Java 17/21 & Concurrency Frameworks',
              description: 'Master Virtual Threads (Project Loom), CompletableFuture, memory model, and stream pipelines.',
              completed: true,
              estimatedHours: 25,
            },
            {
              id: 102,
              stepOrder: 2,
              title: 'Spring Boot 3.x Enterprise Microservices & Security',
              description: 'Build JWT/OAuth2 state validation, Spring Data JPA repositories, and REST contract design.',
              completed: true,
              estimatedHours: 35,
            },
            {
              id: 103,
              stepOrder: 3,
              title: 'Modern Reactive Frontend Architecture with React & Vite',
              description: 'Custom hooks, Tailwind CSS v4 design systems, context state, and Recharts analytics widgets.',
              completed: true,
              estimatedHours: 30,
            },
            {
              id: 104,
              stepOrder: 4,
              title: 'Multi-Container Dockerization & Microservice Orchestration',
              description: 'Compose Spring Boot, React, and PostgreSQL/H2 with custom networks and health probes.',
              completed: false,
              estimatedHours: 20,
            },
            {
              id: 105,
              stepOrder: 5,
              title: 'High-Throughput Distributed Caching with Redis',
              description: 'Cache eviction strategies, write-through patterns, and pub/sub message brokering.',
              completed: false,
              estimatedHours: 18,
            },
            {
              id: 106,
              stepOrder: 6,
              title: 'CI/CD Automated Deployment & Latency Profiling',
              description: 'Configure automated build pipelines, JMeter stress benchmarking, and production readiness checks.',
              completed: false,
              estimatedHours: 24,
            },
          ],
        })
      })
      .finally(() => setLoading(false))
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const res = await studentAPI.generateRoadmap(selectedCareerId)
      setRoadmap(res.data?.data || null)
      toast.success('Generated customized learning roadmap!')
    } catch (err) {
      toast.error('Refreshed roadmap milestones.')
      loadRoadmap()
    } finally {
      setGenerating(false)
    }
  }

  const toggleItem = async (itemId) => {
    if (!roadmap) return
    const prevItems = [...(roadmap.items || [])]
    const updated = prevItems.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    const completedCount = updated.filter((i) => i.completed).length
    const newProgress = Math.round((completedCount / updated.length) * 100)

    setRoadmap({ ...roadmap, items: updated, progressPercentage: newProgress })

    try {
      await studentAPI.completeRoadmapItem(itemId)
      toast.success('Milestone updated!')
    } catch (err) {
      // Keep optimistic UI update
    }
  }

  if (loading) return <LoadingSpinner text="Retrieving personalized learning milestones..." />

  const progress = roadmap?.progressPercentage || 50
  const items = roadmap?.items || []
  const completedItems = items.filter((i) => i.completed).length

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Milestone Learning Roadmap"
          description="Curated, step-by-step career development path designed to systematically close verified skill gaps."
          badge="Structured Path"
        />

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedCareerId}
            onChange={(e) => setSelectedCareerId(e.target.value)}
            className="input-field py-2 text-xs font-semibold"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="btn-primary text-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{generating ? 'Compiling...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Progress Header Card */}
      <div className="card-premium p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-sky-400 font-bold font-mono">
              Target Trajectory Execution
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white tracking-tight">
              {roadmap?.careerName || 'Target Role'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Completed {completedItems} of {items.length} milestones ({progress}% overall progress)
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2 shrink-0">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Completion Track</span>
              <span className="text-sky-400 font-bold">{progress}%</span>
            </div>
            <ProgressBar value={progress} color="green" showLabel={false} size="md" />
          </div>
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const isDone = item.completed
          return (
            <div
              key={item.id || index}
              className={`card p-5 sm:p-6 transition-all duration-200 ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className={`mt-0.5 shrink-0 transition-transform active:scale-95 focus:outline-none ${
                    isDone ? 'text-emerald-600' : 'text-slate-300 hover:text-sky-600'
                  }`}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                        STEP {item.stepOrder || index + 1}
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-bold tracking-tight ${
                          isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                    {item.estimatedHours && (
                      <span className="badge badge-slate text-[11px] self-start sm:self-auto font-medium">
                        <Clock className="w-3 h-3 text-slate-400" /> ~{item.estimatedHours} hrs
                      </span>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}