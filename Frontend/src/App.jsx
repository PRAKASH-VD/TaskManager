import { useMemo, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Support from './pages/Support'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ProtectedRoute from './routes/ProtectedRoute'
import { api } from './services/api'
import { useAuth } from './context/AuthContext'

function App() {
  const [mode, setMode] = useState('login')
  const { login } = useAuth()
  const navigate = useNavigate()

  const stats = useMemo(
    () => [
      { label: 'Active Users', value: '4.8k' },
      { label: 'Tasks Completed', value: '128k' },
      { label: 'Avg. Response', value: '120ms' },
    ],
    []
  )

  const handleAuth = async (authMode, form) => {
    if (authMode === 'signup') {
      const res = await api.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      login(res.token, res.data?.user)
    } else {
      const res = await api.login({
        email: form.email,
        password: form.password,
      })
      login(res.token, res.data?.user)
    }
    navigate('/dashboard')
  }

  return (
    <Routes>
      <Route path="/" element={<Home mode={mode} onModeChange={setMode} stats={stats} onAuth={handleAuth} />} />
      <Route path="/login" element={<AuthPage defaultMode="login" onAuth={handleAuth} />} />
      <Route path="/signup" element={<AuthPage defaultMode="signup" onAuth={handleAuth} />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/dashboard"
        element={(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/tasks"
        element={(
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
