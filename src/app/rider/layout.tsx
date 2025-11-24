import RiderNavigation from "@/ui/navigation/RiderNavigation";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - left sidebar on desktop, bottom bar on mobile */}
      <RiderNavigation />

      {/* Main content area with proper padding */}
      <main className="pb-20 md:pb-0 md:pl-20">
        {children}
      </main>
    </div>
  );
}
