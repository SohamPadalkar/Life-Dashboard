import { useState,useEffect } from "react";

function TasksPage() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("lifeDashboard_tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [newDue, setNewDue] = useState("");

  useEffect(() => {
    localStorage.setItem("lifeDashboard_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { text: newTask, completed: false, due: newDue }
    ]);
    setNewTask("");
    setNewDue("");
  };

  const toggleTask = (idx) => {
    setTasks(tasks =>
      tasks.map((t, i) =>
        i === idx ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleResetTasks = () => {
    if (window.confirm("Clear all tasks? This cannot be undone!")) {
      setTasks([]);
      localStorage.removeItem("lifeDashboard_tasks");
    }
  };

  const buttonBaseStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background 0.18s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#03070aff",
      }}
    >
      <div
        style={{
          background: "#051010ff",
          borderRadius: 18,
          boxShadow: "0 8px 32px #134a7a77",
          padding: 32,
          width: "100%",
          maxWidth: 480,
          fontFamily: "Inter, Arial",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 22, textColor: 'white' }}>📝 Your Tasks</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{
              flex: 2,
              padding: 8,
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #aac",
            }}
          />
          <input
            type="date"
            value={newDue}
            onChange={e => setNewDue(e.target.value)}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 8,
              border: "1px solid #aac",
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              padding: "8px 16px",
              background: "#3c79f5",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
              transition: "background 0.18s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#2450a8ff"}
            onMouseOut={e => e.currentTarget.style.background = "#3c79f5"}
          >
            Add
          </button>
          <button 
            onClick={handleResetTasks}
            style={{
              background: "#ff3b3b",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 600,
              curson: "pointer",
              marginBottom: 14,
              marginLeft: "auto",
              display: "block",
              transition: "background 0.18s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#d82121"}
            onMouseOut={e => e.currentTarget.style.background = "#ff3b3b"}
            >
              Rest All Tasks
            </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.length === 0 && (
            <li style={{ textAlign: "center", color: "#888" }}>
              No tasks yet!
            </li>
          )}
          {tasks.map((task, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: 10,
                fontSize: 17,
                padding: "10px 7px",
                borderRadius: 8,
                textDecoration: task.completed ? "line-through" : "none",
                background: task.completed ? "#86b692ff" : "#17286dff",
                color: task.completed ? "#8bb37f" : "#374151",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(idx)}
                  style={{ marginRight: 10, accentColor: "#3c79f5" }}
                />
                <span style={{
                color: task.completed ? "#060606ff" : "#356fff", // Pick your color!
                fontWeight: 600 // Optional: makes it a bit bolder
                }}>
                {task.text}
                </span>
                {task.due && (
                  <span style={{ marginLeft: 12, color: "#aaa", fontSize: 14, color: task.completed ? "#060606ff" : "#356fff"}}>
                    (Due: {task.due})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TasksPage;
