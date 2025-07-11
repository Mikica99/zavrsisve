import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InvitationDesign from './pages/InvitationDesign';
import ContactForm from './pages/ContactForm';
import WeddingDresses from './pages/WeddingDresses';
import Photographers from './pages/Photographers';
import BackToDashboard from './components/BackToDashboard';

function App() {
  return (
    <Router>
      <BackToDashboard />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invitation-design" element={<InvitationDesign />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/wedding-dresses" element={<WeddingDresses />} />
        <Route path="/photographers" element={<Photographers />} />
      </Routes>
    </Router>
  );
}

export default App;
