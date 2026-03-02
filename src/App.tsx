import { useState, useEffect } from "react";
import { LogIn, UserPlus, LogOut, User as UserIcon, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

type User = {
  id: string;
  email: string;
  name?: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data);
            setView("dashboard");
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setView("login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
            <span>SecureAuth</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
                  <UserIcon className="w-4 h-4" />
                  <span>{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("login")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    view === "login" ? "bg-indigo-50 text-indigo-600" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setView("register")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    view === "register" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {view === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Selamat Datang Kembali</h1>
                <p className="text-zinc-500">Silakan masuk ke akun Anda untuk melanjutkan.</p>
              </div>
              <LoginForm onSuccess={(data) => {
                setUser(data.user);
                setView("dashboard");
              }} />
            </motion.div>
          )}

          {view === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="max-w-md mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Buat Akun Baru</h1>
                <p className="text-zinc-500">Daftar sekarang dan nikmati fitur keamanan kami.</p>
              </div>
              <RegisterForm onSuccess={() => setView("login")} />
            </motion.div>
          )}

          {view === "dashboard" && user && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <UserIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Halo, {user.name || "User"}!</h2>
                  <p className="text-zinc-500">{user.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-100">
                  <h3 className="font-semibold mb-2">Status Akun</h3>
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Aktif
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-100">
                  <h3 className="font-semibold mb-2">Keamanan</h3>
                  <p className="text-sm text-zinc-500">JWT Authentication Enabled</p>
                </div>
                <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-100">
                  <h3 className="font-semibold mb-2">Sesi</h3>
                  <p className="text-sm text-zinc-500">Berakhir dalam 24 jam</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
