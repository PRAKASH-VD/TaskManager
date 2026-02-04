import { useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function AuthCard({ mode, onModeChange, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (mode === 'signup' && !form.name.trim()) {
      return 'Name is required'
    }
    if (!emailRegex.test(form.email)) {
      return 'Please enter a valid email'
    }
    if (form.password.length < 6) {
      return 'Password must be at least 6 characters'
    }
    if (mode === 'signup' && !/\d/.test(form.password)) {
      return 'Password must include at least one number'
    }
    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      await onSubmit(mode, form)
      setSuccess(mode === 'login' ? 'Login successful' : 'Account created')
    } catch (err) {
      setError(err.message || 'Unable to continue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-sm text-slate-300">Sign in to manage your tasks.</p>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
          v1 API
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-white/10 p-1 text-sm">
        <button
          className={`rounded-2xl px-3 py-2 font-medium transition ${mode === 'login' ? 'bg-white text-slate-900' : 'text-slate-200 hover:text-white'}`}
          onClick={() => onModeChange('login')}
          type="button"
        >
          Login
        </button>
        <button
          className={`rounded-2xl px-3 py-2 font-medium transition ${mode === 'signup' ? 'bg-white text-slate-900' : 'text-slate-200 hover:text-white'}`}
          onClick={() => onModeChange('signup')}
          type="button"
        >
          Sign Up
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-300">Full name</label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              placeholder="Enter your name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-slate-300">Email</label>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            placeholder="you@example.com"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-slate-300">Password</label>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            placeholder="Minimum 6 characters"
            type="password"
            minLength={6}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {mode === 'signup' && (
          <p className="text-xs text-slate-400">
            Password must include at least one number.
          </p>
        )}
        {error && (
          <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-100">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
            {success}
          </div>
        )}
        <button
          className="w-full rounded-2xl bg-linear-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
        </button>
        <p className="text-center text-xs text-slate-400">
          {mode === 'login' ? 'Forgot your password? Contact support.' : 'By signing up you agree to our terms.'}
        </p>
      </form>
    </section>
  )
}

export default AuthCard
