import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Book from './pages/Book'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Services from './pages/Services'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { supabase } from './lib/supabaseClient'

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="container">
          <header>
            <h1>Bright Smile Dental Clinic</h1>
            <p>Manage patient appointments quickly and easily.</p>
            <nav style={{marginTop:10}}>
              <Link to="/" style={{marginRight:12}}>Home</Link>
              <Link to="/book" style={{marginRight:12}}>Book</Link>
              <Link to="/services" style={{marginRight:12}}>Services</Link>
              <Link to="/patients" style={{marginRight:12}}>Patients</Link>
              <Link to="/dashboard" style={{marginRight:12}}>Admin</Link>
              <AuthButtons />
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/book" element={<Book/>} />
              <Route path="/services" element={<Services/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/patients" element={<RequireAuth><Patients/></RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>

          <footer>
            <small>Built for demo — data stored in Supabase.</small>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

function AuthButtons() {
  const { user } = useAuth()
  async function handleLogout() {
    await supabase.auth.signOut()
  }
  return user ? (
    <button className="small" style={{marginLeft:12}} onClick={handleLogout}>Logout</button>
  ) : (
    <Link to="/login" style={{marginLeft:12}}>Login</Link>
  )
}

export default App
