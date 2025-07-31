// This is your first "component"—a chunk of UI for your task list!
function TaskList() {
  // For now, our list of tasks is just a JS array
  const tasks = [
    "Finish React setup 🛠️",
    "Add my first task list!",
    "Win the hackathon 🚀"
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
