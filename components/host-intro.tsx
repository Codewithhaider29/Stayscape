"use client"

import { Smile, Users, Wrench, Phone } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import HostQuoteSection from "./HostQuoteSection"

// --- UTILITY: Animated Counter ---
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
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
        ref.current.textContent = `${Math.floor(latest)}${suffix}`
      }
    })
  }, [springValue, suffix])

  return <span ref={ref} />
}

// --- UTILITY: Magnetic Button Wrapper ---
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        // Optional chaining added for safety
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            // Disable touch action on mobile to prevent scroll interference
            className="touch-none md:touch-auto"
        >
            {children}
        </motion.div>
    );
};

export default function HostIntro() {
  const containerRef = useRef(null)
  
  // 1. Scroll Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  
  const stats = [
    { value: 200, suffix: "+", label: "Happy guests accommodated", icon: Smile },
    { value: 26, suffix: "%", label: "Loyal repeat visitors hosted", icon: Users },
    { value: 24, suffix: "/7", label: "Professional guest support", icon: Wrench }, 
  ]

  return (
    // Adjusted padding and gap for mobile
    <section ref={containerRef} className="w-full max-w-[1400px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-10 md:gap-16 overflow-hidden">
      
      {/* --- PART 1: HERO IMAGE & STATS CARD --- */}
      {/* Adjusted Height for Mobile (min-h-[550px]) vs Desktop */}
      <div className="relative w-full min-h-[600px] md:h-[750px] rounded-[32px] md:rounded-[48px] overflow-hidden group shadow-2xl shadow-gray-200">
        
        {/* Parallax Background Image */}
        <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 w-full h-full">
          <img 
            src="/bg-image.avif"
            alt="5th Avenue Apartment" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </motion.div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 md:bg-gradient-to-t md:from-black/60 md:via-black/10 md:to-transparent opacity-90 md:opacity-80" />

        {/* Top Left Text (Masked Reveal) */}
        {/* Adjusted positioning: top-8 left-5 for mobile */}
        <div className="absolute top-8 left-5 md:top-20 md:left-20 text-white max-w-2xl z-20 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4 md:mb-6"
          >
             <div className="w-8 md:w-10 h-[1px] bg-white/60"></div>
             <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-white/90">Introduction</span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                // Responsive Text Sizes
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] sm:leading-[1.1]"
            >
                5th Avenue apartment <br /> <span className="text-white/70">in the heart of NYC.</span>
            </motion.h1>
          </div>
        </div>

        {/* Floating Glass Stats Card */}
        {/* Responsive Positioning: Fixed at bottom with margin on mobile, absolute right on desktop */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="absolute bottom-4 left-4 right-4 md:left-auto md:right-12 md:bottom-12 w-auto md:w-[440px] bg-white/90 md:bg-white/85 backdrop-blur-xl border border-white/50 rounded-[24px] md:rounded-[36px] p-5 md:p-10 shadow-2xl shadow-black/20 z-30"
        >
          <div className="flex flex-col gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={`flex items-center justify-between pb-4 md:pb-6 ${index !== stats.length - 1 ? 'border-b border-gray-200/60' : 'pb-0'}`}
              >
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-0.5 md:mb-1 tracking-tight">
                    {index === 2 ? "24/7" : <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 font-medium leading-snug max-w-[120px] md:max-w-[150px]">
                    {stat.label}
                  </span>
                </div>
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-900 shadow-sm shrink-0"
                >
                  <stat.icon size={18} className="md:w-5 md:h-5" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- PART 2: HOST PROFILE & QUOTE --- */}
      <div className="flex flex-col items-center w-full">
        
        {/* Magnetic Host Pill */}
        <MagneticWrapper>
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-full pl-1.5 pr-2 py-1.5 md:pl-2 md:pr-2 md:py-2 flex items-center gap-3 md:gap-4 shadow-lg shadow-gray-100/50 mb-8 md:mb-12 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer"
            >
            <div className="relative shrink-0">
                <img 
                src="/professional-headshot.avif"
                alt="Benjamin" 
                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                {/* Ripple Status Dot */}
                <span className="absolute bottom-0 right-0 flex h-3 w-3 md:h-4 md:w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-green-500 border-2 border-white"></span>
                </span>
            </div>
            
            <div className="text-left flex flex-col">
                <span className="text-sm md:text-base font-bold text-gray-900 leading-tight">Benjamin Ross</span>
                <span className="text-[10px] md:text-xs text-gray-500 font-medium">Superhost • 5yr Exp</span>
            </div>

            <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#111827", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 md:ml-4 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-gray-900 transition-colors shrink-0"
            >
                <Phone size={16} className="md:w-[18px]" />
            </motion.button>
            </motion.div>
        </MagneticWrapper>

        {/* Quote Section with Scroll Reveal */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full px-2 md:px-0"
        >
             <HostQuoteSection />
        </motion.div>

      </div>
    </section>
  )
}