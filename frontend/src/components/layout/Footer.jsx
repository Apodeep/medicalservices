export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">MedNova Clinic</h3>
          <p className="mt-2 text-sm text-slate-400">Compassionate care powered by modern digital workflows.</p>
        </div>
        <div>
          <h4 className="font-semibold">Hours</h4>
          <p className="mt-2 text-sm text-slate-400">Mon - Sat: 8:00 AM - 8:00 PM</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-2 text-sm text-slate-400">support@mednova.example</p>
        </div>
      </div>
    </footer>
  );
}
