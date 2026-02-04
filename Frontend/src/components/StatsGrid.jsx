function StatsGrid({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <p className="text-sm text-slate-300">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
