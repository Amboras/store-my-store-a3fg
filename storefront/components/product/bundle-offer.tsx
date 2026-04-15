'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import { Check, Loader2, Zap, Package, Star } from 'lucide-react'
import { trackAddToCart } from '@/lib/analytics'

interface BundleOfferProps {
  singleVariantId: string
  singlePrice: number
  singleTitle: string
  bundleVariantId: string
  bundlePrice: number
  bundleTitle: string
  bundleThumbnail?: string | null
  singleProductId: string
  bundleProductId: string
}

export default function BundleOffer({
  singleVariantId,
  singlePrice,
  singleTitle,
  bundleVariantId,
  bundlePrice,
  bundleTitle,
  bundleThumbnail,
  singleProductId,
  bundleProductId,
}: BundleOfferProps) {
  const [selected, setSelected] = useState<'single' | 'bundle'>('single')
  const [justAdded, setJustAdded] = useState(false)
  const { addItem, isAddingItem } = useCart()

  const isBundle = selected === 'bundle'
  const variantId = isBundle ? bundleVariantId : singleVariantId
  const price = isBundle ? bundlePrice : singlePrice
  const productId = isBundle ? bundleProductId : singleProductId

  const savings = bundlePrice - singlePrice
  const savingsDisplay = ((singlePrice * 1.78 - bundlePrice) / 100).toFixed(2)

  const handleAddToCart = () => {
    addItem(
      { variantId, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          trackAddToCart(productId, variantId, 1, price)
          toast.success(isBundle ? 'Pro Bundle added to bag!' : 'HabitCore added to bag!')
          setTimeout(() => setJustAdded(false), 2200)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add to bag')
        },
      }
    )
  }

  return (
    <div className="space-y-3">
      {/* Option: Single */}
      <button
        type="button"
        onClick={() => setSelected('single')}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-150 ${
          selected === 'single'
            ? 'border-teal bg-teal/5'
            : 'border-border bg-background hover:border-teal/40'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Radio dot */}
          <span
            className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              selected === 'single' ? 'border-teal' : 'border-muted-foreground/40'
            }`}
          >
            {selected === 'single' && (
              <span className="w-2 h-2 rounded-full bg-teal block" />
            )}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-navy">{singleTitle}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Full habit tracker — instant download</p>
          </div>
          <span className="text-sm font-bold text-navy flex-shrink-0">
            ${(singlePrice / 100).toFixed(2)}
          </span>
        </div>
      </button>

      {/* Option: Bundle */}
      <button
        type="button"
        onClick={() => setSelected('bundle')}
        className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-150 relative overflow-hidden ${
          selected === 'bundle'
            ? 'border-teal bg-teal/5'
            : 'border-border bg-background hover:border-teal/40'
        }`}
      >
        {/* Best value badge */}
        <div className="absolute top-0 right-0 bg-teal text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
          Best Value — Save ${savingsDisplay}
        </div>

        <div className="flex items-start gap-3 pr-24">
          {/* Radio dot */}
          <span
            className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              selected === 'bundle' ? 'border-teal' : 'border-muted-foreground/40'
            }`}
          >
            {selected === 'bundle' && (
              <span className="w-2 h-2 rounded-full bg-teal block" />
            )}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-bold text-navy">HabitCore + Life Mastery Workbook</p>
            </div>
            <p className="text-xs text-muted-foreground">Full tracker + deep-dive workbook — both products</p>
            <div className="flex items-center gap-3 mt-2">
              <ul className="space-y-0.5">
                {['21-Day Habit Tracker', 'Life Mastery Workbook', 'Lifetime Updates'].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-teal flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {bundleThumbnail && (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-teal/20">
                  <Image src={bundleThumbnail} alt="Bundle" fill className="object-cover" sizes="48px" />
                </div>
              )}
            </div>
          </div>
          <span className="text-sm font-bold text-teal flex-shrink-0">
            ${(bundlePrice / 100).toFixed(2)}
          </span>
        </div>
      </button>

      {/* Stars row */}
      <div className="flex items-center gap-2 px-1">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">4.9 from 2,841 users</span>
        {isBundle && (
          <span className="ml-auto text-xs font-semibold text-teal flex items-center gap-1">
            <Package className="h-3 w-3" /> Bundle selected
          </span>
        )}
      </div>

      {/* CTA button */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingItem}
        className={`w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200 shadow-sm ${
          justAdded
            ? 'bg-green-600 text-white'
            : 'text-white hover:opacity-90 animate-pulse-ring'
        }`}
        style={justAdded ? {} : { backgroundColor: 'hsl(174, 72%, 40%)' }}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Added to Bag
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            {isBundle
              ? `Get the Bundle — $${(bundlePrice / 100).toFixed(2)}`
              : `Get Instant Access — $${(singlePrice / 100).toFixed(2)}`}
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-muted-foreground">
        Secure checkout &nbsp;&bull;&nbsp; Instant download after payment &nbsp;&bull;&nbsp; 30-day guarantee
      </p>
    </div>
  )
}
