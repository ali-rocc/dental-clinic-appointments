import React, { useEffect, useState } from 'react'
import AppointmentForm from './components/AppointmentForm'
import AppointmentList from './components/AppointmentList'

function App() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('appointments')
    if (raw) setAppointments(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }, [appointments])

  function addAppointment(appt) {
    setAppointments((s) => [appt, ...s])
  }

  function removeAppointment(id) {
    setAppointments((s) => s.filter((a) => a.id !== id))
  }

  function toggleComplete(id) {
    setAppointments((s) => s.map(a => a.id === id ? {...a, done: !a.done} : a))
  }

  return (
    <div className="container">
      <header>
        <h1>Bright Smile Dental Clinic</h1>
        <p>Manage patient appointments quickly and easily.</p>
      </header>

      <main>
        <AppointmentForm onAdd={addAppointment} />
        <AppointmentList
          items={appointments}
          onRemove={removeAppointment}
          onToggle={toggleComplete}
        />
      </main>

      <footer>
        <small>Built for demo — data stored in browser localStorage.</small>
      </footer>
    </div>
  )
}

export default App
