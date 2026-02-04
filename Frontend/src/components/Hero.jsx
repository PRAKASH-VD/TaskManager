function Hero() {
  return (
    <section className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
        New • Task Manager v1
      </div>
      <h1 className="font-['Playfair_Display'] text-4xl font-semibold leading-tight text-white md:text-5xl">
        Keep every task on track with a calm, gradient-powered workspace.
      </h1>
      <p className="text-base text-slate-200 md:text-lg">
        Organize projects, update progress, and stay focused with a clean dashboard built
        for teams that move fast.
      </p>
      <div className="flex flex-wrap gap-4">
        <span className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
          Built for focus
        </span>
      </div>
    </section>
  )
}

export default Hero
