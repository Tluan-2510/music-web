# 🎵 Aura Music | Premium Music Experience

Aura Music is a high-end, glassmorphic music player designed for a premium listening experience. Built with Next.js 15, Tailwind CSS, and Prisma, it features a stunning UI with dynamic animations and a robust backend.

![Aura Music Banner](public/banner.png) *(Note: Add your actual banner image path here)*

## ✨ Features

- **💎 Premium Glassmorphism**: A state-of-the-art UI design focusing on transparency, blurs, and vibrant gradients.
- **🎧 Seamless Playback**: Advanced player controls with volume management and track seeking.
- **👤 Dynamic User Profiles**: Personalized identity hub with music stats, genre preferences, and account management.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **🔒 Secure Authentication**: Integrated with NextAuth.js for safe and easy sign-in.
- **💾 Real-time Database**: Powered by SQLite (via Prisma) for tracking favorites and listening history.

## 🚀 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Database**: [Prisma ORM](https://www.prisma.io/) with SQLite
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd music-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to experience Aura Music.

## 🎨 Design System

Aura Music follows a strict design system based on:
- **Colors**: Deep dark backgrounds (`#0a0a0c`) with vibrant purple and blue accents.
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) for a modern, clean look.
- **Effects**: Backdrop blurs, subtle borders, and soft glows.

## 📄 License

This project is licensed under the MIT License.

---
Developed with ❤️ by the Aura Music Team.
