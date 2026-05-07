import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roleLinks = {
  admin: [
    { to: "/dashboard/admin", label: "Analytics" },
    { to: "/dashboard/admin/doctors", label: "Doctors" },
    { to: "/dashboard/admin/appointments", label: "Appointments" }
  ],
  doctor: [
    { to: "/dashboard/doctor", label: "Appointments" },
    { to: "/dashboard/doctor/schedule", label: "Schedule" }
  ],
  patient: [
    { to: "/dashboard/patient", label: "Book Appointment" },
    { to: "/dashboard/patient/history", label: "History" },
    { to: "/dashboard/patient/profile", label: "Profile" }
  ]
};

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const links = roleLinks[user?.role] || [];

  return (
    <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
      <aside className="bg-slate-900 p-5 text-slate-100">
        <h2 className="text-xl font-semibold">Clinic Dashboard</h2>
        <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{user?.role}</p>
        <nav className="mt-6 space-y-2">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="block rounded-lg px-3 py-2 hover:bg-slate-800">
              {link.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="mt-8 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold">
          Logout
        </button>
      </aside>
      <main className="bg-slate-100 p-6">{children}</main>
    </div>
  );
}
