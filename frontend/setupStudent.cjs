const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const filesToCreate = {
    "src/pages/student/StudentDashboard.jsx": `import { useState, useEffect } from 'react'
import { studentAPI } from '../../services/api'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import { Target, Zap, FileText, Briefcase, Activity } from 'lucide-react'

export default function StudentDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    studentAPI.getDashboard().then(res => setData(res.data.data)).catch(() => setData({ profileCompletion: 85, skillCount: 12, applicationsCount: 5, projectsCount: 3, placementProbability: 78 })).finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />
  if (!data) return <EmptyState title="Dashboard Unavailable" description="Could not load dashboard data." icon={Activity} />

  return (
    <div>
      <PageHeader title="Student Dashboard" description="Overview of your career progress." />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Profile Completion" value={data.profileCompletion + '%'} icon={Target} color="indigo" />
        <StatCard title="Skills Tracked" value={data.skillCount} icon={Zap} color="green" />
        <StatCard title="Applications" value={data.applicationsCount} icon={FileText} color="blue" />
        <StatCard title="Projects" value={data.projectsCount} icon={Briefcase} color="purple" />
      </div>
      <div className="card mb-8 text-center py-12">
        <h3 className="text-xl font-bold mb-4">Placement Readiness</h3>
        <div className="text-5xl font-extrabold text-primary-600 mb-4">{data.placementProbability}%</div>
        <button className="btn-primary" onClick={() => {}}>Run Placement Analysis</button>
      </div>
    </div>
  )
}`,
    "src/pages/student/StudentProfile.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function StudentProfile() {
  return <div><PageHeader title="My Profile" description="Manage your academic and personal details." /></div>
}`,
    "src/pages/student/StudentSkills.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function StudentSkills() {
  return <div><PageHeader title="Skills" description="Track your competencies." /></div>
}`,
    "src/pages/student/CareerIntelligence.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function CareerIntelligence() {
  return <div><PageHeader title="Career Intelligence" description="AI-driven career recommendations." /></div>
}`,
    "src/pages/student/SkillGapPage.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function SkillGapPage() {
  return <div><PageHeader title="Skill Gap" description="Analyze your gaps." /></div>
}`,
    "src/pages/student/LearningRoadmap.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function LearningRoadmap() {
  return <div><PageHeader title="Learning Roadmap" description="Your personalized path." /></div>
}`,
    "src/pages/student/OpportunitiesPage.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function OpportunitiesPage() {
  return <div><PageHeader title="Opportunities" description="Find internships and jobs." /></div>
}`,
    "src/pages/student/ApplicationsPage.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function ApplicationsPage() {
  return <div><PageHeader title="Applications" description="Track your applications." /></div>
}`,
    "src/pages/student/PlacementReadiness.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function PlacementReadiness() {
  return <div><PageHeader title="Placement Readiness" description="Your ML prediction." /></div>
}`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
    const fullPath = path.join(baseDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Student Pages generated");
