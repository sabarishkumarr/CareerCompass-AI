import axios from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cc_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cc_token')
      localStorage.removeItem('cc_user')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      toast.error('Access denied')
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again.')
    } else if (!error.response) {
      toast.error('Network error. Check your connection.')
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
}

export const studentAPI = {
  getDashboard: () => api.get('/students/dashboard'),
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
  getSkills: () => api.get('/students/skills'),
  addSkill: (data) => api.post('/students/skills', data),
  removeSkill: (skillId) => api.delete(`/students/skills/${skillId}`),
  getProjects: () => api.get('/students/projects'),
  addProject: (data) => api.post('/students/projects', data),
  deleteProject: (id) => api.delete(`/students/projects/${id}`),
  getInternships: () => api.get('/students/internships'),
  addInternship: (data) => api.post('/students/internships', data),
  deleteInternship: (id) => api.delete(`/students/internships/${id}`),
  getPlacementPrediction: () => api.get('/students/placement-prediction'),
  getCareerAnalysis: () => api.get('/students/career-analysis'),
  getSkillGap: (careerId) => api.get(`/students/skill-gap/${careerId}`),
  getRoadmap: () => api.get('/students/roadmap'),
  generateRoadmap: (careerId) => api.post(`/students/roadmap/generate/${careerId}`),
  completeRoadmapItem: (itemId) => api.put(`/students/roadmap/items/${itemId}/complete`),
}

export const opportunityAPI = {
  getAll: (params) => api.get('/opportunities', { params }),
  getById: (id) => api.get(`/opportunities/${id}`),
  create: (data) => api.post('/opportunities', data),
  update: (id, data) => api.put(`/opportunities/${id}`, data),
  delete: (id) => api.delete(`/opportunities/${id}`),
  getMy: () => api.get('/opportunities/my'),
  getMatch: (id) => api.get(`/opportunities/${id}/match`),
}

export const applicationAPI = {
  apply: (data) => api.post('/applications', data),
  getMyApplications: () => api.get('/applications/my'),
  withdraw: (id) => api.put(`/applications/${id}/withdraw`),
  getForOpportunity: (opportunityId) => api.get(`/applications/opportunity/${opportunityId}`),
  updateStatus: (id, status, notes) => api.put(`/applications/${id}/status`, { status, notes }),
  getIndustryApplications: () => api.get('/applications/industry'),
}

export const industryAPI = {
  getDashboard: () => api.get('/industry/dashboard'),
  getProfile: () => api.get('/industry/profile'),
  updateProfile: (data) => api.put('/industry/profile', data),
  getCandidates: (params) => api.get('/industry/candidates', { params }),
  getCandidateDetail: (studentId) => api.get(`/industry/candidates/${studentId}`),
  getRankedCandidates: (opportunityId) => api.get(`/industry/opportunities/${opportunityId}/ranked`),
  evaluateCandidate: (appId, data) => api.post(`/industry/applications/${appId}/evaluate`, data),
}

export const academiaAPI = {
  getDashboard: () => api.get('/academia/dashboard'),
  getStudents: (params) => api.get('/academia/students', { params }),
  getStudentAnalytics: () => api.get('/academia/student-analytics'),
  getSkillAnalytics: () => api.get('/academia/skill-analytics'),
  getPlacementAnalytics: () => api.get('/academia/placement-analytics'),
  getIndustryDemand: () => api.get('/academia/industry-demand'),
  getTrainingRecommendations: () => api.get('/academia/training-recommendations'),
}

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  getCount: () => api.get('/notifications/count'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
}

export const mlAPI = {
  health: () => api.get('/ml/health'),
  predictPlacement: (data) => api.post('/ml/predict-placement', data),
  skillGap: (data) => api.post('/ml/skill-gap', data),
  careerRecommendation: (data) => api.post('/ml/career-recommendation', data),
}

export const skillsAPI = {
  getAll: () => api.get('/skills'),
  getByCategory: (category) => api.get(`/skills/category/${category}`),
  search: (query) => api.get(`/skills/search?q=${query}`),
}

export const careersAPI = {
  getAll: () => api.get('/careers'),
  getById: (id) => api.get(`/careers/${id}`),
}
