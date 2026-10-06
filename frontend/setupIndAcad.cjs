const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const filesToCreate = {
    "src/pages/industry/IndustryDashboard.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function IndustryDashboard() {
  return <div><PageHeader title="Industry Dashboard" /></div>
}`,
    "src/pages/industry/CompanyProfile.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function CompanyProfile() {
  return <div><PageHeader title="Company Profile" /></div>
}`,
    "src/pages/industry/MyOpportunities.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function MyOpportunities() {
  return <div><PageHeader title="My Opportunities" /></div>
}`,
    "src/pages/industry/CreateOpportunity.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function CreateOpportunity() {
  return <div><PageHeader title="Post Opportunity" /></div>
}`,
    "src/pages/industry/ApplicantsPage.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function ApplicantsPage() {
  return <div><PageHeader title="Applicants" /></div>
}`,
    "src/pages/industry/CandidateSearch.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function CandidateSearch() {
  return <div><PageHeader title="Candidate Search" /></div>
}`,
    "src/pages/academia/AcademiaDashboard.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function AcademiaDashboard() {
  return <div><PageHeader title="Academia Dashboard" /></div>
}`,
    "src/pages/academia/StudentAnalytics.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function StudentAnalytics() {
  return <div><PageHeader title="Student Analytics" /></div>
}`,
    "src/pages/academia/SkillAnalytics.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function SkillAnalytics() {
  return <div><PageHeader title="Skill Analytics" /></div>
}`,
    "src/pages/academia/PlacementAnalytics.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function PlacementAnalytics() {
  return <div><PageHeader title="Placement Analytics" /></div>
}`,
    "src/pages/academia/IndustryDemand.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function IndustryDemand() {
  return <div><PageHeader title="Industry Demand" /></div>
}`,
    "src/pages/academia/TrainingRecommendations.jsx": `import PageHeader from '../../components/common/PageHeader'
export default function TrainingRecommendations() {
  return <div><PageHeader title="Training Recommendations" /></div>
}`
};

for (const [filePath, content] of Object.entries(filesToCreate)) {
    const fullPath = path.join(baseDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
}
console.log("Industry and Academia Pages generated");
