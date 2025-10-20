import { useState } from 'react'
import { X, Palette, Layout, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function CustomizationPanel({ theme, onThemeUpdate, userId, onClose }) {
  const [localTheme, setLocalTheme] = useState(theme)
  const [saving, setSaving] = useState(false)

  const presetColors = [
    { name: 'Orange', value: '#ea580c' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Indigo', value: '#6366f1' },
  ]

  const backgroundColors = [
    { name: 'Light Gray', value: '#f9fafb' },
    { name: 'White', value: '#ffffff' },
    { name: 'Cream', value: '#fef3c7' },
    { name: 'Light Blue', value: '#dbeafe' },
    { name: 'Light Purple', value: '#ede9fe' },
    { name: 'Light Pink', value: '#fce7f3' },
    { name: 'Light Green', value: '#d1fae5' },
  ]

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.put(`/users/${userId}`, {
        theme_preferences: localTheme
      })
      onThemeUpdate(localTheme)
    } catch (error) {
      console.error('Error saving theme:', error)
      alert('Failed to save theme preferences')
    } finally {
      setSaving(false)
    }
  }

  const moveSectionUp = (index) => {
    if (index === 0) return
    const newOrder = [...localTheme.sectionOrder]
    ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    setLocalTheme({ ...localTheme, sectionOrder: newOrder })
  }

  const moveSectionDown = (index) => {
    if (index === localTheme.sectionOrder.length - 1) return
    const newOrder = [...localTheme.sectionOrder]
    ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    setLocalTheme({ ...localTheme, sectionOrder: newOrder })
  }

  const sectionNames = {
    profile: 'Profile Info',
    projects: 'Projects',
    feed: 'Feed'
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Palette className="text-orange-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Customize Your Profile</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Palette size={20} />
                Primary Color
              </h3>
              <p className="text-sm text-gray-600 mb-3">Choose your main accent color</p>
              <div className="grid grid-cols-4 gap-3">
                {presetColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setLocalTheme({ ...localTheme, primaryColor: color.value })}
                    className={`relative h-12 rounded-lg transition-all ${
                      localTheme.primaryColor === color.value
                        ? 'ring-4 ring-offset-2 ring-gray-400 scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                      {localTheme.primaryColor === color.value && '✓'}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Custom:</label>
                <input
                  type="color"
                  value={localTheme.primaryColor}
                  onChange={(e) => setLocalTheme({ ...localTheme, primaryColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer border-2 border-gray-300"
                />
                <span className="text-sm text-gray-600">{localTheme.primaryColor}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Palette size={20} />
                Background Color
              </h3>
              <p className="text-sm text-gray-600 mb-3">Choose your page background</p>
              <div className="grid grid-cols-4 gap-3">
                {backgroundColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setLocalTheme({ ...localTheme, backgroundColor: color.value })}
                    className={`relative h-12 rounded-lg border-2 transition-all ${
                      localTheme.backgroundColor === color.value
                        ? 'ring-4 ring-offset-2 ring-gray-400 scale-105'
                        : 'hover:scale-105 border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-gray-700 text-xs font-medium">
                      {localTheme.backgroundColor === color.value && '✓'}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Custom:</label>
                <input
                  type="color"
                  value={localTheme.backgroundColor}
                  onChange={(e) => setLocalTheme({ ...localTheme, backgroundColor: e.target.value })}
                  className="h-10 w-20 rounded cursor-pointer border-2 border-gray-300"
                />
                <span className="text-sm text-gray-600">{localTheme.backgroundColor}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Layout size={20} />
                Section Order
              </h3>
              <p className="text-sm text-gray-600 mb-3">Rearrange how your sections appear</p>
              <div className="space-y-2">
                {localTheme.sectionOrder.map((section, index) => (
                  <div
                    key={section}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <span className="font-medium text-gray-700">{sectionNames[section]}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveSectionUp(index)}
                        disabled={index === 0}
                        className={`px-3 py-1 rounded ${
                          index === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveSectionDown(index)}
                        disabled={index === localTheme.sectionOrder.length - 1}
                        className={`px-3 py-1 rounded ${
                          index === localTheme.sectionOrder.length - 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold disabled:opacity-50"
              style={{ 
                background: `linear-gradient(to right, ${localTheme.primaryColor}, ${localTheme.primaryColor}dd)` 
              }}
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
