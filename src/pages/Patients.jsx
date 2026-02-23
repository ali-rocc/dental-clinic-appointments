import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Patients(){
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ id: null, full_name: '', email: '', phone: '' })

  useEffect(() => {
    loadPatients()
  },[])

  async function loadPatients(){
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending:false })
      .limit(100)
    if (error) setError(error.message)
    setPatients(data || [])
    setLoading(false)
  }

  async function savePatient(e){
    e.preventDefault()
    setLoading(true)
    setError('')
    if (form.id) {
      const { error } = await supabase
        .from('patients')
        .update({ full_name: form.full_name, email: form.email, phone: form.phone })
        .eq('id', form.id)
      if (error) setError(error.message)
    } else {
      const { error } = await supabase
        .from('patients')
        .insert([{ full_name: form.full_name, email: form.email, phone: form.phone }])
      if (error) setError(error.message)
    }
    setForm({ id: null, full_name: '', email: '', phone: '' })
    await loadPatients()
  }

  async function deletePatient(id){
    if (!confirm('Delete this patient?')) return
    setLoading(true)
    const { error } = await supabase.from('patients').delete().eq('id', id)
    if (error) setError(error.message)
    await loadPatients()
  }

  function editPatient(p){
    setForm({ id: p.id, full_name: p.full_name || '', email: p.email || '', phone: p.phone || '' })
  }

  return (
    <section>
      <h2>Patients</h2>
      <form className="form" onSubmit={savePatient}>
        <h3>{form.id ? 'Edit Patient' : 'Add Patient'}</h3>
        <label>
          Full name
          <input value={form.full_name} onChange={(e)=>setForm({...form, full_name:e.target.value})} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
        </label>
        <label>
          Phone
          <input value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
        </label>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit" disabled={loading}>{form.id ? 'Update' : 'Create'}</button>
          {form.id && <button className="small" type="button" onClick={()=>setForm({ id:null, full_name:'', email:'', phone:'' })}>Cancel</button>}
        </div>
        {error && <p style={{marginTop:10}}>{error}</p>}
      </form>

      {loading && <p>Loading…</p>}
      {patients.length === 0 ? <p>No patients found.</p> : (
        <ul>
          {patients.map(p => (
            <li key={p.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <span>{p.full_name || p.name} — {p.email || 'no email'}</span>
              <span style={{display:'flex', gap:8}}>
                <button className="small" onClick={()=>editPatient(p)}>Edit</button>
                <button className="small danger" onClick={()=>deletePatient(p.id)}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
