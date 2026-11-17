# SHUVO DAS — Portfolio Website

Complete production-ready portfolio build with updated About & Gallery images, built-in Web Audio piano background synthesizer, security headers, and serverless AI chat handler.

## Project Structure
- `index.html` — Main entry point with security CSP headers, preconnect hints, and audio unlock handler.
- `assets/index-DMVZa_Hg.js` — Production application bundle with updated About & Gallery images.
- `assets/index-axDYoM6S.css` — Production stylesheet.
- `api/chat.js` — Serverless API route for Shuvo AI assistant (uses `GEMINI_API_KEY` environment variable).
- `.nojekyll` — Ensures GitHub Pages serves assets cleanly without Jekyll filtering.
- `.env.example` — Environment variable template for serverless deployment (Vercel/Netlify).

## Deployment
- **GitHub Pages:** Upload all files in this folder directly to your repository root and enable GitHub Pages on the `main` branch.
- **Vercel / Netlify:** Import the repository and set `GEMINI_API_KEY` in Project Environment Variables to enable the AI chat endpoint (`/api/chat`).
