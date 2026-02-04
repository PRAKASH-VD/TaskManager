const featureCards = [
  {
    title: 'Focused boards',
    copy: 'Move tasks across stages with crisp status and priority tags.'
  },
  {
    title: 'Realtime insight',
    copy: 'Search, filter, and sort tasks instantly across your workspace.'
  },
  {
    title: 'Security ready',
    copy: 'JWT-based authentication and protected routes keep data safe.'
  }
]

function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
      <div className="grid gap-6 md:grid-cols-3">
        {featureCards.map((card) => (
          <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/30">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
