import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Patients(){
  const [patients, setPatients] = useState([])

  useEffect(() => {
    let mounted = true
    async function load(){
      try{
        const { data, error } = await supabase.from('patients').select('*').order('created_at', {ascending:false}).limit(100)
        if (error) throw error
        if (mounted) setPatients(data || [])
      }catch(err){
        console.error('Error loading patients', err)
      }
    }
    load()
    return () => { mounted = false }
  },[])

  return (
    <section>
      <h2>Patients</h2>
      {patients.length === 0 ? <p>No patients found (create a `patients` table in Supabase or add sample rows).</p> : (
        <ul>
          {patients.map(p => (
            <li key={p.id}>{p.full_name || p.name} — {p.email}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
