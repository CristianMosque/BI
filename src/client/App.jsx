import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import Sales from './components/Sales'
import Inventory from './components/Inventory'
import Orders from './components/Orders'
import Tasks from './components/Tasks'
import Marketing from './components/Marketing'
import Finance from './components/Finance'
import AdminDashboard from './components/AdminDashboard'
import CRMDashboard from './components/CRM/CRMDashboard'
import WooCommerceSync from './components/WooCommerceSync'
import BarcodeScan from './components/BarcodeScan'
import BusinessIntelligence from './components/BusinessIntelligence'
import Payroll from './components/Payroll'
import ElectronicInvoicing from './components/ElectronicInvoicing'
import LegalManagement from './components/LegalManagement'

function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {user ? (
              <>
                <li><Link to="/crm">CRM</Link></li>
                <li><Link to="/sales">Ventas</Link></li>
                <li><Link to="/inventory">Inventario</Link></li>
                <li><Link to="/orders">Pedidos</Link></li>
                <li><Link to="/tasks">Tareas</Link></li>
                <li><Link to="/marketing">Marketing</Link></li>
                <li><Link to="/finance">Finanzas</Link></li>
                <li><Link to="/woocommerce">WooCommerce</Link></li>
                <li><Link to="/barcode">Escaneo de Códigos</Link></li>
                <li><Link to="/business-intelligence">Inteligencia de Negocios</Link></li>
                <li><Link to="/payroll">Nómina</Link></li>
                <li><Link to="/invoicing">Facturación</Link></li>
                <li><Link to="/legal">Gestión Legal</Link></li>
                {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
                <li><button onClick={logout}>Cerrar sesión</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crm" element={<PrivateRoute><CRMDashboard /></PrivateRoute>} />
          <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/marketing" element={<PrivateRoute><Marketing /></PrivateRoute>} />
          <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
          <Route path="/woocommerce" element={<PrivateRoute><WooCommerceSync /></PrivateRoute>} />
          <Route path="/barcode" element={<PrivateRoute><BarcodeScan /></PrivateRoute>} />
          <Route path="/business-intelligence" element={<PrivateRoute><BusinessIntelligence /></PrivateRoute>} />
          <Route path="/payroll" element={<PrivateRoute><Payroll /></PrivateRoute>} />
          <Route path="/invoicing" element={<PrivateRoute><ElectronicInvoicing /></PrivateRoute>} />
          <Route path="/legal" element={<PrivateRoute><LegalManagement /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  )
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default AppWithAuth