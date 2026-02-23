import React, { useState } from 'react'

function AppointmentForm({ onAdd }) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!name || !date || !time) return alert('Please fill name, date and time')
    const appt = {
      id: Date.now().toString(),
      name,
      date,
      time,
      notes,
      done: false,
      createdAt: new Date().toISOString()
    }
    onAdd(appt)
    setName('')
    setDate('')
    setTime('')
    setNotes('')
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>New Appointment</h2>
      <label>
        Patient name
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe" />
      </label>
      <label>
        Date
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <label>
        Time
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      </label>
      <label>
        Notes
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional notes" />
      </label>
      <div>
        <button type="submit" className="btn">Add Appointment</button>
      </div>
    </form>
  )
}

export default AppointmentForm
