"use client"

import { ArrowRight, Map, Star } from "lucide-react"
import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import Navbar from "./navbar"

// --- UTILITY COMPONENTS ---

// 1. Animated Counter Component
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "-10px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Handle integers vs floats (4.98 vs 100)
        ref.current.textContent = Number.isInteger(value) 
          ? `${Math.floor(latest)}${suffix}` 
          : `${latest.toFixed(2)}${suffix}`
      }
    })
  }, [springValue, value, suffix])

  return <span ref={ref} />
}

// 2. Masked Text Component for "Slide Up" effect
function MaskedText({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <div className="overflow-hidden inline-block align-bottom">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// --- MAIN HERO COMPONENT ---

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#F8F9FB] p-4 md:p-6 flex items-center justify-center font-sans overflow-hidden">
      <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 h-full lg:h-[95vh] min-h-[700px]">
        
        {/* --- LEFT SIDE: Content --- */}
        <div className="flex flex-col h-full perspective-[1000px]">
          <motion.div 
            initial={{ opacity: 0, x: -20, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="bg-white rounded-[40px] p-8 md:p-12 flex flex-col justify-between shadow-sm border border-gray-100 relative overflow-hidden h-full z-20"
          >
            <Navbar />

            <div className="flex flex-col items-center text-center justify-center flex-grow mt-4 z-10">
              {/* Location Tag - Stagger 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full mb-8 flex items-center gap-2"
              >
                <Map size={14} className="text-gray-400" />
                <span className="text-gray-500 text-xs font-medium">953 5th Ave, New York</span>
              </motion.div>

              {/* Title - Masked Animation (The "Pro" Upgrade) */}
              <h1 className="text-5xl md:text-7xl font-medium text-gray-900 leading-[1.1] tracking-tight mb-6 flex flex-col items-center">
                <MaskedText delay={0.3}>Urban Comfort</MaskedText>
                <MaskedText delay={0.4}>in New York City</MaskedText>
              </h1>

              {/* Social Proof - Stagger 3 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="flex -space-x-3">
                   {[1, 2, 3].map((i) => (
                     <img key={i} src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="user" className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100" />
                   ))}
                </div>
                <p className="text-sm text-gray-500 font-medium">Loved by 200+ happy guests</p>
              </motion.div>

              {/* Button - Stagger 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-[#1A1A1A] text-white pl-8 pr-2 py-2 rounded-full flex items-center gap-4 hover:bg-black transition-all shadow-lg shadow-black/10"
                >
                  <span className="font-medium text-sm">Reserve Now</span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                    <ArrowRight size={18} className="text-black absolute transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0" />
                    <ArrowRight size={18} className="text-black absolute transition-all duration-300 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </motion.button>
              </motion.div>
            </div>

            {/* Footer Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-auto border-t border-gray-50 pt-8 z-10"
            >
              <div className="bg-gray-50/50 rounded-[28px] p-2 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4 px-6 py-2">
                    <div className="text-2xl animate-bounce-slow">🌿</div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-gray-900 leading-tight">Guest <br/> favorite</span>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                  {/* Item 2 - Animated Counter */}
                  <div className="text-center px-6">
                    <p className="text-xl font-bold text-gray-900 flex justify-center">
                      <AnimatedNumber value={100} suffix="%" />
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Reply Rate</p>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                  {/* Item 3 - Animated Counter */}
                  <div className="text-center px-6">
                    <div className="flex items-center gap-1 justify-center">
                       <p className="text-xl font-bold text-gray-900">
                         <AnimatedNumber value={4.98} />
                       </p>
                    </div>
                    <div className="flex items-center justify-center gap-0.5 text-black mt-0.5">
                       {[1,2,3,4,5].map((s, i) => (
                         <motion.div
                           key={s}
                           initial={{ opacity: 0, scale: 0 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: 1 + (i * 0.1) }} // Stagger stars
                         >
                           <Star size={8} fill="black" />
                         </motion.div>
                       ))}
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                  {/* Item 4 - Animated Counter */}
                  <div className="text-center px-6">
                    <p className="text-xl font-bold text-gray-900 flex justify-center">
                      <AnimatedNumber value={137} />
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Reviews</p>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: Image --- */}
        <div className="h-[500px] lg:h-full overflow-hidden rounded-[40px]">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="relative h-full w-full shadow-sm group"
          >
            <img 
              src="/navbar-image.avif" 
              alt="Modern luxury apartment" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
            />
            
            {/* Floating Action Button */}
            <motion.button 
               initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 1, rotate: 0 }}
               transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
               whileHover={{ scale: 1.1, rotate: 10 }}
               whileTap={{ scale: 0.9 }}
               className="absolute bottom-8 right-8 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl z-10 cursor-pointer border border-white/20"
            >
              <Map size={24} className="text-gray-900" />
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}