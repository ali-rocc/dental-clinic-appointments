import React from 'react'

export default function Services(){
  const services = [
    {id:1,name:'Routine Cleaning',duration:'30 min',price:'$80'},
    {id:2,name:'Teeth Whitening',duration:'45 min',price:'$200'},
    {id:3,name:'Dental Implant Consult',duration:'60 min',price:'$150'},
  ]

  return (
    <section>
      <h2>Services</h2>
      <ul>
        {services.map(s => (
          <li key={s.id}>{s.name} — {s.duration} — <strong>{s.price}</strong></li>
        ))}
      </ul>
    </section>
  )
}
