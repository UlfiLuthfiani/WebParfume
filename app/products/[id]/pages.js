// app/products/[id]/page.js

// 1. Fungsi untuk menentukan param apa saja yang akan di-generate jadi static (SSG)
export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products/category/fragrances");
  const data = await res.json();

  // Next.js akan membuat halaman statis untuk setiap ID produk di bawah ini
  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

// 2. Fungsi fetch data produk (Next.js secara default melakukan caching/SSG di sini)
async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return <div className="text-center py-20">Produk tidak ditemukan.</div>;
  }

  return (
    <div className="bg-[#F9F5F0] min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-xl flex flex-col md:flex-row">
        
        {/* Bagian Gambar */}
        <div className="md:w-1/2 bg-white p-12 flex items-center justify-center">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bagian Info */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <p className="text-pink-400 font-bold tracking-widest uppercase text-xs mb-4">
            {product.brand || "Premium Collection"}
          </p>
          <h1 className="text-4xl font-serif text-[#3D372E] mb-6 leading-tight">
            {product.title}
          </h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-10">
            <span className="text-3xl font-bold text-pink-600">${product.price}</span>
            <span className="text-sm text-yellow-500 font-bold">⭐ {product.rating} / 5</span>
          </div>

          <button className="w-full bg-[#3D372E] text-white py-5 rounded-2xl font-bold hover:bg-black transition-all">
            BELI SEKARANG
          </button>
        </div>
      </div>
    </div>
  );
}