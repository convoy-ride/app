"use client";

import { useState, useMemo } from "react";
import {
  Vote,
  TrendingUp,
  CheckCircle,
  Zap,
  FileText,
  Plus
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import ProposalCard from "@/components/ProposalCard";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { mockProposals, userVotingPower, Proposal } from "@/data/mockDAOData";

type VoteType = "for" | "against" | "abstain";
type FilterType = "all" | "active" | "passed" | "rejected" | "pending";

const CATEGORIES = [
  { value: "platform", label: "Platform" },
  { value: "economics", label: "Economics" },
  { value: "governance", label: "Governance" },
  { value: "technical", label: "Technical" }
] as const;

export default function DAOPage() {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [userVotes, setUserVotes] = useState<Record<string, VoteType>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "platform" as const,
    deadline: ""
  });

  // Calculate stats
  const stats = useMemo(() => {
    const totalProposals = proposals.length;
    const activeProposals = proposals.filter(
      (p) => p.status === "active"
    ).length;
    const passedProposals = proposals.filter(
      (p) => p.status === "passed"
    ).length;
    const userVoteCount = Object.keys(userVotes).length;

    return {
      total: totalProposals,
      active: activeProposals,
      passed: passedProposals,
      userVotes: userVoteCount
    };
  }, [proposals, userVotes]);

  // Filter proposals
  const filteredProposals = useMemo(() => {
    if (filter === "all") return proposals;
    return proposals.filter((p) => p.status === filter);
  }, [proposals, filter]);

  // Handle voting
  const handleVote = (proposalId: string, vote: VoteType) => {
    const oldVote = userVotes[proposalId];

    // Update user votes record
    setUserVotes((prev) => ({ ...prev, [proposalId]: vote }));

    // Update proposal vote counts
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedVotes = { ...proposal.votes };

          // Remove old vote if exists
          if (oldVote) {
            updatedVotes[oldVote] = Math.max(
              0,
              updatedVotes[oldVote] - userVotingPower
            );
          }

          // Add new vote
          updatedVotes[vote] += userVotingPower;

          return { ...proposal, votes: updatedVotes };
        }
        return proposal;
      })
    );
  };

  // Handle new proposal submission
  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();

    const newProposal: Proposal = {
      id: `prop-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      category: formData.category,
      proposer: {
        id: "current-user",
        name: "You",
        avatar: "U"
      },
      status: "pending",
      votes: {
        for: 0,
        against: 0,
        abstain: 0
      },
      createdAt: new Date().toISOString(),
      deadline: new Date(formData.deadline).toISOString(),
      quorum: 2000
    };

    setProposals((prev) => [newProposal, ...prev]);

    // Reset form
    setFormData({
      title: "",
      description: "",
      fullDescription: "",
      category: "platform",
      deadline: ""
    });
    setIsCreateModalOpen(false);
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.fullDescription &&
    formData.deadline;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 animate-slide-up">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              DAO Governance
            </h1>
            <p className="text-gray-600">
              Community-driven decision making for the Convoy platform
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Create Proposal</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <StatsCard
            icon={FileText}
            label="Total Proposals"
            value={stats.total}
            color="#8B5CF6"
          />
          <StatsCard
            icon={TrendingUp}
            label="Active Proposals"
            value={stats.active}
            color="#3B82F6"
          />
          <StatsCard
            icon={CheckCircle}
            label="Passed Proposals"
            value={stats.passed}
            color="#00B388"
          />
          <StatsCard
            icon={Zap}
            label="Your Voting Power"
            value={userVotingPower}
            color="#F59E0B"
          />
        </div>

        {/* Filter Bar */}
        <div
          className="bg-white p-4 rounded-2xl border border-gray-200 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 mr-2">
              Filter:
            </span>
            {(
              ["all", "active", "passed", "rejected", "pending"] as FilterType[]
            ).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filter === filterOption
                    ? "bg-[#00B388] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Proposals Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                userVote={userVotes[proposal.id]}
                onVote={handleVote}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Vote className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Proposals Found
              </h3>
              <p className="text-sm text-gray-600">
                There are no {filter !== "all" && filter} proposals at the
                moment.
              </p>
            </div>
          )}
        </div>

        {/* Create Proposal Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Proposal"
        >
          <div className="p-6">
            <form onSubmit={handleCreateProposal} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Proposal Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Reduce Platform Fee from 15% to 12%"
                  className="w-full"
                  variant="outline"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as typeof formData.category
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20 outline-none transition-all duration-200"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brief Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brief Description * (shown on card)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="A short summary of your proposal (1-2 sentences)"
                  rows={2}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20 outline-none transition-all duration-200 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/200 characters
                </p>
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Description * (supports markdown)
                </label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value
                    })
                  }
                  placeholder="Detailed explanation of your proposal, including rationale, impact, and implementation plan..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#00B388] focus:ring-2 focus:ring-[#00B388]/20 outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Voting Deadline */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Voting Deadline *
                </label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full"
                  variant="outline"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!isFormValid}
                  className="flex-1"
                >
                  Create Proposal
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
