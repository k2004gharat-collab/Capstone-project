import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SettingsForm from "./components/SettingsForm";

function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Capstone Project</h1>
      <p className="text-slate-600">
        Welcome to the application.
      </p>
    </section>
  );
}

function Settings() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <SettingsForm />
    </section>
  );
}

function Health() {
  const [data, setData] = useState<{ id: number; title: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   fetch(import.meta.env.VITE_HEALTH_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch health-check data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Health Check</h1>

      {loading && <p className="text-slate-600">Loading health data...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <p>
            <strong>Status:</strong> Healthy
          </p>
          <p>
            <strong>Fetched ID:</strong> {data.id}
          </p>
          <p>
  <strong>Fetched message:</strong> Health check data fetched successfully.
</p>
        </div>
      )}
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="text-xl font-bold">
            Capstone Project
          </Link>

          <nav className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              to="/settings"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Settings
            </Link>

            <Link
              to="/health"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Health
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/health" element={<Health />} />
        </Routes>
      </main>
    </div>
  );
}