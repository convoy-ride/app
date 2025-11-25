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
      icon: <Users className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600",
      borderColor: "hover:border-emerald-200"
    },
    {
      title: "Driver",
      description: "Start earning by driving with Convoy",
      href: "/driver",
      icon: <Car className="w-6 h-6" />,
      color: "bg-slate-50 text-slate-600",
      borderColor: "hover:border-slate-200"
    },
    {
      title: "DAO",
      description: "Participate in community governance",
      href: "/dao",
      icon: <HiUserGroup className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
      borderColor: "hover:border-amber-200"
    },
    {
      title: "Performance Visualizer",
      description: "Track metrics and analytics in real-time",
      href: "/visualizer",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
      borderColor: "hover:border-blue-200"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 pt-24 pb-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-16 relative z-10">
        {navigationCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative overflow-hidden rounded-xl bg-white p-8 transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 ${card.borderColor}`}
          >
            {/* Icon Container */}
            <div
              className={`mb-6 inline-flex p-3 rounded-lg transition-colors duration-300 ${card.color}`}
            >
              {card.icon}
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {card.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute top-8 right-8 text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center relative z-10">
        <p className="text-sm text-gray-400 mb-6 font-medium">
          Powered by community · Built for everyone
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/convoy-ride"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://twitter.com/convoy_ride"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
            aria-label="Twitter"
          >
            <FaXTwitter className="w-5 h-5" />
          </a>

          <a
            href="https://discord.gg/convoy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2"
            aria-label="Discord"
          >
            <FaDiscord className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
