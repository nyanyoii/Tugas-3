import { useMemo, useState } from "react";
import "./Portal.css";

const USER_MENU = [
  ["dashboard", "▦", "Dashboard"],
  ["packages", "▤", "Paket Saya"],
  ["history", "◷", "Riwayat"],
];

function StatusBadge({ status }) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status-badge status-${className}`}>{status}</span>;
}

export default function UserDashboard({ user, packages, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [search, setSearch] = useState("");

  const myPackages = useMemo(
    () =>
      packages.filter(
        (item) =>
          item.recipient.trim().toLowerCase() === user.name.trim().toLowerCase()
      ),
    [packages, user.name]
  );

  const collected = myPackages.filter(
    (item) => item.status === "Sudah Diambil"
  ).length;

  const waiting = myPackages.filter(
    (item) => item.status !== "Sudah Diambil"
  ).length;

  const visiblePackages = myPackages.filter((item) => {
    const matchesSearch = [
      item.receipt,
      item.courier,
      item.status,
      item.room,
    ].some((value) => String(value).toLowerCase().includes(search.toLowerCase()));

    return (
      matchesSearch &&
      (page !== "history" || item.status === "Sudah Diambil")
    );
  });

  function changePage(nextPage) {
    setPage(nextPage);
    setSearch("");
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon small">📦</span>
          <div>
            <strong>KosPaket</strong>
            <small>Portal Penghuni</small>
          </div>
        </div>

        <p className="sidebar-label">MENU PENGHUNI</p>

        <nav className="sidebar-nav">
          {USER_MENU.map(([id, icon, label]) => (
            <button
              type="button"
              key={id}
              className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => changePage(id)}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-mini">
            <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{user.name}</strong>
              <small>Penghuni Kos</small>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout} type="button">
            ↪ Keluar
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="topbar-title">Portal Penghuni</span>
          <span className="topbar-user">👤 {user.name}</span>
        </header>

        {page === "dashboard" && (
          <section>
            <div className="page-heading">
              <h1>Halo, {user.name}! 👋</h1>
              <p>Berikut informasi paket milikmu.</p>
            </div>

            <div className="stats-grid user-stats">
              <div className="stat-card">
                <span>📦</span>
                <p>Total Paket</p>
                <h2>{myPackages.length}</h2>
              </div>
              <div className="stat-card">
                <span>◷</span>
                <p>Belum Diambil</p>
                <h2>{waiting}</h2>
              </div>
              <div className="stat-card">
                <span>✓</span>
                <p>Sudah Diambil</p>
                <h2>{collected}</h2>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Paket Terbaru Saya</h2>
                <p>Periksa status paket yang sedang kamu tunggu.</p>
              </div>
              <button
                className="primary-button"
                onClick={() => changePage("packages")}
              >
                Lihat Paket
              </button>
            </div>

            <PackageList packages={myPackages.slice(0, 5)} />
          </section>
        )}

        {(page === "packages" || page === "history") && (
          <section>
            <div className="page-heading">
              <h1>{page === "history" ? "Riwayat Paket" : "Paket Saya"}</h1>
              <p>
                {page === "history"
                  ? "Paket yang telah kamu ambil."
                  : "Daftar paket yang tercatat atas namamu."}
              </p>
            </div>

            <div className="panel">
              <input
                className="search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nomor resi, kurir, atau status..."
                aria-label="Cari paket saya"
              />

              <PackageList packages={visiblePackages} />
              <p className="table-footnote">
                Menampilkan {visiblePackages.length} paket.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function PackageList({ packages }) {
  if (packages.length === 0) {
    return (
      <div className="empty-state">
        Belum ada paket di bagian ini.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>No. Resi</th>
            <th>Kurir</th>
            <th>Tanggal Masuk</th>
            <th>Kamar</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.receipt}</strong></td>
              <td>{item.courier}</td>
              <td>{item.date}</td>
              <td>{item.room}</td>
              <td><StatusBadge status={item.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}