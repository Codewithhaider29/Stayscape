"use client"

import { 
  Wifi, Wind, UtensilsCrossed, Lock, Tv, Waves, 
  BedDouble, Bath, Users, Shirt, ArrowUpRight 
} from "lucide-react"
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useInView 
} from "framer-motion"
import { useRef } from "react"

// --- COMPONENT: 3D Tilt Card for Highlights ---
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const xPos = (event.clientX - left) - width / 2
    const yPos = (event.clientY - top) - height / 2
    
    // Rotate calculation (divide by value determines sensitivity)
    x.set(xPos / 10)
    y.set(yPos / 10)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: mouseX,
        rotateX: useTransform(mouseY, (value) => -value), // Invert X for natural tilt
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// --- MAIN COMPONENT ---
export default function Amenities() {
  const containerRef = useRef(null)

  // Scroll Parallax for Bottom Banner
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const bannerY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  // Data
  const highlights = [
    { count: "2", label: "Bedrooms", sub: "Master and a guest bedroom", icon: BedDouble },
    { count: "1", label: "Bathroom", sub: "Large shared bathroom", icon: Bath },
    { count: "6", label: "Guests", sub: "For up to 6 people", icon: Users },
  ]

  const leftAmenities = [
    { label: "Fast Wi-Fi", icon: Wifi },
    { label: "Equipped Kitchen", icon: UtensilsCrossed },
    { label: "Washer & Dryer", icon: Waves },
  ]

  const rightAmenities = [
    { label: "Air Conditioning", icon: Wind },
    { label: "TV & Streaming", icon: Tv },
    { label: "Safety Features", icon: Lock },
  ]

  return (
    <section ref={containerRef} className="px-4 md:px-12 py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-20">
        
        {/* --- PART 1: HOME HIGHLIGHTS (3D Tilt) --- */}
        <div className="space-y-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center md:text-left"
           >
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 block">Features</span>
              <h2 className="text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">Home Highlights</h2>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {highlights.map((item, idx) => (
               <TiltCard key={idx} className="group h-full">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="h-full border border-gray-100 rounded-[24px] p-8 flex flex-col justify-between bg-white shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow duration-500"
                 >
                   <div className="flex justify-between items-start mb-6">
                     <span className="text-5xl font-light text-gray-900">{item.count}</span>
                     <motion.div 
                       whileHover={{ rotate: 15, scale: 1.1 }}
                       className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-900"
                     >
                       <item.icon size={22} strokeWidth={1.5} />
                     </motion.div>
                   </div>
                   <div>
                     <h3 className="font-bold text-gray-900 text-lg">{item.label}</h3>
                     <p className="text-sm text-gray-500 mt-1">{item.sub}</p>
                   </div>
                 </motion.div>
               </TiltCard>
             ))}
           </div>
        </div>


        {/* --- PART 2: AMENITIES GRID --- */}
        <div className="space-y-12">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-col items-center justify-center"
           >
              <div className="w-px h-10 bg-gray-200 mb-4"></div>
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Amenities</span>
           </motion.div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
             
             {/* Left Column - Slide In Right */}
             <div className="flex flex-col gap-4">
               {leftAmenities.map((item, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   whileHover={{ x: 10, backgroundColor: "#F9FAFB" }}
                   className="border border-gray-100 rounded-2xl p-5 flex items-center justify-between transition-colors cursor-default bg-white"
                 >
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <item.icon size={18} className="text-gray-400" />
                 </motion.div>
               ))}
             </div>

             {/* Middle Column - Levitating Hero */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               animate={{ y: [0, -10, 0] }} // Continuous Levitation
               transition={{ 
                 y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                 scale: { duration: 0.5 }
               }}
               whileHover={{ scale: 1.03 }}
               className="border border-gray-200 rounded-[32px] p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[280px] bg-white shadow-2xl shadow-gray-200/50 z-10 relative overflow-hidden group"
             >
                {/* Decorative Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gray-100 rounded-full blur-3xl -z-10 group-hover:bg-blue-50 transition-colors duration-500" />
                
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <Shirt size={48} strokeWidth={1} className="text-gray-900" />
                </motion.div>
                <div>
                   <h3 className="font-semibold text-xl text-gray-900 mb-1">Complete</h3>
                   <p className="text-gray-500 text-sm">Essentials Kit Included</p>
                </div>
             </motion.div>

             {/* Right Column - Slide In Left */}
             <div className="flex flex-col gap-4">
               {rightAmenities.map((item, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   whileHover={{ x: -10, backgroundColor: "#F9FAFB" }}
                   className="border border-gray-100 rounded-2xl p-5 flex items-center justify-between transition-colors cursor-default bg-white"
                 >
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <item.icon size={18} className="text-gray-400" />
                 </motion.div>
               ))}
             </div>

           </div>
        </div>


        {/* --- PART 3: PARALLAX PROMO BANNER --- */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[40px] overflow-hidden group">
           {/* Parallax Background */}
           <motion.div 
             style={{ y: bannerY, scale: 1.1 }}
             className="absolute inset-0 w-full h-full"
           >
             <img 
               src="/2-bg-image.avif" 
               alt="Special Offer"
               className="w-full h-full object-cover brightness-[0.7]"
             />
           </motion.div>
           
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-6">
                  Special Offer
                </span>
                
                <h2 className="text-4xl md:text-6xl font-medium mb-10 leading-[1.1] max-w-3xl">
                  Book 30+ days ahead <br /> <span className="text-white/70">and enjoy 15% savings.</span>
                </h2>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black pl-8 pr-2 py-2 rounded-full flex items-center gap-4 hover:shadow-xl hover:shadow-white/10 transition-shadow"
                >
                  <span className="text-sm font-bold">Reserve Now</span>
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                     <ArrowUpRight size={18} />
                  </div>
                </motion.button>
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  )
}