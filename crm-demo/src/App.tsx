import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Customers from './pages/Customers'
import CustomerDetail from './pages/CustomerDetail'
import Sales from './pages/Sales'
import Marketing from './pages/Marketing'
import Service from './pages/Service'
import Analytics from './pages/Analytics'
import AIAssistant from './pages/AIAssistant'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/service" element={<Service />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </Layout>
  )
}
