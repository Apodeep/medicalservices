import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/doctors", label: "Doctors" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-brand-700">
          MedNova Clinic
        </Link>
        <div className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="font-medium text-slate-700 hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </div>
        <Link to="/login" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
          Login
        </Link>
      </div>
    </nav>
  );
}
