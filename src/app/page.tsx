import Link from "next/link";
import { Users, Car, BarChart3, Github } from "lucide-react";
import { HiUserGroup } from "react-icons/hi";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";

export default function Home() {
  const navigationCards = [
    {
      title: "Rider",
      description: "Request a ride and get where you need to go",
      href: "/rider",
      icon: <Users className="w-8 h-8" />,
      color: "#00B388",
      gradient: "from-[#00D9A0] to-[#00B388]",
    },
    {
      title: "Driver",
      description: "Start earning by driving with Convoy",
      href: "/driver",
      icon: <Car className="w-8 h-8" />,
      color: "#008E9C",
      gradient: "from-[#00C9D4] to-[#008E9C]",
    },
    {
      title: "DAO",
      description: "Participate in community governance",
      href: "/dao",
      icon: <HiUserGroup className="w-8 h-8" />,
      color: "#00A68A",
      gradient: "from-[#00B388] to-[#00A68A]",
    },
    {
      title: "Performance Visualizer",
      description: "Track metrics and analytics in real-time",
      href: "/visualizer",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "#007A6E",
      gradient: "from-[#00A68A] to-[#007A6E]",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-[#00B388]/5 px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00B388]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D9A0]/10 rounded-full blur-3xl animate-pulse-ring" />
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-scale relative z-10">
        <h1 className="text-5xl md:text-6xl font-black mb-4 gradient-text-vibrant animate-gradient">
          Welcome to Convoy
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Your gateway to the future of decentralized ride-hailing
        </p>
      </div>

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full mb-16 relative z-10">
        {navigationCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl glassmorphism p-8 transition-all duration-500 border border-gray-200/50 hover:border-[#00B388]/30 shadow-elevation-2 hover:shadow-elevation-5 active-scale animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Premium gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Icon Container with 3D effect */}
            <div
              className={`mb-6 inline-flex p-4 rounded-2xl text-white transition-all duration-500 shadow-elevation-2 group-hover:shadow-elevation-4 group-hover:scale-110 group-hover:-rotate-6 bg-gradient-to-br ${card.gradient}`}
            >
              {card.icon}
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:gradient-text-vibrant transition-all duration-300">
                {card.title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-medium">
                {card.description}
              </p>
            </div>

            {/* Arrow indicator with animation */}
            <div className="absolute top-8 right-8 text-gray-400 group-hover:text-[#00B388] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Premium corner accent */}
            <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-tl-full blur-2xl`} />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center relative z-10 animate-fade-in">
        <p className="text-sm text-gray-500 mb-6 font-medium">
          Powered by community · Built for everyone
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/convoy-ride"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#00B388] transition-all duration-300 p-3 rounded-xl hover:bg-gray-100 shadow-elevation-1 hover:shadow-elevation-3 hover:scale-110 active-scale"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://twitter.com/convoy_ride"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#00B388] transition-all duration-300 p-3 rounded-xl hover:bg-gray-100 shadow-elevation-1 hover:shadow-elevation-3 hover:scale-110 active-scale"
            aria-label="Twitter"
          >
            <FaXTwitter className="w-6 h-6" />
          </a>

          <a
            href="https://discord.gg/convoy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#00B388] transition-all duration-300 p-3 rounded-xl hover:bg-gray-100 shadow-elevation-1 hover:shadow-elevation-3 hover:scale-110 active-scale"
            aria-label="Discord"
          >
            <FaDiscord className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
