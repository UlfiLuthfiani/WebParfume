import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F9F5F0] text-gray-800 flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-grow pt-20 md:pt-24">
            {children}
          </main>
          <footer className="bg-white py-6 text-center text-xs text-gray-400 uppercase tracking-widest">
            © 2026 Lumière Fragrance
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}