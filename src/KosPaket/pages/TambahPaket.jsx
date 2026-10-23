
import { useState } from "react";

function TambahPaket({ onTambah, onBatal }) {
  const [form, setForm] = useState({
    receipt: "",
    recipient: "",
    room: "",
    courier: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.receipt.trim() ||
      !form.recipient.trim() ||
      !form.room.trim() ||
      !form.courier.trim() ||
      !form.date
    ) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    onTambah({
      ...form,
      id: Date.now(),
      receipt: form.receipt.trim(),
      recipient: form.recipient.trim(),
      room: form.room.trim(),
      courier: form.courier.trim(),
      status: "Paket Masuk",
      date: new Date(form.date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <h2>Tambah Paket Baru</h2>
          <p>Catat paket yang baru diterima oleh petugas kos.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="package-form">
        <label>
          Nomor Resi
          <input
            name="receipt"
            value={form.receipt}
            onChange={handleChange}
            placeholder="Contoh: JNE123456"
            required
          />
        </label>

        <label>
          Nama Penerima
          <input
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            placeholder="Nama penghuni kos"
            required
          />
        </label>

        <label>
          Nomor Kamar
          <input
            name="room"
            value={form.room}
            onChange={handleChange}
            placeholder="Contoh: A-03"
            required
          />
        </label>

        <label>
          Nama Kurir
          <input
            name="courier"
            value={form.courier}
            onChange={handleChange}
            placeholder="Contoh: JNE"
            required
          />
        </label>

        <label>
          Tanggal Paket Diterima
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onBatal}>
            Batal
          </button>

          <button type="submit" className="primary-button">
            Simpan Paket
          </button>
        </div>
      </form>
    </section>
  );
}

export default TambahPaket;
