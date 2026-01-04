"use client"

import { Star, ChevronRight, Quote } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useInView } from "framer-motion"
import { useRef, useEffect } from "react"

// --- UTILITY: Animated Counter ---
function AnimatedNumber({ value }: { value: number }) {
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
        ref.current.textContent = latest.toFixed(2)
      }
    })
  }, [springValue])

  return <span ref={ref} />
}

// --- COMPONENT: Spotlight Card ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group relative border border-gray-200 bg-white overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0,0,0,0.04),
              transparent 80%
            )
          `,
        }}
      />
      {/* Content */}
      <div className="relative h-full">{children}</div>
    </div>
  )
}

// --- MAIN COMPONENT ---
export default function ReviewsSection() {
  
  const reviews = [
    { name: "Andrew K.", location: "Zwolle, Netherlands", date: "Aug 28, 2025", rating: 5.0, text: "Felt like a true home away from home! The apartment was spotless, beautifully decorated, and just steps from Central Park.", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Patrick T.", location: "Warsaw, Poland", date: "Jul 03, 2025", rating: 5.0, text: "Amazing location on 5th Avenue! Central Park is a short walk away, and the apartment was safe, clean, and welcoming.", avatar: "https://i.pravatar.cc/150?img=13" },
    { name: "Inessa J.", location: "Vienna, Austria", date: "Apr 10, 2025", rating: 5.0, text: "Great value for the location. Comfortable beds, modern decor, and the subway is so close by. Ideal choice for a weekend.", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "Lina S.", location: "Berlin, Germany", date: "Aug 13, 2025", rating: 5.0, text: "Perfect spot for exploring lively New York! Central Park is minutes away, the subway close, and the apartment was cozy.", avatar: "https://i.pravatar.cc/150?img=9" },
    { name: "Sofia W.", location: "Rome, Italy", date: "Jun 08, 2025", rating: 5.0, text: "Such a comfortable stay! The beds were great, the apartment was quiet, and the host made check-in super easy.", avatar: "https://i.pravatar.cc/150?img=32" },
    { name: "Michael B.", location: "Porto, Portugal", date: "Mar 17, 2025", rating: 5.0, text: "Superhost service all the way. The place was beautiful, communication was instant, and I felt right at home from the start.", avatar: "https://i.pravatar.cc/150?img=60" },
  ]

  const stats = [
    { label: "Cleanliness", value: 5.0 },
    { label: "Accuracy", value: 4.9 },
    { label: "Check-in", value: 5.0 },
    { label: "Communication", value: 5.0 },
  ]

  return (
    <section id="reviews" className="px-4 md:px-12 py-24 bg-[#F8F9FB] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-24">
           <motion.span 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6 block"
           >
             Guest Experiences
           </motion.span>
           
           {/* Animated Rating with IMAGES */}
           <div className="relative flex items-end justify-center gap-4 mb-8">
              
              {/* Left Image */}
              <motion.img 
                 src="/left.svg" 
                 alt="Decoration Left"
                 initial={{ opacity: 0, x: -30, rotate: -15 }}
                 whileInView={{ opacity: 0.6, x: 0, rotate: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="w-16 h-16 md:w-24 md:h-24 mb-2"
              />

              <div className="text-7xl md:text-9xl font-medium text-gray-900 tracking-tighter leading-none">
                <AnimatedNumber value={4.98} />
              </div>

              {/* Right Image */}
              <motion.img 
                 src="/right.svg" 
                 alt="Decoration Right"
                 initial={{ opacity: 0, x: 30, rotate: 15 }}
                 whileInView={{ opacity: 0.6, x: 0, rotate: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="w-16 h-16 md:w-24 md:h-24 mb-2"
              />
           </div>

           {/* Stats with Progress Bars */}
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-5xl mx-auto mt-12">
              {stats.map((stat, idx) => (
                 <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col gap-2 min-w-[140px]"
                 >
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                        <span className="text-lg font-bold text-gray-900">{stat.value.toFixed(1)}</span>
                    </div>
                    {/* Animated Bar */}
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-black rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(stat.value / 5) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (idx * 0.1) }}
                        />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* --- REVIEWS GRID (Spotlight Effect) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
                <SpotlightCard className="rounded-[24px] p-8 h-full flex flex-col justify-between hover:shadow-lg hover:shadow-gray-200/50 transition-shadow duration-500">
                    <div>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                    <div className="absolute -bottom-1 -right-1 bg-black text-white p-[2px] rounded-full">
                                        <Quote size={8} fill="white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{review.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="black" className="text-black" />)}
                            </div>
                        </div>

                        {/* Text */}
                        <p className="text-[15px] leading-relaxed text-gray-600 font-medium relative z-10">
                            "{review.text}"
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{review.date}</p>
                        <span className="text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">Verified Stay</span>
                    </div>
                </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* --- BUTTON --- */}
        <div className="flex justify-center">
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-[#1A1A1A] text-white pl-8 pr-2 py-2 rounded-full flex items-center gap-4 shadow-xl hover:shadow-2xl hover:shadow-black/10 transition-all"
            >
               <span className="text-sm font-semibold">Read all 200+ reviews</span>
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ChevronRight size={16} />
               </div>
            </motion.button>
        </div>

      </div>
    </section>
  )
} 