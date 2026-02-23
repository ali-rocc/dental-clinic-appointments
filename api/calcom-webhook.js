const { createClient } = require('@supabase/supabase-js')

module.exports = async (req, res) => {
  // Vercel /api handler
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) return res.status(500).json({ error: 'Supabase env vars not configured' })

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try{
    const event = req.body
    // Cal.com webhook payload varies; store raw payload and a few common fields if present
    const record = {
      calcom_event: event,
      created_at: new Date().toISOString(),
      start_at: (event?.booking?.start_time) || (event?.start_time) || null,
      end_at: (event?.booking?.end_time) || (event?.end_time) || null,
      customer_name: (event?.booking?.customer?.name) || (event?.customer?.name) || null,
      customer_email: (event?.booking?.customer?.email) || (event?.customer?.email) || null,
      service: (event?.booking?.event?.name) || null,
    }

    const { data, error } = await supabase.from('appointments').insert([record])
    if (error) throw error
    return res.status(200).json({ ok: true, data })
  }catch(err){
    console.error('Webhook handler error', err)
    return res.status(500).json({ error: String(err) })
  }
}
