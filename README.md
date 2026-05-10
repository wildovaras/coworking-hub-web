# Coworking Hub — Web (landing pública)

Landing y CRM frontend para Coworking Hub Las Condes. Stack: Vite + React 18 + TypeScript + Tailwind + motion/react + lucide-react.

## Desarrollo local

```bash
npm install
npm run dev
```

Servidor en `http://localhost:5173`. Vite proxy reenvía `/api/*` al backend en Render.

## Variables de entorno (producción)

| Variable | Valor |
|---|---|
| `VITE_API_BASE` | `https://coworking-hub.onrender.com` |

## Deploy

Configurado para Vercel. Cada `git push origin main` redeploya automáticamente.

## Estructura

- `src/App.tsx` — landing pública + admin login (routing por pathname)
- `src/index.css` — Inter font, liquid-glass utility, c3-pricing CSS, animaciones
- `vite.config.ts` — proxy dev → backend Render

## Backend (separado)

API + dashboard CRM admin: https://github.com/wildovaras/coworking-hub  
URL: https://coworking-hub.onrender.com

---

Becerra & Varas — UTalca, 2026.
