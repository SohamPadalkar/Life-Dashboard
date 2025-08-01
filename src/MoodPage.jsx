import { useState, useEffect } from "react";
import { LineChart, Line, YAxis, Tooltip, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';

const moods = [
  { emoji: "😄", label: "Happy", color: "#67e18a" },
  { emoji: "🙂", label: "Okay", color: "#ffe167" },
  { emoji: "😐", label: "Meh", color: "#cfcfcf" },
  { emoji: "😔", label: "Sad", color: "#8ec5fc" },
  { emoji: "😤", label: "Stressed", color: "#ffadad" }
];

const MOOD_SCORES = { "Happy": 5, "Okay": 4, "Meh": 3, "Sad": 2, "Stressed": 1 };

// Returns array of last 7 dates as locale strings
function getLastNDates(n = 7) {
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(d.toLocaleDateString());
  }
  return arr;
}

function MoodPage() {
  // Load/save mood log from localStorage
  const [moodLog, setMoodLog] = useState(() => {
    const saved = localStorage.getItem("lifeDashboard_moods");
    return saved ? JSON.parse(saved) : [];
  });
  const today = new Date().toLocaleDateString();
  const [picked, setPicked] = useState(
    moodLog.find(m => m.date === today)?.label || ""
  );

  // Save picked mood + update moodLog
  const handlePick = (mood) => {
    setPicked(mood.label);
    const updated = [
      ...moodLog.filter(m => m.date !== today),
      { date: today, label: mood.label, emoji: mood.emoji }
    ];
    setMoodLog(updated);
  };

  // Sync moodLog to localStorage
  useEffect(() => {
    localStorage.setItem("lifeDashboard_moods", JSON.stringify(moodLog));
  }, [moodLog]);

  // Chart data: show last 7 days, always in order (even blank days)
  const last7Dates = getLastNDates();
  const chartData = last7Dates.map(date => {
    const entry = moodLog.find(m => m.date === date);
    return {
      date,
      mood: entry ? MOOD_SCORES[entry.label] : null
    };
  });

  // Helper to convert mood score to label for Y-axis
  const scoreToMood = val =>
    Object.entries(MOOD_SCORES).find(([key, sc]) => sc === val)?.[0] || "";

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#03070a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, Arial"
      }}
    >
      <div
        style={{
          background: "#e07a3ecc",
          color: "#181818",
          borderRadius: 24,
          boxShadow: "0 10px 32px #ffd1b6aa",
          padding: "2.5rem 2.5rem 2rem",
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          marginRight: 30,
        }}
      >
        <h2 style={{ marginBottom: 30, fontSize: 26 }}>How are you feeling today?</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 17 }}>
          {moods.map(mood => (
            <button
              key={mood.label}
              onClick={() => handlePick(mood)}
              style={{
                fontSize: 32,
                background: picked === mood.label ? mood.color : "#f4f4f4",
                border: "none",
                borderRadius: "50%",
                padding: 16, // fixed typo here!
                boxShadow: picked === mood.label ? "0 2px 10px #ddd" : "none",
                transition: "background 0.18s",
                outline: picked === mood.label ? "3px solid #333" : "none",
                cursor: "pointer"
              }}
              aria-label={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
        {picked && (
          <div style={{ fontWeight: 600, color: "#fda085", marginBottom: 20 }}>
            You picked: {picked}
          </div>
        )}
        <h4 style={{ margin: "20px 0 8px", color: "#222" }}>Last 5 moods:</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {[...moodLog]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((entry, i) => (
              <li key={i} style={{ marginBottom: 6, fontSize: 17 }}>
                {entry.emoji} {entry.label}{" "}
                <span style={{ color: "#1a1a1acc", fontSize: 13 }}>
                  ({entry.date})
                </span>
              </li>
            ))}
        </ul>
      </div>
      {/* Mood chart, always visible—even with few data points */}
      <div
        style={{
          background: "#5c3504ff",
          borderRadius: 20,
          padding: "1.5rem 2rem",
          boxShadow: "0 6px 20px #ffd1b6aa",
          minWidth: 380,
          marginLeft: 15,
        }}
      >
        <h4 style={{ margin: "0 0 12px", fontWeight: 600, color: "#ce6b24" }}>Mood over the past week</h4>
        <ResponsiveContainer width={340} height={165}>
          <LineChart
            data={chartData}
            margin={{ top: 12, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#a76b4a" }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={scoreToMood}
              tick={{ fontSize: 12, fill: "#b77758" }}
            />
            <Tooltip formatter={val => scoreToMood(val)} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#ff914d"
              strokeWidth={3}
              dot={{ r: 6, fill: "#fff", stroke: "#ff914d" }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MoodPage;
