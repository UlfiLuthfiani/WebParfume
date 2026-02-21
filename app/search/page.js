"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Search() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products/category/fragrances");
      const data = await res.json();
      setAllProducts(data.products);
      setFilteredProducts(data.products);
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-[#F9F5F0] min-h-screen p-6 md:p-12 text-[#4A4238]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-pink-600 mb-2">🌸 Cari Parfum</h1>
          <p className="text-sm text-gray-400 uppercase tracking-widest">Temukan Aroma Yang Mewakliki Anda</p>
        </div>

        <div className="max-w-2xl mx-auto mb-16 relative">
          <input
            type="text"
            placeholder="Ketik nama parfum..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-white border-none rounded-full py-5 px-8 shadow-lg shadow-pink-100 focus:ring-2 focus:ring-pink-300 transition-all outline-none text-lg"
          />
          <div className="absolute right-6 top-5 text-2xl">🔍</div>
        </div>

        {loading && (
          <div className="text-center animate-pulse font-serif text-[#A88B74]">
            Mencari koleksi terbaik...
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Link href="/products" key={item.id} className="group cursor-pointer">
                <div className="flex flex-col h-full bg-white/50 p-4 rounded-[2.5rem] hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
                  
                  <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white mb-6 relative border border-gray-100 flex items-center justify-center p-8">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="px-2 pb-4 text-center">
                    <h3 className="text-lg md:text-xl font-serif text-[#3D372E] group-hover:text-[#A88B74] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#A88B74] font-bold mb-3">${item.price}</p>
                    <div className="flex justify-center text-[10px] text-gray-400 gap-2 uppercase tracking-tighter">
                       <span>Premium Scent</span>
                       <span>•</span>
                       <span>Long Lasting</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            !loading && (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-400 italic">Maaf, Perfume "{searchTerm}" tidak ditemukan. 🌸</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}