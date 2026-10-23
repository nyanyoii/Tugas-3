import "./Portal.css";
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const STATUSES = [
  "Paket Masuk",
  "Disimpan",
  "Menunggu Diambil",
  "Sudah Diambil",
];

const MENU = [
  ["dashboard", "▦", "Dashboard"],
  ["add", "+", "Tambah Paket"],
  ["residents", "♙", "Penghuni"],
  ["packages", "▤", "Daftar Paket"],
  ["history", "◷", "Riwayat"],
];

const pathToPage = {
  "/admin": "dashboard",
  "/admin/tambah-paket": "add",
  "/admin/penghuni": "residents",
  "/admin/paket": "packages",
  "/admin/riwayat": "history",
};

const pageToPath = {
  dashboard: "/admin",
  add: "/admin/tambah-paket",
  residents: "/admin/penghuni",
  packages: "/admin/paket",
  history: "/admin/riwayat",
};

const today = () => {
  const date = new Date();
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return localDate.toISOString().slice(0, 10);
};

function StatusBadge({ status }) {
  const className = status.toLowerCase().replaceAll(" ", "-");

  return (
    <span className={`status-badge status-${className}`}>
      {status}
    </span>
  );
}

function PackageTable({
  packages,
  onStatusChange,
  showStatusEditor = true,
}) {
  if (packages.length === 0) {
    return <div className="empty-state">Belum ada data paket.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>No. Resi</th>
            <th>Nama Penghuni</th>
            <th>Kamar</th>
            <th>Kurir</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.receipt}</strong></td>
              <td>{item.recipient}</td>
              <td>{item.room}</td>
              <td>{item.courier}</td>
              <td>{item.date}</td>
              <td>
                {showStatusEditor ? (
                  <select
                    className="status-select"
                    value={item.status}
                    onChange={(event) =>
                      onStatusChange(item.id, event.target.value)
                    }
                    aria-label={`Status paket ${item.receipt}`}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <StatusBadge status={item.status} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard({
  user,
  packages,
  onAdd,
  onStatusChange,
  onLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(
    pathToPage[location.pathname] || "dashboard"
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    receipt: "",
    recipient: "",
    room: "",
    courier: "JNE",
    date: today(),
  });

  useEffect(() => {
    const currentPage = pathToPage[location.pathname];

    if (currentPage) {
      setPage(currentPage);
    } else {
      navigate("/admin", { replace: true });
    }
  }, [location.pathname, navigate]);

  function changePage(nextPage) {
    setPage(nextPage);
    setSearch("");
    setStatusFilter("Semua");
    setNotice("");
    navigate(pageToPath[nextPage]);
  }

  const counts = useMemo(
    () => ({
      incoming: packages.filter((p) => p.status === "Paket Masuk").length,
      stored: packages.filter((p) => p.status === "Disimpan").length,
      waiting: packages.filter((p) => p.status === "Menunggu Diambil").length,
      collected: packages.filter((p) => p.status === "Sudah Diambil").length,
    }),
    [packages]
  );

  const residents = useMemo(() => {
    const unique = new Map();

    packages.forEach((item) => {
      const key = item.recipient.trim().toLowerCase();

      if (key && !unique.has(key)) {
        unique.set(key, {
          name: item.recipient,
          room: item.room,
          total: 1,
        });
      } else if (key) {
        const resident = unique.get(key);
        resident.total += 1;
        if (item.date) resident.room = item.room;
      }
    });

    return Array.from(unique.values());
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return packages.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch = [
        item.receipt,
        item.recipient,
        item.room,
        item.courier,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(keyword)
      );

      const matchesStatus =
        statusFilter === "Semua" || item.status === statusFilter;

      const matchesHistory =
        page !== "history" || item.status === "Sudah Diambil";

      return matchesSearch && matchesStatus && matchesHistory;
    });
  }, [packages, search, statusFilter, page]);

  function handleSubmit(event) {
    event.preventDefault();

    const receipt = form.receipt.trim();
    const recipient = form.recipient.trim();
    const room = form.room.trim();

    if (!receipt || !recipient || !room || !form.date) {
      setNotice("Semua kolom wajib diisi.");
      return;
    }

    const duplicate = packages.some(
      (item) =>
        item.receipt.toLowerCase() === receipt.toLowerCase()
    );

    if (duplicate) {
      setNotice("Nomor resi sudah terdaftar. Gunakan nomor resi lain.");
      return;
    }

    onAdd({
      id: Date.now(),
      receipt,
      recipient,
      room,
      courier: form.courier,
      status: "Paket Masuk",
      date: form.date,
      history: ["Paket Masuk"],
    });

    setForm({
      receipt: "",
      recipient: "",
      room: "",
      courier: "JNE",
      date: today(),
    });

    setNotice("Paket berhasil ditambahkan.");
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon small">📦</span>
          <div>
            <strong>KosPaket</strong>
            <small>Panel Admin</small>
          </div>
        </div>

        <p className="sidebar-label">MENU UTAMA</p>

        <nav className="sidebar-nav">
          {MENU.map(([id, icon, label]) => (
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
            <div className="avatar">A</div>
            <div>
              <strong>{user.name}</strong>
              <small>Administrator</small>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
            type="button"
          >
            ↪ Keluar
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="topbar-title">Panel Pengelolaan Kos</span>
          <span className="topbar-user">👤 {user.name}</span>
        </header>

        {page === "dashboard" && (
          <section>
            <div className="page-heading">
              <h1>Selamat datang, Admin! 👋</h1>
              <p>Berikut ringkasan pengelolaan paket penghuni kos.</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span>📦</span>
                <p>Paket Masuk</p>
                <h2>{counts.incoming}</h2>
              </div>
              <div className="stat-card">
                <span>🗄️</span>
                <p>Disimpan</p>
                <h2>{counts.stored}</h2>
              </div>
              <div className="stat-card">
                <span>◷</span>
                <p>Menunggu Diambil</p>
                <h2>{counts.waiting}</h2>
              </div>
              <div className="stat-card">
                <span>✓</span>
                <p>Sudah Diambil</p>
                <h2>{counts.collected}</h2>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Paket Terbaru</h2>
                <p>Data paket yang tercatat di sistem.</p>
              </div>
              <button
                className="primary-button"
                onClick={() => changePage("packages")}
              >
                Lihat Semua
              </button>
            </div>

            <PackageTable
              packages={packages.slice(0, 5)}
              onStatusChange={onStatusChange}
            />
          </section>
        )}

        {page === "add" && (
          <section>
            <div className="page-heading">
              <h1>Tambah Paket</h1>
              <p>Masukkan informasi paket yang baru diterima.</p>
            </div>

            <form className="panel form-panel" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="receipt">Nomor Resi *</label>
                  <input
                    id="receipt"
                    value={form.receipt}
                    onChange={(e) =>
                      setForm({ ...form, receipt: e.target.value })
                    }
                    placeholder="Contoh: JNE123456"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="recipient">Nama Penghuni *</label>
                  <input
                    id="recipient"
                    value={form.recipient}
                    onChange={(e) =>
                      setForm({ ...form, recipient: e.target.value })
                    }
                    placeholder="Nama sesuai akun penghuni"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="room">Nomor Kamar *</label>
                  <input
                    id="room"
                    value={form.room}
                    onChange={(e) =>
                      setForm({ ...form, room: e.target.value })
                    }
                    placeholder="Contoh: A-03"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="courier">Kurir *</label>
                  <select
                    id="courier"
                    value={form.courier}
                    onChange={(e) =>
                      setForm({ ...form, courier: e.target.value })
                    }
                  >
                    {[
                      "JNE",
                      "J&T",
                      "SiCepat",
                      "AnterAja",
                      "Pos Indonesia",
                      "Shopee Express",
                      "Lainnya",
                    ].map((courier) => (
                      <option key={courier} value={courier}>
                        {courier}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="date">Tanggal Paket Masuk *</label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {notice && <p className="notice-message">{notice}</p>}

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setForm({
                      receipt: "",
                      recipient: "",
                      room: "",
                      courier: "JNE",
                      date: today(),
                    });
                    setNotice("");
                  }}
                >
                  Reset
                </button>

                <button type="submit" className="primary-button">
                  + Simpan Paket
                </button>
              </div>
            </form>
          </section>
        )}

        {page === "residents" && (
          <section>
            <div className="page-heading">
              <h1>Data Penghuni</h1>
              <p>Daftar penghuni berdasarkan paket yang terdaftar.</p>
            </div>

            <div className="panel">
              <div className="panel-heading">
                <h2>Daftar Penghuni</h2>
                <span className="count-label">
                  {residents.length} penghuni
                </span>
              </div>

              {residents.length === 0 ? (
                <div className="empty-state">
                  Belum ada penghuni. Tambahkan paket untuk mulai mencatat
                  penghuni.
                </div>
              ) : (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Nama Penghuni</th>
                        <th>Nomor Kamar</th>
                        <th>Jumlah Paket</th>
                      </tr>
                    </thead>
                    <tbody>
                      {residents.map((resident, index) => (
                        <tr key={resident.name}>
                          <td>{index + 1}</td>
                          <td><strong>{resident.name}</strong></td>
                          <td>{resident.room}</td>
                          <td>{resident.total} paket</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {(page === "packages" || page === "history") && (
          <section>
            <div className="page-heading">
              <h1>
                {page === "history"
                  ? "Riwayat Pengambilan"
                  : "Daftar Paket"}
              </h1>
              <p>
                {page === "history"
                  ? "Daftar paket yang statusnya sudah diambil."
                  : "Cari paket dan perbarui status pengiriman."}
              </p>
            </div>

            <div className="panel">
              <div className="filter-bar">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari resi, nama, kamar, kurir..."
                  aria-label="Cari paket"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter status"
                >
                  <option value="Semua">Semua</option>
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <PackageTable
                packages={filteredPackages}
                onStatusChange={onStatusChange}
                showStatusEditor={page !== "history"}
              />

              <p className="table-footnote">
                Menampilkan {filteredPackages.length} data paket.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
