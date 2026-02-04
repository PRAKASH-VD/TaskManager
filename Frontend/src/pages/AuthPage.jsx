import { useMemo, useState } from 'react'
import AuthCard from '../components/AuthCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AuthPage({ defaultMode = 'login', onAuth }) {
  const [mode, setMode] = useState(defaultMode)
  const stats = useMemo(
    () => [
      { label: 'Active Users', value: '4.8k' },
      { label: 'Tasks Completed', value: '128k' },
      { label: 'Avg. Response', value: '120ms' },
    ],
    []
  )

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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
              Auth portal
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl font-semibold leading-tight text-white md:text-5xl">
              Secure access for every workspace.
            </h1>
            <p className="text-base text-slate-200 md:text-lg">
              Log in or create an account to unlock your dashboard and start managing tasks.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm text-slate-300">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <AuthCard mode={mode} onModeChange={setMode} onSubmit={onAuth} />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AuthPage
