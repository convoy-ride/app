import DriverNavigation from "@/ui/navigation/DriverNavigation";

export default function DriverLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-white">
      {/* Navigation - left sidebar on desktop, bottom bar on mobile */}
      <DriverNavigation />

      {/* Main content area with proper padding */}
      <main className="h-full pb-20 md:pb-0 md:pl-20">{children}</main>
    </div>
  );
}
