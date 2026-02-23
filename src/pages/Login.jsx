import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function signIn(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setMessage(error.message)
    else setMessage('تم تسجيل الدخول')
  }

  async function signUp(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setMessage(error.message)
    else setMessage('تحقق من البريد لتأكيد الحساب')
  }

  return (
    <section>
      <h2>تسجيل دخول الموظفين</h2>
      <p>استخدم حساب الموظفين للوصول إلى صفحات الإدارة.</p>
      <form className="form" onSubmit={signIn}>
        <label>
          البريد الإلكتروني
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          كلمة المرور
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit" disabled={loading}>تسجيل الدخول</button>
          <button className="small" onClick={signUp} disabled={loading}>إنشاء حساب</button>
        </div>
        {message && <p style={{marginTop:10}}>{message}</p>}
      </form>
    </section>
  )
}
