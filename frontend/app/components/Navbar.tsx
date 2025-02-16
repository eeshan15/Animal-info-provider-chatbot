"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className={`text-2xl font-bold ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            Animal Kingdom
          </Link>
          <div className="space-x-4">
            <Link
              href="#"
              className={`${
                isScrolled
                  ? "text-gray-600 hover:text-gray-800"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
