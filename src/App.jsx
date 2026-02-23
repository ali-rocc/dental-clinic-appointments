import React, { useState } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={`app-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-mark">🦷</div>
              <div>
                <div className="brand-name">ابتسامة براقة</div>
                <div className="brand-sub">عيادة الأسنان</div>
              </div>
            </div>
            <button
              className="small toggle"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-expanded={sidebarOpen}
              aria-controls="side-nav"
            >
              {sidebarOpen ? 'طي القائمة' : 'توسيع القائمة'}
            </button>
            <nav className="side-nav" id="side-nav">
              <Link to="/" className="nav-item">
                <span className="nav-icon">🏠</span><span className="nav-label">الرئيسية</span>
              </Link>
              <Link to="/book" className="nav-item">
                <span className="nav-icon">📅</span><span className="nav-label">الحجز</span>
              </Link>
              <Link to="/services" className="nav-item">
                <span className="nav-icon">✨</span><span className="nav-label">الخدمات</span>
              </Link>
              <Link to="/patients" className="nav-item">
                <span className="nav-icon">👥</span><span className="nav-label">المرضى</span>
              </Link>
              <Link to="/dashboard" className="nav-item">
                <span className="nav-icon">🧾</span><span className="nav-label">الإدارة</span>
              </Link>
              <Link to="/login" className="nav-item">
                <span className="nav-icon">🔐</span><span className="nav-label">تسجيل الدخول</span>
              </Link>
            </nav>
            <div className="side-footer">
              <AuthButtons />
            </div>
          </aside>

          <div className="content">
            <div className="content-inner">
              <header className="site-header">
                <h1>عيادة ابتسامة براقة للأسنان</h1>
                <p>إدارة مواعيد المرضى بسرعة وسهولة.</p>
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
                <small>نسخة تجريبية — البيانات محفوظة في Supabase.</small>
              </footer>
            </div>
          </div>
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
    <button className="small" style={{marginLeft:12}} onClick={handleLogout}>تسجيل الخروج</button>
  ) : (
    <Link to="/login" style={{marginLeft:12}}>تسجيل الدخول</Link>
  )
}

export default App
