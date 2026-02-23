import React from 'react'

export default function Home(){
  return (
    <section>
      <div className="hero">
        <div className="hero-card">
          <span className="badge">رعاية موثوقة • عيادة حديثة</span>
          <h2>رعاية أسنان مريحة وحديثة لكل أفراد الأسرة</h2>
          <p>احجز المواعيد عبر الإنترنت، وأدر المرضى، وحافظ على سير العمل بسلاسة.</p>
          <div className="hero-actions">
            <a className="btn" href="/book">احجز موعدًا</a>
            <a className="btn secondary" href="/services">عرض الخدمات</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="grid grid-2">
            <div className="card">
              <div className="stat">4.9★</div>
              <p>رضا المرضى</p>
            </div>
            <div className="card">
              <div className="stat">+12 ألف</div>
              <p>مواعيد مُدارة</p>
            </div>
            <div className="card">
              <div className="stat">24/7</div>
              <p>حجز عبر الإنترنت</p>
            </div>
            <div className="card">
              <div className="stat">5</div>
              <p>أطباء متخصصون</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{marginTop:18}}>
        <div className="card">
          <h3>الرعاية الوقائية</h3>
          <p>تنظيف وفحوصات وأشعة وخطط عناية شخصية.</p>
        </div>
        <div className="card">
          <h3>تجميل الأسنان</h3>
          <p>تبييض وقشور وتجميل ابتسامة بمظهر طبيعي.</p>
        </div>
        <div className="card">
          <h3>الترميم</h3>
          <p>زراعة وتيجان وجسور وزيارات طارئة في نفس اليوم.</p>
        </div>
      </div>
    </section>
  )
}
