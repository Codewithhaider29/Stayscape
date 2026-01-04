"use client"

import { Smile, Users, Wrench, Phone } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from "framer-motion"
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
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
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
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const stats = [
    { value: 200, suffix: "+", label: "Happy guests accommodated", icon: Smile },
    { value: 26, suffix: "%", label: "Loyal repeat visitors hosted", icon: Users },
    { value: 24, suffix: "/7", label: "Professional guest support", icon: Wrench }, // Special handling for string logic if needed, but keeping simple for number demo
  ]

  return (
    <section ref={containerRef} className="w-full max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col gap-16">
      
      {/* --- PART 1: HERO IMAGE & STATS CARD --- */}
      <div className="relative w-full h-[600px] md:h-[750px] rounded-[48px] overflow-hidden group shadow-2xl shadow-gray-200">
        
        {/* Parallax Background Image */}
        <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 w-full h-full">
          <img 
            src="/bg-image.avif"
            alt="5th Avenue Apartment" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </motion.div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

        {/* Top Left Text (Masked Reveal) */}
        <div className="absolute top-10 left-8 md:top-20 md:left-20 text-white max-w-2xl z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
             <div className="w-10 h-[1px] bg-white/60"></div>
             <span className="text-sm font-medium uppercase tracking-widest text-white/90">Introduction</span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="text-5xl md:text-7xl font-medium leading-[1.1]"
            >
                5th Avenue apartment <br /> <span className="text-white/70">in the heart of NYC.</span>
            </motion.h1>
          </div>
        </div>

        {/* Floating Glass Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="absolute bottom-6 right-6 md:bottom-12 md:right-12 bg-white/85 backdrop-blur-xl border border-white/50 rounded-[36px] p-6 md:p-10 w-full max-w-[360px] md:max-w-[440px] shadow-2xl shadow-black/20 z-10"
        >
          <div className="flex flex-col gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={`flex items-center justify-between pb-6 ${index !== stats.length - 1 ? 'border-b border-gray-200/60' : 'pb-0'}`}
              >
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-medium text-gray-900 mb-1 tracking-tight">
                    {/* Handle 24/7 case specifically or use regex, simpler here to just use the component for numbers */}
                    {index === 2 ? "24/7" : <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                  </span>
                  <span className="text-sm text-gray-500 font-medium leading-snug max-w-[150px]">
                    {stat.label}
                  </span>
                </div>
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-900 shadow-sm"
                >
                  <stat.icon size={20} strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- PART 2: HOST PROFILE & QUOTE --- */}
      <div className="flex flex-col items-center">
        
        {/* Magnetic Host Pill */}
        <MagneticWrapper>
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-full pl-2 pr-2 py-2 flex items-center gap-4 shadow-lg shadow-gray-100/50 mb-12 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer"
            >
            <div className="relative">
                <img 
                src="/professional-headshot.avif"
                alt="Benjamin" 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                {/* Ripple Status Dot */}
                <span className="absolute bottom-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                </span>
            </div>
            
            <div className="text-left flex flex-col pl-2">
                <span className="text-base font-bold text-gray-900 leading-tight">Benjamin Ross</span>
                <span className="text-xs text-gray-500 font-medium">Superhost • 5yr Exp</span>
            </div>

            <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#111827", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
                className="ml-4 w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-gray-900 transition-colors"
            >
                <Phone size={18} />
            </motion.button>
            </motion.div>
        </MagneticWrapper>

        {/* Quote Section with Scroll Reveal */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
        >
             <HostQuoteSection />
        </motion.div>

      </div>
    </section>
  )
}