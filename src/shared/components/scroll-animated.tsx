import { motion, useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';

type AnimationType =
  | 'scroll-left'
  | 'scroll-left2'
  | 'scroll-right'
  | 'scroll-right2'
  | 'scroll-top'
  | 'scroll-top2'
  | 'scroll-bottom'
  | 'scroll-bottom2'
  | 'scroll-escala'
  | 'scroll-txt'
  | 'scroll-txt-smooth'
  | 'perspectivax';

interface ScrollAnimatedProps {
  children: ReactNode;
  animationType: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollAnimated({
  children,
  animationType,
  delay = 0,
  duration,
  className = ''
}: ScrollAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false, // Permite que a animação seja acionada múltiplas vezes
    amount: 0.3, // Reduzido para 30% - animação ativa quando 30% do elemento está visível
    margin: '0px 0px -10% 0px' // Adiciona margem para melhor controle
  });

  // Configurações de animação baseadas no tipo
  const getAnimationConfig = () => {
    const baseTransition = {
      duration: duration ? duration / 1000 : 0.6,
      delay: delay / 1000,
      ease: "easeOut" as const
    };

    switch (animationType) {
      case 'scroll-left':
        return {
          initial: { opacity: 0, x: -30, filter: 'blur(10px)' },
          animate: isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -30, filter: 'blur(10px)' },
          transition: baseTransition
        };

      case 'scroll-left2':
        return {
          initial: { opacity: 0, x: -30 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 },
          transition: { ...baseTransition, duration: 0.4 }
        };

      case 'scroll-right':
        return {
          initial: { opacity: 0, x: 30, filter: 'blur(10px)' },
          animate: isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: 30, filter: 'blur(10px)' },
          transition: baseTransition
        };

      case 'scroll-right2':
        return {
          initial: { opacity: 0, x: 30 },
          animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 },
          transition: { ...baseTransition, duration: 0.4 }
        };

      case 'scroll-top':
        return {
          initial: { opacity: 0, y: 30, filter: 'blur(5px)' },
          animate: isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(5px)' },
          transition: baseTransition
        };

      case 'scroll-top2':
        return {
          initial: { opacity: 0, y: 30 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
          transition: { ...baseTransition, duration: 0.4 }
        };

      case 'scroll-bottom':
        return {
          initial: { opacity: 0, y: -30, filter: 'blur(10px)' },
          animate: isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -30, filter: 'blur(10px)' },
          transition: baseTransition
        };

      case 'scroll-bottom2':
        return {
          initial: { opacity: 0, y: -30 },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 },
          transition: { ...baseTransition, duration: 0.4 }
        };

      case 'scroll-escala':
        return {
          initial: { opacity: 0, scale: 2, filter: 'blur(10px)' },
          animate: isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 2, filter: 'blur(10px)' },
          transition: baseTransition
        };

      case 'scroll-txt':
        return {
          initial: { opacity: 0, y: 20, filter: 'blur(3px)' },
          animate: isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(3px)' },
          transition: { ...baseTransition, duration: 0.8 }
        };

      case 'scroll-txt-smooth':
        return {
          initial: { opacity: 0, y: 15, scale: 0.98 },
          animate: isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.98 },
          transition: { ...baseTransition, duration: 0.7 }
        };

      case 'perspectivax':
        return {
          initial: {
            opacity: 0,
            y: 50,
            scale: 0.95,
            filter: 'blur(2px)'
          },
          animate: isInView ? {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)'
          } : {
            opacity: 0,
            y: 50,
            scale: 0.95,
            filter: 'blur(2px)'
          },
          transition: { ...baseTransition, duration: 1.2 }
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          transition: baseTransition
        };
    }
  };

  const animationConfig = getAnimationConfig();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
    >
      {children}
    </motion.div>
  );
}