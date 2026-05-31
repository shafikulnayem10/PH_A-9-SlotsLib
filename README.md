# SlotsLib – Sports Facility Booking Platform
**A full-stack sports venue booking app built with Next.js & MongoDB**

🔗 [Live Demo](https://ph-a-9-slots-lib.vercel.app)

---

## The Problem
Booking sports facilities in Bangladesh is mostly done over phone calls, WhatsApp messages, or walk-ins — with no real-time availability, frequent double-bookings, and zero transparency on pricing. Facility owners have no centralized way to manage their venues.

## The Solution
SlotsLib delivers:
- **Instant slot booking** — select date, time, and duration with live price calculation
- **Real-time availability** — no double-booking, no phone calls
- **Owner dashboard** — list, update, and manage venues in one place
- **Multi-role access** — users, owners, and admins each get scoped permissions

---

## Performance

Optimized load performance using dynamic imports and server-side caching:

| Metric | Before | After |
|---|---|---|
| PageSpeed Insights Score (Mobile) | 55 | **99** |
| PageSpeed Insights Score (Desktop) | 55 | **98** |
| Largest Contentful Paint (LCP) | 2.614s | **0.6s** |
| First Contentful Paint (FCP) | 2.412s | **0.3s** |
| Total Blocking Time (TBT) | 0.003s | **0ms** |
| Render-blocking Requests | 3 | **2** |

**What was done:**
- Lazy-loaded Swiper.js via `next/dynamic` with `ssr: false` inside a client wrapper — removed heavy carousel JS from the initial bundle and eliminated render-blocking
- Replaced `cache: "no-store"` with `next: { revalidate: 60 }` across all API fetches — reduces redundant DB calls by serving cached responses for 60 seconds
- All non-hero images lazy-loaded via Next.js `Image` component with `fill` and `sizes` props

---

## What I Built

✅ **Frontend** — Next.js with server components, protected routes, real-time price calculation

✅ **Backend** — Next.js API Routes with MongoDB driver

✅ **Auth** — BetterAuth (Email/Password + Google OAuth) with JWT-protected private pages

✅ **UX** — HeroUI + Tailwind, toast notifications, confirmation modals, custom 404

✅ **Data integrity** — Deleting a facility auto-removes all related bookings

---

## Key Features

| Feature | Why It Matters |
|---------|---|
| **Instant Slot Booking** | Date, time slot, duration selection with real-time price — no waiting |
| **Owner Dashboard** | List, edit, delete venues; ownership verified on every action |
| **My Bookings** | View and cancel personal bookings with one click |
| **Secure Multi-Role Access** | 3 user roles with JWT-protected routes and scoped permissions |
| **Responsive UI** | Mobile-first design — works on all screen sizes |

---

## Tech Stack

**Frontend:** Next.js, React, Tailwind CSS, HeroUI

**Backend:** Next.js API Routes, MongoDB

**Auth:** Better Auth (Email/Password + Google OAuth)

**Deployment:** Vercel

---

## How to Run Locally

### Prerequisites
- Node.js v18+
- MongoDB connection string
- Google OAuth credentials (for Google login)

### Steps

```bash
# Clone & install
git clone <repo-url>
cd slotslib
npm install
```

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SERVER_URL=
MONGODB_URI=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

```bash
# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## What's Impressive Here

🎯 **Full-stack ownership** — Designed, built, and deployed end-to-end

🔐 **Security-first** — JWT auth, role-based access, protected routes

⚡ **Performance** — Achieved 99 (mobile) / 98 (desktop) PageSpeed score via lazy loading and API caching

📱 **Production-ready** — Responsive design, loading states, toast feedback, error handling

🔗 **Data integrity** — Cascading delete ensures no orphaned bookings

---

## The Result

A deployed, working platform where users can discover sports venues, check availability, and book instantly — **right now**. Facility owners get a full management dashboard. A real product solving a real problem.

