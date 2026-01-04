"use client"

import { ArrowUpRight, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const galleryImages = [
  // --- COLUMN 1 ---
  { id: "01", url: "/Dining Room.avif", title: "Dining Room", height: "h-[300px] md:h-[400px]" },
  { id: "04", url: "/Bedroom.avif", title: "Master Suite", height: "h-[350px] md:h-[500px]" },
  { id: "07", url: "/Creative Workspace.avif", title: "Workspace", height: "h-[300px] md:h-[450px]" },

  // --- COLUMN 2 ---
  { id: "02", url: "/Kitchen.avif", title: "Chef's Kitchen", height: "h-[400px] md:h-[550px]" },
  { id: "05", url: "/Living Room.avif", title: "Living Area", height: "h-[250px] md:h-[350px]" },
  { id: "08", url: "/Guest Bedroom.avif", title: "Guest Room", height: "h-[300px] md:h-[400px]" },

  // --- COLUMN 3 ---
  { id: "03", url: "/Decorative Foyer.avif", title: "Art Details", height: "h-[300px] md:h-[400px]" },
  { id: "06", url: "/Home Office.avif", title: "Library", height: "h-[300px] md:h-[400px]" },
  { id: "09", url: "/Bathroom.avif", title: "Spa Bath", height: "h-[350px] md:h-[500px]" },
]

// --- COMPONENT: Individual Image Card with "Follow Cursor" ---
function ImageCard({ image, index }: { image: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse Position Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    x.set(clientX)
    y.set(clientY)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative rounded-[20px] md:rounded-[24px] overflow-hidden cursor-default md:cursor-none group ${image.height} w-full`}
    >
      {/* Image Scale Effect */}
      <motion.img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />

      {/* CUSTOM CURSOR FOLLOWER (Hidden on Mobile) */}
      <motion.div
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="hidden md:flex absolute top-0 left-0 w-24 h-24 bg-white/20 backdrop-blur-md border border-white/30 rounded-full items-center justify-center pointer-events-none z-20"
      >
        <div className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            View <ArrowRight size={10} />
        </div>
      </motion.div>

      {/* Static Content (Bottom) */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10 text-white pointer-events-none">
        <div className="overflow-hidden h-5 md:h-6 mb-1">
             <motion.p 
                animate={{ y: isHovered ? 0 : 0 }} // Simplified for mobile default
                className="text-[10px] font-bold uppercase tracking-widest opacity-80 md:translate-y-5 md:group-hover:translate-y-0 transition-transform duration-300"
             >
                {image.id}
             </motion.p>
        </div>
        <div className="overflow-hidden">
            <h3 className="text-xl md:text-2xl font-medium leading-tight">{image.title}</h3>
        </div>
      </div>
    </motion.div>
  )
}


export default function Gallery() {
  const containerRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  // Responsive Check for Parallax
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    handleResize() // Check on mount
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Create velocities (Only apply if isDesktop is true)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -100 : 0])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -100 : 0])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -250 : 0])

  return (
    <section ref={containerRef} id="gallery" className="relative px-4 md:px-8 py-16 md:py-24 bg-[#F8F9FB] overflow-hidden">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-24 px-2 md:px-4">
           <div className="space-y-4">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                >
                    <div className="w-8 h-[1px] bg-gray-400"></div>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Gallery</span>
                </motion.div>
                
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-7xl font-medium text-gray-900 tracking-tight leading-[1.1] md:leading-[1]"
                    >
                        Inside the <br/> Apartment
                    </motion.h2>
                </div>
           </div>

           <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-[#1A1A1A] text-white px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center gap-3 md:gap-4 shadow-xl hover:shadow-2xl transition-all mt-8 md:mt-0 w-full md:w-auto justify-center md:justify-start"
           >
                <span className="text-sm font-medium">Reserve Now</span>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={16} className="text-black" />
                </div>
           </motion.button>
        </div>

        {/* --- PARALLAX GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* COLUMN 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
                {galleryImages.slice(0, 3).map((img, i) => (
                    <ImageCard key={i} image={img} index={i} />
                ))}
            </motion.div>

            {/* COLUMN 2 (Faster Speed on Desktop, Normal on Mobile) */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 pt-0 md:pt-12">
                {galleryImages.slice(3, 6).map((img, i) => (
                    <ImageCard key={i} image={img} index={i} />
                ))}
            </motion.div>

            {/* COLUMN 3 */}
            <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-8 pt-0 md:pt-24">
                {galleryImages.slice(6, 9).map((img, i) => (
                    <ImageCard key={i} image={img} index={i} />
                ))}
            </motion.div>

        </div>

      </div>
    </section>
  )
}