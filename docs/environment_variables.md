# Environment Variable Documentation: OpportunityHub

This document outlines all environment variables required to run the OpportunityHub application in development and production environments.

---

## 1. Backend Environment Variables (`/backend/.env`)

These variables configure the Express.js server security, database, and integrations.

| Variable Name | Purpose | Example Value | Security Notes |
|---|---|---|---|
| `PORT` | Local server listening port | `8080` | Public. |
| `NODE_ENV` | Environment mode | `production` | Set to `production` in live environments to restrict logs and enable advanced CSRF check. |
| `CORS_ORIGIN` | Allowed origin for frontend requests | `https://opportunityhub.netlify.app` | Crucial for safety. Set to frontend domain. |
| `JWT_SECRET` | Secret key used to sign session JWTs | `MashfiRahmanSecretKey192026!` | Keep private. Use a random 256-bit string. |
| `DATABASE_URL` | PostgreSQL database connection string | `postgresql://user:pass@host:5432/db` | Keep private. Points to Supabase database. |
| `SUPABASE_URL` | Base URL of the Supabase project | `https://gmsvlzhpp.supabase.co` | Public. |
| `SUPABASE_SERVICE_KEY` | Admin role API key for backend operations | `sb_publishable_...` | Keep private. Bypasses RLS. Never expose on frontend. |
| `OPENAI_API_KEY` | OpenAI API access key | `sk-proj-a1B2c...` | Keep private. Required for AI features. Falls back to mock if empty. |
| `NEXTJS_REVALIDATE_TOKEN` | Token for triggering frontend page cache rebuilds | `revalidate_token_secret_123!` | Keep private. Used to verify requests from backend. |
| `NEXTJS_APP_URL` | Base URL of the Next.js application | `https://opportunityhub.netlify.app` | Used for webhook validation. |

---

## 2. Frontend Environment Variables (`/.env.local`)

These variables configure the Next.js Client-Side bundle. All variables exposed to the client browser must start with `NEXT_PUBLIC_`.

| Variable Name | Purpose | Example Value | Security Notes |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base REST API URL of Render backend | `https://opportunityhub-api.onrender.com` | Public. Must not end with trailing slash. |
| `NEXT_PUBLIC_SUPABASE_URL` | Base URL of Supabase project | `https://gmsvlzhpp.supabase.co` | Public. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for client-side Supabase client | `sb_publishable_...` | Public. Subject to database Row-Level Security. |
