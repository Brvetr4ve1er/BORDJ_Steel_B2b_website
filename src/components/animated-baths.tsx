
"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export const AnimatedBaths = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, 13, {
                duration: 1.5,
                ease: 'easeOut',
                onUpdate: (value) => {
                    setCount(Math.round(value));
                },
            });
            return () => controls.stop();
        }
    }, [isInView]);

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: 0.2, type: "spring", duration: 2, bounce: 0 },
                opacity: { delay: 0.2, duration: 0.01 }
            }
        }
    };
    
    const arrowVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: {
                delay: 2.2,
                duration: 0.3
            }
        }
    };

    return (
        <div ref={ref} className="w-full flex flex-col items-center justify-center text-center h-full">
            <svg width="100%" height="40" viewBox="0 0 250 40" className="mb-2">
                <motion.path
                    d="M 10 20 L 240 20"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    variants={lineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                />
                <motion.path
                    d="M 10 20 L 0 15 M 10 20 L 0 25"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    fill="none"
                    variants={arrowVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                />
                <motion.path
                    d="M 240 20 L 250 15 M 240 20 L 250 25"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    fill="none"
                    variants={arrowVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                />
            </svg>
            <div className="flex items-baseline">
                <motion.span 
                    className="text-5xl font-bold text-white tabular-nums"
                >
                    {count}
                </motion.span>
                <motion.span
                    className="text-2xl font-bold text-white ml-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1, transition: { delay: 1.5 } } : {}}
                >
                    metres
                </motion.span>
            </div>
            <motion.p 
                className="text-lg text-gray-300 mt-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1, transition: { delay: 1.8 } } : {}}
            >
                Bains de traitement
            </motion.p>
        </div>
    );
};

    