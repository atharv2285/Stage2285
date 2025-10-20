import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#ea580c',
    backgroundColor: '#f9fafb',
    cardBackground: '#ffffff',
    textColor: '#111827',
    sectionOrder: ['profile', 'projects', 'feed'],
    ...initialTheme
  })

  const updateTheme = (updates) => {
    setTheme(prev => ({ ...prev, ...updates }))
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
