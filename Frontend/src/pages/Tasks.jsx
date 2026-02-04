import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

const emptyTask = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
}

function Tasks() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' })
  const [form, setForm] = useState(emptyTask)
  const [editingId, setEditingId] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.status) params.set('status', filters.status)
    if (filters.priority) params.set('priority', filters.priority)
    return params.toString() ? `?${params.toString()}` : ''
  }, [filters])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const res = await api.getTasks(token, queryString)
      setTasks(res.data?.tasks || [])
    } catch (err) {
      setError(err.message || 'Unable to fetch tasks')
      logout()
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      loadTasks()
    }
  }, [queryString, token])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (task) => {
    setEditingId(task._id)
    setForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'pending',
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    })
  }

  const resetForm = () => {
    setEditingId('')
    setForm(emptyTask)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!form.title.trim()) {
      setError('Task title is required')
      return
    }
    try {
      setSubmitting(true)
      if (editingId) {
        await api.updateTask(token, editingId, form)
        setSuccess('Task updated')
      } else {
        await api.createTask(token, form)
        setSuccess('Task created')
      }
      resetForm()
      await loadTasks()
    } catch (err) {
      setError(err.message || 'Unable to save task')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    setError('')
    setSuccess('')
    try {
      await api.deleteTask(token, id)
      setSuccess('Task deleted')
      await loadTasks()
    } catch (err) {
      setError(err.message || 'Unable to delete task')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-linear-to-br from-emerald-400/30 via-cyan-400/30 to-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-[-10%] h-88 w-88 rounded-full bg-linear-to-tr from-fuchsia-500/30 via-rose-500/30 to-amber-400/30 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Tasks</h1>
              <p className="mt-2 text-sm text-slate-300">
                Search, filter, and manage tasks in a single view.
              </p>
            </div>
          </div>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1fr,1.1fr]">
            <form
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
              onSubmit={handleSubmit}
            >
              <h2 className="text-lg font-semibold">
                {editingId ? 'Edit Task' : 'Create Task'}
              </h2>
              <div className="mt-4 space-y-4">
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  placeholder="Task title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                />
                <textarea
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  placeholder="Description"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleFormChange}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleFormChange}
                />
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
                <div className="flex flex-wrap gap-3">
                  <button
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Saving...' : editingId ? 'Update Task' : 'Create Task'}
                  </button>
                  {editingId && (
                    <button
                      className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
                      type="button"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <input
                  className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  placeholder="Search tasks..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
                <select
                  className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  name="priority"
                  value={filters.priority}
                  onChange={handleFilterChange}
                >
                  <option value="">All priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="mt-6 space-y-4">
                {loading ? (
                  <p className="text-sm text-slate-300">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                  <p className="text-sm text-slate-300">No tasks found.</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task._id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                            {task.status}
                          </p>
                          {task.description && (
                            <p className="mt-2 text-sm text-slate-300">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                          {task.priority}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
                          type="button"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-full border border-rose-400/40 px-4 py-2 text-xs font-semibold text-rose-100 transition hover:border-rose-300 hover:text-white"
                          type="button"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Tasks
