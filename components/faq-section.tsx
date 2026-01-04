"use client"

import { ArrowUpRight, Plus, Minus } from "lucide-react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring } from "framer-motion"

// --- UTILITY: Magnetic Button Component ---
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  function handleMouseMove(e: React.MouseEvent) {
    // Disable magnetic effect on small screens to prevent touch issues
    if (window.innerWidth < 768) return; 

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    x.set((clientX - centerX) * 0.2)
    y.set((clientY - centerY) * 0.2)
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
      className="bg-[#1A1A1A] text-white pl-5 pr-2 py-2 md:pl-6 md:pr-2 md:py-2 rounded-full flex items-center gap-3 md:gap-4 shadow-xl shadow-black/5 group mt-6 md:mt-8 w-max"
    >
      {children}
    </motion.button>
  )
}

const faqs = [
  {
    question: "How close to Central Park?",
    answer: "The apartment is located on the Upper East Side, just a 10-minute walk to Central Park. Perfect for morning jogs or evening strolls.",
    image: "/1-faq.avif",
  },
  {
    question: "Why the location is special?",
    answer: "You are in the heart of the Museum Mile, surrounded by luxury boutiques, fine dining, and historical architecture, yet in a quiet residential haven.",
    image: "/2-faq.avif",
  },
  {
    question: "Do you allow small pets?",
    answer: "Yes, we welcome well-behaved pets! There is a one-time pet fee of $100 and a maximum of two pets per reservation.",
    image: "/3-faq.avif",
  },
  {
    question: "What's the cancellation policy?",
    answer: "We offer flexible cancellation up to 14 days before check-in for a full refund. Cancellations within 14 days are subject to a 50% fee.",
    image: "/4-faq.avif",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="px-4 sm:px-6 md:px-12 py-16 md:py-32 bg-[#F8F9FB] font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start">
          
          {/* --- LEFT SIDE: STICKY HEADER --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 mb-8 lg:mb-0">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 md:space-y-8"
            >
               <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 md:w-8 h-[1px] bg-gray-400"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">FAQ</span>
                  </div>
                  
                  {/* Responsive Text Size */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 tracking-tight leading-[1.1] mb-4 md:mb-8">
                    Everything You <br/> Need to Know
                  </h2>
                  
                  <p className="text-gray-500 text-base md:text-lg max-w-md leading-relaxed">
                    Can't find the answer you're looking for? Feel free to contact our support team.
                  </p>
               </div>

               <MagneticButton>
                  <span className="text-xs md:text-sm font-semibold pl-2">Reserve Now</span>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300">
                        <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" strokeWidth={2.5} />
                  </div>
               </MagneticButton>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: FLUID ACCORDION LIST --- */}
          <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4 w-full">
            <LayoutGroup>
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                
                return (
                  <motion.div 
                    layout 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className={`bg-white rounded-[24px] md:rounded-[32px] overflow-hidden cursor-pointer border transition-all duration-500 ease-out ${isOpen ? 'border-gray-300 shadow-xl shadow-gray-200/50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <motion.div layout="position" className="w-full flex items-center justify-between p-4 md:p-6 gap-4 md:gap-6">
                      
                      <div className="flex items-center gap-3 md:gap-6 flex-1">
                        {/* Interactive Thumbnail */}
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-100 group">
                           <motion.img 
                             layout
                             src={faq.image} 
                             alt="icon" 
                             className="w-full h-full object-cover"
                             animate={{ scale: isOpen ? 1.1 : 1, filter: isOpen ? "grayscale(0%)" : "grayscale(100%)" }}
                             transition={{ duration: 0.5 }}
                             // Fallback in case image path is wrong
                             onError={(e) => {e.currentTarget.src = `https://placehold.co/100x100/f3f4f6/a3a3a3?text=${idx+1}`}}
                           />
                           {!isOpen && <div className="absolute inset-0 bg-white/20" />}
                        </div>
                        
                        <motion.h3 
                          layout="position"
                          className={`text-base sm:text-lg md:text-xl font-medium transition-colors duration-300 leading-tight ${isOpen ? 'text-gray-900' : 'text-gray-600'}`}
                        >
                          {faq.question}
                        </motion.h3>
                      </div>

                      {/* Animated Icon Toggle */}
                      <motion.div 
                        layout="position"
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${isOpen ? 'bg-black text-white' : 'bg-gray-50 text-gray-500'}`}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.div
                                    key="minus"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Minus size={16} className="md:w-[18px] md:h-[18px]" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="plus"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Plus size={16} className="md:w-[18px] md:h-[18px]" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                      </motion.div>

                    </motion.div>

                    {/* Expandable Answer */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        >
                          {/* Responsive Padding for Answer: pl-4 on mobile, pl-24 on desktop (to align with text) */}
                          <div className="px-4 pb-6 sm:pl-[70px] sm:pr-8 md:pl-[88px] md:pr-10 md:pb-8 text-gray-500 leading-relaxed text-sm md:text-lg">
                            <motion.p
                                initial={{ y: 20, filter: "blur(10px)", opacity: 0 }}
                                animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {faq.answer}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </LayoutGroup>
          </div>

        </div>
      </div>
    </section>
  )
}