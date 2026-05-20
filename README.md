# SlotsLib

## Purpose

SlotsLib is a full-stack sports facility booking management platform built with the MERN stack and Better Auth authentication. It allows users to explore available sports venues such as football turfs, badminton courts, cricket grounds, and tennis courts, and make instant bookings for specific dates and time slots. Facility owners can list, manage, update, and delete their own venues through a dedicated dashboard.

## Live URL

[https://ph-a-9-slots-lib.vercel.app](https://ph-a-9-slots-lib.vercel.app)

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

## NPM Packages Used

### Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework for server-side rendering and routing |
| `react` | UI library |
| `react-dom` | React DOM rendering |
| `better-auth` | Authentication (email/password + Google OAuth) |
| `@better-auth/mongo-adapter` | MongoDB adapter for Better Auth |
| `mongodb` | MongoDB driver for database operations |
| `@heroui/react` | UI component library (forms, cards, modals, buttons) |
| `@heroui/styles` | Styling utilities for HeroUI |
| `tailwindcss` | Utility-first CSS framework |
| `lucide-react` | Icon library |
| `react-icons` | Additional icon sets |
| `react-hot-toast` | Toast notifications |
| `jose-cjs` | JWT verification using JWKS for API protection |
| `react-fast-marquee` | Scrolling marquee component |
| `swiper` | Slider/carousel component |
| `@gravity-ui/components` | Additional UI components |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `eslint` | Code linting |
| `eslint-config-next` | ESLint configuration for Next.js |
| `@tailwindcss/postcss` | PostCSS plugin for Tailwind CSS |
| `babel-plugin-react-compiler` | React compiler Babel plugin |
