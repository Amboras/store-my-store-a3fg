import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Download,
  ShieldCheck,
  RefreshCw,
  Lock,
  Clock,
  CheckCircle,
  Star,
  Zap,
  BarChart2,
  Target,
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Award,
  Globe,
} from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'
import ProductPageClient from '@/components/product/product-page-client'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getAllProducts() {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return []

    const response = await medusaServerClient.store.product.list({
      region_id: regionId,
      fields: '*variants.calculated_price',
      limit: 10,
    })
    return response.products || []
  } catch {
    return []
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

const whatIsIncluded = [
  { icon: BarChart2, text: '21-Day Habit Stacking Framework' },
  { icon: Target, text: 'Life Goal Mapping (90-day, 1-yr, 5-yr)' },
  { icon: Zap, text: 'Daily Energy Audit Templates' },
  { icon: Clock, text: 'Time Block Scheduler' },
  { icon: BookOpen, text: 'Weekly Review System' },
  { icon: FileText, text: 'Mindset Reset Protocols' },
]

const proofStats = [
  { value: '14,200+', label: 'Active Users' },
  { value: '91%', label: 'Report Better Focus' },
  { value: '4.9', label: 'Avg. Rating' },
  { value: '30-Day', label: 'Money-Back' },
]

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [product, allProducts, ] = await Promise.all([
    getProduct(handle),
    getAllProducts(),
  ])

  if (!product) {
    notFound()
  }

  const variantExtensions = await getVariantExtensions(product.id)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: any) => img.url !== product.thumbnail),
  ]

  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  // Find a companion/upsell product (different from current)
  const upsellProduct = (allProducts as any[]).find((p: any) => p.id !== product.id)

  const currentPrice = product.variants?.[0]?.calculated_price?.calculated_amount
  const upsellPrice = upsellProduct?.variants?.[0]?.calculated_price?.calculated_amount

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b bg-background">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container-custom py-8 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">

          {/* ── LEFT: Product Images ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[3/4] shadow-lg">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Instant download badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow text-xs font-bold text-navy uppercase tracking-wide">
                <Download className="h-3.5 w-3.5 text-teal" />
                Instant Download
              </div>
            </div>

            {/* Thumbnail strip */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(0, 4).map((image: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-xl bg-muted border-2 border-transparent hover:border-teal/50 transition-colors cursor-pointer"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Social proof below image */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-navy">4.9</span>
                <span className="text-sm text-muted-foreground">(2,841 ratings)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span>14,200+ users</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={product.variants?.[0]?.calculated_price?.currency_code || 'usd'}
              value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
            />

            {/* Title */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal/10 text-teal text-xs font-bold uppercase tracking-widest mb-3">
                <Zap className="h-3 w-3" />
                Digital Product
              </span>
              <h1 className="text-h2 font-heading font-bold text-navy leading-tight">{product.title}</h1>
            </div>

            {/* ── CRO: Urgency Bar ── */}
            <ProductPageClient />

            {/* ── Variant Selector + Price + Add to Cart ── */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* ── BUNDLE UPSELL ── */}
            {upsellProduct && upsellPrice != null && currentPrice != null && (
              <div className="rounded-xl border-2 border-teal/30 bg-teal/5 p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-teal mb-1">
                      Level Up Your Order
                    </p>
                    <p className="text-sm font-semibold text-navy">
                      Add &ldquo;{upsellProduct.title}&rdquo; for just{' '}
                      <span className="text-teal">
                        ${((upsellPrice) / 100).toFixed(2)}
                      </span>{' '}
                      more
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Save $12 when you grab the full system today
                    </p>
                  </div>
                  {upsellProduct.thumbnail && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={upsellProduct.thumbnail} alt={upsellProduct.title} fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                </div>
                <Link
                  href={`/products/${upsellProduct.handle}`}
                  className="block w-full text-center py-2.5 px-4 rounded-lg border-2 border-teal text-teal text-sm font-bold hover:bg-teal hover:text-white transition-all duration-200"
                >
                  Add Bundle — Total ${((currentPrice + upsellPrice) / 100).toFixed(2)}
                </Link>
              </div>
            )}

            {/* ── Trust Signals ── */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-b">
              <div className="text-center">
                <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Download className="h-4 w-4 text-teal" strokeWidth={1.8} />
                </div>
                <p className="text-xs font-semibold text-navy">Instant Download</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Access immediately</p>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-teal/10 flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-teal" strokeWidth={1.8} />
                </div>
                <p className="text-xs font-semibold text-navy">30-Day Guarantee</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Full refund, no questions</p>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 mx-auto mb-2 rounded-lg bg-teal/10 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-teal" strokeWidth={1.8} />
                </div>
                <p className="text-xs font-semibold text-navy">Secure Checkout</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">256-bit SSL encrypted</p>
              </div>
            </div>

            {/* Accordion */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />

            {/* Compatible platforms */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span>Works with Notion, GoodNotes, PDF readers, iPad, tablet, desktop &amp; mobile</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── WHAT YOU GET ── */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-teal font-bold mb-2">Inside the System</p>
            <h2 className="text-h2 font-heading font-bold text-navy">Everything Included</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Not a template. A complete behavioral-science-backed system built to create results — not just fill pages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whatIsIncluded.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-center gap-3 p-4 bg-background rounded-xl border hover:border-teal/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-teal" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-medium text-navy">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STATS ── */}
      <section className="py-12 bg-navy">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {proofStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold font-heading text-teal">{stat.value}</p>
                <p className="text-sm text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE SECTION ── */}
      <section className="py-16 border-t">
        <div className="container-custom max-w-3xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 flex items-center justify-center">
            <Award className="h-8 w-8 text-teal" strokeWidth={1.5} />
          </div>
          <h2 className="text-h3 font-heading font-bold text-navy mb-4">
            The HabitCore 30-Day Promise
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Use HabitCore for 30 days. If you do not feel more focused, more consistent, and more in control of your life —
            email us and we will refund every penny. No forms. No hoops. No hard feelings.
            We stand behind this system completely.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-teal/30 text-teal text-sm font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Risk-Free Purchase
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {upsellProduct && (
        <section className="py-16 border-t bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-teal font-bold mb-2">Complete Your System</p>
              <h2 className="text-h3 font-heading font-bold text-navy">You Might Also Want</h2>
            </div>
            <div className="max-w-sm mx-auto">
              <Link
                href={`/products/${upsellProduct.handle}`}
                className="group block rounded-2xl overflow-hidden border bg-background hover:border-teal/40 hover:shadow-lg transition-all duration-200"
              >
                {upsellProduct.thumbnail && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={upsellProduct.thumbnail}
                      alt={upsellProduct.title}
                      fill
                      sizes="400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="h-3.5 w-3.5 text-teal" />
                    <span className="text-xs font-bold uppercase tracking-widest text-teal">Popular</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy">{upsellProduct.title}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    {upsellPrice != null && (
                      <span className="text-lg font-bold text-navy">${(upsellPrice / 100).toFixed(2)}</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal">
                      <Download className="h-3 w-3" />
                      Instant Download
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
