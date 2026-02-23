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
    else setMessage('Signed in')
  }

  async function signUp(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setMessage(error.message)
    else setMessage('Check your email to confirm account')
  }

  return (
    <section>
      <h2>Staff Login</h2>
      <p>Use your clinic staff account to access admin pages.</p>
      <form className="form" onSubmit={signIn}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit" disabled={loading}>Sign in</button>
          <button className="small" onClick={signUp} disabled={loading}>Create account</button>
        </div>
        {message && <p style={{marginTop:10}}>{message}</p>}
      </form>
    </section>
  )
}
