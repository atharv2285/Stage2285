import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Edit2, Plus, Palette } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import FeedPost from '../components/FeedPost'
import EditModal from '../components/EditModal'
import CustomizationPanel from '../components/CustomizationPanel'

export default function ProfilePage({ currentUser }) {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [theme, setTheme] = useState({
    primaryColor: '#ea580c',
    backgroundColor: '#f9fafb',
    sectionOrder: ['profile', 'projects', 'feed']
  })

  const isOwnProfile = currentUser && currentUser.username === username

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    try {
      const [userRes, projectsRes, postsRes] = await Promise.all([
        axios.get(`/users/${username}`),
        axios.get(`/users/${username}`).then(res => 
          axios.get(`/projects/user/${res.data.user.id}`)
        ),
        axios.get(`/users/${username}`).then(res => 
          axios.get(`/posts/user/${res.data.user.id}`)
        )
      ])

      const userData = userRes.data.user
      setUser(userData)
      setProjects(projectsRes.data.projects || [])
      setPosts(postsRes.data.posts || [])
      
      if (userData.theme_preferences) {
        setTheme({
          ...theme,
          ...userData.theme_preferences
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProject = async (projectData) => {
    try {
      const response = await axios.post('/projects', projectData)
      setProjects([response.data.project, ...projects])
      setShowProjectModal(false)
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleAddPost = async (postData) => {
    try {
      const response = await axios.post('/posts', postData)
      setPosts([response.data.post, ...posts])
      setShowPostModal(false)
    } catch (error) {
      console.error('Error adding post:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-primary-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">User not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.backgroundColor }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl shadow-lg p-8 mb-6"
          style={{ backgroundColor: theme.cardBackground || '#ffffff' }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-6">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.primaryColor}aa, ${theme.primaryColor})`
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.tagline && <p className="text-lg text-gray-600 mt-1">{user.tagline}</p>}
                {user.college && (
                  <p className="text-sm text-gray-500 mt-2">
                    {user.college} {user.year && `• ${user.year}`}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {user.stage_level}
                  </span>
                </div>
              </div>
            </div>
            {isOwnProfile && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Palette size={18} />
                  Customize
                </button>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Edit2 size={18} />
                  Edit
                </button>
              </div>
            )}
          </div>

          {user.bio && (
            <p className="text-gray-700 mb-6">{user.bio}</p>
          )}

          <div className="flex gap-4 mb-6">
            {user.github_url && (
              <a 
                href={user.github_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-600 transition-colors"
                style={{ color: theme.primaryColor }}
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            )}
            {user.linkedin_url && (
              <a 
                href={user.linkedin_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-600 transition-colors"
                style={{ color: theme.primaryColor }}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            )}
            <a 
              href={`mailto:${user.email}`} 
              className="flex items-center gap-2 text-gray-600 transition-colors"
              style={{ color: theme.primaryColor }}
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>

          {user.skills && user.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user.interests && user.interests.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: `${theme.primaryColor}33`, color: theme.primaryColor }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div 
              className="rounded-2xl shadow-lg p-6 mb-6"
              style={{ backgroundColor: theme.cardBackground || '#ffffff' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
                {isOwnProfile && (
                  <button
                    onClick={() => setShowProjectModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <Plus size={18} />
                    Add Project
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No projects yet</p>
                ) : (
                  projects.map(project => (
                    <ProjectCard key={project.id} project={project} isOwner={isOwnProfile} />
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <div 
              className="rounded-2xl shadow-lg p-6"
              style={{ backgroundColor: theme.cardBackground || '#ffffff' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Feed</h2>
                {isOwnProfile && (
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="transition-colors"
                    style={{ color: theme.primaryColor }}
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No posts yet</p>
                ) : (
                  posts.map(post => (
                    <FeedPost key={post.id} post={post} isOwner={isOwnProfile} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <EditModal
          user={user}
          onClose={() => setEditMode(false)}
          onUpdate={(updatedUser) => {
            setUser(updatedUser)
            setEditMode(false)
          }}
        />
      )}

      {showCustomization && (
        <CustomizationPanel
          theme={theme}
          onThemeUpdate={(newTheme) => {
            setTheme(newTheme)
            setShowCustomization(false)
          }}
          userId={user.id}
          onClose={() => setShowCustomization(false)}
        />
      )}

      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Project</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleAddProject({
                title: formData.get('title'),
                description: formData.get('description'),
                tags: formData.get('tags').split(',').map(t => t.trim()).filter(Boolean),
                status: formData.get('status'),
                github_url: formData.get('github_url'),
                demo_url: formData.get('demo_url')
              })
            }}>
              <input name="title" placeholder="Project Title" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" required />
              <textarea name="description" placeholder="Description" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" rows="3" />
              <input name="tags" placeholder="Tags (comma-separated)" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" />
              <select name="status" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3">
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Planning">Planning</option>
              </select>
              <input name="github_url" placeholder="GitHub URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" />
              <input name="demo_url" placeholder="Demo URL" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" />
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  className="flex-1 text-white py-2 rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Add
                </button>
                <button type="button" onClick={() => setShowProjectModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add Post</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleAddPost({
                content: formData.get('content')
              })
            }}>
              <textarea name="content" placeholder="What's on your mind?" className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3" rows="4" required />
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  className="flex-1 text-white py-2 rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Post
                </button>
                <button type="button" onClick={() => setShowPostModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
