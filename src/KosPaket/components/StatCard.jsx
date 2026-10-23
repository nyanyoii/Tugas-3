
function StatCard({ label, value, icon, color }) {
  return (
    <article className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>

      <div>
        <p>{label}</p>
        <h2>{value}</h2>
        <span>paket tercatat</span>
      </div>
    </article>
  );
}

export default StatCard;
