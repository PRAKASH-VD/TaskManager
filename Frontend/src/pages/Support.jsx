import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Support() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-linear-to-br from-cyan-400/30 via-indigo-500/30 to-fuchsia-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-[-10%] h-[22rem] w-[22rem] rounded-full bg-linear-to-tr from-emerald-400/30 via-rose-500/30 to-amber-400/30 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-28 pt-24">
          <h1 className="text-3xl font-semibold">Support</h1>
          <p className="mt-3 text-sm text-slate-300">
            We are here to help. Use the options below to reach the team.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Help Center</h2>
              <p className="mt-2 text-sm text-slate-300">
                Browse guides for onboarding, task workflows, and security best practices.
              </p>
              <button className="mt-4 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white">
                Visit Help Center
              </button>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Email Support</h2>
              <p className="mt-2 text-sm text-slate-300">
                Reach us at support@taskflow.app and we will respond within 24 hours.
              </p>
              <button className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100">
                Contact Support
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Support
