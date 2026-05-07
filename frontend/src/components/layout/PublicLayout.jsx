import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-slate-800">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
