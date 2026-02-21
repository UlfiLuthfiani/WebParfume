
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/products/category/fragrances");
    const data = await res.json();
    
    return data.products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Gagal men-generate static params:", error);
    return [];
  }
}

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }) {
  const resolvedParams = await params; 
  const id = resolvedParams.id;
  
  const product = await getProduct(id);

  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5F0]">
        <h2 className="text-2xl font-serif text-red-400 mb-4">Aroma Tidak Ditemukan</h2>
        <Link href="/products" className="text-pink-600 underline text-sm uppercase tracking-widest">
          Kembali ke Koleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5F0] min-h-screen p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        <Link 
          href="/products" 
          className="inline-block mb-8 text-xs font-bold tracking-[0.2em] text-[#A88B74] hover:text-pink-600 transition-colors uppercase"
        >
          ← Kembali ke Katalog
        </Link>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white">
          
          <div className="md:w-1/2 bg-white p-12 flex items-center justify-center border-r border-gray-50">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full max-h-[500px] object-contain transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-pink-500 font-bold tracking-[0.3em] text-[10px] mb-4 uppercase block">
                 ✦ {product.brand || "Lumière Selection"}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-serif text-[#3D372E] mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                 <span className="text-3xl font-bold text-pink-600">
                   ${product.price}
                 </span>
                 <span className="text-yellow-500 font-medium text-sm border-l border-gray-200 pl-4">
                   ★ {product.rating} / 5.0
                 </span>
              </div>
              
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Profil Aroma</h3>
                <p className="text-gray-600 leading-relaxed mb-10 text-lg italic font-light">
                  "{product.description}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-8 border-y border-gray-50 mb-8">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Status</p>
                <p className="text-sm font-medium text-[#3D372E]">{product.availabilityStatus || "Tersedia"}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Stock</p>
                <p className="text-sm font-medium text-[#3D372E]">{product.stock} Units</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">SKU</p>
                <p className="text-sm font-mono text-gray-500">{product.sku}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Kategori</p>
                <p className="text-sm font-medium capitalize text-[#3D372E]">{product.category}</p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-100">
               <p className="text-[10px] text-center text-gray-500 italic leading-relaxed">
                 Aroma ini tersedia untuk dipesan. Silakan kembali ke katalog utama untuk menambahkan item ini ke dalam keranjang belanja Anda.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}