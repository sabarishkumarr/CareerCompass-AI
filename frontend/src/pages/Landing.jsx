import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  Zap,
  Building,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  BarChart3,
  Search,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Sliders,
  Cpu,
  Target,
  FileCheck,
  LineChart,
  Activity,
  Award,
  BookOpen,
  ArrowUpRight,
  Check,
} from 'lucide-react'
import ScrollReveal from '../components/common/ScrollReveal'
import CountUp from '../components/common/CountUp'
import Logo from '../components/common/Logo'

export default function Landing() {
  const [activeTab, setActiveTab] = useState('students')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f3ef] font-sans selection:bg-orange-500 selection:text-white antialiased">
      {/* Sticky Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-16 z-50 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-[#262626] px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all">
        <Link to="/" className="flex items-center gap-3">
          <Logo size="md" showText={true} />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-[#8c8b88]">
          <a href="#problem" className="hover:text-white transition-colors">The Challenge</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">Tri-Hub Platform</a>
          <a href="#ml-engine" className="hover:text-white transition-colors">ML Intelligence</a>
          <a href="#journey" className="hover:text-white transition-colors">Career Journey</a>
          <a href="#preview" className="hover:text-white transition-colors">Product Preview</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-medium text-[#d8d7d2] hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32">
        {/* Section 1: Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center pt-6 pb-20 relative">
          {/* Ambient Warm Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-medium text-orange-400 mb-8 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Next-Gen Placement & Profile Intelligence</span>
              <span className="w-1 h-1 rounded-full bg-[#5c5c5b]" />
              <span className="text-[#d8d7d2] font-mono">81.84% Verified ML Accuracy</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
              Architect Your Career Trajectory With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200">
                Empirical Precision
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-base sm:text-xl text-[#8c8b88] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              A unified intelligence platform connecting students, recruiters, and academic leadership. Predict placement readiness, diagnose granular skill gaps, and execute dynamic learning roadmaps.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 flex items-center justify-center gap-2 text-sm group"
              >
                <span>Launch Your Profile</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#141414] hover:bg-[#1c1c1c] text-[#d8d7d2] hover:text-white border border-[#262626] font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                Explore Live Demo Portals
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive Hero Preview Card */}
          <ScrollReveal delay={400}>
            <div className="relative max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-[#262626] via-[#1a1a1a] to-[#0f0f0f] shadow-2xl">
              <div className="bg-[#121212]/95 backdrop-blur-xl rounded-xl border border-[#262626] overflow-hidden text-left p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[#262626] gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-[#8c8b88] ml-2">careercompass.ai/inference-engine</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#8c8b88]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-semibold">Active Session</span>
                    <span className="text-[#5c5c5b]">|</span>
                    <span>Ensemble Classifier v2.4</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {/* Metric 1 */}
                  <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#262626] hover:border-orange-500/40 transition-colors">
                    <p className="text-xs font-semibold text-[#8c8b88] uppercase tracking-wider">Placement Readiness Score</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-extrabold text-white">
                        <CountUp end={88.4} decimals={1} suffix="%" />
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Optimal Tier</span>
                    </div>
                    <div className="w-full bg-[#1c1c1c] h-2 rounded-full mt-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full transition-all duration-1000" style={{ width: '88.4%' }} />
                    </div>
                    <p className="text-[11px] text-[#8c8b88] mt-2.5">Top 5% placement probability in Cloud & Distributed Systems</p>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#262626] hover:border-orange-500/40 transition-colors">
                    <p className="text-xs font-semibold text-[#8c8b88] uppercase tracking-wider">Primary Competency Deficit</p>
                    <p className="text-xl font-bold text-white mt-2">Docker & Kubernetes</p>
                    <p className="text-xs text-amber-400 mt-1 font-medium">Gap: 35% below target benchmark</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-[#8c8b88]">
                      <span>Target: 80%</span>
                      <span className="text-orange-400 font-medium">+14 hrs roadmap allocated</span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#262626] hover:border-orange-500/40 transition-colors">
                    <p className="text-xs font-semibold text-[#8c8b88] uppercase tracking-wider">Matched Opportunities</p>
                    <p className="text-3xl font-extrabold text-white mt-2">
                      <CountUp end={18} suffix=" roles" />
                    </p>
                    <p className="text-xs text-emerald-400 mt-1 font-medium">4 direct corporate interview invites</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-[#8c8b88]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Auto-verified skill badge attached</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Section 2: The Problem */}
        <section id="problem" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1c1c1c]">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                The Placement Gap
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                Why Traditional Campus Placements Fall Short
              </h2>
              <p className="text-[#8c8b88] text-sm sm:text-base mt-3">
                Students navigate blind career choices, universities react to outdated curriculum benchmarks, and recruiters filter thousands of unverified resumes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={100}>
              <div className="bg-[#121212] p-8 rounded-2xl border border-[#262626] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Unclear Competency Gaps</h3>
                <p className="text-[#8c8b88] text-sm leading-relaxed">
                  Students lack empirical feedback on whether their projects and technical skills match the actual expectations of modern engineering teams.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-[#121212] p-8 rounded-2xl border border-[#262626] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Delayed Academic Interventions</h3>
                <p className="text-[#8c8b88] text-sm leading-relaxed">
                  Institutions only discover hiring deficits after placement season ends, when it is already too late to provide targeted training.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-[#121212] p-8 rounded-2xl border border-[#262626] hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-stone-700/20 border border-stone-600/30 text-stone-300 flex items-center justify-center mb-6">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Inefficient Talent Sourcing</h3>
                <p className="text-[#8c8b88] text-sm leading-relaxed">
                  Recruiters spend hundreds of hours sifting through unstructured resumes without verified skill proficiencies or contextual readiness scores.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 3: Tri-Hub Ecosystem */}
        <section id="ecosystem" className="py-24 bg-[#0d0d0d] border-y border-[#1c1c1c] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  Tri-Hub Synergy
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                  One Unified Architecture for All Three Pillars
                </h2>
                <p className="text-[#8c8b88] text-sm sm:text-base mt-3">
                  Experience tailored workflows engineered specifically for students, recruiters, and academic leadership.
                </p>
              </div>
            </ScrollReveal>

            {/* Interactive Tabs */}
            <div className="flex justify-center mb-10">
              <div className="bg-[#141414] p-1.5 rounded-xl border border-[#262626] flex gap-2">
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'students'
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                      : 'text-[#8c8b88] hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Intelligence</span>
                </button>
                <button
                  onClick={() => setActiveTab('industry')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'industry'
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                      : 'text-[#8c8b88] hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Industry Hub</span>
                </button>
                <button
                  onClick={() => setActiveTab('academia')}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'academia'
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                      : 'text-[#8c8b88] hover:text-white'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Academia Analytics</span>
                </button>
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="bg-[#121212] rounded-2xl border border-[#262626] p-8 sm:p-12">
              {activeTab === 'students' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-semibold">Student Module</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                      Personalized Career Trajectories & Guided Upskilling
                    </h3>
                    <p className="text-[#8c8b88] text-sm leading-relaxed mb-6">
                      Upload your technical competencies and academic background. Our ML engine calculates your placement probability, highlights missing prerequisite skills, and generates an actionable week-by-week learning roadmap.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Predictive placement readiness index powered by trained classifiers</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Visual skill gap radar against current industry job listings</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Single-click application tracking with real-time status updates</span>
                      </li>
                    </ul>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300"
                    >
                      <span>Create Student Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-xl border border-[#262626] p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                      <span className="text-xs font-semibold text-[#d8d7d2]">Target Role: Senior Full-Stack Engineer</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">91% Match</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-[#8c8b88] mb-1">
                          <span>React & TypeScript</span>
                          <span className="text-white font-semibold">95% (Exceeds)</span>
                        </div>
                        <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-[#8c8b88] mb-1">
                          <span>Spring Boot & Microservices</span>
                          <span className="text-white font-semibold">88% (Proficient)</span>
                        </div>
                        <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full rounded-full" style={{ width: '88%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-[#8c8b88] mb-1">
                          <span>Cloud Deployment & Docker</span>
                          <span className="text-amber-400 font-semibold">52% (Focus Area)</span>
                        </div>
                        <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '52%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'industry' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-semibold">Recruiter Workspace</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                      High-Precision Candidate Scouting & Skill Filtering
                    </h3>
                    <p className="text-[#8c8b88] text-sm leading-relaxed mb-6">
                      Publish internships and full-time vacancies. Filter candidates by verified skill match scores, academic CGPA brackets, and placement readiness ratings.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Pre-ranked candidate matching algorithms for posted vacancies</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Interactive candidate search with dynamic CGPA & skill filter sliders</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Applicant lifecycle management (Shortlist, Interview, Select)</span>
                      </li>
                    </ul>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300"
                    >
                      <span>Join as Hiring Partner</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-xl border border-[#262626] p-6 space-y-3">
                    <div className="text-xs font-semibold text-[#8c8b88] pb-2 border-b border-[#262626]">Top Matched Candidates</div>
                    <div className="p-3 bg-[#141414] rounded-lg border border-[#262626] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">Sabarish Kumar</p>
                        <p className="text-[11px] text-[#8c8b88]">Java • Spring Boot • React • ML</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">94% Match</span>
                    </div>
                    <div className="p-3 bg-[#141414] rounded-lg border border-[#262626] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">Dinesh Sai Karthik</p>
                        <p className="text-[11px] text-[#8c8b88]">Python • FastAPI • PostgreSQL • Docker</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">91% Match</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'academia' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-semibold">Institutional Analytics</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
                      Cohort Intelligence & Proactive Curriculum Alignment
                    </h3>
                    <p className="text-[#8c8b88] text-sm leading-relaxed mb-6">
                      Empower university placement cells and academic deans with aggregate cohort readiness analytics, market demand trend feeds, and automated training recommendations.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Cohort-wide placement probability distribution analytics</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Corporate skill demand velocity feed tracking emerging frameworks</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-[#d8d7d2]">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>Curriculum intervention generator with expected +7.8% placement uplift</span>
                      </li>
                    </ul>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300"
                    >
                      <span>Access Academic Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-xl border border-[#262626] p-6 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-[#262626]">
                      <span className="text-xs font-semibold text-[#d8d7d2]">Institutional Placement Metric</span>
                      <span className="text-xs font-bold text-orange-400">84.2% Projected</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-[#141414] p-3 rounded-lg border border-[#262626]">
                        <p className="text-[10px] text-[#8c8b88] uppercase">Enrolled Cohort</p>
                        <p className="text-lg font-bold text-white mt-1">1,240</p>
                      </div>
                      <div className="bg-[#141414] p-3 rounded-lg border border-[#262626]">
                        <p className="text-[10px] text-[#8c8b88] uppercase">Avg Package</p>
                        <p className="text-lg font-bold text-white mt-1">₹8.4 LPA</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Machine Learning Engine Deep Dive */}
        <section id="ml-engine" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Verified Rigor
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                Trained on Real Empirical Datasets
              </h2>
              <p className="text-[#8c8b88] text-sm sm:text-base mt-3">
                No synthetic heuristics. Our inference pipeline uses rigorously validated scikit-learn classifiers backed by 5-fold cross-validation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={100}>
              <div className="bg-[#121212] p-6 rounded-2xl border border-[#262626] text-center hover:border-orange-500/40 transition-colors">
                <p className="text-3xl sm:text-4xl font-extrabold text-orange-400">
                  <CountUp end={81.84} decimals={2} suffix="%" />
                </p>
                <p className="text-xs font-semibold text-[#d8d7d2] mt-2 uppercase tracking-wide">Test Accuracy</p>
                <p className="text-[11px] text-[#8c8b88] mt-1">Logistic Regression Baseline</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-[#121212] p-6 rounded-2xl border border-[#262626] text-center hover:border-orange-500/40 transition-colors">
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  <CountUp end={0.8998} decimals={4} />
                </p>
                <p className="text-xs font-semibold text-[#d8d7d2] mt-2 uppercase tracking-wide">F1-Score</p>
                <p className="text-[11px] text-[#8c8b88] mt-1">High precision-recall balance</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-[#121212] p-6 rounded-2xl border border-[#262626] text-center hover:border-orange-500/40 transition-colors">
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                  <CountUp end={89.92} decimals={2} suffix="%" />
                </p>
                <p className="text-xs font-semibold text-[#d8d7d2] mt-2 uppercase tracking-wide">5-Fold CV Score</p>
                <p className="text-[11px] text-[#8c8b88] mt-1">± 0.0008 stability index</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-[#121212] p-6 rounded-2xl border border-[#262626] text-center hover:border-orange-500/40 transition-colors">
                <p className="text-3xl sm:text-4xl font-extrabold text-stone-300">
                  &lt; <CountUp end={45} suffix="ms" />
                </p>
                <p className="text-xs font-semibold text-[#d8d7d2] mt-2 uppercase tracking-wide">FastAPI Latency</p>
                <p className="text-[11px] text-[#8c8b88] mt-1">Real-time microservice pipeline</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Section 5: Career Journey Sequence */}
        <section id="journey" className="py-24 bg-[#0d0d0d] border-t border-[#1c1c1c] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  Career Trajectory Roadmap
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                  From Campus Ingestion to Offer Letter
                </h2>
                <p className="text-[#8c8b88] text-sm sm:text-base mt-3">
                  A continuous closed-loop workflow ensuring every skill gap is identified and closed before campus placement drives begin.
                </p>
              </div>
            </ScrollReveal>

            {/* Sequence Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
              {[
                { step: '01', title: 'Profile Ingestion', desc: 'Log academics, skills, and portfolio links' },
                { step: '02', title: 'ML Prediction', desc: 'Evaluate placement readiness probability' },
                { step: '03', title: 'Skill Diagnosis', desc: 'Identify competency deficits vs market' },
                { step: '04', title: 'Roadmap Execution', desc: 'Follow structured weekly milestones' },
                { step: '05', title: 'Smart Matching', desc: 'Apply to ranked partner opportunities' },
                { step: '06', title: 'Offer Secured', desc: 'Track interviews and selection status' },
              ].map((item, idx) => (
                <ScrollReveal key={item.step} delay={idx * 100}>
                  <div className="bg-[#121212] p-5 rounded-xl border border-[#262626] hover:border-orange-500/40 hover:-translate-y-1 transition-all h-full flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                        {item.step}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-3 mb-1">{item.title}</h4>
                      <p className="text-xs text-[#8c8b88] leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#1c1c1c] flex items-center justify-between text-[11px] text-[#5c5c5b]">
                      <span>Stage {idx + 1}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Product / Dashboard Preview */}
        <section id="preview" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                Interactive Dashboard Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4">
                Designed for Focus, Velocity, and Impact
              </h2>
              <p className="text-[#8c8b88] text-sm sm:text-base mt-3">
                Streamlined dark interfaces built with high-density data visualizations and zero visual clutter.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-[#121212] rounded-2xl border border-[#262626] p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Widget 1 */}
                <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#262626]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                    <span className="text-xs font-semibold text-white">Skill Mastery Distribution</span>
                    <span className="text-xs text-orange-400 font-mono">14 Tracked</span>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div>
                      <div className="flex justify-between text-xs text-[#8c8b88] mb-1">
                        <span>Java & Spring Boot</span>
                        <span className="text-white font-medium">85%</span>
                      </div>
                      <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[#8c8b88] mb-1">
                        <span>Machine Learning & Scikit</span>
                        <span className="text-white font-medium">78%</span>
                      </div>
                      <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-[#8c8b88] mb-1">
                        <span>PostgreSQL & SQL</span>
                        <span className="text-white font-medium">90%</span>
                      </div>
                      <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Widget 2 */}
                <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#262626]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                    <span className="text-xs font-semibold text-white">Application Pipeline</span>
                    <span className="text-xs text-emerald-400 font-mono">3 Active</span>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="p-2.5 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">Full-Stack Engineer</p>
                        <p className="text-[10px] text-[#8c8b88]">TechCorp Solutions</p>
                      </div>
                      <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">Interview</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white">Data Analyst</p>
                        <p className="text-[10px] text-[#8c8b88]">DataVision Analytics</p>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Review</span>
                    </div>
                  </div>
                </div>

                {/* Visual Widget 3 */}
                <div className="bg-[#0a0a0a] p-5 rounded-xl border border-[#262626]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                    <span className="text-xs font-semibold text-white">Recommended Milestone</span>
                    <span className="text-xs text-orange-400 font-mono">Week 4</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-bold text-white">Containerization with Docker</p>
                    <p className="text-[11px] text-[#8c8b88] mt-1">Complete multi-stage Dockerfile build for Spring Boot application</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] text-orange-400 font-medium">+15 Readiness Pts</span>
                      <Link to="/register" className="text-xs font-semibold text-white hover:text-orange-400 flex items-center gap-1">
                        <span>Start</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Section 7: Final CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative">
          <ScrollReveal>
            <div className="bg-gradient-to-b from-[#141414] via-[#121212] to-[#0a0a0a] p-10 sm:p-16 rounded-3xl border border-[#262626] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Ready to Navigate Your Career With Total Confidence?
              </h2>
              <p className="text-[#8c8b88] text-base max-w-2xl mx-auto mb-8">
                Join thousands of students and leading corporate hiring teams transforming placement intelligence today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105 text-sm"
                >
                  Get Started Now — It's Free
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 bg-[#1c1c1c] hover:bg-[#262626] text-white font-semibold rounded-xl border border-[#333333] transition-all text-sm"
                >
                  Sign In to Portal
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-[#1c1c1c] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[#8c8b88]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo size="sm" showText={true} />
          <div>
            <span>© {new Date().getFullYear()} CareerCompass AI. Final Submission Release.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}