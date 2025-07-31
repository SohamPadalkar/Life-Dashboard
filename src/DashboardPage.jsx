import { useNavigate } from "react-router-dom";

const cardData = [
  { emoji: "📝", title: "Tasks", desc: "Manage your to-dos", route: "/tasks", color: "#e8f0fe" },
  { emoji: "💸", title: "Finance", desc: "Track money", route: "/finance", color: "#e7f6e9" },
  { emoji: "🙂", title: "Mood", desc: "Log your feeling", route: "/mood", color: "#fff9e6" },
  { emoji: "📽️", title: "Entertainment", desc: "Find something fun", route: "/entertainment", color: "#f9e6f6" },
];

const cardStyle = {
  border: "none",
  boxShadow: "0 8px 32px 0 #eee",
  borderRadius: "36px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  cursor: "pointer",
  fontWeight: 600,
  transition: "transform 0.18s, box-shadow 0.18s",
  padding: "2.3rem 1rem 1.7rem",
  fontSize: "1.1rem",
  overflowX: "hidden",
  boxSizing: "border-box",
};

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw", // 🟢 FULL SCREEN!
        background: "#03070aff",
        fontFamily: "'Inter', 'Poppins', Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ margin: "1.2rem 0 0.7rem", fontSize: "2.3rem", color: "#eaeef5ff", textAlign: "center" }}>
        Welcome to Your Life Dashboard!
      </h1>
      <div style={{ color: "#64748b", fontWeight: 500, marginBottom: "2.2rem", textAlign: "center" }}>
        Your tasks, your habits, your money—at a glance.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "2rem",
          width: "100vw",    // 🟢 The grid is now 100vw!
          height: "100%",    // 🟢 Let grid fill vertically
          margin: "0",
          boxSizing: "border-box",
        }}
      >
        {cardData.map((card) => (
          <div
            key={card.title}
            style={{
              ...cardStyle,
              background: card.color,
            }}
            onClick={() => navigate(card.route)}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseOut={e => e.currentTarget.style.transform = "none"}
          >
            <div style={{ fontSize: "3.4rem", marginBottom: "1rem" }}>{card.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: "1.45rem", marginBottom: "0.4rem", color: "#222c43" }}>{card.title}</div>
            <div style={{ color: "#6d7dbb", fontSize: "0.96rem", fontWeight: 400 }}>{card.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
