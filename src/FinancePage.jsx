import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

function FinancePage() {
  // 1. State
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("lifeDashboard_finance");
    return saved ? JSON.parse(saved) : [];
  });

  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const [type, setType] = useState("Expense");

  // 2. Effects
  useEffect(() => {
    localStorage.setItem("lifeDashboard_finance", JSON.stringify(transactions));
  }, [transactions]);

  // 3. Helper: Last 7 days for chart (newest last)
  function getLastNDates(n = 7) {
    const arr = [];
    const today = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      arr.push(d.toLocaleDateString());
    }
    return arr;
  }

  // 4. Prepare chart data
  const last7Dates = getLastNDates();
  const dataForChart = last7Dates.map(date => {
    const dayIncome = transactions
      .filter(t => t.type === "Income" && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);
    const dayExpense = transactions
      .filter(t => t.type === "Expense" && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);
    return { date, Income: dayIncome, Expense: dayExpense };
  });

  // 5. Derived totals
  const totalIncome = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // 6. Handlers
  const handleAdd = () => {
    if (!amount.trim() || isNaN(Number(amount))) return;
    if (!label.trim()) return;
    const newTrans = {
      type,
      label,
      amount: Number(amount),
      date: new Date().toLocaleDateString()
    };
    setTransactions([newTrans, ...transactions]);
    setAmount("");
    setLabel("");
    setType("Expense");
  };

  const handleReset = () => {
    if (window.confirm("Clear all finance data?")) {
      setTransactions([]);
      localStorage.removeItem("lifeDashboard_finance");
    }
  };

  // 7. UI
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
          background: "#4080a588",
          borderRadius: 24,
          boxShadow: "0 8px 32px #bce5fd88",
          width: "100%",
          maxWidth: 580,
          minHeight: 430,
          padding: "2.3rem 2.2rem 1.7rem",
          margin: 12
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 18, color: "#009688" }}>💸 Finance Tracker</h2>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontWeight: 600 }}>
          <span style={{ color: "#22bb55" }}>Income: ₹{totalIncome}</span>
          <span style={{ color: "#ed5555" }}>Expenses: ₹{totalExpense}</span>
        </div>

        <div style={{ display: "flex", gap: 7, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            style={{ flex: 1.2, padding: 8, borderRadius: 7, border: "1px solid #aac", fontSize: 15 }}
          />
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="Category / Label"
            style={{ flex: 2, padding: 8, borderRadius: 7, border: "1px solid #aac", fontSize: 15 }}
          />
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            style={{ flex: 1, borderRadius: 7, border: "1px solid #aac", fontSize: 15, padding: 8 }}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <button
            onClick={handleAdd}
            style={{
              background: "#009688",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              padding: "8px 17px",
              fontSize: 15,
              marginLeft: 4,
              cursor: "pointer"
            }}
          >
            Add
          </button>
        </div>

        <button
          onClick={handleReset}
          style={{
            background: "#ed5555",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "7px 16px",
            marginBottom: 11,
            fontWeight: 500,
            fontSize: 14,
            display: "block",
            marginLeft: "auto",
            cursor: "pointer"
          }}
        >
          Reset All
        </button>

        <div style={{ marginTop: 18 }}>
          <h4 style={{ margin: "3px 0 13px", color: "#388e3c" }}>Recent Entries</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 16 }}>
            {transactions.length === 0 && (
              <li style={{ textAlign: "center", color: "#bbb", fontSize: 16 }}>No entries yet!</li>
            )}
            {transactions.slice(0, 8).map((t, idx) => (
              <li key={idx} style={{
                background: t.type === "Income" ? "#eafaf1" : "#fff2f2",
                color: t.type === "Income" ? "#22bb55" : "#b9003c",
                borderRadius: 9,
                padding: "10px 8px",
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: 600
              }}>
                <span>
                  {t.type === "Income" ? "⬆️" : "⬇️"}{" "}
                  {t.label}{" "}
                  <span style={{ color: "#aaa", fontWeight: 400, fontSize: 13 }}>({t.date})</span>
                </span>
                <span>
                  {t.type === "Income" ? "+" : "-"}₹{t.amount}
                </span>
              </li>
            ))}
          </ul>

          {/* Weekly bar chart */}
          <div style={{ margin: "2rem 0 0" }}>
            <h4 style={{ color: "#008b4b", marginBottom: 10 }}>Weekly Overview</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={dataForChart}
                margin={{ top: 8, right: 18, left: 4, bottom: 8 }}
                barGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#666" }} />
                <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#13b680" radius={6} />
                <Bar dataKey="Expense" fill="#e44d4d" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancePage;
