import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import StatsGrid from '../components/StatsGrid'
import AuthCard from '../components/AuthCard'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home({ mode, onModeChange, stats, onAuth }) {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-linear-to-br from-fuchsia-500/40 via-indigo-500/30 to-cyan-400/30 blur-3xl" />
          <div className="absolute -bottom-32 left-[-10%] h-112 w-md rounded-full bg-linear-to-tr from-amber-400/30 via-rose-500/30 to-purple-500/40 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-28 pt-24 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <section className="space-y-6">
            <Hero />
            <StatsGrid stats={stats} />
          </section>
          {isAuthenticated ? (
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Welcome back</h2>
                  <p className="text-sm text-slate-300">Your workspace is ready.</p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  Active
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Account</p>
                  <p className="mt-2 text-base font-medium text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                    to="/dashboard"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
                    to="/tasks"
                  >
                    View Tasks
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <AuthCard mode={mode} onModeChange={onModeChange} onSubmit={onAuth} />
          )}
        </main>

        <Features />
        <Footer />
      </div>
    </div>
  )
}

export default Home
