import Link from "next/link";

async function getFragrances() {
  const res = await fetch(
    "https://dummyjson.com/products/category/fragrances?limit=10",
    { cache: "no-store" } 
  );
  if (!res.ok) return { products: [] };
  return res.json();
}

export default async function Home() {
  const data = await getFragrances();

  return (
    <div className="bg-[#F9F5F0] min-h-screen text-[#4A4238]">
      
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-[#EFE3D7]">
        <div className="order-2 md:order-1 text-center md:text-left">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#A88B74] mb-4 md:mb-6 font-medium">
            ✦ Premium Fragrance
          </p>
          <h1 className="text-4xl md:text-7xl font-serif leading-tight text-[#3D372E] mb-6 md:mb-8">
            Aroma Mewah, <br />
            <span className="italic text-[#A88B74] font-light">Karakter Abadi</span>
          </h1>
          <Link href="/products" className="inline-block bg-pink-600 text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-pink-700 transition-all">
            JELAJAHI KOLEKSI
          </Link>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center items-center py-10">
          <div className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-[#EFE3D7] rounded-full absolute -z-10 animate-pulse"></div>
          <div className="text-[120px] md:text-[220px] drop-shadow-2xl">🌸</div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 max-w-7xl mx-auto">
        <h2 className="text-2xl font-serif mb-12 text-center text-[#3D372E]">Our Collection</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.products.map((item) => (
            <Link href="/products" key={item.id} className="group cursor-pointer">
              <div className="flex flex-col h-full bg-white/50 p-4 rounded-[2.5rem] hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
                
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white mb-6 relative border border-gray-100 flex items-center justify-center p-6">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
                    <div className="bg-[#3D372E]/80 backdrop-blur-md text-white text-[10px] px-6 py-2 rounded-full tracking-widest uppercase">
                      Lihat Produk
                    </div>
                  </div>
                </div>
                
                <div className="px-2 pb-4 text-center">
                  <h3 className="text-lg md:text-xl font-serif text-[#3D372E] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#A88B74] font-bold mb-3">${item.price}</p>
                  <div className="flex justify-center text-[10px] text-gray-400 gap-2 uppercase tracking-tighter">
                     <span>Premium</span>
                     <span>•</span>
                     <span>Long Lasting</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}