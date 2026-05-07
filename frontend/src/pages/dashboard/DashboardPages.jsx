import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

const Stat = ({ label, value }) => (
  <article className="glass-card p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-brand-700">{value}</p>
  </article>
);

export function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => {
    api.get("/admin/analytics").then((res) => setAnalytics(res.data)).catch(() => {});
  }, []);

  return (
    <DashboardLayout>
      <h1 className="mb-5 text-2xl font-bold">Admin Analytics</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Doctors" value={analytics?.doctors ?? 0} />
        <Stat label="Patients" value={analytics?.patients ?? 0} />
        <Stat label="Appointments" value={analytics?.appointments ?? 0} />
        <Stat label="Pending" value={analytics?.pendingAppointments ?? 0} />
      </div>
    </DashboardLayout>
  );
}

export function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    api.get("/doctor/appointments").then((res) => setAppointments(res.data)).catch(() => {});
  }, []);
  return (
    <DashboardLayout>
      <h1 className="mb-5 text-2xl font-bold">Doctor Appointments</h1>
      <div className="space-y-3">
        {appointments.map((a) => (
          <article key={a._id} className="glass-card p-4">
            <p className="font-semibold">{a.patient?.fullName}</p>
            <p className="text-sm text-slate-600">{a.date} - {a.slot}</p>
            <p className="text-sm">Status: {a.status}</p>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
}

export function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: "", date: "", slot: "" });

  useEffect(() => {
    api.get("/patient/doctors").then((res) => setDoctors(res.data)).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/patient/appointments", form);
    setForm({ ...form, date: "", slot: "" });
  };

  return (
    <DashboardLayout>
      <h1 className="mb-5 text-2xl font-bold">Book Appointment</h1>
      <form onSubmit={submit} className="glass-card max-w-xl space-y-3 p-5">
        <select className="w-full rounded-lg border p-2" value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })}>
          <option value="">Select doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>{d.fullName}</option>
          ))}
        </select>
        <input className="w-full rounded-lg border p-2" placeholder="Date (YYYY-MM-DD)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input className="w-full rounded-lg border p-2" placeholder="Slot (10:00-10:30)" value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} />
        <button className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Book</button>
      </form>
    </DashboardLayout>
  );
}
