"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <h1 className="text-xl font-serif font-bold text-pink-600 tracking-tight">
            LUMIÈRE
          </h1>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-gray-500">
          <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-pink-500 transition-colors">Products</Link>
          <Link href="/search" className="hover:text-pink-500 transition-colors">Search</Link>
          <Link href="/about" className="hover:text-pink-500 transition-colors">About</Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#3D372E] focus:outline-none p-2"
        >
          <div className="w-6 h-0.5 bg-pink-600 mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-pink-600 mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-pink-600 transition-all"></div>
        </button>
      </div>

      <div className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-50
        ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="flex flex-col space-y-4 p-6 text-sm font-medium uppercase tracking-widest text-gray-500">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-pink-500">Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="hover:text-pink-500">Products</Link>
          <Link href="/search" onClick={() => setIsOpen(false)} className="hover:text-pink-500">Search</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-pink-500 transition-colors">About</Link>

        </div>
      </div>
    </nav>
  );
}