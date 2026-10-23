import { useState } from "react";

function PackageTable({ packages }) {
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // Filter paket berdasarkan pencarian dan status
  const filteredPackages = packages.filter((item) => {
    const search = keyword.toLowerCase().trim();

    const cocokKataKunci =
      item.receipt.toLowerCase().includes(search) ||
      item.recipient.toLowerCase().includes(search) ||
      item.room.toLowerCase().includes(search);

    const cocokStatus =
      filterStatus === "Semua" || item.status === filterStatus;

    return cocokKataKunci && cocokStatus;
  });

  return (
    <section className="panel package-panel" id="daftar-paket">
      {/* Judul dan tombol tambah paket */}
      <div className="panel-heading">
        <div>
          <h2>Daftar Paket</h2>
          <p>Cari dan pantau paket yang diterima oleh petugas kos.</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            alert("Form Tambah Paket akan dibuat berikutnya!")
          }
        >
          + Tambah Paket
        </button>
      </div>

      {/* Kolom pencarian dan filter */}
      <div className="package-filters">
        <input
          type="text"
          placeholder="🔍 Cari nama, nomor resi, atau kamar..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Cari paket"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          aria-label="Filter status paket"
        >
          <option value="Semua">Semua Status</option>
          <option value="Paket Masuk">Paket Masuk</option>
          <option value="Disimpan">Disimpan</option>
          <option value="Menunggu Diambil">Menunggu Diambil</option>
          <option value="Sudah Diambil">Sudah Diambil</option>
        </select>
      </div>

      {/* Jumlah hasil pencarian */}
      <p className="result-count">
        Menampilkan {filteredPackages.length} dari {packages.length} paket
      </p>

      {/* Tabel paket */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nomor Resi</th>
              <th>Nama Penerima</th>
              <th>Kamar</th>
              <th>Status</th>
              <th>Tanggal Masuk</th>
            </tr>
          </thead>

          <tbody>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.receipt}</td>
                  <td className="recipient">{item.recipient}</td>
                  <td>{item.room}</td>
                  <td>
                    <span
                      className={`status status-${item.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-result">
                  Paket tidak ditemukan.
                  <br />
                  <span>Coba kata kunci atau status lainnya.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PackageTable;