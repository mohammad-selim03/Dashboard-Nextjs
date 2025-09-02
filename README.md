# User Management Dashboard

A modern, enterprise-grade user management dashboard built with Next.js 15, TypeScript, and TailwindCSS. This project demonstrates best practices for React development, component architecture, and modern web application patterns.

## 🚀 Features

### Core Functionality
- **User Management**: Comprehensive user profiles with detailed information
- **Advanced Search**: Real-time search with debouncing and intelligent filtering
- **Responsive Design**: Beautiful responsive grid layout that works on all devices
- **Detailed Views**: Rich user detail pages with glassmorphism design
- **Pagination**: Smart pagination with local storage persistence
- **Animations**: Smooth animations and loading states using Framer Motion patterns

### Technical Features
- **TypeScript**: Full type safety with comprehensive interfaces
- **Custom Hooks**: Reusable hooks for pagination, search, and local storage
- **Service Layer**: Clean API abstraction with error handling
- **Component Architecture**: Modular, reusable components following best practices
- **Performance**: Optimized with caching, debouncing, and efficient rendering
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5+
- **Styling**: TailwindCSS v4
- **UI**: Custom components with Lucide React icons
- **3D Graphics**: Three.js for animated backgrounds
- **Build Tool**: Turbopack
- **Code Quality**: ESLint with Next.js config

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with feature showcase
│   ├── users/page.tsx     # User management dashboard
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── AnimatedCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Pagination.tsx
│   │   └── SearchInput.tsx
│   ├── user/              # User-specific components
│   │   ├── UserCard.tsx
│   │   ├── UserDetails.tsx
│   │   └── UserGrid.tsx
│   └── layout/
│       └── ThreeBackground.tsx
├── hooks/                 # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── usePagination.ts
│   ├── useSearch.ts
│   └── useUsers.ts
├── services/              # API service layer
│   └── userServices.ts
├── types/                 # TypeScript definitions
│   ├── index.ts
│   └── user.ts
└── utils/                 # Utility functions
    ├── constants.ts
    └── helpers.ts
```

## 🎯 Component Highlights

### UserDetails Component
The new `UserDetails` component showcases:
- **Modern Design**: Glassmorphism effects with animated cards
- **Interactive Features**: Copy-to-clipboard functionality for contact info
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive Layout**: Adaptive grid layout for different screen sizes
- **Rich Information**: Comprehensive user profile with contact, address, and company details

### Best Practices Implemented
- **Component Composition**: Reusable, composable component architecture
- **Custom Hooks**: Separation of logic with specialized hooks
- **Type Safety**: Comprehensive TypeScript interfaces and types
- **Error Handling**: Graceful error states and fallbacks
- **Performance**: Memoization, debouncing, and optimized rendering
- **Code Organization**: Clean folder structure and naming conventions

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
