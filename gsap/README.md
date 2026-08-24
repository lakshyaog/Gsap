# 🎌 Anime Streaming Platform (GSAP & Next.js)

An immersive, high-performance anime discovery and streaming portal built with **Next.js 16 (App Router)**, **React 19**, **GSAP 3**, **Three.js / Vanta.js**, and **Tailwind CSS v4**.

Featuring fluid 3D entrance animations, smooth parallax scrolling, custom pixel transition effects, dynamic watchlists, and interactive 3D background canvases.

---

## ✨ Features

- **🎬 Dynamic Splash & Entrance Screen**: GSAP timeline animations with 3D rotation, staggered entrance/exit transitions, and automatic navigation.
- **☁️ Interactive 3D Backgrounds**: Powered by Vanta.js, Three.js, and post-processing canvas shaders.
- **🎠 Anime Carousel & Showcases**: Interactive carousel featuring popular series (*Naruto*, *One Piece*, *Attack on Titan*, etc.).
- **📌 Interactive Watchlist**: Add and track favorite anime titles dynamically in local state.
- **⚡ Pixel & Parallax Transitions**: Custom GSAP canvas-based pixel grid transitions between routes.
- **📱 Fully Responsive**: Tailored layout supporting mobile, tablet, and desktop viewports using Tailwind CSS v4.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Animations** | [GSAP 3](https://gsap.com/) & ScrollTrigger |
| **3D & Canvas** | [Three.js](https://threejs.org/), Vanta.js & `postprocessing` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & `tailwind-merge` |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 📁 Project Structure

```text
gsap/
├── app/
│   ├── anime/             # Individual anime detail view
│   ├── components/        # Custom UI & animation components
│   │   ├── PixelTransition.tsx
│   │   ├── VantaBackground.tsx
│   │   ├── VantaClouds.tsx
│   │   ├── WelcomePage.tsx
│   │   └── ui/            # Reusable buttons & UI primitives
│   ├── main/              # Main dashboard & anime carousel
│   ├── watch/[slug]/      # Video player & episode route
│   ├── globals.css        # Global CSS & Tailwind imports
│   ├── layout.tsx         # Root layout with script loads
│   └── page.tsx           # Entry point (Welcome Page)
├── lib/                   # Helper functions & utilities
├── public/                # Static image assets & banners
└── package.json           # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. **Clone the repository and enter the project folder:**
   ```bash
   git clone <repository-url>
   cd Gsap/gsap
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

4. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

In the `gsap` directory, you can run:

- `pnpm dev` – Runs the app in development mode using Turbopack.
- `pnpm build` – Builds the application for production optimization.
- `pnpm start` – Starts the production server.
- `pnpm lint` – Runs ESLint checks across the codebase.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
