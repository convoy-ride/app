import { LogEntry } from "@/ui/LogTable";
import { LeaderboardEntry } from "@/ui/Leaderboard";

// API Performance Data
export const apiResponseTimeData = [
  { time: "00:00", auth: 45, trips: 62, payments: 38, users: 51 },
  { time: "04:00", auth: 42, trips: 58, payments: 41, users: 48 },
  { time: "08:00", auth: 78, trips: 95, payments: 67, users: 72 },
  { time: "12:00", auth: 125, trips: 145, payments: 98, users: 110 },
  { time: "16:00", auth: 95, trips: 112, payments: 82, users: 88 },
  { time: "20:00", auth: 68, trips: 85, payments: 59, users: 65 },
  { time: "23:00", auth: 52, trips: 68, payments: 45, users: 56 }
];

export const apiCallVolumeData = [
  { endpoint: "/auth/login", calls: 1250 },
  { endpoint: "/trips/create", calls: 980 },
  { endpoint: "/trips/status", calls: 2340 },
  { endpoint: "/payments/process", calls: 765 },
  { endpoint: "/users/profile", calls: 1580 }
];

export const apiSuccessRateData = [
  { time: "00:00", success: 98.5, error: 1.5 },
  { time: "04:00", success: 99.1, error: 0.9 },
  { time: "08:00", success: 97.8, error: 2.2 },
  { time: "12:00", success: 96.5, error: 3.5 },
  { time: "16:00", success: 97.2, error: 2.8 },
  { time: "20:00", success: 98.3, error: 1.7 },
  { time: "23:00", success: 99.0, error: 1.0 }
];

export const endpointPerformanceData = [
  { name: "Auth Service", value: 450 },
  { name: "Trip Service", value: 320 },
  { name: "Payment Service", value: 180 },
  { name: "User Service", value: 280 },
  { name: "Notification Service", value: 120 }
];

// Activity Data
export const riderActivityLocations = [
  { id: "1", name: "John D.", lat: 6.5244, lng: 3.3792, status: "active" },
  { id: "2", name: "Sarah M.", lat: 6.6018, lng: 3.3515, status: "active" },
  { id: "3", name: "Mike K.", lat: 6.4698, lng: 3.4301, status: "waiting" },
  { id: "4", name: "Emma R.", lat: 6.5355, lng: 3.3087, status: "active" },
  { id: "5", name: "Alex P.", lat: 6.4817, lng: 3.3919, status: "waiting" }
];

// Leaderboard Data
export const topRidersMonth: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    metric: 45,
    subtitle: "Lagos, Nigeria",
    rating: 4.9
  },
  {
    id: "2",
    name: "Mike Chen",
    metric: 38,
    subtitle: "Lagos, Nigeria",
    rating: 4.8
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    metric: 32,
    subtitle: "Abuja, Nigeria",
    rating: 4.7
  },
  {
    id: "4",
    name: "Alex Kim",
    metric: 28,
    subtitle: "Lagos, Nigeria",
    rating: 4.6
  },
  {
    id: "5",
    name: "Lisa Wang",
    metric: 25,
    subtitle: "Port Harcourt, Nigeria",
    rating: 4.8
  }
];

export const topDriversMonth: LeaderboardEntry[] = [
  {
    id: "1",
    name: "David Okafor",
    metric: 156,
    subtitle: "$2,340 earned",
    rating: 4.9
  },
  {
    id: "2",
    name: "Chioma Adegoke",
    metric: 142,
    subtitle: "$2,130 earned",
    rating: 5.0
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    metric: 128,
    subtitle: "$1,920 earned",
    rating: 4.8
  },
  {
    id: "4",
    name: "Grace Nwosu",
    metric: 115,
    subtitle: "$1,725 earned",
    rating: 4.9
  },
  {
    id: "5",
    name: "Tunde Bakare",
    metric: 108,
    subtitle: "$1,620 earned",
    rating: 4.7
  }
];

export const topRidersYear: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    metric: 520,
    subtitle: "Lagos, Nigeria",
    rating: 4.9
  },
  {
    id: "2",
    name: "Mike Chen",
    metric: 445,
    subtitle: "Lagos, Nigeria",
    rating: 4.8
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    metric: 398,
    subtitle: "Abuja, Nigeria",
    rating: 4.7
  },
  {
    id: "4",
    name: "Alex Kim",
    metric: 356,
    subtitle: "Lagos, Nigeria",
    rating: 4.6
  },
  {
    id: "5",
    name: "Lisa Wang",
    metric: 312,
    subtitle: "Port Harcourt, Nigeria",
    rating: 4.8
  }
];

export const topDriversYear: LeaderboardEntry[] = [
  {
    id: "1",
    name: "David Okafor",
    metric: 1845,
    subtitle: "$27,675 earned",
    rating: 4.9
  },
  {
    id: "2",
    name: "Chioma Adegoke",
    metric: 1698,
    subtitle: "$25,470 earned",
    rating: 5.0
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    metric: 1532,
    subtitle: "$22,980 earned",
    rating: 4.8
  },
  {
    id: "4",
    name: "Grace Nwosu",
    metric: 1421,
    subtitle: "$21,315 earned",
    rating: 4.9
  },
  {
    id: "5",
    name: "Tunde Bakare",
    metric: 1298,
    subtitle: "$19,470 earned",
    rating: 4.7
  }
];

// Logs Data
export const errorLogs: LogEntry[] = [
  {
    id: "e1",
    timestamp: "2025-11-24 21:45:32",
    level: "error",
    service: "Payment Service",
    message: "Payment gateway timeout",
    details:
      "Connection timeout after 30s\nGateway: Paystack\nTransaction ID: TXN-458923"
  },
  {
    id: "e2",
    timestamp: "2025-11-24 21:42:15",
    level: "error",
    service: "Auth Service",
    message: "Invalid token signature",
    details:
      "JWT signature verification failed\nUser ID: USR-7821\nIP: 192.168.1.45"
  },
  {
    id: "e3",
    timestamp: "2025-11-24 21:38:07",
    level: "error",
    service: "Trip Service",
    message: "Driver not found",
    details:
      "No available drivers in radius\nLocation: Lagos Island\nRadius: 5km"
  },
  {
    id: "e4",
    timestamp: "2025-11-24 21:30:21",
    level: "warning",
    service: "Notification Service",
    message: "Push notification delivery delayed",
    details: "FCM rate limit approaching\nQueued: 1250 messages"
  }
];

export const successLogs: LogEntry[] = [
  {
    id: "s1",
    timestamp: "2025-11-24 21:46:12",
    level: "success",
    service: "Trip Service",
    message: "Trip completed successfully",
    details:
      "Trip ID: TRIP-9821\nDuration: 25 min\nDistance: 12.3 km\nFare: ₦2,450"
  },
  {
    id: "s2",
    timestamp: "2025-11-24 21:45:58",
    level: "success",
    service: "Payment Service",
    message: "Payment processed",
    details: "Amount: ₦2,450\nMethod: Card\nTransaction ID: TXN-458924"
  },
  {
    id: "s3",
    timestamp: "2025-11-24 21:44:33",
    level: "success",
    service: "Auth Service",
    message: "User authenticated",
    details: "User ID: USR-5612\nMethod: Password\nDevice: iPhone 14"
  },
  {
    id: "s4",
    timestamp: "2025-11-24 21:43:02",
    level: "info",
    service: "User Service",
    message: "Profile updated",
    details: "User ID: USR-7821\nFields updated: phone, address"
  }
];

// Sparkline data for stats cards
export const sparklineData = {
  users: [45, 52, 48, 61, 58, 65, 72, 68, 75, 81, 78, 85],
  rides: [120, 135, 128, 142, 155, 148, 168, 172, 165, 180, 175, 192],
  revenue: [
    2400, 2650, 2580, 2820, 3100, 2950, 3350, 3420, 3280, 3600, 3480, 3850
  ],
  health: [98, 97, 99, 98, 97, 99, 98, 99, 99, 98, 99, 100]
};
