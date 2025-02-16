"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Animal {
  type: string;
  name: string;
  image: string;
  info: string;
}

interface AnimalSectionProps {
  animals: Animal[];
}

export default function AnimalSection({ animals }: AnimalSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {animals.map((animal, index) => (
          <motion.div
            key={animal.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-64 overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={animal.image || "/placeholder.svg"}
              alt={animal.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white">{animal.type}</h3>
                <p className="text-white/80">{animal.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
