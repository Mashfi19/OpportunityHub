# Production Deployment Guide: OpportunityHub

This guide details the procedure to deploy the complete **OpportunityHub** project to production (Netlify for Next.js frontend, Render for Express.js backend, and Supabase for PostgreSQL database).

---

## 1. Database Setup (Supabase)

1. **Create Project**: Sign in to [Supabase](https://supabase.com) and create a new project.
2. **Execute Schema SQL**:
   * Navigate to the **SQL Editor** tab in the Supabase dashboard.
   * Paste the contents of `backend/database/schema.sql` and click **Run**. This generates all database tables, constraints, and full-text indexes.
3. **Capture Credentials**:
   * Go to **Project Settings -> API**.
   * Copy the **Project URL** (`SUPABASE_URL`) and the **service_role API Key** (`SUPABASE_SERVICE_KEY`).
   * Go to **Project Settings -> Database**.
   * Copy the connection string under **Connection Pooling -> Connection String** (select `Transaction` mode, which uses port `6543`, for `DATABASE_URL`).

---

## 2. Backend Deployment (Render)

1. **Create Web Service**: Sign in to [Render](https://render.com) and click **New -> Web Service**.
2. **Link Repository**: Connect your GitHub repository.
3. **Configure Build & Start Settings**:
   * **Name**: `opportunityhub-api`
   * **Root Directory**: `backend`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Plan**: `Free` (or appropriate tier)
4. **Configure Environment Variables**:
   * Click the **Environment** tab and add the keys from `.env.example`:
     * `PORT` = `8080`
     * `NODE_ENV` = `production`
     * `DATABASE_URL` = (Your Supabase connection string)
     * `SUPABASE_URL` = (Your Supabase URL)
     * `SUPABASE_SERVICE_KEY` = (Your Supabase service key)
     * `JWT_SECRET` = (A secure random signing key)
     * `CORS_ORIGIN` = `https://opportunityhub.netlify.app`
     * `OPENAI_API_KEY` = (Your production OpenAI API key)
5. **Deploy**: Click **Deploy Web Service** and copy the public URL (e.g., `https://opportunityhub-api.onrender.com`).

---

## 3. Frontend Deployment (Netlify)

1. **Create Site**: Sign in to [Netlify](https://netlify.com) and click **Add new site -> Import from Git**.
2. **Configure Build Settings**:
   * **Build Command**: `npm run build`
   * **Publish Directory**: `.next` (Next.js is automatically detected)
3. **Configure Environment Variables**:
   * Navigate to **Site Configuration -> Environment Variables**.
   * Add the following variables:
     * `NEXT_PUBLIC_API_URL` = (Your Render backend URL: `https://opportunityhub-api.onrender.com`)
     * `NEXT_PUBLIC_SUPABASE_URL` = (Your Supabase URL)
     * `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Your Supabase public anon key)
4. **Deploy**: Click **Deploy site** and copy your site URL (e.g. `https://opportunityhub.netlify.app`).
5. **Update CORS settings**: Ensure the Render backend's `CORS_ORIGIN` environment variable matches this Netlify URL exactly.

---

## 4. Infrastructure as Code (Automated Deployments)

The repository includes pre-configured automation files to bypass manual build configurations:

### A. Next.js Frontend (`netlify.toml`)
Netlify automatically reads the `netlify.toml` file in the root folder, configuring:
* **Build Command**: `npm run build`
* **Publish Directory**: `.next`
* **Node.js Engine**: Version `20`
* *Note: You only need to set `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Netlify's Environment Variables dashboard.*

### B. Express Backend API (`render.yaml`)
You can deploy using Render's **Blueprints** tab:
1. Go to your Render Dashboard and select **Blueprints -> New Blueprint Instance**.
2. Connect this repository.
3. Render will automatically parse the `render.yaml` file to provision the service with:
   * Correct directory root (`backend`)
   * Proper Node start environment and commands
   * Placeholder keys for your secrets (you will be prompted to paste `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `JWT_SECRET`, and `OPENAI_API_KEY`).
