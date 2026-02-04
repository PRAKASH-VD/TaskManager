import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 pb-28 pt-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-300">
          The page you are looking for does not exist yet.
        </p>
        <Link
          className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
          to="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
