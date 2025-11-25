export interface Proposal {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  proposer: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: "platform" | "economics" | "governance" | "technical";
  status: "active" | "passed" | "rejected" | "pending";
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  createdAt: string;
  deadline: string;
  quorum: number;
}

export const mockProposals: Proposal[] = [
  {
    id: "prop-001",
    title: "Reduce Platform Fee from 15% to 12%",
    description:
      "Proposal to reduce the platform commission fee from 15% to 12% to make rides more affordable for passengers and increase driver earnings.",
    fullDescription: `# Fee Reduction Proposal

## Summary
This proposal suggests reducing the platform fee from the current 15% to 12%. This change aims to:
- Make rides more affordable for passengers
- Increase net earnings for drivers
- Remain competitive with other ride-hailing platforms

## Impact Analysis
- **Drivers**: Average 3% increase in take-home pay
- **Riders**: Estimated 2-3% reduction in ride costs
- **Platform**: Projected revenue decrease of ~20%, offset by increased volume

## Implementation Timeline
If approved, the fee reduction would take effect 30 days after the vote passes to allow for system updates and driver/rider communication.`,
    proposer: {
      id: "user-001",
      name: "Alex Thompson",
      avatar: "AT"
    },
    category: "economics",
    status: "active",
    votes: {
      for: 1250,
      against: 380,
      abstain: 120
    },
    createdAt: "2025-11-20T10:00:00Z",
    deadline: "2025-11-27T23:59:59Z",
    quorum: 2000
  },
  {
    id: "prop-002",
    title: "Implement Driver Bonus for Peak Hours",
    description:
      "Introduce a 25% bonus for drivers who accept rides during peak hours (7-9 AM and 5-7 PM on weekdays) to improve service availability.",
    fullDescription: `# Peak Hour Driver Bonus

## Overview
To address the shortage of available drivers during peak commute times, this proposal introduces a 25% earnings bonus for drivers accepting rides during designated peak hours.

## Peak Hours Definition
- **Morning**: 7:00 AM - 9:00 AM (Mon-Fri)
- **Evening**: 5:00 PM - 7:00 PM (Mon-Fri)

## Expected Outcomes
- Increased driver availability during high-demand periods
- Reduced wait times for passengers
- Better work-life balance incentives for drivers

## Cost
Estimated cost to platform: $150,000/month based on current ride volume.`,
    proposer: {
      id: "user-002",
      name: "Sarah Martinez",
      avatar: "SM"
    },
    category: "economics",
    status: "active",
    votes: {
      for: 2100,
      against: 450,
      abstain: 200
    },
    createdAt: "2025-11-18T14:30:00Z",
    deadline: "2025-11-26T23:59:59Z",
    quorum: 2000
  },
  {
    id: "prop-003",
    title: "Expand Service to Ibadan and Kano",
    description:
      "Proposal to expand Convoy services to two major Nigerian cities: Ibadan and Kano, with an initial fleet of 200 drivers in each city.",
    fullDescription: `# City Expansion Proposal: Ibadan & Kano

## Executive Summary
Expand Convoy's ride-hailing services to Nigeria's 3rd and 4th largest cities.

## Market Analysis
- **Ibadan**: Population 3.5M, limited ride-hailing competition
- **Kano**: Population 4.1M, high demand for reliable transport

## Launch Plan
- **Phase 1** (Month 1-2): Driver recruitment and training
- **Phase 2** (Month 3): Soft launch with 100 drivers per city
- **Phase 3** (Month 4-6): Scale to 200 drivers per city

## Budget
Total investment: $2.5M for first 6 months
- Marketing: $800K
- Infrastructure: $600K
- Operations: $1.1M`,
    proposer: {
      id: "user-003",
      name: "Chukwudi Okonkwo",
      avatar: "CO"
    },
    category: "platform",
    status: "passed",
    votes: {
      for: 3200,
      against: 850,
      abstain: 180
    },
    createdAt: "2025-11-10T09:00:00Z",
    deadline: "2025-11-22T23:59:59Z",
    quorum: 2000
  },
  {
    id: "prop-004",
    title: "Update Referral Program: Increase Bonuses",
    description:
      "Increase rider referral bonus from ₦500 to ₦1000 and driver referral bonus from ₦2000 to ₦3500 to accelerate growth.",
    fullDescription: `# Enhanced Referral Program

## Current Structure
- Rider referral: ₦500 per successful referral
- Driver referral: ₦2000 per successful referral

## Proposed Structure
- Rider referral: ₦1000 per successful referral
- Driver referral: ₦3500 per successful referral

## Rationale
Higher incentives will:
- Accelerate user acquisition
- Reduce customer acquisition cost (CAC) compared to paid advertising
- Leverage word-of-mouth marketing

## Success Metrics
Target 30% increase in referrals within first quarter of implementation.`,
    proposer: {
      id: "user-004",
      name: "Fatima Hassan",
      avatar: "FH"
    },
    category: "platform",
    status: "active",
    votes: {
      for: 1580,
      against: 920,
      abstain: 340
    },
    createdAt: "2025-11-21T16:20:00Z",
    deadline: "2025-11-28T23:59:59Z",
    quorum: 2000
  },
  {
    id: "prop-005",
    title: "Implement In-App Emergency SOS Button",
    description:
      "Add a prominent emergency SOS button in the app that directly contacts local emergency services and shares real-time location.",
    fullDescription: `# Safety Feature: Emergency SOS

## Feature Overview
Implement a dedicated emergency button within the Convoy app that:
- Contacts local emergency services (911, police, etc.)
- Shares real-time GPS location
- Sends alert to Convoy safety team
- Notifies emergency contacts

## Technical Requirements
- Integration with local emergency services APIs
- GPS tracking enhancement
- Backend safety monitoring system
- 24/7 safety team support line

## Implementation Timeline
- **Phase 1** (Month 1): Backend development
- **Phase 2** (Month 2): App integration and testing
- **Phase 3** (Month 3): Pilot launch in Lagos
- **Phase 4** (Month 4-6): Nationwide rollout

## Budget
Development and first-year operation: $450,000`,
    proposer: {
      id: "user-005",
      name: "David Nwosu",
      avatar: "DN"
    },
    category: "technical",
    status: "active",
    votes: {
      for: 2890,
      against: 120,
      abstain: 95
    },
    createdAt: "2025-11-19T11:45:00Z",
    deadline: "2025-11-29T23:59:59Z",
    quorum: 2000
  },
  {
    id: "prop-006",
    title: "Change Voting Quorum from 2000 to 3000",
    description:
      "Increase the minimum number of votes required for a proposal to pass from 2000 to 3000 to ensure broader community participation.",
    fullDescription: `# Governance: Quorum Increase

## Current Quorum
2000 votes (approximately 10% of active token holders)

## Proposed Quorum
3000 votes (approximately 15% of active token holders)

## Justification
As the Convoy community grows, governance decisions should reflect input from a larger percentage of stakeholders. This ensures:
- More representative decision-making
- Reduced risk of minority-driven proposals
- Stronger mandate for major platform changes

## Considerations
- May slow down proposal approval
- Requires increased voter engagement efforts
- Reflects platform maturity and growth`,
    proposer: {
      id: "user-006",
      name: "Grace Adeyemi",
      avatar: "GA"
    },
    category: "governance",
    status: "pending",
    votes: {
      for: 0,
      against: 0,
      abstain: 0
    },
    createdAt: "2025-11-24T08:00:00Z",
    deadline: "2025-12-01T23:59:59Z",
    quorum: 2000
  }
];

// User's voting power (mock - based on token holdings)
export const userVotingPower = 10; // 10 tokens = 10 votes
