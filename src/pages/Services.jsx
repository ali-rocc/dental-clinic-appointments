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
      <div className="grid grid-3" style={{marginTop:12}}>
        {services.map(s => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.duration} • <strong>{s.price}</strong></p>
          </div>
        ))}
      </div>
    </section>
  )
}
