"use client"

import { ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion"
import { useRef } from "react"

// --- UTILITY 1: Rolling Link Component ---
function FooterLink({ href, label }: { href: string, label: string }) {
  return (
    <a href={href} className="group block overflow-hidden h-[30px] w-fit">
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
        <span className="text-lg font-medium text-gray-400 group-hover:text-white transition-colors h-[30px] flex items-center">
          {label}
        </span>
        <span className="text-lg font-medium text-white h-[30px] flex items-center">
          {label}
        </span>
      </div>
    </a>
  )
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
      className="bg-white text-black pl-8 pr-2 py-3 rounded-full flex items-center gap-4 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] group"
    >
      {children}
    </motion.button>
  )
}

export default function Footer() {
  const containerRef = useRef(null)
  
  // Parallax Logic for the Footer Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const logoScale = useTransform(scrollYProgress, [0.5, 1], [0.9, 1])

  return (
    <footer ref={containerRef} className="bg-[#050505] text-white px-6 md:px-12 pt-24 pb-8 font-sans overflow-hidden relative">
      
      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- TOP SECTION: CTA & LINKS --- */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 mb-24">
          
          {/* Left Side: CTA */}
          <div className="lg:w-1/3 space-y-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                 </span>
                 <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Your Stay</span>
              </div>
              
              <div className="overflow-hidden">
                <motion.h2 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-7xl font-medium tracking-tight leading-[1]"
                >
                    Always Here <br /> <span className="text-gray-500">for Our Guests.</span>
                </motion.h2>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
                <MagneticButton>
                    <span className="text-sm font-bold pl-2">Reserve Now</span>
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                </MagneticButton>
            </motion.div>
          </div>

          {/* Right Side: Navigation Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
             
             {/* Column 1: Menu */}
             <div className="flex flex-col gap-6">
                <h3 className="text-gray-600 text-xs font-bold uppercase tracking-[0.1em] mb-2">Menu</h3>
                <div className="flex flex-col gap-1">
                    {["About", "Gallery", "Features", "Reviews", "Pricing", "Location"].map((item) => (
                        <FooterLink key={item} label={item} href={`#${item.toLowerCase()}`} />
                    ))}
                </div>
             </div>
            
             {/* Column 2: Contact */}
             <div className="flex flex-col gap-6">
                <h3 className="text-gray-600 text-xs font-bold uppercase tracking-[0.1em] mb-2">Contact</h3>
                <div className="flex flex-col gap-1">
                    <FooterLink label="help@stayscape.com" href="mailto:help@stayscape.com" />
                    <FooterLink label="+1 (212) 555-0199" href="tel:+12125550199" />
                </div>
             </div>

             {/* Column 3: Socials */}
             <div className="flex flex-col gap-6">
                <h3 className="text-gray-600 text-xs font-bold uppercase tracking-[0.1em] mb-2">Socials</h3>
                <div className="flex flex-col gap-1">
                    <FooterLink label="Instagram" href="#" />
                    <FooterLink label="Twitter / X" href="#" />
                    <FooterLink label="LinkedIn" href="#" />
                </div>
             </div>

          </div>
        </div>

        {/* --- MIDDLE SECTION: PARALLAX BANNER --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full h-[300px] md:h-[450px] rounded-[48px] overflow-hidden mb-12 group"
        >
           {/* Parallax Background Image */}
           <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
               <img 
                 src="/footer-image.avif" 
                 alt="Stayscape Interior" 
                 className="w-full h-full object-cover brightness-[0.5] group-hover:brightness-[0.4] transition-all duration-700"
               />
           </motion.div>

           {/* Floating SVG Logo Overlay */}
           <motion.div 
                style={{ scale: logoScale }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-12"
           >
               <img
                 src="/overlay-footer-image.svg"
                 alt="Overlay"
                 className="w-full h-full object-contain opacity-90 drop-shadow-2xl"
               />
           </motion.div>
        </motion.div>

        {/* --- BOTTOM SECTION: COPYRIGHT --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-medium border-t border-white/10 pt-8 gap-4">
           <motion.p 
             initial={{ opacity: 0 }} 
             whileInView={{ opacity: 1 }} 
             transition={{ delay: 0.5 }}
           >
             &copy; Stayscape, 2025. All rights reserved.
           </motion.p>
           
           <motion.div 
             initial={{ opacity: 0 }} 
             whileInView={{ opacity: 1 }} 
             transition={{ delay: 0.6 }}
             className="flex gap-8"
           >
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
           </motion.div>
        </div>

      </div>
    </footer>
  )
}