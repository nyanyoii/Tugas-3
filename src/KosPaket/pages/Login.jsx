import { useState } from "react";
import "./Portal.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const accounts = [
      { username: "admin", password: "admin123", name: "Administrator", role: "admin" },
      { username: "andi", password: "123456", name: "Andi Pratama", role: "user" },
      { username: "siti", password: "123456", name: "Siti Nurhaliza", role: "user" },
    ];

    const account = accounts.find(
      (a) => a.username === username.trim() && a.password === password
    );

    if (!account) {
      setError("Username atau password salah.");
      return;
    }

    onLogin({
      username: account.username,
      name: account.name,
      role: account.role,
    });
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>📦 KosPaket</h1>
        <p>Silakan login untuk melanjutkan.</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="primary-button full-button">
          Masuk
        </button>

        <p>Admin: admin / admin123</p>
        <p>Andi: andi / 123456</p>
        <p>Siti: siti / 123456</p>
      </form>
    </main>
  );
}