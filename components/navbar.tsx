"use client"

import { ArrowUpRight, Phone, Check, X, Menu } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cubicBezier } from "framer-motion"


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const navItems = [
    { name: "About", description: "Explore this home", href: "#about" },
    { name: "Gallery", description: "Take a look inside", href: "#gallery" },
    { name: "Features", description: "Made for comfort", href: "#features" },
    { name: "Reviews", description: "What guests say", href: "#reviews" },
    { name: "Pricing", description: "Rates per night", href: "#pricing" },
    { name: "Location", description: "Our NYC address", href: "#location" },
  ]

  // --- 1. SOPHISTICATED EASING CURVES ---
  const transition = {
  duration: 0.8,
  ease: cubicBezier(0.76, 0, 0.24, 1),
}

  // --- 2. MENU REVEAL VARIANTS (Clip Path) ---
  const menuVariants: Variants = {
    initial: {
      clipPath: "circle(0% at 90% 40px)", // Starts as a tiny dot near the button
      opacity: 0,
    },
    animate: {
      clipPath: "circle(150% at 90% 40px)", // Expands to cover screen
      opacity: 1,
      transition: { ...transition, duration: 0.7 },
    },
    exit: {
      clipPath: "circle(0% at 90% 40px)",
      opacity: 0,
      transition: { ...transition, duration: 0.5 },
    },
  }

  // --- 3. STAGGERED ITEM ENTRANCE ---
  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" } 
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  }

  return (
    <div className="w-full flex flex-col gap-4 relative z-50">
      
      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center py-2">
        {/* LOGO */}
       <motion.div 
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="bg-white border border-gray-100 py-2.5 px-5 rounded-full flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 z-50"
>
  {/* Logo Image */}
  <img
    src="/logo.svg"   // <-- apna logo path
    alt="Stayscape Logo"
    className="w-6 h-6 object-contain"
  />

  {/* Brand Name */}
  <span className="font-semibold text-sm tracking-tight text-gray-900">
    Stayscape
  </span>
</motion.div>

        {/* ICONS */}
        <div className="flex items-center gap-3 z-50">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-100 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
             <Phone size={18} className="text-gray-600" />
          </motion.button>
          
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg shadow-black/20 hover:bg-black transition-colors relative overflow-hidden"
          >
             {/* Animated Icon Switcher */}
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* --- COLLAPSIBLE MENU AREA --- */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="menu-container"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 p-2 origin-top-right absolute top-[70px] right-0 w-full z-40"
          >
            <motion.div 
               variants={containerVariants}
               initial="initial"
               animate="animate"
               exit="exit"
               className="flex flex-col gap-2"
            >
              
              {/* A. NAVIGATION GRID */}
              <motion.nav className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative flex flex-col justify-between px-6 py-8 bg-gray-50/50 hover:bg-white rounded-[24px] transition-colors group cursor-pointer border border-transparent hover:border-gray-100 hover:shadow-sm h-[140px]"
                  >
                    {/* Hover Indicator */}
                    <motion.div 
                      className="absolute top-6 right-6 w-2 h-2 rounded-full bg-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredItem === index ? 1 : 0 }}
                    />

                    <span className="text-xl font-medium text-gray-900 group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                    
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-gray-400 font-medium text-xs">
                          {item.description}
                        </span>
                        <ArrowUpRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </motion.a>
                ))}
              </motion.nav>

              {/* B. EXPANDABLE RESERVE BANNER */}
              <motion.div
                variants={itemVariants}
                layout
                onClick={() => setIsImageExpanded(!isImageExpanded)}
                className="relative overflow-hidden group cursor-pointer rounded-[24px]"
                // Use explicit pixel heights or standard tailwind classes that animate well with layout
                style={{ height: isImageExpanded ? 400 : 120 }}
              >
                {/* Background Image with Zoom Effect */}
                <motion.img
                  layout
                  src="/navbar-image.avif"
                  alt="Interior"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-[0.9] transition-all duration-700"
                  animate={{ scale: isImageExpanded ? 1.05 : 1 }}
                />

                {/* Content Container */}
                <motion.div layout className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
                  
                  {/* Button & Title */}
                  <motion.div layout className="flex flex-row items-center gap-6 w-full justify-between px-4 md:px-12">
                     <motion.span 
                        layout="position"
                        className={`font-medium tracking-tight text-white drop-shadow-md ${isImageExpanded ? "text-4xl" : "text-2xl"}`}
                     >
                        {isImageExpanded ? "Presidential Suite" : "Experience Luxury"}
                     </motion.span>

                     <motion.div layout>
                        <motion.button 
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30"
                        >
                            <ArrowUpRight size={24} />
                        </motion.button>
                     </motion.div>
                  </motion.div>

                  {/* Hidden Details (Revealed on Expand) */}
                  <AnimatePresence>
                    {isImageExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-12 w-full max-w-2xl"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-medium text-white mb-8">
                                {["King Size Bed", "Ocean View", "Private Pool", "Butler Service"].map((feat, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 flex items-center justify-center gap-2 border border-white/10"
                                    >
                                        <Check size={14} /> {feat}
                                    </motion.div>
                                ))}
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                            >
                                Confirm Reservation ($450/night)
                            </motion.button>
                        </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}