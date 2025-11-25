"use client";

import { ThumbsUp, ThumbsDown, Minus, User, Clock, Tag } from "lucide-react";
import { Proposal } from "@/data/mockDAOData";

interface ProposalCardProps {
  proposal: Proposal;
  userVote?: "for" | "against" | "abstain";
  onVote: (proposalId: string, vote: "for" | "against" | "abstain") => void;
  onClick?: () => void;
}

const STATUS_STYLES = {
  active: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200"
  },
  passed: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200"
  },
  rejected: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200"
  },
  pending: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200"
  }
};

const CATEGORY_STYLES = {
  platform: { bg: "bg-purple-50", text: "text-purple-700" },
  economics: { bg: "bg-orange-50", text: "text-orange-700" },
  governance: { bg: "bg-blue-50", text: "text-blue-700" },
  technical: { bg: "bg-teal-50", text: "text-teal-700" }
};

export default function ProposalCard({
  proposal,
  userVote,
  onVote,
  onClick
}: ProposalCardProps) {
  const totalVotes =
    proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
  const forPercentage =
    totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;
  const againstPercentage =
    totalVotes > 0 ? (proposal.votes.against / totalVotes) * 100 : 0;
  const abstainPercentage =
    totalVotes > 0 ? (proposal.votes.abstain / totalVotes) * 100 : 0;

  const isExpired = new Date(proposal.deadline) < new Date();
  const canVote = proposal.status === "active" && !isExpired;

  const handleVote = (vote: "for" | "against" | "abstain") => {
    if (canVote) {
      onVote(proposal.id, vote);
    }
  };

  const statusStyle = STATUS_STYLES[proposal.status];
  const categoryStyle = CATEGORY_STYLES[proposal.category];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-3 py-1 text-xs font-bold rounded-lg border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              {proposal.status.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-lg ${categoryStyle.bg} ${categoryStyle.text}`}
            >
              {proposal.category}
            </span>
          </div>
          <h3
            className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-[#00B388] transition-colors duration-200"
            onClick={onClick}
          >
            {proposal.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {proposal.description}
      </p>

      {/* Proposer */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00B388] to-[#00D9A0] flex items-center justify-center text-white text-xs font-bold">
          {proposal.proposer.avatar || proposal.proposer.name.charAt(0)}
        </div>
        <div>
          <p className="text-xs text-gray-500">Proposed by</p>
          <p className="text-sm font-semibold text-gray-900">
            {proposal.proposer.name}
          </p>
        </div>
      </div>

      {/* Vote Stats */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600">
            {totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}{" "}
            votes
          </span>
          <span className="text-xs text-gray-500">
            {Math.round((totalVotes / proposal.quorum) * 100)}% turnout
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
          <div
            className="bg-green-500 transition-all duration-300"
            style={{ width: `${forPercentage}%` }}
            title={`For: ${forPercentage.toFixed(1)}%`}
          />
          <div
            className="bg-red-500 transition-all duration-300"
            style={{ width: `${againstPercentage}%` }}
            title={`Against: ${againstPercentage.toFixed(1)}%`}
          />
          <div
            className="bg-gray-400 transition-all duration-300"
            style={{ width: `${abstainPercentage}%` }}
            title={`Abstain: ${abstainPercentage.toFixed(1)}%`}
          />
        </div>

        {/* Vote Breakdown */}
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-1 text-green-600">
            <ThumbsUp className="w-3 h-3" />
            <span className="font-semibold">
              {proposal.votes.for.toLocaleString()}
            </span>
            <span className="text-gray-500">({forPercentage.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <ThumbsDown className="w-3 h-3" />
            <span className="font-semibold">
              {proposal.votes.against.toLocaleString()}
            </span>
            <span className="text-gray-500">
              ({againstPercentage.toFixed(1)}%)
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Minus className="w-3 h-3" />
            <span className="font-semibold">
              {proposal.votes.abstain.toLocaleString()}
            </span>
            <span className="text-gray-500">
              ({abstainPercentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Voting Buttons */}
      {canVote && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => handleVote("for")}
            disabled={!!userVote}
            className={`py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              userVote === "for"
                ? "bg-green-600 text-white shadow-md"
                : "border-2 border-green-600 text-green-600 hover:bg-green-50"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>For</span>
            </div>
          </button>

          <button
            onClick={() => handleVote("against")}
            disabled={!!userVote}
            className={`py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              userVote === "against"
                ? "bg-red-600 text-white shadow-md"
                : "border-2 border-red-600 text-red-600 hover:bg-red-50"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center gap-1">
              <ThumbsDown className="w-4 h-4" />
              <span>Against</span>
            </div>
          </button>

          <button
            onClick={() => handleVote("abstain")}
            disabled={!!userVote}
            className={`py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              userVote === "abstain"
                ? "bg-gray-600 text-white shadow-md"
                : "border-2 border-gray-600 text-gray-600 hover:bg-gray-50"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center justify-center gap-1">
              <Minus className="w-4 h-4" />
              <span>Abstain</span>
            </div>
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Ends {new Date(proposal.deadline).toLocaleDateString()}</span>
        </div>
        {userVote && (
          <span className="px-2 py-1 bg-[#00B388]/10 text-[#00B388] rounded-lg font-semibold">
            You voted {userVote.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
