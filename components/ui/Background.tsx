"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Background() {
    // Use client-side only rendering to avoid hydration mismatch with random values
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 bg-background -z-50" />;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-background pointer-events-none">
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Primary Gradient Orb */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary Gradient Orb */}
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 rounded-full blur-[120px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Accent Gradient Orb */}
            <motion.div
                className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -50, 50, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
