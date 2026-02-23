import React from 'react'

export default function Services(){
  const services = [
    {id:1,name:'Routine Cleaning',duration:'30 min',price:'$80',description:'Gentle cleaning with exam and hygiene plan.'},
    {id:2,name:'Teeth Whitening',duration:'45 min',price:'$200',description:'Professional whitening for a brighter smile.'},
    {id:3,name:'Dental Implant Consult',duration:'60 min',price:'$150',description:'Consultation for implants and treatment options.'},
    {id:4,name:'Emergency Visit',duration:'30 min',price:'$120',description:'Same‑day care for dental pain or injury.'},
    {id:5,name:'Braces & Aligners',duration:'45 min',price:'$90',description:'Orthodontic consultation and treatment planning.'},
    {id:6,name:'Pediatric Checkup',duration:'30 min',price:'$70',description:'Kid‑friendly exams and preventive care.'},
  ]

  return (
    <section>
      <h2>Services</h2>
      <p className="muted">Choose a service and book instantly.</p>
      <div className="grid grid-3" style={{marginTop:12}}>
        {services.map(s => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <div className="service-meta">
              <span>{s.duration}</span>
              <strong>{s.price}</strong>
            </div>
            <a className="btn" href={`/book?service=${encodeURIComponent(s.name)}`}>Book this service</a>
          </div>
        ))}
      </div>
    </section>
  )
}
