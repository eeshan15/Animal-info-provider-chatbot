"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimalCardProps {
  animal: {
    type: string;
    name: string;
    image: string;
    info: string;
  };
  index: number;
}

export default function AnimalCard({ animal, index }: AnimalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top center+=100",
            end: "bottom center-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-b from-blue-50 to-green-50"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
            <Image
              src={animal.image || "/placeholder.svg"}
              alt={animal.name}
              width={800}
              height={600}
              className="rounded-lg shadow-2xl object-cover w-full h-[60vh]"
            />
          </div>
          <div
            className={`${
              index % 2 === 0 ? "md:order-2" : "md:order-1"
            } space-y-6`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              {animal.name}
            </h2>
            <p className="text-xl text-gray-600">{animal.info}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full ">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
