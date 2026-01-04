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

  // --- 2. MENU REVEAL VARIANTS ---
  const menuVariants: Variants = {
    initial: {
      clipPath: "circle(0% at 95% 40px)", // Adjusted for mobile right alignment
      opacity: 0,
    },
    animate: {
      clipPath: "circle(150% at 95% 40px)",
      opacity: 1,
      transition: { ...transition, duration: 0.7 },
    },
    exit: {
      clipPath: "circle(0% at 95% 40px)",
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
    // Added padding-x (px-4) to wrapper for mobile spacing
    <div className="w-full flex flex-col gap-4 relative z-50 px-4 md:px-6">

      {/* --- TOP BAR --- */}
      <div className="flex justify-between items-center py-4">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-gray-100 py-2 px-4 md:py-2.5 md:px-5 rounded-full flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 z-50"
        >
          <img
            src="/logo.svg" 
            alt="Stayscape Logo"
            className="w-5 h-5 md:w-6 md:h-6 object-contain"
          />
          <span className="font-semibold text-sm md:text-base tracking-tight text-gray-900">
            Stayscape
          </span>
        </motion.div>

        {/* ICONS */}
        <div className="flex items-center gap-2 md:gap-3 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-gray-100 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Phone size={18} className="text-gray-600" />
          </motion.button>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg shadow-black/20 hover:bg-black transition-colors relative overflow-hidden"
          >
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
            // Added max-h and overflow-y-auto for small mobile screens (Landscape mode fix)
            className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 p-2 origin-top-right absolute top-[80px] left-4 right-4 md:left-6 md:right-6 z-40 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar"
          >
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-2"
            >

              {/* A. NAVIGATION GRID (Responsive: 1 col -> 2 cols -> 3 cols) */}
              <motion.nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    // Adjusted height and padding for mobile
                    className="relative flex flex-col justify-between px-5 py-6 md:px-6 md:py-8 bg-gray-50/50 hover:bg-white rounded-[20px] md:rounded-[24px] transition-colors group cursor-pointer border border-transparent hover:border-gray-100 hover:shadow-sm h-[110px] md:h-[140px]"
                  >
                    {/* Hover Indicator */}
                    <motion.div
                      className="absolute top-5 right-5 md:top-6 md:right-6 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredItem === index ? 1 : 0 }}
                    />

                    <span className="text-lg md:text-xl font-medium text-gray-900 group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-400 font-medium text-[10px] md:text-xs">
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
                className="relative overflow-hidden group cursor-pointer rounded-[20px] md:rounded-[24px]"
                // Responsive Height Logic using generic classes isn't enough for animation, sticking to style but adjusting logic slightly conceptually
                style={{ height: isImageExpanded ? "auto" : 120, minHeight: isImageExpanded ? 450 : 120 }}
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
                <motion.div layout className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-6">

                  {/* Button & Title */}
                  <motion.div layout className="flex flex-row items-center gap-4 w-full justify-between px-2 md:px-12 mt-auto mb-auto h-full">
                    <motion.span
                      layout="position"
                      className={`font-medium tracking-tight text-white drop-shadow-md transition-all duration-500 ${isImageExpanded ? "text-2xl md:text-4xl self-start mt-8" : "text-xl md:text-2xl self-center"}`}
                    >
                      {isImageExpanded ? "Presidential Suite" : "Experience Luxury"}
                    </motion.span>

                    <motion.div layout className={isImageExpanded ? "self-start mt-8" : "self-center"}>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30"
                      >
                        <ArrowUpRight size={20} className="md:w-6 md:h-6" />
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
                        className="w-full max-w-2xl pb-8 px-2"
                      >
                        <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm font-medium text-white mb-6 md:mb-8">
                          {["King Size Bed", "Ocean View", "Private Pool", "Butler Service"].map((feat, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (i * 0.1) }}
                              className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 flex items-center justify-center gap-2 border border-white/10"
                            >
                              <Check size={12} className="md:w-3.5 md:h-3.5" /> {feat}
                            </motion.div>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-white text-black py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-100 transition-colors shadow-xl"
                        >
                          Confirm Reservation ($450)
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