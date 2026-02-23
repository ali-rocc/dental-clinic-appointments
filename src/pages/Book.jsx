import React from 'react'

export default function Book(){
  // Replace the cal.com link below with your clinic's booking page URL
  let calComBookingUrl = import.meta.env.VITE_CAL_COM_URL || 'https://cal.com/your-username/15min'
  // Normalize: ensure URL has protocol so iframe/src works when env var lacked https://
  if (calComBookingUrl && !/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(calComBookingUrl)) {
    calComBookingUrl = 'https://' + calComBookingUrl
  }

  // Compute Cal.com embed URL. Cal.com recommends embedding via `https://cal.com/embed/:slug`.
  // If user provided a booking page like `https://cal.com/username/slug` or `cal.com/username/slug`,
  // convert it to the embed form. If the URL already contains `/embed/`, use it as-is.
  let calEmbedUrl = calComBookingUrl
  try {
    const u = new URL(calComBookingUrl)
    // If path already contains /embed, use as-is
    if (!u.pathname.includes('/embed')) {
      // Trim leading/trailing slashes and keep path segments
      const parts = u.pathname.replace(/^\/+|\/+$/g, '').split('/')
      // Build embed path: join all segments after domain
      if (parts.length > 0 && parts[0] !== '') {
        calEmbedUrl = `${u.protocol}//${u.hostname}/embed/${parts.join('/')}`
      }
    }
  } catch (e) {
    // if URL parsing fails, leave calEmbedUrl as-is
  }

  const params = new URLSearchParams(window.location.search)
  const serviceParam = params.get('service')

  return (
    <section>
      <h2>حجز موعد</h2>
      {serviceParam && <p className="badge">الخدمة المختارة: {serviceParam}</p>}
      <p>يمكنك الحجز عبر الجدول المدمج أدناه أو فتح صفحة الحجز مباشرة.</p>
      <div style={{margin: '16px 0'}}>
        <a href={calComBookingUrl} target="_blank" rel="noreferrer" className="btn">فتح صفحة الحجز</a>
      </div>

      <div style={{marginTop:20}}>
        <iframe
          title="Booking"
          src={calComBookingUrl}
          style={{width:'100%',height:700,border:'1px solid #e6e9ef',borderRadius:8}}
        />
      </div>

      <p style={{marginTop:12,color:'#6b7280'}}>ملاحظة: للتكامل العميق، أنشئ Webhook في Cal.com يرسل الحجوزات إلى `/api/calcom-webhook` واحفظها في Supabase للوحة الإدارة.</p>
    </section>
  )
}
