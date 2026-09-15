import { motion, useReducedMotion } from 'motion/react'
import { Children, isValidElement } from 'react'

const easing = [0.22, 1, 0.36, 1]

const revealVariants = {
  fadeUp: ({ compact }) => ({
    initial: { opacity: 0, y: compact ? 14 : 22 },
    visible: { opacity: 1, y: 0 },
    duration: compact ? 0.52 : 0.62,
  }),
  fadeIn: ({ compact }) => ({
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    duration: compact ? 0.48 : 0.58,
  }),
  revealLeft: ({ compact }) => ({
    initial: { opacity: 0, x: compact ? -14 : -24 },
    visible: { opacity: 1, x: 0 },
    duration: compact ? 0.58 : 0.72,
  }),
  revealRight: ({ compact }) => ({
    initial: { opacity: 0, x: compact ? 14 : 24 },
    visible: { opacity: 1, x: 0 },
    duration: compact ? 0.58 : 0.72,
  }),
  headingReveal: ({ compact }) => ({
    initial: { opacity: 0, y: compact ? 16 : 28, clipPath: 'inset(0 95% 0 0)' },
    visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
    duration: compact ? 0.64 : 0.8,
  }),
  imageMask: ({ compact, direction }) => ({
    initial: {
      opacity: 0.01,
      clipPath: direction === 'right' ? 'inset(0 95% 0 0)' : 'inset(0 0 0 95%)',
    },
    visible: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
    duration: compact ? 0.72 : 0.98,
  }),
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  amount = 0.2,
  variant = 'fadeUp',
  direction = 'right',
  as = 'div',
  ...props
}) {
  const reduced = useReducedMotion()
  const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches
  const definition = (revealVariants[variant] ?? revealVariants.fadeUp)({ compact, direction })
  const MotionElement = motion[as]
  const usesMask = variant === 'headingReveal' || variant === 'imageMask'
  const viewportAmount = usesMask ? Math.min(amount, 0.01) : amount
  const content = variant === 'imageMask'
    ? Children.map(children, (child) => (
        isValidElement(child) && child.type === 'img'
          ? <motion.img
              {...child.props}
              variants={{
                hidden: { scale: compact ? 1.018 : 1.03 },
                visible: { scale: 1 },
              }}
              transition={{ duration: definition.duration, delay: compact ? delay * 0.7 : delay, ease: easing }}
            />
          : child
      ))
    : children

  return (
    <MotionElement
      className={`reveal-clip reveal reveal--${variant} ${className}`.trim()}
      data-reveal={variant}
      variants={{ hidden: definition.initial, visible: definition.visible }}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: definition.duration, delay: compact ? delay * 0.7 : delay, ease: easing }}
      {...props}
    >
      {content}
    </MotionElement>
  )
}
