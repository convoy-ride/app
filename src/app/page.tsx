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
    },
    {
      title: "Driver",
      description: "Start earning by driving with Convoy",
      href: "/driver",
      icon: <Car className="w-8 h-8" />,
      color: "#008E9C",
    },
    {
      title: "DAO",
      description: "Participate in community governance",
      href: "/dao",
      icon: <HiUserGroup className="w-8 h-8" />,
      color: "#00A68A",
    },
    {
      title: "Performance Visualizer",
      description: "Track metrics and analytics in real-time",
      href: "/visualizer",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "#007A6E",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {navigationCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative overflow-hidden rounded-lg bg-white p-8 transition-all duration-200 border border-gray-300 hover:border-gray-400 hover:shadow-lg"
          >
            {/* Icon Container */}
            <div
              className="mb-6 inline-flex p-3 rounded-md text-white transition-transform duration-200"
              style={{ backgroundColor: card.color }}
            >
              {card.icon}
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute top-8 right-8 text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 mb-4">Powered by community · Built for everyone</p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/convoy-ride"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://twitter.com/convoy_ride"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="Twitter"
          >
            <FaXTwitter className="w-6 h-6" />
          </a>

          <a
            href="https://discord.gg/convoy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="Discord"
          >
            <FaDiscord className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
