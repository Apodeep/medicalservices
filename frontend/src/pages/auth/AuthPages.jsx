import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await login(form.email, form.password);
    navigate(`/dashboard/${user.role}`);
  };

  return (
    <AuthShell title="Login">
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded-lg border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-lg border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full rounded-lg bg-brand-600 py-2 font-semibold text-white">Login</button>
      </form>
      <div className="mt-3 text-sm">
        <Link to="/forgot-password" className="text-brand-700">Forgot password?</Link>
      </div>
    </AuthShell>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "patient" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await register(form);
    navigate(`/dashboard/${user.role}`);
  };

  return (
    <AuthShell title="Register">
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full rounded-lg border p-2" placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="w-full rounded-lg border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded-lg border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="w-full rounded-lg border p-2" onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button className="w-full rounded-lg bg-brand-600 py-2 font-semibold text-white">Create Account</button>
      </form>
    </AuthShell>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/forgot-password", { email });
    setSent(true);
  };

  return (
    <AuthShell title="Forgot Password">
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full rounded-lg border p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button className="w-full rounded-lg bg-brand-600 py-2 font-semibold text-white">Send Reset Link</button>
      </form>
      {sent && <p className="mt-3 text-sm text-green-700">If your email exists, reset instructions were sent.</p>}
    </AuthShell>
  );
}

function AuthShell({ title, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100 p-4">
      <section className="glass-card w-full max-w-md p-6">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        {children}
      </section>
    </main>
  );
}
