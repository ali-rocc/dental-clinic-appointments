import React from 'react'

export default function Services(){
  const services = [
    {id:1,name:'تنظيف دوري',duration:'30 دقيقة',price:'$80',description:'تنظيف لطيف مع فحص وخطة عناية.'},
    {id:2,name:'تبييض الأسنان',duration:'45 دقيقة',price:'$200',description:'تبييض احترافي لابتسامة أكثر إشراقًا.'},
    {id:3,name:'استشارة زراعة الأسنان',duration:'60 دقيقة',price:'$150',description:'استشارة للزراعة وخيارات العلاج.'},
    {id:4,name:'زيارة طارئة',duration:'30 دقيقة',price:'$120',description:'رعاية فورية لآلام الأسنان أو الإصابات.'},
    {id:5,name:'تقويم وشفافات',duration:'45 دقيقة',price:'$90',description:'استشارة تقويم وخطة علاج.'},
    {id:6,name:'فحص الأطفال',duration:'30 دقيقة',price:'$70',description:'فحوصات مناسبة للأطفال ورعاية وقائية.'},
  ]

  return (
    <section>
      <h2>الخدمات</h2>
      <p className="muted">اختر الخدمة واحجز مباشرة.</p>
      <div className="grid grid-3" style={{marginTop:12}}>
        {services.map(s => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <div className="service-meta">
              <span>{s.duration}</span>
              <strong>{s.price}</strong>
            </div>
            <a className="btn" href={`/book?service=${encodeURIComponent(s.name)}`}>احجز هذه الخدمة</a>
          </div>
        ))}
      </div>
    </section>
  )
}
