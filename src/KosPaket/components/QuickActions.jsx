
function QuickActions({ onTambah }) {
  function goToPackages() {
    document
      .getElementById("daftar-paket")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="panel quick-panel">
      <h2>Aksi Cepat</h2>

      <button onClick={onTambah}>
        ＋ Tambah Paket
      </button>

      <button onClick={goToPackages}>
        ⌕ Lihat Daftar Paket
      </button>
    </section>
  );
}

export default QuickActions;
