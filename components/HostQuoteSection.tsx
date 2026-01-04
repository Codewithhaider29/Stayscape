"use client"

import { 
  ImageIcon, 
  Bed, 
  Key, 
  Trees, 
  MapPin, 
  Star 
} from "lucide-react"
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from "framer-motion"
import { useRef } from "react"

// --- UTILITY: Wrap Function for Loop Logic ---
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

// --- COMPONENT: Velocity Marquee Row ---
function ParallaxMarquee({ children, baseVelocity = 100 }: { children: React.ReactNode, baseVelocity: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    // Reverse direction based on scroll logic (optional, keeping it unidirectional for clean look here)
    // But we accelerate based on scroll speed
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap gap-4 md:gap-8" style={{ x }}>
        {children}
        {children} 
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export default function HostQuoteSection() {
  
  const tags = [
    { label: "Beautiful interior", icon: ImageIcon },
    { label: "Comfortable beds", icon: Bed },
    { label: "Great check-in", icon: Key },
    { label: "Scenic and peaceful", icon: Trees },
    { label: "Great location", icon: MapPin },
    { label: "Beautiful and walkable", icon: Star },
  ]

  // Split quote for word-by-word animation
  const quote = "Hi, I’m Benjamin. My sunny Upper East Side apartment sits beside Central Park, with museums, cafes, and shops just a stroll away – your stylish home in the city."
  const words = quote.split(" ")

  return (
    <section className="w-full py-20 md:py-32 overflow-hidden bg-white relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center text-center relative z-10">
        
        {/* --- PART 1: STAGGERED QUOTE REVEAL --- */}
        <div className="mb-20 md:mb-28 max-w-4xl mx-auto px-4">
           {/* Decorative Quote Mark */}
           <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-6xl text-gray-200 font-serif mb-6 block"
           >
             “
           </motion.div>

           <h2 className="text-xl md:text-3xl text-gray-600 leading-relaxed font-medium flex flex-wrap justify-center gap-x-2 gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.03, // The stagger effect
                  ease: "easeOut" 
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>


        {/* --- PART 2: VELOCITY MARQUEE --- */}
        
        <div className="w-full flex flex-col gap-8 relative">
          
          {/* Enhanced Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* ROW 1: Moves Left (Velocity React) */}
          <ParallaxMarquee baseVelocity={-2}>
             {tags.map((tag, i) => (
                <TagItem key={`r1-${i}`} tag={tag} />
             ))}
          </ParallaxMarquee>

          {/* ROW 2: Moves Right (Velocity React) */}
          <ParallaxMarquee baseVelocity={2}>
             {tags.map((tag, i) => (
                <TagItem key={`r2-${i}`} tag={tag} />
             ))}
          </ParallaxMarquee>

        </div>

      </div>
    </section>
  )
}

// --- Helper Component for Individual Tag ---
function TagItem({ tag }: { tag: any }) {
  return (
    <motion.div 
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "#F9FAFB",
        borderColor: "#9CA3AF",
        y: -2
      }}
      className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-6 py-3 md:px-8 md:py-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] cursor-default whitespace-nowrap group transition-colors duration-300"
    >
      <div className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
        <tag.icon size={20} strokeWidth={1.5} />
      </div>
      <span className="text-lg md:text-xl font-medium text-gray-500 group-hover:text-gray-900 tracking-tight transition-colors duration-300">
        {tag.label}
      </span>
    </motion.div>
  )
}