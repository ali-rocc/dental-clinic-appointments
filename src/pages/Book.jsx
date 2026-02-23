import React from 'react'

export default function Book(){
  // Replace the cal.com link below with your clinic's booking page URL
  const calComBookingUrl = import.meta.env.VITE_CAL_COM_URL || 'https://cal.com/your-username/15min'

  return (
    <section>
      <h2>Book an Appointment</h2>
      <p>You can book using our embedded scheduler below or follow the link to open the booking page.</p>
      <div style={{margin: '16px 0'}}>
        <a href={calComBookingUrl} target="_blank" rel="noreferrer" className="btn">Open booking page</a>
      </div>

      <div style={{marginTop:20}}>
        <iframe
          title="Booking"
          src={calComBookingUrl}
          style={{width:'100%',height:700,border:'1px solid #e6e9ef',borderRadius:8}}
        />
      </div>

      <p style={{marginTop:12,color:'#6b7280'}}>Tip: To integrate deeper, create a Cal.com webhook that sends booking events to `/api/calcom-webhook` and store them in Supabase for your admin dashboard.</p>
    </section>
  )
}
