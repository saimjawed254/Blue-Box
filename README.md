
# 🛍️ Bluebox: AI-Powered E-Commerce Platform

A cinematic, AI-integrated fashion e-commerce experience blending cutting-edge WebGL shaders, scroll-triggered animations, and real-time product intelligence — all built with **Next.js** and powered by modern full-stack infrastructure.

> 📸 Inspired by top-tier Awwwards websites.  
> 🧠 AI Search. 🔐 Clerk Auth. 🚀 Redis Caching. 🎨 GSAP & Shaders.

---

## ⚙️ Tech Stack

**Frontend**
- `Next.js` (App Router, SSR)
- `TypeScript`, `vanilla CSS`
- `GSAP`, `Three.js`, `Lenis`, `WebGL shaders`
- Responsive animation architecture (scroll-based, cinematic reveals)

**Backend**
- `Node.js`, `Drizzle ORM`, `tRPC`, `REST APIs`
- `PostgreSQL` (hosted on Neon)
- `Redis` (for rate limiting + caching)
- `pgvector` for AI search embeddings
- `Clerk` for authentication

**AI Integration**
- Structured + Semantic Product Search using **RAG**
- LLM-powered tag and filter extraction
- Future Phase: Real-time virtual try-on (VITON-HD based)

---

## 🚀 Features

- 🔎 **AI Product Search**: Structured + semantic search using RAG and `pgvector`
- 🔐 **Secure Auth**: Clerk-based login/signup, session protection
- 💾 **Redis Caching**: Cache-first homepage API data for up to ~60% faster loads
- 📦 **E-Commerce Essentials**: Wishlist, cart, filters, sorting, variants
- ✨ **Awwwards-Style Frontend**: Fluid GSAP animations, 3D shader effects, cinematic transitions
- 📊 **Analytics Ready**: API logging, hit/miss cache tracking
- 🧪 **Developer Mode**: Detailed log tracking, inspect routes


## 🧪 Getting Started (Dev)

```bash
git clone https://github.com/your-username/bluebox.git
cd bluebox
npm install
npm run dev
```

Open [`http://localhost:3000`](http://localhost:3000) to view the site.

---

## 📸 Screenshots

![Screenshot 2025-07-06 233238](https://github.com/user-attachments/assets/9863b957-5d86-43f9-be10-7acd218c2800)
![Screenshot 2025-07-06 233256](https://github.com/user-attachments/assets/f3df6586-f31d-4351-ad8f-eb5c1e2b2333)
![Screenshot 2025-07-06 233312](https://github.com/user-attachments/assets/37ee9845-c62c-45e9-897b-c805bed64c65)
![Screenshot 2025-07-06 23![Screenshot 2025-07-06 233721](https://github.com/user-attachments/assets/29ce6588-bd44-4a43-b83c-64f079243e7c)
3759](https://github.com/user-attachments/assets/d7802201-f276-47c7-a9e8-7da476acaa75)
![Screenshot 2025-07-06 200648](https://github.com/user-attachments/assets/a4fdc82b-ec9c-416c-8838-e0acdfe7e28c)
![Bluebox_DB_Diagram](https://github.com/user-attachments/assets/194631f8-3455-4234-8429-60f5c7799587)

---

## 🚦 Redis Performance (Based on Logs)

| Metric               | Value            |
|----------------------|------------------|
| Avg. Cache Hit Time  | ~437ms           |
| Avg. Cache Miss Time | ~1130ms          |
| API Routes Cached    | 6 key endpoints  |
| Rate Limits          | 4 req/min (AI), 120 req/min (global) |

---

## 🧠 AI Search Logic

- Structured + semantic RAG search
- Uses OpenAI + local models (e.g., LLaMA) to extract color/brand filters
- Vector similarity search for fallback matches (`pgvector`)

---

## 🛡️ Auth & Security

- `Clerk`: Full auth lifecycle + protected API middleware
- Middleware-based rate limits and Redis caching to prevent abuse
- Role-based protection planned

---

## 🧩 APIs Overview

- 🔓 **16 Public APIs** (listings, filters, etc.)
- 🔐 **11 Protected APIs** (wishlist, cart, profile, etc.)
- ✅ `27 APIs` in total with type-safe responses (tRPC + REST mix)

---

## 📦 Deployment

> Best deployed via [Vercel](https://vercel.com) (official Next.js support)

```bash
vercel deploy
```
---

## 🔮 Future Roadmap

- [ ] Mobile responsiveness
- [ ] AI product recommendations
- [ ] Virtual try-on from video stream
- [ ] Stripe integration
- [ ] Admin dashboard

---

## 🧑‍💻 Maintainer

**Saim Jawed**  
3rd-year CS Undergrad | Frontend X Backend  
LinkedIn: [linkedin.com/in/saimjawed](https://linkedin.com/in/saimjawed)

---

## 📄 License

MIT
