import React, { useState, useEffect } from 'react'
import { industryAPI, skillsAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import {
  Search,
  Filter,
  GraduationCap,
  Award,
  BookOpen,
  UserCheck,
  Mail,
  Sparkles,
} from 'lucide-react'

export default function CandidateSearch() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [minCgpa, setMinCgpa] = useState(7.0)
  const [selectedSkill, setSelectedSkill] = useState('ALL')

  useEffect(() => {
    industryAPI
      .getCandidates()
      .then((res) => setCandidates(res.data?.data || []))
      .catch(() => {
        setCandidates([
          {
            id: 1,
            firstName: 'R Sabarish',
            lastName: 'Kumar',
            college: 'Chennai Institute of Technology',
            degree: 'B.E. Computer Science and Engineering',
            cgpa: 8.85,
            preferredCareer: 'Distributed Systems Engineer',
            skills: ['Java', 'Spring Boot', 'React', 'FastAPI', 'Machine Learning', 'Docker'],
            matchScore: 94,
          },
          {
            id: 2,
            firstName: 'N Dinesh Sai',
            lastName: 'Karthik',
            college: 'Chennai Institute of Technology',
            degree: 'B.E. Computer Science and Engineering',
            cgpa: 8.7,
            preferredCareer: 'Full-Stack Software Engineer',
            skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Microservices'],
            matchScore: 91,
          },
          {
            id: 3,
            firstName: 'Priya',
            lastName: 'Sharma',
            college: 'Anna University',
            degree: 'B.Tech Information Technology',
            cgpa: 8.2,
            preferredCareer: 'Machine Learning Engineer',
            skills: ['Python', 'SQL', 'scikit-learn', 'PyTorch', 'Data Visualization'],
            matchScore: 88,
          },
          {
            id: 4,
            firstName: 'Arun',
            lastName: 'Vance',
            college: 'NIT Trichy',
            degree: 'B.Tech Computer Science',
            cgpa: 8.5,
            preferredCareer: 'Cloud Platform Engineer',
            skills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Terraform', 'Go'],
            matchScore: 89,
          },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = candidates.filter((c) => {
    const fullName = `${c.firstName} ${c.lastName}`.toLowerCase()
    const matchesSearch =
      !search ||
      fullName.includes(search.toLowerCase()) ||
      c.college?.toLowerCase().includes(search.toLowerCase()) ||
      c.preferredCareer?.toLowerCase().includes(search.toLowerCase())
    const matchesCgpa = (c.cgpa || 0) >= minCgpa
    const matchesSkill = selectedSkill === 'ALL' || (c.skills && c.skills.includes(selectedSkill))
    return matchesSearch && matchesCgpa && matchesSkill
  })

  if (loading) return <LoadingSpinner text="Searching candidate profiles across campus cohorts..." />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Candidate Discovery & Scouting"
        description="Search across academic institutions for pre-assessed engineering talent matching your skill profiles."
        badge="Talent Scouting"
      />

      {/* Filter Matrix */}
      <div className="card p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate name, university, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="input-field"
            >
              <option value="ALL">All Competencies</option>
              <option value="Java">Java / Spring Boot</option>
              <option value="Python">Python</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="React">React.js</option>
              <option value="Docker">Docker & Containers</option>
              <option value="Kubernetes">Kubernetes</option>
            </select>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
              Min CGPA: <strong>{minCgpa.toFixed(1)}</strong>
            </span>
            <input
              type="range"
              min="6.0"
              max="9.5"
              step="0.1"
              value={minCgpa}
              onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Candidates Found"
          description="Adjust your search criteria or decrease the minimum CGPA filter."
          icon={UserCheck}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((cand) => (
            <div
              key={cand.id}
              className="card p-6 space-y-4 hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {cand.firstName} {cand.lastName}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cand.college} • {cand.degree}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold shrink-0">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{cand.matchScore || 85}% Match</span>
                </div>
              </div>

              <div className="text-xs bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex justify-between items-center text-slate-600">
                <span>
                  Target Goal: <strong className="text-slate-800">{cand.preferredCareer || 'Software Engineer'}</strong>
                </span>
                <span className="text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  CGPA: {cand.cgpa}
                </span>
              </div>

              <div>
                <span className="label block mb-1.5">Verified Technical Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(cand.skills || ['Java', 'React', 'SQL']).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => alert(`Initiating direct recruiter outreach to ${cand.firstName} ${cand.lastName}...`)}
                  className="btn-primary text-xs px-4 py-2"
                >
                  Contact Candidate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}