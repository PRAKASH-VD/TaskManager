import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-3" to="/">
          <div className="h-10 w-10 rounded-2xl bg-linear-to-tr from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/30" />
          <span className="text-lg font-semibold tracking-wide">TaskFlow</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
          {isAuthenticated && (
            <>
              <NavLink className="transition hover:text-white" to="/dashboard">Dashboard</NavLink>
              <NavLink className="transition hover:text-white" to="/tasks">Tasks</NavLink>
            </>
          )}
          <NavLink className="transition hover:text-white" to="/support">Support</NavLink>
          <NavLink className="transition hover:text-white" to="/contact">Contact</NavLink>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="hidden flex-col text-right text-xs text-slate-300 md:flex">
              <span className="font-semibold text-white">{user?.name || 'User'}</span>
              <span>{user?.email || ''}</span>
            </div>
            <button
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/60 hover:text-white"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-white/60 hover:text-white"
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Navbar
