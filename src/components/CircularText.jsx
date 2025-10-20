import { useId } from 'react'

import { motion } from 'framer-motion'

export default function CircularText({ text = 'Contact me · ', size = 180, children }) {
  const id = useId()
  const radius = size / 2 - 12

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-white"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        <defs>
          <path
            id={id}
            d={`M ${size / 2} ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text dy="4" fill="currentColor">
          <textPath href={`#${id}`} startOffset="0%">
            {text.repeat(3)}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
