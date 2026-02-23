import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard(){
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    id: null,
    customer_name: '',
    customer_email: '',
    start_at: '',
    end_at: '',
    service: ''
  })

  useEffect(() => {
    loadAppointments()
  },[])

  async function loadAppointments(){
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending:false })
      .limit(200)
    if (error) setError(error.message)
    setAppointments(data || [])
    setLoading(false)
  }

  async function saveAppointment(e){
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      customer_name: form.customer_name,
      customer_email: form.customer_email,
      start_at: form.start_at || null,
      end_at: form.end_at || null,
      service: form.service
    }

    if (form.id) {
      const { error } = await supabase.from('appointments').update(payload).eq('id', form.id)
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.from('appointments').insert([payload])
      if (error) setError(error.message)
    }
    setForm({ id: null, customer_name: '', customer_email: '', start_at: '', end_at: '', service: '' })
    await loadAppointments()
  }

  async function deleteAppointment(id){
    if (!confirm('Delete this appointment?')) return
    setLoading(true)
    const { error } = await supabase.from('appointments').delete().eq('id', id)
    if (error) setError(error.message)
    await loadAppointments()
  }

  function editAppointment(a){
    setForm({
      id: a.id,
      customer_name: a.customer_name || '',
      customer_email: a.customer_email || '',
      start_at: a.start_at ? toLocalInput(a.start_at) : '',
      end_at: a.end_at ? toLocalInput(a.end_at) : '',
      service: a.service || ''
    })
  }

  function toLocalInput(iso){
    try{
      const d = new Date(iso)
      const pad = (n) => String(n).padStart(2,'0')
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
    }catch{
      return ''
    }
  }

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <p>Shows recent appointments (populated via Cal.com webhooks → Supabase or manual inserts).</p>
      <form className="form" onSubmit={saveAppointment}>
        <h3>{form.id ? 'Edit Appointment' : 'Add Appointment'}</h3>
        <label>
          Customer name
          <input value={form.customer_name} onChange={(e)=>setForm({...form, customer_name:e.target.value})} required />
        </label>
        <label>
          Customer email
          <input type="email" value={form.customer_email} onChange={(e)=>setForm({...form, customer_email:e.target.value})} />
        </label>
        <label>
          Start time
          <input type="datetime-local" value={form.start_at} onChange={(e)=>setForm({...form, start_at:e.target.value})} />
        </label>
        <label>
          End time
          <input type="datetime-local" value={form.end_at} onChange={(e)=>setForm({...form, end_at:e.target.value})} />
        </label>
        <label>
          Service
          <input value={form.service} onChange={(e)=>setForm({...form, service:e.target.value})} />
        </label>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit" disabled={loading}>{form.id ? 'Update' : 'Create'}</button>
          {form.id && <button className="small" type="button" onClick={()=>setForm({ id:null, customer_name:'', customer_email:'', start_at:'', end_at:'', service:'' })}>Cancel</button>}
        </div>
        {error && <p style={{marginTop:10}}>{error}</p>}
      </form>

      {loading && <p>Loading…</p>}
      {appointments.length === 0 ? <p>No appointments yet.</p> : (
        <ul>
          {appointments.map(a => (
            <li key={a.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span>{a.customer_name || a.name} — {a.start_at || a.date} — {a.service || a.notes}</span>
              <span style={{display:'flex', gap:8}}>
                <button className="small" onClick={()=>editAppointment(a)}>Edit</button>
                <button className="small danger" onClick={()=>deleteAppointment(a.id)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
