import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Workflow from './components/Workflow'
import PlumberList from './components/PlumberList'
import Footer from './components/Footer'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-main">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/" element={
            <>
              <Navbar />
              <Header />
              <main>
                <PlumberList />
                <Workflow />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
