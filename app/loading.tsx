"use client"

import { motion, cubicBezier } from "framer-motion"
import Image from "next/image"

const easeOutExpo = cubicBezier(0.22, 1, 0.36, 1)
const easeInOut = cubicBezier(0.4, 0, 0.2, 1)

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F9FB]">
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <Image
            src="/logo.svg"
            alt="Stayscape Logo"
            width={80}
            height={80}
            priority
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: easeOutExpo }}
          className="text-2xl font-medium tracking-tight text-gray-900"
        >
          Stayscape
        </motion.h1>

        {/* Luxury Loading Line */}
        <div className="w-32 h-[2px] bg-gray-200 rounded-full overflow-hidden relative mt-2">
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: easeInOut,
            }}
          />
        </div>

      </div>
    </div>
  )
}
