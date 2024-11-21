'use client'

import { Box } from '@chakra-ui/react'
import { motion, Variants } from "framer-motion"
import Image from "next/image"
import { chakra } from '@chakra-ui/react'

const MotionBox = chakra(motion.div)

const icons = [
  { src: "/icons/btc.svg", size: 40, delay: 0, left: "15%" },
  { src: "/icons/eth.svg", size: 36, delay: 0.2, left: "35%" },
  { src: "/icons/usdc.svg", size: 32, delay: 0.4, left: "55%" },
  { src: "/icons/egld.svg", size: 38, delay: 0.6, left: "75%" },
]

const backgroundIcons = Array(12).fill(null).map((_, i) => ({
  src: icons[i % icons.length].src,
  size: 16,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 2,
  duration: Math.random() * 10 + 15,
}))

const mainIconVariants: Variants = {
  initial: { 
    y: "120%", 
    opacity: 0, 
    rotate: 0 
  },
  animate: { 
    y: [120, -20],
    opacity: [0, 0.3, 0.3, 0],
    rotate: 360,
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

const backgroundIconVariants: Variants = {
  initial: { 
    y: "120%", 
    opacity: 0, 
    rotate: 0 
  },
  animate: (duration: number) => ({
    y: ["120%", "-20%"],
    opacity: [0, 0.1, 0.1, 0],
    rotate: 360,
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear"
    }
  })
}

export function FloatingIcons() {
  return (
    <Box position="absolute" inset={0} pointerEvents="none" overflow="hidden">
      {/* Main icons */}
      {icons.map((icon, index) => (
        <MotionBox
          key={`main-${index}`}
          position="absolute"
          left={icon.left}
          variants={mainIconVariants}
          initial="initial"
          animate="animate"
          style={{
            width: `${icon.size}px`,
            height: `${icon.size}px`
          }}
        >
          <Box position="relative" width="100%" height="100%">
            <Image
              src={icon.src}
              alt="Crypto Icon"
              fill
              style={{ opacity: 0.3 }}
            />
          </Box>
        </MotionBox>
      ))}

      {/* Background icons */}
      {backgroundIcons.map((icon, index) => (
        <MotionBox
          key={`bg-${index}`}
          position="absolute"
          left={icon.left}
          variants={backgroundIconVariants}
          initial="initial"
          animate="animate"
          custom={icon.duration}
          style={{
            width: `${icon.size}px`,
            height: `${icon.size}px`
          }}
        >
          <Box position="relative" width="100%" height="100%">
            <Image
              src={icon.src}
              alt="Background Icon"
              fill
              style={{ opacity: 0.1 }}
            />
          </Box>
        </MotionBox>
      ))}

      {/* Background gradient */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, transparent, rgba(0,0,0,0.6))"
        pointerEvents="none"
      />
    </Box>
  )
}