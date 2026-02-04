import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-linear-to-br from-rose-500/30 via-purple-500/30 to-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-[-10%] h-[22rem] w-[22rem] rounded-full bg-linear-to-tr from-amber-400/30 via-cyan-400/30 to-emerald-400/30 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-28 pt-24">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <p className="mt-3 text-sm text-slate-300">
            Want to talk about your workflow or integrations? Drop us a message.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr,1.1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Head Office</h2>
              <p className="mt-2 text-sm text-slate-300">
                221 TaskFlow Avenue
                <br />
                San Francisco, CA
              </p>
              <p className="mt-4 text-sm text-slate-300">
                Phone: +1 (415) 555-0124
                <br />
                Email: hello@taskflow.app
              </p>
            </div>

            <form className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">Send a message</h2>
              <div className="mt-4 space-y-4">
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  placeholder="Your name"
                />
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  type="email"
                  placeholder="Email address"
                />
                <textarea
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  rows={4}
                  placeholder="Tell us more"
                />
                <button
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                  type="button"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Contact
