import { useEffect, useState } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import api from "../../services/api";

const features = [
  { icon: "🏥", title: "Expert Doctors", text: "Board-certified specialists with years of experience" },
  { icon: "⚡", title: "Quick Appointments", text: "Same-day bookings available for urgent care" },
  { icon: "🔒", title: "Secure Records", text: "HIPAA-compliant digital health records" },
];

const services = [
  { title: "General Checkup", desc: "Comprehensive health assessments" },
  { title: "Dental Care", desc: "Complete oral health services" },
  { title: "Laboratory", desc: "On-site diagnostic testing" },
];

function Home() {
  const [content, setContent] = useState({ services: [], testimonials: [] });

  useEffect(() => {
    api.get("/public/content").then((res) => setContent(res.data)).catch(() => {});
  }, []);

  return (
    <PublicLayout>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">Modern Clinic Care, Simplified</h1>
          <p className="mt-4 text-lg text-slate-600">
            Book appointments, manage records, and collaborate with doctors through a secure digital platform.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/doctors" className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
              Find a Doctor
            </a>
            <a href="/services" className="rounded-lg border border-brand-600 px-6 py-3 font-semibold text-brand-600 hover:bg-brand-50">
              Our Services
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="mb-2 text-3xl">{f.icon}</div>
                <p className="text-sm font-medium text-slate-800">{f.title}</p>
                <p className="text-xs text-slate-500">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl font-bold text-slate-900">Our Services</h2>
          <p className="mt-2 text-center text-slate-600">Comprehensive healthcare for you and your family</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="glass-card p-6 text-center">
                <h3 className="font-semibold text-slate-800">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">What Our Patients Say</h2>
        <p className="mt-2 text-center text-slate-600">Real stories from our community</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {content.testimonials.map((t) => (
            <article key={t.name} className="glass-card flex flex-col p-5">
              <p className="text-slate-700">"{t.quote}"</p>
              <p className="mt-auto pt-4 text-sm font-semibold text-brand-700">{t.name}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

const Placeholder = ({ title, text }) => (
  <PublicLayout>
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-slate-600">{text}</p>
    </section>
  </PublicLayout>
);

export const AboutPage = () => (
  <Placeholder title="About Our Clinic" text="We provide evidence-based, patient-first healthcare with modern facilities." />
);
export const DoctorsPage = () => (
  <Placeholder title="Doctors" text="Browse specialists and choose the right doctor for your condition." />
);
export const ServicesPage = () => (
  <Placeholder title="Services" text="Comprehensive outpatient services, diagnostics, and preventive care." />
);

export const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/public/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <PublicLayout>
      <section className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 text-slate-600">Send us a message and we'll get back to you.</p>
        {status === "success" && <p className="mt-4 text-green-600">Message sent successfully!</p>}
        {status === "error" && <p className="mt-4 text-red-600">Failed to send. Please try again.</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            required
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
          <input
            required
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
          <textarea
            required
            placeholder="Message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-brand-600 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
};

export default Home;
