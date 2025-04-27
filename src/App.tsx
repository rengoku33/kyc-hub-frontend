import { Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { RiskAssessment } from './pages/RiskAssessment';
import { Workflow } from './pages/Workflow';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/risk" element={<RiskAssessment />} />
      <Route path="/workflow" element={<Workflow />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
