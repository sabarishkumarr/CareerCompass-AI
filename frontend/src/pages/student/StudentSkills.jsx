import React, { useState, useEffect } from 'react'
import { studentAPI, skillsAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import Modal from '../../components/common/Modal'
import ProgressBar from '../../components/common/ProgressBar'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import toast from 'react-hot-toast'
import { Plus, Trash2, Zap, Award, Sparkles, Filter, CheckCircle2, Layers } from 'lucide-react'

export default function StudentSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [masterSkills, setMasterSkills] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming',
    proficiencyLevel: 75,
    yearsOfExperience: 1,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadSkills()
    skillsAPI.getAll().then((res) => setMasterSkills(res.data?.data || [])).catch(() => {})
  }, [])

  const loadSkills = () => {
    studentAPI
      .getSkills()
      .then((res) => {
        setSkills(res.data?.data || [])
      })
      .catch(() => {
        setSkills([
          { id: 1, name: 'Python', category: 'Programming', proficiencyLevel: 85 },
          { id: 2, name: 'Java', category: 'Programming', proficiencyLevel: 80 },
          { id: 3, name: 'Spring Boot', category: 'Web', proficiencyLevel: 78 },
          { id: 4, name: 'React', category: 'Web', proficiencyLevel: 82 },
          { id: 5, name: 'Machine Learning', category: 'Data Science', proficiencyLevel: 75 },
          { id: 6, name: 'SQL & Database Design', category: 'Databases', proficiencyLevel: 80 },
          { id: 7, name: 'Docker & Containers', category: 'Cloud', proficiencyLevel: 65 },
        ])
      })
      .finally(() => setLoading(false))
  }

  const handleAddSkill = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return toast.error('Please enter a competency name')
    setSubmitting(true)
    try {
      await studentAPI.addSkill(formData)
      toast.success(`Skill "${formData.name}" added successfully!`)
      setIsModalOpen(false)
      setFormData({ name: '', category: 'Programming', proficiencyLevel: 75, yearsOfExperience: 1 })
      loadSkills()
    } catch (err) {
      toast.error('Failed to add skill')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from your profile?`)) return
    try {
      await studentAPI.removeSkill(id)
      toast.success(`Removed ${name}`)
      setSkills((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      toast.error('Failed to remove skill')
    }
  }

  const categories = ['ALL', ...Array.from(new Set(skills.map((s) => s.category || 'General')))]
  const filteredSkills =
    activeCategory === 'ALL'
      ? skills
      : skills.filter((s) => (s.category || 'General') === activeCategory)

  if (loading) return <LoadingSpinner text="Loading skill inventory..." />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Technical Skill Inventory"
        description="Maintain verified competency levels and toolkits to optimize placement inference."
        badge="Self-Reported & Verified"
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary text-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Competency</span>
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{skills.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Competencies Tracked</div>
          </div>
        </div>

        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {skills.filter((s) => (s.proficiencyLevel || 0) >= 80).length}
            </div>
            <div className="text-xs text-slate-500 font-medium">High Mastery (80%+)</div>
          </div>
        </div>

        <div className="card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {skills.length > 0
                ? Math.round(
                    skills.reduce((acc, s) => acc + (s.proficiencyLevel || 50), 0) / skills.length
                  )
                : 0}
              %
            </div>
            <div className="text-xs text-slate-500 font-medium">Average Proficiency Index</div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
        <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          title="No skills recorded in this category"
          description="Add technical skills or programming languages to calibrate your placement scoring."
          icon={Zap}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const level = skill.proficiencyLevel || 50
            const color = level >= 80 ? 'green' : level >= 60 ? 'blue' : 'yellow'
            return (
              <div key={skill.id || skill.name} className="card p-5 space-y-3.5 hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{skill.name}</h4>
                    <span className="badge badge-slate text-[10px] mt-1 font-semibold">
                      {skill.category || 'General'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(skill.id, skill.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-medium">Mastery</span>
                    <span className="font-bold text-slate-800">{level}%</span>
                  </div>
                  <ProgressBar value={level} color={color} showLabel={false} size="sm" />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Skill Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Technical Competency" size="md">
        <form onSubmit={handleAddSkill} className="space-y-4">
          <div>
            <label className="label">Competency Name</label>
            <input
              type="text"
              required
              list="master-skills-list"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PyTorch, React, Kubernetes..."
              className="input-field"
            />
            <datalist id="master-skills-list">
              {masterSkills.map((s) => (
                <option key={s.id || s.name} value={s.name} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Domain Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="Programming">Programming</option>
                <option value="Web">Web Development</option>
                <option value="Databases">Databases</option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Cloud">Cloud & Infrastructure</option>
                <option value="DevOps">DevOps</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>

            <div>
              <label className="label">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.yearsOfExperience}
                onChange={(e) =>
                  setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })
                }
                className="input-field"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Proficiency Level</span>
              <span className="text-sky-600 font-bold">{formData.proficiencyLevel}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={formData.proficiencyLevel}
              onChange={(e) => setFormData({ ...formData, proficiencyLevel: parseInt(e.target.value) })}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-xs"
            >
              {submitting ? 'Registering...' : 'Save Competency'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}