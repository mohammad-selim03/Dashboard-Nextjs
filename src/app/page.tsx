'use client';

import Link from "next/link";
import { Users, Search, Grid, Eye, Star, ArrowRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ProfessionalBackground } from "@/components/layout/ProfessionalBackground";
import { ANIMATION } from "@/utils/constants";

export default function Home() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "User Management",
      description: "Comprehensive user profiles with detailed information and interactive cards.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Real-time search with debouncing and intelligent filtering capabilities.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Grid className="w-8 h-8" />,
      title: "Responsive Grid",
      description: "Beautiful responsive grid layout with smooth animations and loading states.",
      color: "from-cyan-500 to-green-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Detailed Views",
      description: "Rich user detail pages with glassmorphism design and copy-to-clipboard functionality.",
      color: "from-green-500 to-yellow-500"
    }
  ];

  const technologies = [
    { name: "Next.js 15", description: "App Router with SSR" },
    { name: "TypeScript", description: "Type-safe development" },
    { name: "TailwindCSS v4", description: "Utility-first styling" },
    { name: "React 19", description: "Latest React features" },
    { name: "Three.js", description: "3D animations" },
    { name: "Lucide Icons", description: "Beautiful icons" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Professional Background */}
      <ProfessionalBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <AnimatedCard delay={ANIMATION.CARD_DELAY} className="rounded-2xl p-12 mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              User Dashboard Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A modern user management dashboard showcasing best practices with Next.js, TypeScript, and TailwindCSS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/users"
                className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <span className="text-lg font-semibold">Explore Users</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://github.com/mohammad-selim03/Dashboard-Nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <Star className="w-5 h-5" />
                <span className="text-lg font-semibold">View Source</span>
              </a>
            </div>
          </AnimatedCard>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <AnimatedCard
                key={feature.title}
                delay={ANIMATION.CARD_DELAY * (index + 2)}
                className="rounded-xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </AnimatedCard>
            ))}
          </div>

          {/* Technology Stack */}
          <AnimatedCard delay={ANIMATION.CARD_DELAY * 6} className="rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <div key={tech.name} className="text-center group">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                    <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Call to Action */}
          <div className="mt-16">
            <AnimatedCard delay={ANIMATION.CARD_DELAY * 7} className="rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Discover the power of modern web development with our comprehensive user management system.
              </p>
              <Link
                href="/users"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Users className="w-5 h-5" />
                <span className="text-lg font-semibold">View User Dashboard</span>
              </Link>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
}
