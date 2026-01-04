"use client"

import { motion, AnimatePresence, Variants } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

// --- 1. SOPHISTICATED EASING & VARIANTS ---
const transition = { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] } // Custom "quint" ease


const letterVariants: Variants = {
  hidden: { y: "100%", opacity: 0, filter: "blur(10px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.05 + 0.3,
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// --- 2. STAGGERED TEXT COMPONENT ---
function StaggeredTitle({ text }: { text: string }) {
  const letters = text.split("")
  return (
    <div className="overflow-hidden h-[40px] flex items-center justify-center mb-8 relative z-10">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-4xl font-medium tracking-tight text-black inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

// --- 3. INTELLIGENT COUNTER ---
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = 100
    const duration = 2000 // 2 seconds total
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for the number count (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const currentCount = Math.floor(start + (end - start) * ease)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <span className="tabular-nums font-mono text-[10px] md:text-xs text-gray-400 tracking-[0.2em] mt-4 opacity-80">
      {count < 10 ? `00${count}` : count < 100 ? `0${count}` : count}%
    </span>
  )
}

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white cursor-wait"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        <div className="flex flex-col items-center relative">
          
          {/* --- LOGO WITH DREAMY FLOAT --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8 relative"
          >
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent blur-3xl scale-150 opacity-50 rounded-full" />
            
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
               <Image
                 src="/logo.svg"
                 alt="Stayscape Logo"
                 width={100}
                 height={100}
                 priority
                 className="drop-shadow-lg"
               />
            </motion.div>
          </motion.div>

          {/* --- STAGGERED TEXT REVEAL --- */}
          <StaggeredTitle text="Stayscape" />

          {/* --- PROGRESS INDICATOR --- */}
          <div className="flex flex-col items-center w-[240px]">
            {/* The Line Container */}
            <div className="w-full h-[2px] bg-gray-100 rounded-full overflow-hidden relative">
              
              {/* The Filling Line with Gradient Tip */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-black rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Shine effect on the leading edge */}
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50" />
              </motion.div>

            </div>
            
            {/* The Counter */}
            <motion.div
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.8 }}
            >
               <Counter />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}