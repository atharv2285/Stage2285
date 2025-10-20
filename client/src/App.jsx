import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import SetupPage from './pages/SetupPage'
import ProfilePage from './pages/ProfilePage'
import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-primary-600">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to={`/profile/${user.username}`} /> : <Login setUser={setUser} />} />
        <Route path="/setup" element={user ? <SetupPage user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/profile/:username" element={<ProfilePage currentUser={user} />} />
      </Routes>
    </Router>
  )
}

export default App
