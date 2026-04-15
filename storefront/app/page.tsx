'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  CheckCircle,
  Download,
  Zap,
  BarChart2,
  Clock,
  Target,
  Star,
  ShieldCheck,
  RefreshCw,
  Lock,
  ChevronRight,
  Play,
} from 'lucide-react'
import { useProducts } from '@/hooks/use-products'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80'
const LIFESTYLE_IMAGE_2 = 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&q=80'

const features = [
  {
    icon: BarChart2,
    title: '21-Day Habit Stacking',
    desc: 'Science-backed 21-day system that makes habits automatic — not a chore.',
  },
  {
    icon: Target,
    title: 'Life Goal Framework',
    desc: 'Map your 90-day, 1-year, and 5-year goals with crystal clarity.',
  },
  {
    icon: Zap,
    title: 'Daily Energy Audit',
    desc: 'Track sleep, nutrition, movement and mental state in under 2 minutes.',
  },
  {
    icon: Clock,
    title: 'Time Block Templates',
    desc: 'Pre-built schedules for entrepreneurs, students, and high-performers.',
  },
]

const stats = [
  { value: '14,200+', label: 'Active Users' },
  { value: '91%', label: 'Report Better Focus' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '30 Days', label: 'Money-Back Guarantee' },
]

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Entrepreneur',
    text: 'I went from zero consistency to 47 days of unbroken habits in under 2 months. HabitCore changed everything.',
  },
  {
    name: 'Priya S.',
    role: 'Medical Student',
    text: 'The life-saving tracker literally helped me survive finals season. My sleep, diet and study blocks are all in sync now.',
  },
  {
    name: 'Jake R.',
    role: 'Remote Engineer',
    text: 'Bought 3 different planners. Nothing worked. Downloaded HabitCore at midnight and filled it out immediately. Worth every cent.',
  },
]

function CountdownTimer() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 32 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1 font-mono text-lg font-bold text-teal tabular-nums">
      <span>{pad(time.h)}</span>
      <span className="opacity-60">:</span>
      <span>{pad(time.m)}</span>
      <span className="opacity-60">:</span>
      <span>{pad(time.s)}</span>
    </div>
  )
}

export default function HomePage() {
  const { data: products } = useProducts({ limit: 4 })

  return (
    <>
      {/* Announcement ticker */}
      <div className="bg-navy text-white py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 mx-6 text-xs tracking-widest uppercase">
              <CheckCircle className="h-3 w-3 text-teal flex-shrink-0" />
              <span>Instant Digital Download</span>
              <CheckCircle className="h-3 w-3 text-teal flex-shrink-0" />
              <span>Works on Any Device</span>
              <CheckCircle className="h-3 w-3 text-teal flex-shrink-0" />
              <span>30-Day Money-Back Guarantee</span>
              <CheckCircle className="h-3 w-3 text-teal flex-shrink-0" />
              <span>14,200+ Happy Users</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          {/* Text */}
          <div className="space-y-7 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/30 bg-teal/5 text-xs font-semibold uppercase tracking-widest text-teal">
              <Zap className="h-3 w-3" />
              Digital Habit Tracking System
            </span>
            <h1 className="text-h1 lg:text-display font-heading font-bold text-balance leading-[1.08] text-navy">
              Build Habits That
              <br />
              <span className="text-teal">Actually Stick.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              HabitCore is a complete digital habit-tracking system built for people serious about transformation. One purchase. Lifetime results.
            </p>
            <ul className="space-y-2">
              {['21-day habit-building framework', 'Life goal mapping system', 'Daily energy tracker', 'Instant download — start today'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle className="h-4 w-4 text-teal flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'hsl(174, 72%, 40%)' }}
                prefetch={true}
              >
                Get Instant Access
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-border px-8 py-4 text-sm font-semibold uppercase tracking-wide rounded-lg hover:border-navy hover:text-navy transition-colors"
                prefetch={true}
              >
                <Play className="h-4 w-4" />
                See How It Works
              </Link>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-teal" />
              Secure checkout &mdash; 30-day money-back guarantee &mdash; instant download
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="HabitCore — Digital Habit Tracker"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur rounded-xl px-4 py-3 shadow-lg">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Today&apos;s Streak</p>
                <p className="text-2xl font-bold text-navy font-heading">Day 21 <span className="text-teal">🔥</span></p>
              </div>
              {/* Floating stat */}
              <div className="absolute bottom-6 right-6 bg-navy/90 backdrop-blur rounded-xl px-4 py-3 shadow-lg text-white">
                <p className="text-xs text-white/60 uppercase tracking-widest">Habits Completed</p>
                <p className="text-2xl font-bold font-heading">6 / 6</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y bg-muted/40">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold font-heading text-navy">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-widest text-teal font-semibold mb-3">What&apos;s Inside</p>
            <h2 className="text-h2 font-heading font-bold text-navy">
              Everything You Need to Transform Your Life
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              HabitCore is not a simple checklist. It is a complete system — designed by behavioral scientists and productivity experts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className="group p-6 rounded-xl border bg-background hover:border-teal/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'hsl(174, 72%, 40%, 0.12)' }}>
                    <Icon className="h-5 w-5 text-teal" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading font-bold text-navy mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Editorial — Lifestyle */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="People living with intention using HabitCore"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-widest text-teal font-semibold">The Philosophy</p>
              <h2 className="text-h2 font-heading font-bold text-navy">
                Small Actions. Compounded Daily. Life-Changing Results.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Research shows it takes 21 to 66 days to build a lasting habit. HabitCore&apos;s system respects that science. Each module is sequenced to reduce resistance, build momentum, and lock in behaviors that last.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you want to get fit, sleep better, read more, or build a business — the system adapts to your goals, not the other way around.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-teal"
                prefetch={true}
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      {products && products.length > 0 && (
        <section className="py-section">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-teal font-semibold mb-2">Our Products</p>
                <h2 className="text-h2 font-heading font-bold text-navy">Choose Your System</h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline"
                prefetch={true}
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product: any) => {
                const price = product.variants?.[0]?.calculated_price?.calculated_amount
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group block rounded-xl overflow-hidden border bg-background hover:border-teal/40 hover:shadow-lg transition-all duration-200"
                    prefetch={true}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-navy/5">
                          <BarChart2 className="h-12 w-12 text-navy/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-navy">{product.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        {price != null && (
                          <span className="font-bold text-navy">
                            ${(price / 100).toFixed(2)}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal uppercase tracking-wide">
                          <Download className="h-3 w-3" />
                          Instant Download
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-section bg-navy">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-teal font-semibold mb-3">Real Results</p>
            <h2 className="text-h2 font-heading font-bold text-white">
              14,200 People Can&apos;t Be Wrong
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-xl p-7"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second lifestyle / CTA */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <p className="text-xs uppercase tracking-widest text-teal font-semibold">Limited Launch Offer</p>
              <h2 className="text-h2 font-heading font-bold text-navy">
                This Price Won&apos;t Last — Act Today
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re in our founding launch window. Right now you get lifetime access to the full HabitCore system at a fraction of what it will cost when we raise our price.
              </p>

              {/* Countdown */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-navy/5 border border-navy/10">
                <Clock className="h-5 w-5 text-teal flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Offer expires in</p>
                  <CountdownTimer />
                </div>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'hsl(174, 72%, 40%)' }}
                prefetch={true}
              >
                Claim My Copy — Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="order-1 lg:order-2 aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl">
              <Image
                src={LIFESTYLE_IMAGE_2}
                alt="Achieve your goals with HabitCore"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Guarantee bar */}
      <section className="py-section-sm border-y bg-muted/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                <Download className="h-5 w-5 text-teal" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Instant Access</p>
                <p className="text-xs text-muted-foreground">Download immediately after purchase</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="h-5 w-5 text-teal" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">30-Day Guarantee</p>
                <p className="text-xs text-muted-foreground">No results? Full refund, no questions asked</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-teal" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption on every order</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
