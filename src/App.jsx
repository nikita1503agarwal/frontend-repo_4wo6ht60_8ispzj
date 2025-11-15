import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'

function useRevealOnScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const GlowButton = ({ children, href = '#', variant = 'primary' }) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-0'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-[#6F4AFF] to-[#4BE2FF] text-[#0A0F1F] shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_30px_6px_rgba(111,74,255,0.35)]'
      : 'bg-white/10 text-[#F5F5F5] border border-white/10 hover:bg-white/15'
  return (
    <a href={href} className={`${base} ${styles}`}>{children}</a>
  )
}

const Loopy = ({ className = '' }) => {
  // Minimal clean robot mascot with subtle animations
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 240" className="w-full h-full" aria-label="Loopy mascot" role="img">
        <defs>
          <radialGradient id="gGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
          </radialGradient>
          <linearGradient id="gEye" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#4BE2FF" />
            <stop offset="100%" stopColor="#6F4AFF" />
          </linearGradient>
        </defs>
        {/* head */}
        <g className="animate-float">
          <rect x="40" y="10" rx="28" ry="28" width="120" height="90" fill="url(#gGlow)" />
          {/* eyes */}
          <rect x="70" y="45" width="22" height="12" rx="6" fill="url(#gEye)" className="animate-blink" />
          <rect x="110" y="45" width="22" height="12" rx="6" fill="url(#gEye)" className="animate-blink delay-200" />
          {/* face shine */}
          <circle cx="160" cy="20" r="14" fill="#4BE2FF" opacity="0.15" />
        </g>
        {/* body */}
        <g className="animate-float-slow">
          <rect x="65" y="110" rx="18" ry="18" width="70" height="70" fill="url(#gGlow)" />
          {/* arms */}
          <rect x="32" y="120" rx="10" ry="10" width="28" height="58" fill="url(#gGlow)" opacity="0.9" />
          <rect x="140" y="120" rx="10" ry="10" width="28" height="58" fill="url(#gGlow)" opacity="0.9" />
          {/* legs */}
          <rect x="70" y="188" rx="10" ry="10" width="24" height="40" fill="url(#gGlow)" />
          <rect x="106" y="188" rx="10" ry="10" width="24" height="40" fill="url(#gGlow)" />
        </g>
      </svg>
      {/* glow aura */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] blur-3xl opacity-50" style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(111,74,255,0.35) 0%, rgba(75,226,255,0.25) 35%, rgba(10,15,31,0) 70%)' }} />
    </div>
  )
}

const VerticalAdCarousel = () => {
  const trackRef = useRef(null)
  useEffect(() => {
    // duplicate cards to create seamless loop
    const track = trackRef.current
    if (!track) return
    const children = Array.from(track.children)
    children.forEach(node => track.appendChild(node.cloneNode(true)))
  }, [])

  const Card = ({ i }) => (
    <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-[1.02] transition-transform">
      <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(120% 80% at 20% 10%, rgba(111,74,255,0.35) 0%, rgba(75,226,255,0.25) 40%, rgba(10,15,31,0) 70%)' }} />
      <div className="relative z-10 h-full p-4 flex flex-col justify-between">
        <div className="text-xs text-[#F5F5F5]/70">Concept {i + 1}</div>
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-white/30 rounded"></div>
          <div className="h-3 w-2/3 bg-white/20 rounded"></div>
          <div className="h-24 rounded-lg bg-gradient-to-tr from-[#6F4AFF]/30 to-[#4BE2FF]/30"></div>
        </div>
      </div>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#6F4AFF]/30 blur-2xl" />
      <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[#4BE2FF]/30 blur-2xl" />
    </div>
  )

  return (
    <div className="relative h-[560px] w-full overflow-hidden">
      <div ref={trackRef} className="absolute left-0 top-0 w-full flex flex-col gap-6 animate-vert-scroll will-change-transform">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} i={i} />
        ))}
      </div>
      {/* gradient masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0F1F] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0F1F] to-transparent" />
    </div>
  )
}

// Small base64 SVG noise tile to avoid JSX parser issues with inline XML
const NOISE_BG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgdmlld0JveD0nMCAwIDIwIDIwJz48cmVjdCB3aWR0aD0nMScgaGVpZ2h0PScxJyBmaWxsPScjZmZmZmZmJyBmaWxsLW9wYWNpdHk9JzAuMDInLz48L3N2Zz4="

export default function App() {
  useRevealOnScroll()

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#F5F5F5] selection:bg-[#6F4AFF]/30">
      {/* background layers */}
      <div className="fixed inset-0 -z-0 pointer-events-none">
        {/* subtle noise */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url(${NOISE_BG})` }} />
        {/* holographic grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(111,74,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(75,226,255,0.08) 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: '0 0, 0 0' }} />
        {/* fog */}
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[80vh] w-[90vw] rounded-full blur-3xl opacity-40 bg-gradient-to-r from-[#6F4AFF]/40 via-[#4BE2FF]/30 to-transparent animate-slow-pulse" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#6F4AFF] to-[#4BE2FF]" />
              <span className="text-sm tracking-widest uppercase text-white/80">Loops</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-white/70">
              <a href="#how" className="hover:text-white transition-colors">How it works</a>
              <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              <a href="#brand" className="hover:text-white transition-colors">Connect</a>
              <a href="#final" className="hover:text-white transition-colors">Get Access</a>
            </nav>
            <div className="flex items-center gap-3">
              <GlowButton href="/test">Try the Demo</GlowButton>
              <GlowButton href="#waitlist" variant="secondary">Join the Waitlist</GlowButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left - Loopy + Spline aura */}
            <div className="relative h-[520px] md:h-[600px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loopy className="w-72 md:w-80" />
              </div>
            </div>

            {/* Right - Headline + carousel */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6" data-reveal>
                Your Creative Engine Trained by Your Competitors.
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl" data-reveal>
                Loops learns from the best-performing ads in your niche and generates flawless creatives tailored to your brand — automatically.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-10" data-reveal>
                <GlowButton href="/test">Try the Demo</GlowButton>
                <GlowButton href="#waitlist" variant="secondary">Join the Waitlist</GlowButton>
              </div>
              <p className="text-white/50 text-sm" data-reveal>No templates. No guessing. Just pure creative intelligence.</p>
              <div className="mt-10" data-reveal>
                <VerticalAdCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 border-t border-white/10" id="problem">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative" data-reveal>
              {/* chaotic wall */}
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="h-28 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:rotate-0 transition-transform" />
                ))}
              </div>
              {/* hologram sweep */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#6F4AFF]/20 to-transparent blur-xl animate-scan" />
            </div>
            <div data-reveal>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">You waste time trying to understand what works.</h2>
              <p className="text-white/70 leading-relaxed mb-8 max-w-xl">
                Teams spend hours scrolling ads and testing random ideas. Creative performance isn’t intuition — it’s pattern recognition at scale.
              </p>
              <GlowButton href="#how">Discover How Loops Thinks</GlowButton>
              <div className="mt-10 flex items-center gap-6">
                <Loopy className="w-28" />
                <div className="text-white/60 text-sm">Loopy projects a hologram to clarify chaos.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategist Section */}
      <section className="py-24" id="strategist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-reveal>
            <h2 className="text-3xl md:text-4xl font-semibold">Your own AI Creative Strategist.</h2>
            <p className="text-white/70 mt-3 max-w-2xl">Loops thinks like a human strategist — studying your niche, decoding what works, and turning it into clear, actionable creative direction.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8" data-reveal>
              <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(80% 80% at 20% 0%, rgba(111,74,255,0.25), rgba(10,15,31,0) 60%)' }} />
              <div className="relative z-10">
                <div className="mb-6"><Loopy className="w-24" /></div>
                <div className="h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-[#6F4AFF]/20 to-[#4BE2FF]/10" />
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8" data-reveal>
              <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(80% 80% at 80% 0%, rgba(75,226,255,0.25), rgba(10,15,31,0) 60%)' }} />
              <div className="relative z-10">
                <div className="mb-6"><Loopy className="w-24" /></div>
                <div className="h-40 rounded-2xl border border-white/10 bg-gradient-to-tr from-white/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-white/10" id="how">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12" data-reveal>How Loops Works</h2>
          <div className="relative" data-reveal>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: 'Scrape & Detect',
                  text: 'Scans thousands of ads, finds hidden winning patterns, hooks, structures, emotions.',
                },
                { title: 'Interpret', text: 'Analyzes creative logic: hooks, copy structure, visual hierarchy, angles, behavioral triggers.' },
                { title: 'Replicate (No Plagiarism)', text: 'Rebuilds structures adapted to brand identity, tone, colors, audience, product.' },
                { title: 'Iterate', text: 'Each creative learns from results and improves automatically.' },
              ].map((s, i) => (
                <div key={i} className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 group hover:scale-[1.01] transition-transform">
                  {i === 0 && <Loopy className="w-14 absolute -top-8 left-4" />}
                  {i === 3 && <Loopy className="w-14 absolute -top-8 right-4" />}
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#6F4AFF] to-[#4BE2FF] mb-3" />
                  <h3 className="font-semibold mb-2">Step {i + 1} — {s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 h-px w-6 bg-gradient-to-r from-[#6F4AFF] to-[#4BE2FF]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24" id="gallery">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10" data-reveal>
            <h2 className="text-3xl md:text-4xl font-semibold">See what Loops creates.</h2>
            <p className="text-white/70 mt-3 max-w-2xl">All visuals are generated by Loops’ Creative Engine — fully editable, brand-perfect, performance-ready.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="mb-4 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden group hover:shadow-[0_0_40px_rgba(111,74,255,0.25)] transition-shadow" data-reveal>
                <div className="aspect-[4/3] bg-gradient-to-br from-[#6F4AFF]/30 to-[#4BE2FF]/20" />
                <div className="p-4 text-sm text-white/70">Concept #{i + 1}</div>
                <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-[#6F4AFF] group-hover:ring-offset-2 group-hover:ring-offset-[#0A0F1F] transition" />
              </div>
            ))}
          </div>
          {/* auto-scrolling strip */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl" data-reveal>
            <div className="flex gap-4 p-4 animate-h-scroll will-change-transform">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-28 w-48 rounded-xl bg-gradient-to-br from-[#6F4AFF]/20 to-[#4BE2FF]/20 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect your brand */}
      <section className="py-24 border-t border-white/10" id="brand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div data-reveal>
            <h2 className="text-3xl md:text-4xl font-semibold">Connect Your Brand.</h2>
            <p className="text-white/70 mt-3 max-w-xl">Upload your ads or paste your website. Loops instantly understands your identity, tone, and audience — creating a unique creative fingerprint.</p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="h-28 rounded-xl border border-white/10 bg-gradient-to-tr from-[#6F4AFF]/20 to-transparent" />
                <div className="col-span-2 h-12 rounded-xl border border-white/10 bg-white/10" />
              </div>
            </div>
          </div>
          <div data-reveal>
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(80% 60% at 60% 30%, rgba(75,226,255,0.25), rgba(10,15,31,0) 60%)' }} />
              <div className="relative z-10">
                <div className="h-56 rounded-2xl border border-white/10 bg-gradient-to-br from-[#6F4AFF]/20 to-[#4BE2FF]/10" />
                <p className="text-white/60 text-sm mt-4">Your brand fingerprint: tone, palette, typography, motion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn what works */}
      <section className="py-24" id="learn">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10" data-reveal>
            <h2 className="text-3xl md:text-4xl font-semibold">Learn What Works.</h2>
            <p className="text-white/70 mt-3 max-w-2xl">Loops uncovers hooks, formats, emotions, and angles that convert best — turning market data into creative intelligence.</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-h-scroll-slow will-change-transform">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="min-w-[320px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:scale-[1.01] transition-transform" data-reveal>
                  <div className="h-40 rounded-2xl bg-gradient-to-br from-[#6F4AFF]/20 to-[#4BE2FF]/10 mb-4" />
                  <div className="h-3 w-1/2 bg-white/20 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Generate & improve */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(111,74,255,0.35), rgba(10,15,31,0) 60%)' }} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div data-reveal>
              <h2 className="text-3xl md:text-4xl font-semibold">Generate & Improve.</h2>
              <p className="text-white/70 mt-3 max-w-xl">Loops creates brand-perfect ads designed for performance. Each iteration makes the next creative smarter.</p>
              <div className="mt-6"><GlowButton href="/test">Try the Demo</GlowButton></div>
            </div>
            <div className="relative" data-reveal>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2"><Loopy className="w-24" /></div>
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 h-64" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28" id="final">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center" data-reveal>
            <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(80% 60% at 50% 50%, rgba(111,74,255,0.25), rgba(75,226,255,0.2), rgba(10,15,31,0) 70%)' }} />
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="mx-auto w-24 mb-4"><Loopy /></div>
              <h2 className="text-3xl md:text-4xl font-semibold">Accelerate your growth with Loops.</h2>
              <p className="text-white/70 mt-2">Your creative engine — working 24/7.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <GlowButton href="/test">Try the Demo</GlowButton>
                <GlowButton href="#waitlist" variant="secondary">Join the Waitlist</GlowButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Loops — Creative Engine
      </footer>
    </div>
  )
}
