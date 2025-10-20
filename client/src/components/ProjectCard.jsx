import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

export default function ProjectCard({ project, isOwner }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          project.status === 'Completed' ? 'bg-green-100 text-green-700' :
          project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {project.status}
        </span>
      </div>
      
      {project.description && (
        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
      )}
      
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-orange-50 text-primary-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex gap-3">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-primary-600 text-sm"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-primary-600 text-sm"
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}
