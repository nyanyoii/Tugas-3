
const PACKAGE_KEY = "kospaket_packages";
const SESSION_KEY = "kospaket_session";

const demoPackages = [
  {
    id: 1,
    receipt: "JNE123456",
    recipient: "Andi Pratama",
    room: "A-03",
    courier: "JNE",
    status: "Paket Masuk",
    date: "2026-10-13",
    history: ["Paket Masuk"],
  },
  {
    id: 2,
    receipt: "JNT987654",
    recipient: "Siti Nurhaliza",
    room: "B-01",
    courier: "J&T",
    status: "Disimpan",
    date: "2026-10-13",
    history: ["Paket Masuk", "Disimpan"],
  },
];

export function loadPackages() {
  try {
    const saved = localStorage.getItem(PACKAGE_KEY);

    if (saved !== null) {
      return JSON.parse(saved);
    }

    localStorage.setItem(PACKAGE_KEY, JSON.stringify(demoPackages));
    return demoPackages;
  } catch (error) {
    console.error("Gagal membaca paket:", error);
    return demoPackages;
  }
}

export function savePackages(packages) {
  try {
    localStorage.setItem(PACKAGE_KEY, JSON.stringify(packages));
  } catch (error) {
    console.error("Gagal menyimpan paket:", error);
  }
}

export function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
