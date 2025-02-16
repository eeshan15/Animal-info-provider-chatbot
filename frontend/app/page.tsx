"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimalCard from "./components/AnimalCard";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const animals = [
  {
    type: "Land",
    name: "African Elephant",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    info: "The African elephant is the largest land animal on Earth. Known for their intelligence and complex social structures, these gentle giants play a crucial role in maintaining the biodiversity of their ecosystems.",
  },
  {
    type: "Aerial",
    name: "Peregrine Falcon",
    image:
      "https://images.unsplash.com/photo-1618497414268-2eee2f6b74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    info: "The peregrine falcon is renowned for being the fastest animal in the world, capable of reaching speeds over 240 mph during its hunting stoop. These birds of prey are found on every continent except Antarctica.",
  },
  {
    type: "Aquatic",
    name: "Blue Whale",
    image:
      "https://images.unsplash.com/photo-1566235102945-d231f3ea963b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    info: "The blue whale is the largest animal known to have ever existed. These magnificent marine mammals can grow up to 100 feet long and weigh as much as 200 tons. Their low-frequency vocalizations can be heard for hundreds of miles underwater.",
  },
  {
    type: "Flying",
    name: "Monarch Butterfly",
    image:
      "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    info: "The monarch butterfly is famous for its annual long-distance migration of up to 3,000 miles. These delicate insects play a vital role in pollination and are known for their distinctive orange and black wing patterns.",
  },
];

export default function Home() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCurrentAnimal = useState(0)[1];

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentAnimal(index),
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setCurrentAnimal]);

  return (
    <main className="overflow-hidden">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 to-green-400">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Explore the Animal Kingdom
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Embark on a journey through nature&apos;s wonders
          </p>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Discover Amazing Animals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animals.map((animal, index) => (
              <motion.div
                key={animal.type}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={animal.image || "/placeholder.svg"}
                  alt={animal.name}
                  width={500}
                  height={300}
                  className="object-cover w-full h-64 transition-transform duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 hover:opacity-75">
                  <h3 className="text-white text-2xl font-bold">
                    {animal.type}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {animals.map((animal, index) => (
        <AnimalCard
          key={animal.type}
          animal={animal}
          index={index}
        />
      ))}
    </main>
  );
}
