# Get IdeaPulse on Vercel (no terminal)

## 1. Create a new GitHub repo (one time)

1. Open this link (repo name is pre-filled):  
   **https://github.com/new?name=IdeaPulse&description=IdeaPulse+MVP**
2. Leave **"Add a README"** **unchecked** (we already have code).
3. Click **Create repository**.
4. On the new repo page, click the green **Code** button.
5. Copy the **HTTPS** URL (looks like `https://github.com/YOUR_USERNAME/IdeaPulse.git`).
6. **Paste that URL here in chat** and say "use this repo". The assistant will point your project at it.

## 2. Push from GitHub Desktop

1. Open **GitHub Desktop** with the IdeaPulse repo.
2. Click **Push origin**.  
   (If it asks you to publish the branch, use **Publish branch** so the new repo gets the code.)

## 3. Connect Vercel to the new repo

1. Go to **https://vercel.com/new**.
2. Click **Import** next to your **IdeaPulse** repository (or "Import Git Repository" and select it).
3. Leave **Root Directory** empty. Add your env vars (from `.env.example`) in **Environment Variables**.
4. Click **Deploy**.

Your site will be at the URL Vercel gives you (e.g. `idea-pulse-chi.vercel.app` or a new one). To keep using your current domain, point it to this new deployment in the project’s Vercel settings.
