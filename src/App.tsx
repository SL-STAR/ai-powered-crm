import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import Sales from './pages/Sales';
import Tickets from './pages/Tickets';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="sales" element={<Sales />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>
      </Routes>
      <AIAssistant />
    </>
  );
}

export default App;
