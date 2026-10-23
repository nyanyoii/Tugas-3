
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">📦</span>
        <div>
          <h2>KosPaket</h2>
          <p>Manajemen Paket Penghuni</p>
        </div>
      </div>

      <nav className="navigation">
        <a className="nav-link active" href="#dashboard">
          ▦ Dashboard
        </a>
        <a className="nav-link" href="#daftar-paket">
          ▤ Daftar Paket
        </a>
        <a className="nav-link" href="#tambah-paket">
          ＋ Tambah Paket
        </a>
        <a className="nav-link" href="#riwayat">
          ◷ Riwayat
        </a>
        <a className="nav-link" href="#penghuni">
          ♙ Penghuni
        </a>
      </nav>

      <div className="sidebar-footer">
        <span>📦</span>
        <p>
          Paket sampai,
          <br />
          penghuni senang!
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
