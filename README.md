# SlotsLib

## Purpose

SlotsLib is a full-stack sports facility booking management platform built with the MERN stack and Better Auth authentication. It allows users to explore available sports venues such as football turfs, badminton courts, cricket grounds, and tennis courts, and make instant bookings for specific dates and time slots. Facility owners can list, manage, update, and delete their own venues through a dedicated dashboard.

## Live URL

[https://ph-a-9-slots-lib.vercel.app](https://ph-a-9-slots-lib.vercel.app)

---

## Performance

Optimized the application's load performance using dynamic imports and server-side caching:

| Metric | Before | After |
|---|---|---|
| PageSpeed Insights Score (Desktop) | 55 | **98** |
| PageSpeed Insights Score (Mobile) | 55 | **99** |
| Largest Contentful Paint (LCP) | 2.614s | **0.6s** |
| First Contentful Paint (FCP) | 2.412s | **0.3s** |
| Total Blocking Time (TBT) | 0.003s | **0ms** |
| Render-blocking Requests | 3 | **2** |

**What was done:**
- Eliminated render-blocking Swiper.js from the initial bundle using `next/dynamic` with `ssr: false`, reducing JS parsed on page load
- Replaced `cache: "no-store"` with `next: { revalidate: 60 }` across all API fetches — reduces redundant DB calls by serving cached responses for 60 seconds
- Lazy loading already implemented on all non-hero images via Next.js `Image` component

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, HeroUI
- **Backend:** Next.js API Routes, MongoDB
- **Auth:** Better Auth (Email/Password + Google OAuth)
- **Deployment:** Vercel

---

## Features

- Browse all sports facilities with search by name and filter by sport type
- User authentication with email/password and Google login via Better Auth
- JWT-based protected routes for private pages
- Book a facility by selecting date, time slot, and duration with real-time price calculation
- View and cancel personal bookings from the My Bookings dashboard
- Add new sports facilities with name, type, location, price, capacity, time slots, and description
- Manage owned facilities — update details or delete with confirmation modal
- Deleting a facility automatically removes all related bookings
- Facility owner email auto-filled on form submission
- Responsive design for mobile, tablet, and desktop
- Custom 404 Not Found page
- Loading states during data fetching
- Toast notifications for all success and error feedback
- Active route highlighting in the navbar

---

## Main Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework for server-side rendering and routing |
| `react` | UI library |
| `react-dom` | React DOM rendering |
| `better-auth` | Authentication (email/password + Google OAuth) |
| `@better-auth/mongo-adapter` | MongoDB adapter for Better Auth |
| `mongodb` | MongoDB driver for database operations |
| `@heroui/react` | UI component library (forms, cards, modals, buttons) |
| `tailwindcss` | Utility-first CSS framework |
| `lucide-react` | Icon library |
| `react-hot-toast` | Toast notifications |
| `jose-cjs` | JWT verification using JWKS for API protection |
| `react-fast-marquee` | Scrolling marquee component |
| `swiper` | Slider/carousel component |

---

## How to Run Locally

### Prerequisites

- Node.js v18+
- MongoDB connection string
- Google OAuth credentials (for Google login)

### Steps

1. **Clone the repository**
```bash
git clone url
cd slotslib
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SERVER_URL
MONGODB_URI
BETTER_AUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

4. **Run the development server**
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---
