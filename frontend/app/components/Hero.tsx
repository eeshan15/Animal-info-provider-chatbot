"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="https://source.unsplash.com/featured/?nature,landscape"
        alt="Beautiful nature landscape"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center text-white max-w-4xl px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Discover the Animal Kingdom
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Embark on a journey through nature&apos;s wonders
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
        >
          Start Exploring
        </motion.button>
      </motion.div>
    </div>
  );
}
