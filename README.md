# IdeaVault

A community-driven platform where innovators share startup ideas, collect real feedback, and validate concepts together — before building anything.

Built for clarity — real ideas, honest feedback, zero noise.

---

## Overview

IdeaVault connects idea makers with a community of builders, investors, and thinkers. Post your startup concept with a problem statement and proposed solution, then let the community validate it through comments and discussions. Browse trending ideas, filter by category, and discover what the world is building next.

**Live Site:** [https://b13-a09-frontend-part.vercel.app/]

---

## What's Inside

**Home** — Minimal hero banner with 3 slides, trending ideas section showing the top 6 most active concepts, How It Works steps, and Top Contributors leaderboard.

**Ideas** — Full idea listing in a 3-column grid with search by title, filter by category, and optional date range filtering. Each card shows category, title, short description, author, and comment count.

**Idea Details** — Complete idea profile with image, tags, target audience, estimated budget, problem statement, and proposed solution. Comment system is gated — only visible after login. Users can add, edit, and delete their own comments.

**Add Idea** — Private form with all required fields: title, short description, detailed description, category, tags, image URL, estimated budget, target audience, problem statement, and proposed solution.

**My Ideas** — Personal dashboard showing all ideas posted by the logged-in user, with edit (modal) and delete (confirmation modal) support.

**My Interactions** — Activity feed showing all ideas the user has commented on, with comment text and timestamp.

**Auth** — Email/password and Google login via BetterAuth. Registration with name, email, photo URL, and password validation. JWT stored client-side. Private routes redirect cleanly.

**Profile** — Shows logged-in user's name, photo, and email. Update name and photo URL with live preview before saving.

---

## Tech Stack

| | |
|---|---|
| Next.js  | App Router, server + client components |
| BetterAuth | Email/password + Google OAuth + JWT |
| MongoDB Atlas | Cloud database via native driver |
| Express.js | REST API server |
| Tailwind CSS | Utility-first styling |
| DaisyUI | Component library |
| React Toastify | Success and error notifications |
| React Icons | Icon set throughout the UI |

---

## Color Palette

| Role | Hex |
|---|---|
| Primary | `#7C3AED` Violet |
| Accent | `#0891B2` Cyan |
| Background Light | `#F8FAFC` Slate |
| Background Dark | `#0F172A` Slate |

---



## Getting Started




```bash
git clone https://github.com/your-username/ideavault-client
cd ideavault-client
npm install
npm run dev
```

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## NPM Packages Used

```bash
better-auth
react-toastify
react-icons

```

---

## Notes

- Private routes redirect to `/login` if unauthenticated
- Logged-in users are never redirected to login on page reload
- JWT works for both email/password and Google login
- Comment count updates dynamically on every card
- Dark/light theme toggle persists across sessions
- All routes work correctly after Vercel deployment

---

**Server Repo:** [https://github.com/Ahmad-Said-2350/B13-A09-Back-end-Part]

---

Crafted for innovators — minimal, honest, community-driven.
