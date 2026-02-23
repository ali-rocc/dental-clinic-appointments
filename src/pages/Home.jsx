import React from 'react'

export default function Home(){
  return (
    <section>
      <div className="hero">
        <div className="hero-card">
          <span className="badge">Trusted care • Modern clinic</span>
          <h2>Comfortable, modern dental care for the whole family</h2>
          <p>Schedule appointments online, manage patients, and keep your clinic running smoothly.</p>
          <div className="hero-actions">
            <a className="btn" href="/book">Book an appointment</a>
            <a className="btn secondary" href="/services">View services</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="grid grid-2">
            <div className="card">
              <div className="stat">4.9★</div>
              <p>Patient satisfaction</p>
            </div>
            <div className="card">
              <div className="stat">12k+</div>
              <p>Appointments managed</p>
            </div>
            <div className="card">
              <div className="stat">24/7</div>
              <p>Online booking</p>
            </div>
            <div className="card">
              <div className="stat">5</div>
              <p>Specialist dentists</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{marginTop:18}}>
        <div className="card">
          <h3>Preventive Care</h3>
          <p>Cleanings, exams, x-rays, and personalized hygiene plans.</p>
        </div>
        <div className="card">
          <h3>Cosmetic Dentistry</h3>
          <p>Whitening, veneers, and smile makeovers that look natural.</p>
        </div>
        <div className="card">
          <h3>Restorative</h3>
          <p>Implants, crowns, bridges, and same-day emergency visits.</p>
        </div>
      </div>
    </section>
  )
}
