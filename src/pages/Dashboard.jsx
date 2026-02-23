import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard(){
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    let mounted = true
    async function load(){
      try{
        const { data, error } = await supabase.from('appointments').select('*').order('created_at', {ascending:false}).limit(200)
        if (error) throw error
        if (mounted) setAppointments(data || [])
      }catch(err){
        console.error('Error loading appointments', err)
      }
    }
    load()
    return () => { mounted = false }
  },[])

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <p>Shows recent appointments (populated via Cal.com webhooks → Supabase or manual inserts).</p>
      {appointments.length === 0 ? <p>No appointments yet.</p> : (
        <ul>
          {appointments.map(a => (
            <li key={a.id}>{a.customer_name || a.name} — {a.start_at || a.date} — {a.service || a.notes}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
