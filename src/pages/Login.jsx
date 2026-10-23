
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const accounts = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Administrator",
  },
  {
    username: "andi",
    password: "123456",
    role: "user",
    name: "Andi Pratama",
    room: "A-03",
  },
  {
    username: "siti",
    password: "123456",
    role: "user",
    name: "Siti Nurhaliza",
    room: "B-01",
  },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();

    const account = accounts.find(
      (item) =>
        item.username === username.trim().toLowerCase() &&
        item.password === password
    );

    if (!account) {
      setError("Username atau password salah.");
      return;
    }

    onLogin({
      username: account.username,
      name: account.name,
      role: account.role,
      room: account.room || "",
    });

    const destination = location.state?.from?.pathname;
    const fallback = account.role === "admin" ? "/admin" : "/user";

    navigate(
      destination?.startsWith(fallback) ? destination : fallback,
      { replace: true }
    );
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">📦</div>
        <h1>KosPaket</h1>
        <p className="login-subtitle">
          Sistem Informasi Manajemen Penerimaan Paket Penghuni Kos
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button className="portal-primary login-submit" type="submit">
            Masuk ke KosPaket
          </button>
        </form>

        <div className="demo-accounts">
          <strong>Akun demo</strong>
          <p>Admin: admin / admin123</p>
          <p>Andi: andi / 123456</p>
          <p>Siti: siti / 123456</p>
        </div>
      </section>
    </main>
  );
}

export default Login;
