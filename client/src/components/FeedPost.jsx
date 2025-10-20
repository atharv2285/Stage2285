import { motion } from 'framer-motion'

export default function FeedPost({ post, isOwner }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-200 pb-4 last:border-0"
    >
      <p className="text-gray-700 text-sm mb-2">{post.content}</p>
      <span className="text-xs text-gray-500">{formatDate(post.created_at)}</span>
    </motion.div>
  )
}
