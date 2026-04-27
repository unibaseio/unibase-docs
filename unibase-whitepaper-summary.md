# Unibase Whitepaper

**Unibase — Decentralized AI Memory Layer for Autonomous Agents**



Latest Full Version:&#x20;

{% file src=".gitbook/assets/Unibase_Whitepaper_V0_4.pdf" %}

### 1. Introduction

Unibase is a high-performance decentralized AI memory layer designed to empower autonomous AI agents with persistent memory and cross-platform interoperability. As AI systems increasingly move toward agent-based models, the lack of standardized memory infrastructure, transparent data, and agent interoperability has become a critical bottleneck.

Unibase solves this by providing a modular infrastructure that allows agents to store, retrieve, and share knowledge in a decentralized, cryptographically verifiable manner.

***

### 2. Problem Statement

Traditional AI systems and Web2 platforms store memory and user interaction data in centralized silos. This architecture creates several fundamental problems:

* **Lack of Persistent Memory:** Most AI agents are stateless and cannot retain or build upon long-term knowledge.
* **Poor Interoperability:** Data and agent behavior are not composable across platforms.
* **No Data Sovereignty:** Users do not control or benefit from their data.

***

### 3. Vision

Unibase aims to build the foundational infrastructure for the Open Agent Internet — a composable, trustless network of intelligent agents that can learn, collaborate, and evolve autonomously.

***

### 3.5 Core Design Summary

Unibase consists of three tightly integrated modules:

* **Membase**: Decentralized memory layer for secure, scalable, long-term AI memory
* **AIP Protocol**: Web3-native agent interoperability (MCP & gRPC compatible)
* **Unibase DA**: High-throughput, zk-verified data availability for real-time AI access

***

### 4. Architecture Overview

Unibase consists of three core components:

#### 4.1 Membase (AI Memory Layer)

* Decentralized long-term memory storage for agents
* Supports structured and unstructured data (e.g. prompts, vectors, context)
* zk-SNARK based validation for memory proofs
* High-throughput data availability with low-latency read/write

#### 4.2 AIP Protocol (Agent Interoperability Protocol)

* Defines cross-agent message standards and behaviors
* Enables inter-agent calls, shared memory access, and coordination
* Supports agent identity and reputation layers
* Web3-native design, compatible with MCP and gRPC for multi-agent coordination

#### 4.3 Unibase DA (Data Availability Layer)

* High-performance modular DA system
* Compatible with Ethereum, BNB Chain, and OP stack rollups
* Delivers real-time access to AI data with >100GB/s throughput and zk-verified integrity

***

### 5. Tokenomics

#### 5.1 Business Model

Unibase monetizes verifiable AI memory & interoperability: usage-based fees for Membase (write/read/ZK proofs/storage), AIP bandwidth, and x402 machine payments, plus BitAgent listing/add-ons.

#### 5.2 Revenue Streams

* Membase: per-MB writes, per-1k reads, per-proof ZK, storage rent (hot/archive)
* AIP: cross-agent messages & cross-domain bridging (per event)
* x402 payments: per-transaction micro-fee (per transfer / batch settlement / on-chain receipt)
* BitAgent: listing fee + low % marketplace take + memory add-ons

#### 5.3 Token Utility

1. **Protocol Fees**\
   Used for agent deployment, memory storage (Membase), and AIP protocol usage.
2. **Governance (veUB)**\
   Lock UB to participate in protocol governance and reward allocation decisions.
3. **Agent Staking**\
   Stake UB to activate and promote agents; rewards based on agent activity and utility.
4. **Knowledge Mining**\
   Earn UB by contributing prompts, memory, and reusable knowledge to the open memory layer.

Unibase adopts a **ve(3,3)** model to align long-term governance incentives with active agent usage and knowledge contribution. to align long-term governance incentives with active agent usage and knowledge contribution.

#### 5.4 Token **Vesting ( Total supply: 10B UB )**

<table data-header-hidden><thead><tr><th valign="top"></th><th valign="top"></th><th valign="top"></th><th valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top">Category</td><td valign="top">Allocation</td><td valign="top">Token Amount</td><td valign="top">TGE Unlock</td><td valign="top">Vesting Schedule</td></tr><tr><td valign="top">Community</td><td valign="top">35%</td><td valign="top">3,500,000,000</td><td valign="top">5%</td><td valign="top">Remaning vested over 29 months</td></tr><tr><td valign="top">Ecosystem</td><td valign="top">10%</td><td valign="top">1,000,000,000</td><td valign="top">0%</td><td valign="top">6-month cliff, then 24-month linear release</td></tr><tr><td valign="top">Treasury</td><td valign="top">20%</td><td valign="top">2,000,000,000</td><td valign="top">0%</td><td valign="top">6-month cliff, then 24-month linear release</td></tr><tr><td valign="top">Team &#x26; Advisors</td><td valign="top">18%</td><td valign="top">1,800,000,000</td><td valign="top">0%</td><td valign="top">6-month cliff, then 24-month linear release</td></tr><tr><td valign="top">Marketing</td><td valign="top">10%</td><td valign="top">1,000,000,000</td><td valign="top">4.25%</td><td valign="top">Remaining vested over 4 months</td></tr><tr><td valign="top">Liquidity</td><td valign="top">5%</td><td valign="top">500,000,000</td><td valign="top">5%</td><td valign="top">Fully unlocked at TGE</td></tr><tr><td valign="top">Binance Alpha</td><td valign="top">2%</td><td valign="top">200,000,000</td><td valign="top">2%</td><td valign="top">Fully unlocked at TGE</td></tr></tbody></table>

Ref：https://coinmarketcap.com/currencies/unibase/#token\_unlocks

***

### 6. Ecosystem & Use Cases

* **BitAgent:** Multi-agent collaboration platform for launching, staking, and autonomous interaction.
* **TwinX:** Turn your tweets into a self-learning agent with on-chain memory — in just 5 minutes.
* **Beeper:** Intent Agent for crypto tipping, red envelopes, and DeFi interactions on Twitter.
* **TradingFlow:** Autonomous trading agent powered by natural language strategy generation.

#### 6.1 Integrated With

Unibase is already integrated with core agent ecosystem protocols, including:

* **MCP** – Multi-agent communication & coordination
* **ElizaOS** – Modular AI runtime environment
* **Virtuals** – Composable Agent deployment standard
* **Swarms** – Multi-agent task orchestration framework

***

### 7. Roadmap

| Timeline | Milestone                                                                                 |   |
| -------- | ----------------------------------------------------------------------------------------- | - |
| Aug 2025 | Mainnet launch on BNBChain (Immortal Agent creation + on-chain trading)                   |   |
| Oct 2025 | Native support for ERC-8004 Identity & x402 agent launch                                  |   |
| Q4 2025  | Activate on-chain memory verification (ZK-backed Membase layer) on BNBChain               |   |
| Q1 2026  | Launch "One Million Memory Nodes" initiative to scale decentralized storage and retrieval |   |
| Q2 2026  | AIP 2.0 released — cross-platform memory share for interoperable Agents                   |   |

***

### 8. Team & Governance

Unibase is led by a globally distributed team with deep experience in AI, cryptography, distributed systems, and token economics. Governance will gradually transition to a decentralized DAO with on-chain voting powered by veUB.

***

### 9. Legal & Compliance

Unibase does not offer its token to users in jurisdictions where such offerings are restricted, including the United States. The UB token is a utility token designed for usage within the Unibase network.

***

### 10. Links

* Website: https://unibase.com
* Twitter: @unibase\_ai
* Github: https://github.com/unibaseio
* Docs: https://openos-labs.gitbook.io/unibase-docs
* Explorer: https://www.explorer.unibase.com
* BitAgent: https://www.bitagent.io
