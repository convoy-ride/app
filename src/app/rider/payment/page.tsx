"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, HelpCircle, Wallet } from "lucide-react";
import Button from "@/components/Button";

// Custom Crypto Icons
const EthIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M15.925 23.96l-9.819-5.8 9.819 13.84 9.825-13.84-9.825 5.8zM16.075 0L6.256 16.297l9.819 5.806 9.819-5.806L16.075 0z" />
  </svg>
);

const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13h-1v2.06c-1.39.19-2.5 1.18-2.5 2.44 0 1.55 1.25 2.25 2.5 2.5v2.44c-1.39-.19-2.5-1.18-2.5-2.44h-1c0 1.65 1.12 3.06 2.5 3.44V17h1v-2.06c1.39-.19 2.5-1.18 2.5-2.44 0-1.55-1.25-2.25-2.5-2.5V7.56c1.39.19 2.5 1.18 2.5 2.44h1c0-1.65-1.12-3.06-2.5-3.44V7z" />
  </svg>
);

const DaiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z" />
  </svg>
);

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactNode;
  balance: string;
  usdValue: string;
  description: string;
}

const cryptoAssets: CryptoAsset[] = [
  {
    id: "weth",
    name: "Wrapped Ethereum",
    symbol: "WETH",
    icon: <EthIcon className="w-6 h-6 text-gray-600" />,
    balance: "2.45",
    usdValue: "$5,234.50",
    description: "Most widely accepted crypto asset"
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: <UsdcIcon className="w-6 h-6 text-[#2775CA]" />,
    balance: "1,250.00",
    usdValue: "$1,250.00",
    description: "Stable and pegged to USD"
  },
  {
    id: "dai",
    name: "Dai Stablecoin",
    symbol: "DAI",
    icon: <DaiIcon className="w-6 h-6 text-[#F5AC37]" />,
    balance: "850.75",
    usdValue: "$850.75",
    description: "Decentralized stablecoin"
  },
  {
    id: "cvy",
    name: "Convoy Token",
    symbol: "CVY",
    icon: <span className="text-2xl">🚗</span>,
    balance: "12,500.00",
    usdValue: "$3,125.00",
    description: "Earn rewards on every ride"
  }
];

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("weth");

  const handleSave = () => {
    console.log("Selected payment method:", selectedPayment);
    router.push("/rider");
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 md:pb-8 px-4 md:px-8">
      {/* Floating Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-28 left-6 md:left-28 z-50 bg-white p-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
          Go Back
        </span>
      </button>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Payment Methods
          </h1>
          <p className="text-gray-600">
            Choose your preferred crypto asset for ride payments
          </p>
        </div>

        {/* Wallet Info */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#00B388] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Connected Wallet
              </p>
              <p className="text-xs text-gray-500 font-mono">0x742d...4e89</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Total Balance:{" "}
            <span className="font-semibold text-gray-900">$10,460.25</span>
          </p>
        </div>

        {/* Payment Options */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Select Payment Asset
          </h2>

          {/* Crypto Assets */}
          {cryptoAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedPayment(asset.id)}
              className={`w-full p-5 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedPayment === asset.id
                  ? "border-[#00B388] bg-[#00B388]/5 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedPayment === asset.id
                      ? "bg-white shadow-sm"
                      : "bg-gray-100"
                  }`}
                >
                  {asset.icon}
                </div>

                {/* Asset Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{asset.name}</p>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                      {asset.symbol}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {asset.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">
                      Balance:{" "}
                      <span className="font-semibold text-gray-900">
                        {asset.balance} {asset.symbol}
                      </span>
                    </span>
                    <span className="text-gray-500">
                      ≈{" "}
                      <span className="font-semibold text-gray-900">
                        {asset.usdValue}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    selectedPayment === asset.id
                      ? "border-[#00B388] bg-[#00B388]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPayment === asset.id && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </button>
          ))}

          {/* Ask on Transaction Option */}
          <button
            onClick={() => setSelectedPayment("ask")}
            className={`w-full p-5 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedPayment === "ask"
                ? "border-[#00B388] bg-[#00B388]/5 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedPayment === "ask"
                    ? "bg-[#00B388] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <HelpCircle className="w-6 h-6" />
              </div>

              {/* Option Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  Ask on Transaction
                </p>
                <p className="text-sm text-gray-600">
                  Choose payment method for each ride individually
                </p>
              </div>

              {/* Selection Indicator */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedPayment === "ask"
                    ? "border-[#00B388] bg-[#00B388]"
                    : "border-gray-300"
                }`}
              >
                {selectedPayment === "ask" && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Gasless Transactions
              </p>
              <p className="text-xs text-blue-700">
                You don't need ETH for gas! Transactions are gasless, but a
                small extra amount of the payment token is included to pay
                relayers.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className="flex-1"
          >
            Save Preference
          </Button>
        </div>

        {/* Payment History */}
        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment History
          </h2>
          <div className="space-y-3">
            {[
              {
                id: "tx-1",
                type: "Ride Payment",
                amount: "-$18.50",
                asset: "USDC",
                date: "Nov 23, 2024",
                time: "10:45 AM",
                status: "completed",
                hash: "0x8f...3k29"
              },
              {
                id: "tx-2",
                type: "Ride Payment",
                amount: "-$28.00",
                asset: "WETH",
                date: "Nov 22, 2024",
                time: "6:58 PM",
                status: "completed",
                hash: "0x4a...9p12"
              },
              {
                id: "tx-3",
                type: "Top Up",
                amount: "+$100.00",
                asset: "USDC",
                date: "Nov 20, 2024",
                time: "9:15 AM",
                status: "completed",
                hash: "0x2b...7m45"
              },
              {
                id: "tx-4",
                type: "Ride Payment",
                amount: "-$15.75",
                asset: "DAI",
                date: "Nov 19, 2024",
                time: "11:48 PM",
                status: "failed",
                hash: "0x9c...5j88"
              }
            ].map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "Top Up"
                        ? "bg-green-100 text-green-600"
                        : tx.status === "failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tx.type === "Top Up" ? (
                      <ArrowLeft className="w-5 h-5 rotate-45" />
                    ) : (
                      <ArrowLeft className="w-5 h-5 -rotate-135" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tx.type}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        {tx.date} • {tx.time}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="font-mono">{tx.hash}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      tx.type === "Top Up" ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    {tx.amount}
                  </p>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs font-medium text-gray-500">
                      {tx.asset}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        tx.status === "completed"
                          ? "bg-green-500"
                          : tx.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-200">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
