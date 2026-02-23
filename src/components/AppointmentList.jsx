import React from 'react'

function AppointmentList({ items, onRemove, onToggle }) {
  if (!items || items.length === 0) return <section className="list"><h2>No appointments yet</h2></section>

  return (
    <section className="list">
      <h2>Appointments</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} className={item.done ? 'done' : ''}>
            <div className="left">
              <strong>{item.name}</strong>
              <div className="meta">{item.date} • {item.time}</div>
              {item.notes && <div className="notes">{item.notes}</div>}
            </div>
            <div className="right">
              <button onClick={() => onToggle(item.id)} className="small">{item.done ? 'Undo' : 'Done'}</button>
              <button onClick={() => onRemove(item.id)} className="small danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AppointmentList
