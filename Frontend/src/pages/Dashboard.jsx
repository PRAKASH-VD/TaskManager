import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { token, user, setUser, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        const [profileRes, tasksRes] = await Promise.all([
          api.getProfile(token),
          api.getTasks(token),
        ])
        setUser(profileRes.data?.user || null)
        setTasks(tasksRes.data?.tasks || [])
      } catch (err) {
        setError(err.message || 'Unable to load profile')
        logout()
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [token, setUser])

  const stats = useMemo(() => {
    const open = tasks.filter((t) => t.status === 'pending').length
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length
    const completed = tasks.filter((t) => t.status === 'completed').length
    const high = tasks.filter((t) => t.priority === 'high').length
    return [
      { label: 'Open Tasks', value: open },
      { label: 'Completed', value: completed },
      { label: 'In Progress', value: inProgress },
      { label: 'Priority High', value: high },
    ]
  }, [tasks])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-linear-to-br from-indigo-500/30 via-cyan-400/30 to-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-24 left-[-10%] h-88 w-88 rounded-full bg-linear-to-tr from-fuchsia-500/30 via-rose-500/30 to-amber-400/30 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-24">
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="mt-2 text-sm text-slate-300">
                Welcome back! This is the protected dashboard area.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-sm text-slate-300">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {loading ? '...' : item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Profile Snapshot</h2>
              <p className="mt-2 text-sm text-slate-300">
                Live data from your profile endpoint.
              </p>
              {error && (
                <div className="mt-4 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-100">
                  {error}
                </div>
              )}
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Name</p>
                  <p className="mt-2 text-base font-medium">
                    {loading ? 'Loading...' : user?.name || 'Unknown'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
                  <p className="mt-2 text-base font-medium">
                    {loading ? 'Loading...' : user?.email || 'Unknown'}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
