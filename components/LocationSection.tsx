"use client"

import { MapPin, Navigation, LocateFixed } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

// --- UTILITY: Parallax Map Component ---
function ParallaxMapContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth out the mouse movement
  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })

  // Transform map in opposite direction of mouse
  const mapX = useTransform(springX, [-0.5, 0.5], ["2%", "-2%"])
  const mapY = useTransform(springY, [-0.5, 0.5], ["2%", "-2%"])

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5
    
    x.set(normalizedX)
    y.set(normalizedY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] md:h-[650px] rounded-[48px] overflow-hidden border border-white/10 shadow-2xl group cursor-crosshair bg-[#1A1A1A]"
    >
      <motion.div 
        style={{ x: mapX, y: mapY, scale: 1.1 }} 
        className="absolute inset-0 w-full h-full"
      >
        {children}
      </motion.div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.6)_100%)] pointer-events-none" />
    </div>
  )
}

// --- UTILITY: Pulsing Hotspot Dot ---
function Hotspot({ top, left, delay }: { top: string, left: string, delay: number }) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="absolute w-3 h-3 bg-blue-500 rounded-full"
      style={{ top, left }}
    >
      <motion.div 
        animate={{ scale: [1, 3], opacity: [0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        className="absolute inset-0 bg-blue-400 rounded-full"
      />
    </motion.div>
  )
}

export default function LocationSection() {
  return (
    <section id="location" className="px-6 md:px-12 py-24 md:py-32 bg-[#121212] text-white font-sans border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* --- HEADER --- */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-20"
        >
           <div className="flex items-center justify-center gap-3 mb-6">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Prime Location</span>
           </div>
           
           <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
             In the heart of <br/> <span className="text-gray-500">Manhattan.</span>
           </h2>
        </motion.div>

        {/* --- INFO COLUMNS (Focus Effect) --- */}
        <div className="flex flex-col md:flex-row justify-center items-center divide-y md:divide-y-0 md:divide-x divide-white/10 max-w-5xl mx-auto mb-20 group/list">
            
            {[
              { label: "Neighborhood", value: "Upper East Side", sub: "Manhattan, NYC" },
              { label: "Address", value: "953 5th Avenue", sub: "New York, 10021" },
              { label: "Accessibility", value: "40th Floor", sub: "Private Elevator" }
            ].map((item, i) => (
              <div key={i} className="px-12 py-8 md:py-0 flex flex-col items-center text-center w-full md:w-1/3 transition-opacity duration-300 md:group-hover/list:opacity-30 md:hover:!opacity-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{item.label}</span>
                  <p className="text-2xl font-medium leading-tight mb-1">{item.value}</p>
                  <p className="text-gray-500 text-sm">{item.sub}</p>
              </div>
            ))}

        </div>

        {/* --- INTERACTIVE MAP --- */}
        <motion.div 
           initial={{ opacity: 0, y: 50, scale: 0.95 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <ParallaxMapContainer>
                
                {/* 1. Map Image (Dark Mode Styled) */}
                <img 
                  src="/Map.avif"
                  alt="Map Location"
                  className="w-full h-full object-cover opacity-60 invert contrast-[1.1] grayscale brightness-75" 
                />

                {/* 2. Radar Scan Effect */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
                    style={{ background: "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(255,255,255,0.4) 360deg)" }}
                />

                {/* 3. Random "Activity" Hotspots */}
                <Hotspot top="30%" left="20%" delay={1} />
                <Hotspot top="70%" left="80%" delay={1.5} />
                <Hotspot top="40%" left="75%" delay={2} />

                {/* 4. Main Pin (Drop Animation) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   <motion.div 
                     initial={{ y: -100, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.5 }}
                     className="relative group"
                   >
                      {/* Tooltip */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: -5 }}
                        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap shadow-xl pointer-events-none"
                      >
                         <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                         Stayscape Apartment
                      </motion.div>

                      {/* Pin Body */}
                      <motion.div whileHover={{ scale: 1.1 }} className="relative z-10">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                           <MapPin size={24} className="text-black fill-black" />
                        </div>
                      </motion.div>

                      {/* Impact Shadow (Scales with drop) */}
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/50 blur-md rounded-[100%]" 
                      />
                   </motion.div>
                </div>

                {/* 5. Navigation FAB */}
                <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="absolute bottom-8 right-8 bg-[#1A1A1A] text-white px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 hover:bg-white hover:text-black transition-colors shadow-2xl z-20"
                >
                   <span className="text-sm font-bold">Get Directions</span>
                   <Navigation size={16} fill="currentColor" />
                </motion.button>

            </ParallaxMapContainer>
        </motion.div>

      </div>
    </section>
  )
}