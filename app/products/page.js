"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); 
  const [showCheckout, setShowCheckout] = useState(false); 

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/fragrances")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };


  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F0]">
      <p className="text-[#A88B74] font-serif animate-pulse">Loading Fragrance Collection...</p>
    </div>
  );

  return (
    <div className="bg-[#F9F5F0] min-h-screen text-[#4A4238] p-6 md:p-12 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-pink-400 text-xs hover:underline tracking-widest uppercase font-bold">
            ← Beranda
          </Link>
          
          <button 
            onClick={() => cart.length > 0 && setShowCheckout(true)}
            className="bg-white px-6 py-3 rounded-full shadow-md flex items-center gap-3 hover:shadow-xl transition-all border border-pink-50 relative"
          >
            <span className="text-lg">🛒</span>
            <span className="text-sm font-bold text-pink-600">{cart.length} Item</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                !
              </span>
            )}
          </button>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-pink-600">🌸 Fragrance Collection</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((item) => (
            <div key={item.id} className="group flex flex-col h-full">
        
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white mb-6 relative shadow-sm border border-gray-50 flex items-center justify-center p-8">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <h3 className="text-xl font-serif text-[#3D372E] text-center mb-2 leading-tight h-14">
                {item.title}
              </h3>
              <p className="text-pink-600 font-bold text-center mb-4 text-lg">${item.price}</p>
              
              
              <div className="px-4">
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-pink-600 text-white py-4 rounded-2xl text-xs font-bold hover:bg-pink-700 shadow-lg shadow-pink-100 transition-all active:scale-95"
                >
                  Tambah Ke Keranjang 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 overflow-hidden relative">
            <button 
              onClick={() => setShowCheckout(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-pink-600"
            >
              ✕
            </button>

            <h2 className="text-2xl font-serif text-[#3D372E] mb-6">Pemesanan Parfume</h2>
            
            <div className="max-h-40 overflow-y-auto mb-6 pr-2 space-y-3">
              {cart.map((product, index) => (
                <div key={index} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-600">{product.title}</span>
                  <span className="font-bold text-pink-600">${product.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 font-bold text-lg border-t-2 border-pink-50">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Pesanan Segera Diproses!'); setShowCheckout(false); setCart([]); }}>
              <input type="text" placeholder="Nama Penerima" required className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-pink-200" />
              <input type="tel" placeholder="Nomor WhatsApp" required className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-pink-200" />
              <textarea placeholder="Alamat Lengkap" required className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-pink-200 h-24"></textarea>
              
              <button type="submit" className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all mt-4">
                Konfirmasi Pembelian
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}