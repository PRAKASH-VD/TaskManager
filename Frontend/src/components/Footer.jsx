function Footer() {
  return (
    <footer id="support" className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-slate-400 md:flex-row">
        <p>TaskFlow (c) 2026. Built for a better focus.</p>
        <div className="flex items-center gap-6">
          <a className="transition hover:text-white" href="#features">Product</a>
          <a className="transition hover:text-white" href="/support">Support</a>
          <a className="transition hover:text-white" href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
