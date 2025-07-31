import { Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import TasksPage from './TasksPage';
import FinancePage from './FinancePage';
import MoodPage from './MoodPage';
import EntertainmentPage from './EntertainmentPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/finance" element={<FinancePage />} />
      <Route path="/mood" element={<MoodPage />} />
      <Route path="/entertainment" element={<EntertainmentPage />} />
    </Routes>
  );
}

export default App;