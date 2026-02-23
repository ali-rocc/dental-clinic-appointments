# Dental Clinic — Appointments Manager

This is a small demo single-page app to manage dental appointments. It stores data in the browser `localStorage` so no external database or account is required.

Local development

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Build for production

```bash
npm run build
npm run preview
```

Deploying for free

- Vercel: connect this repository to Vercel (free) and deploy — Vercel will detect the Vite app automatically.
- Netlify: you can drag-and-drop the `dist` folder from `npm run build` into Netlify Drop or connect a Git repository.

If you want, I can:

- push this project to a GitHub repo and deploy to Vercel/Netlify for you (I will need access or you can invite me), or
- modify the app to use a cloud-hosted free database (Supabase/Railway) for persistent server-side storage.

Supabase + Cal.com integration (optional, recommended for full demo)

1. Create a free Supabase project at https://supabase.com and create two tables: `appointments` and `patients`.
	- `appointments` should include at least: `id (uuid)`, `created_at (timestamp)`, `start_at (timestamp)`, `end_at (timestamp)`, `customer_name (text)`, `customer_email (text)`, `service (text)`, `calcom_event (json)`.
	- `patients` can include: `id`, `full_name`, `email`, `phone`, `created_at`.

2. In the Vercel project settings (or your local `.env`), set the following environment variables:

	- `VITE_SUPABASE_URL` = your Supabase project URL
	- `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key
	- `SUPABASE_URL` = same Supabase project URL (for serverless)
	- `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key (used only by the serverless webhook)
	- `VITE_CAL_COM_URL` = your Cal.com booking page URL (e.g. `https://cal.com/your-username/15min`)

3. Cal.com integration

	- Create a Cal.com account and a booking page for the clinic at https://cal.com.
	- Under Integrations > Webhooks, add a new webhook endpoint pointing to: `https://<your-vercel-app>/api/calcom-webhook` (this repo includes `api/calcom-webhook.js` which will insert booking events into Supabase).
	- Optionally, set up calendar integration (Google Calendar) through Cal.com so bookings sync to staff calendars.

4. Deploy

	- Commit and push changes to GitHub (already done), then Vercel will build the project. Ensure the env vars are configured in Vercel.

Notes

- The frontend contains pages: Home, Book (embeds Cal.com), Services, Patients (reads `patients` table), and Admin Dashboard (reads `appointments` table).
- The `/api/calcom-webhook` endpoint expects POST webhooks from Cal.com and writes into Supabase using a service role key — keep that key secret.
- If you want, I can wire these services for you: create Supabase tables, set the env vars in Vercel, and configure the Cal.com webhook.
