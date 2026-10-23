
import { useState } from "react";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import PackageTable from "../components/PackageTable";
import QuickActions from "../components/QuickActions";
import TambahPaket from "./TambahPaket";

import { packages as initialPackages } from "../data/packages";

function Dashboard() {
  const [packages, setPackages] = useState(initialPackages);
  const [halaman, setHalaman] = useState("dashboard");

  const packageStats = [
    {
      label: "Paket Masuk",
      value: packages.filter((p) => p.status === "Paket Masuk").length,
      icon: "📦",
      color: "blue",
    },
    {
      label: "Disimpan",
      value: packages.filter((p) => p.status === "Disimpan").length,
      icon: "🗃️",
      color: "yellow",
    },
    {
      label: "Menunggu Diambil",
      value: packages.filter((p) => p.status === "Menunggu Diambil").length,
      icon: "🕒",
      color: "purple",
    },
    {
      label: "Sudah Diambil",
      value: packages.filter((p) => p.status === "Sudah Diambil").length,
      icon: "✓",
      color: "green",
    },
  ];

  function tambahPaket(paketBaru) {
    setPackages((prev) => [paketBaru, ...prev]);
    setHalaman("dashboard");
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <span className="menu-symbol">☰</span>
          <div className="admin-label">
            <span className="avatar">A</span>
            <span>Admin</span>
          </div>
        </header>

        {halaman === "dashboard" ? (
          <>
            <section className="welcome">
              <h1>Selamat datang, Admin! 👋</h1>
              <p>
                Berikut ringkasan pengelolaan paket penghuni kos.
              </p>
            </section>

            <section className="stats-grid">
              {packageStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </section>

            <section className="content-grid">
              <PackageTable packages={packages} />

              <aside className="right-column">
                <section className="panel status-panel">
                  <h2>Ringkasan Status</h2>

                  {packageStats.map((stat) => (
                    <div className="status-summary" key={stat.label}>
                      <span className={`status-dot ${stat.color}`} />
                      <span>{stat.label}</span>
                      <strong>{stat.value}</strong>
                    </div>
                  ))}
                </section>

                <QuickActions
                  onTambah={() => setHalaman("tambah")}
                />
              </aside>
            </section>

            <div className="add-package-link">
              <button
                className="primary-button"
                onClick={() => setHalaman("tambah")}
              >
                + Tambah Paket Baru
              </button>
            </div>
          </>
        ) : (
          <TambahPaket
            onTambah={tambahPaket}
            onBatal={() => setHalaman("dashboard")}
          />
        )}

        <footer className="page-footer">
          KosPaket · Sistem Informasi Manajemen Penerimaan Paket Penghuni
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
