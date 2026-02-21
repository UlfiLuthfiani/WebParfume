
export const metadata = {
  title: "About Us | Lumière Fragrance",
  description: "Pelajari lebih lanjut tentang filosofi aroma kami.",
};

export default function AboutPage() {
  const values = [
    { title: "Kualitas Premium", desc: "Hanya menggunakan bahan konsentrat terbaik dari Grasse, Perancis.", icon: "💎" },
    { title: "Tahan Lama", desc: "Diformulasikan untuk bertahan hingga 12 jam di kulit Anda.", icon: "⏳" },
    { title: "Ramah Lingkungan", desc: "Kemasan yang dapat didaur ulang dan proses produksi etis.", icon: "🌿" },
  ];

  return (
    <div className="bg-[#F9F5F0] min-h-screen">

      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif text-[#3D372E] mb-6">Cerita Lumière</h1>
        <div className="w-20 h-1 bg-pink-400 mx-auto mb-10"></div>
        <p className="text-lg text-[#4A4238] leading-relaxed italic">
          "Kami percaya bahwa parfum bukan sekadar wewangian, melainkan identitas yang tertinggal di ingatan orang lain."
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-16 items-center">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800" 
            alt="Perfume Crafting"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h2 className="text-3xl font-serif text-[#3D372E] mb-6">Seni Pencampuran Aroma</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Berdiri sejak tahun 2012, Lumière lahir dari keinginan untuk menghadirkan kemewahan aroma kelas dunia yang dapat diakses oleh semua orang. Setiap botol kami adalah hasil kurasi mendalam dari para ahli parfum (perfumers) yang berpengalaman.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Kami menggabungkan teknik tradisional pembuatan parfum dengan teknologi ekstraksi modern untuk menghasilkan aroma yang murni, kuat, dan berkarakter.
          </p>
        </div>
      </section>

      <section className="bg-white/50 py-20 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center text-[#3D372E] mb-16">Mengapa Lumière?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#3D372E] mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}