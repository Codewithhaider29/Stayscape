"use client"

import { ArrowUpRight, Check, Sparkles } from "lucide-react"
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring, 
  useScroll, 
  useTransform, 
  useVelocity, 
  useAnimationFrame,
  useInView
} from "framer-motion"
import { useRef, useEffect, useState } from "react"

// --- UTILITY 1: Animated Counter ---
function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "-20px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString()
      }
    })
  }, [springValue])

  return <span ref={ref} />
}

// --- UTILITY 2: Magnetic Button ---
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    x.set((clientX - centerX) * 0.3)
    y.set((clientY - centerY) * 0.3)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative bg-white text-black pl-8 pr-2 py-2.5 rounded-full flex items-center gap-6 group mb-16 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gray-200"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <div className="relative z-10 flex items-center gap-6">
          {children}
      </div>
    </motion.button>
  )
}

// --- UTILITY 3: Spotlight Grid ---
function SpotlightGrid({ children }: { children: React.ReactNode }) {
  const divRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="group relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-20"
    >
      {/* Shared Spotlight Gradient Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  )
}

// --- UTILITY 4: Velocity Marquee ---
function VelocityMarquee({ images }: { images: string[] }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const x = useTransform(baseX, (v) => `${(v % -50)}%`) // Assuming duplicate sets make 100% width

  useAnimationFrame((t, delta) => {
    let moveBy = -20 * (delta / 1000) // Base speed
    
    // Add velocity based on scroll
    if (velocityFactor.get() < 0) {
      moveBy += velocityFactor.get() * moveBy 
    } else {
      moveBy += velocityFactor.get() * moveBy
    }

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <motion.div className="flex gap-6 min-w-max" style={{ x }}>
      {images.map((src, i) => (
        <div key={i} className="w-[280px] h-[350px] md:w-[350px] md:h-[450px] rounded-[32px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer border border-white/5 group relative">
          <img 
            src={src} 
            alt="Interior" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
             <span className="text-white font-medium">View Gallery</span>
          </div>
        </div>
      ))}
    </motion.div>
  )
}


export default function PricingSection() {
  // Provided images (duplicated for loop)
  const galleryImages = [
    "/1-image.avif", "/2-image.avif", "/3-image.avif", "/4-image.avif", "/5-image.avif", "/6-image.avif",
    "/1-image.avif", "/2-image.avif", "/3-image.avif", "/4-image.avif", "/5-image.avif", "/6-image.avif",
  ]

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-[#121212] overflow-hidden text-white font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* --- HEADER --- */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-8">
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="w-1.5 h-1.5 bg-white rounded-full"
             />
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Pricing</span>
          </div>
          
          <h2 className="text-7xl md:text-9xl font-medium tracking-tighter mb-4 flex items-end justify-center">
            $<AnimatedPrice value={290} /><span className="text-2xl md:text-4xl text-gray-500 font-light tracking-normal mb-2 md:mb-4">/night</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            Absolutely no hidden charges. <br/>
            <span className="text-white">All extra costs already included.</span>
          </p>

          {/* --- MAGNETIC BUTTON --- */}
          <div className="flex justify-center">
            <MagneticButton>
                <span className="text-sm font-bold tracking-wide">Reserve Now</span>
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
            </MagneticButton>
          </div>
        </motion.div>

        {/* --- SPOTLIGHT FEATURES GRID --- */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-full flex justify-center"
        >
            <SpotlightGrid>
                {/* Card 1 */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center relative z-10">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Cleaning Fee</span>
                    <div className="flex items-center gap-2 text-white font-medium">
                        <Check size={16} className="text-green-400" /> Included
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center relative z-10 overflow-hidden">
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute top-2 right-2 opacity-10"
                    >
                        <Sparkles size={30} />
                    </motion.div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Service Fee</span>
                    <span className="text-2xl font-bold text-white">0%</span>
                </div>

                {/* Card 3 */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center relative z-10">
                    <span className="text-gray-400 text-xs uppercase tracking-wider mb-2">Taxes</span>
                    <span className="text-white font-medium text-sm">Calculated at checkout</span>
                </div>
            </SpotlightGrid>
        </motion.div>

      </div>

      {/* --- VELOCITY SCROLLING GALLERY --- */}
      <div className="w-full overflow-hidden relative mt-12">
         {/* Gradient Masks */}
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none"></div>

         <VelocityMarquee images={galleryImages} />
      </div>

    </section>
  )
}