# MediSync — B2B Healthcare SaaS Platform

A production-grade healthcare management frontend built with React 18, TypeScript, Zustand, and Firebase Authentication.

## Live Demo
> Deploy to Vercel: `vercel --prod` (after setup below)

## Tech Stack
| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 + TypeScript | Type safety, component reuse |
| State | Zustand + Immer | Lightweight, no boilerplate |
| Routing | React Router v6 | Nested routes, guards |
| Auth | Firebase Authentication | Production-ready, secure |
| Charts | Recharts | Composable, responsive |
| Styling | Tailwind CSS | Utility-first, fast |
| Build | Vite + vite-plugin-pwa | Fast HMR, Service Worker support |

## Features
- **Authentication** — Firebase Email/Password login with session persistence, protected routes
- **Dashboard** — KPI cards, bar chart (weekly admissions), donut chart (case breakdown), critical patient alerts
- **Analytics** — Monthly trend line chart, department stats bar chart, recovery rate progress bars
- **Patients Module** — Grid/List view toggle, search + status filter, detailed patient profile page
- **Notifications** — Real push notifications via Service Worker, in-app notification center with unread badge
- **PWA** — Fully installable, offline-capable via Workbox caching

## Project Structure
```
src/
├── components/
│   └── layout/         # Sidebar, Layout wrapper
├── hooks/
│   ├── useAuth.ts      # Firebase auth state listener
│   └── useNotifications.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── AnalyticsPage.tsx
│   ├── PatientsPage.tsx    # Grid + List view
│   ├── PatientDetailPage.tsx
│   └── NotificationsPage.tsx
├── router/             # Protected + Public route guards
├── services/
│   ├── firebase.ts     # Firebase init
│   ├── mockData.ts     # Patient + analytics seed data
│   └── notificationService.ts  # Push notification wrapper
├── store/
│   ├── authStore.ts    # Zustand auth slice (persisted)
│   └── patientStore.ts # Patients + notifications slices
└── types/              # Shared TypeScript interfaces
```

## Setup & Run

### 1. Clone and install
```bash
git clone https://github.com/sumitgupta11660/medisync.git
cd medisync
npm install
```

### 2. Firebase setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project → Add Web App → Copy config
3. Enable **Authentication → Email/Password** provider
4. Create a test user in Authentication → Users

```bash
cp .env.example .env
# Fill in your Firebase values in .env
```

### 3. Run locally
```bash
npm run dev
# Open http://localhost:5173
```

### 4. Build for production
```bash
npm run build
npm run preview
```

### 5. Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
# Add env variables in Vercel Dashboard → Settings → Environment Variables
```

## State Management Architecture

```
Zustand Stores
├── useAuthStore      → user, loading, setUser, logout  (persisted to localStorage)
├── usePatientStore   → patients, viewMode, filters, filteredPatients()
└── useNotificationStore → notifications, unreadCount, markRead, addNotification
```

## Service Worker & Notifications
- Registered via `vite-plugin-pwa` (Workbox under the hood)
- `notificationService.ts` wraps browser Notification API with SW fallback
- Demo: Click **"Trigger Demo Alert"** on Notifications page → browser will request permission → shows native push notification
- Auto-alert fires after 30s (simulates real-time critical patient event)

## Bonus Points Implemented
- Reusable typed components (Avatar, Badge, StatusPill patterns)
- Performance: code-split via React Router lazy loading possible, Recharts tree-shakeable
- Clean folder structure — feature-first organization
- Fully typed with TypeScript strict mode
