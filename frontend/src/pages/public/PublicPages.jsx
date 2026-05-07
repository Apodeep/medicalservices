import { useEffect, useState } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import api from "../../services/api";

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
          <p className="mt-4 text-slate-600">
            Book appointments, manage records, and collaborate with doctors through a secure digital platform.
          </p>
        </div>
        <div className="glass-card p-8">
          <h3 className="text-2xl font-semibold">Why MedNova?</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {content.services.slice(0, 4).map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {content.testimonials.map((t) => (
            <article key={t.name} className="glass-card p-5">
              <p className="text-slate-700">"{t.quote}"</p>
              <p className="mt-3 text-sm font-semibold text-brand-700">{t.name}</p>
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
export const ContactPage = () => (
  <Placeholder title="Contact Us" text="Reach us by email or visit our clinic for support and appointments." />
);
export default Home;
