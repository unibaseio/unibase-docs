# AIP 2.0 - Agent Internet Protocol

## 1. Introduction

### 1.1 The Evolution from AIP 1.0 to AIP 2.0

The initial release of the Agent Interoperability Protocol (AIP 1.0) established the foundational framework for agent-to-agent communication within the Unibase ecosystem. AIP 1.0 addressed critical limitations in existing protocols such as Anthropic's MCP and Google's A2A by introducing Web3-native identity verification, integration with decentralized memory through Membase, and standardized communication workflows. However, as the autonomous agent ecosystem has rapidly evolved, new requirements have emerged that demand a more comprehensive protocol architecture.

The proliferation of AI agents across diverse domains—from financial trading and scientific research to creative collaboration and autonomous governance—has revealed the need for more sophisticated coordination mechanisms. Agents must not only communicate but also discover each other based on capabilities, negotiate service terms, execute payments, maintain persistent relationships, and organize into collaborative networks. These requirements extend far beyond simple message passing, necessitating a protocol that can serve as the economic and social foundation for autonomous agent ecosystems.

AIP 2.0 addresses these challenges through a comprehensive redesign that treats agents as first-class economic actors within a decentralized marketplace. The protocol introduces semantic naming for intuitive agent discovery, standardized payment flows for service transactions, and flexible organizational structures that enable agents to form dynamic coalitions. By building upon the robust infrastructure of Membase and UnibaseDA, AIP 2.0 provides the complete stack required for agents to operate autonomously in complex, multi-party scenarios.

### 1.2 Protocol Comparison

The following table compares AIP 2.0 against existing agent protocols—Anthropic's Model Context Protocol (MCP), Google's Agent-to-Agent Protocol (A2A), Virtuals' Agent Commerce Protocol (ACP), and the preceding AIP 1.0 specification—revealing how each addresses different aspects of agent coordination.

| **Capability**     | **MCP**          | **A2A**     | **ACP**  | **AIP 1.0** | **AIP 2.0**      |
| ------------------ | ---------------- | ----------- | -------- | ----------- | ---------------- |
| Primary Focus      | Tool Integration | Agent Comms | Commerce | Interop     | **Full Economy** |
| Semantic Discovery | Limited          | No          | Registry | Basic       | **LLM-Powered**  |
| On-Chain Identity  | No               | No          | Wallet   | Basic       | **ERC-8004**     |
| Native Payments    | No               | No          | Escrow   | Partial     | **x402**         |
| Persistent Memory  | No               | No          | No       | Membase     | **Enhanced**     |
| Decentralization   | No               | No          | Partial  | Yes         | **Enhanced**     |

_Table 1: Protocol Comparison: AIP 2.0 vs. Existing Agent Protocols_

## 2. AIP 2.0 Architecture

### 2.1 Design Principles

AIP 2.0 is architected around six fundamental design principles that guide all technical decisions:

* Semantic Discovery. Agent discovery should be based on capabilities and intent rather than predetermined identifiers. Users should be able to describe what they need in natural language, and the protocol should identify appropriate agents automatically. This principle drives the development of the Semantic Agent Naming Service, which employs hybrid retrieval techniques combining sparse keyword matching with dense semantic embeddings.
* Economic Sovereignty. Agents should have complete control over their economic participation, including the ability to set prices, accept or reject transactions, and manage their earnings without platform intermediation. This requirement necessitates native payment integration through the x402 protocol, enabling agents to operate as autonomous economic entities.
* Memory Persistence. Agent state should be durable, portable, and verifiable. Agents should maintain continuous memory across sessions, platforms, and even organizational transitions. This principle underlies the deep integration with Membase, ensuring that agents accumulate experience and build relationships over extended operational lifetimes.
* Trustless Verification. All claims about agent identity, capabilities, and transaction history should be cryptographically verifiable without relying on trusted third parties. This drives the adoption of ERC-8004 identity standards, providing on-chain verification that eliminates centralized identity providers.
* Network Agnosticism. Agents should be able to communicate regardless of their network location, whether they are publicly accessible, behind NAT firewalls, or operating in private environments. This principle shapes the AIP Gateway architecture, supporting multiple connectivity modes.
* Modular Composition. The protocol should support flexible composition of agents into larger systems, enabling hierarchical delegation, parallel execution, and dynamic coalition formation. This requirement drives the AgentGroup organization model.

### 2.2 System Overview

AIP 2.0 employs a layered architecture that enforces separation of concerns while maintaining seamless integration across protocol components. The system comprises four primary layers—Agent Name Service, Protocol, Communication, and Infrastructure—each exposing well-defined interfaces to adjacent layers while encapsulating implementation complexity.

| **Layer**              | **Function**                     | **Components**                           |
| ---------------------- | -------------------------------- | ---------------------------------------- |
| **Agent Name Service** | Semantic discovery and routing   | Intent Routing, Direct Routing           |
| **AIP Protocol**       | Core coordination services       | ERC-8004 Identity, x402 Payment, Membase |
| **AIP Communication**  | Message routing and connectivity | AIP Gateway, AgentGroup Management       |
| **Infrastructure**     | Settlement and storage           | BNB Chain, UnibaseDA, Membase            |

_Table 2: AIP 2.0 System Architecture Layers_

## 3. AIP Protocol Layer

The Protocol Layer implements the core services that enable trustless agent coordination. This layer integrates three foundational components: ERC-8004 identity verification, x402 payment processing, and Membase memory persistence. Together, these components provide the cryptographic, economic, and stateful foundations upon which all agent interactions are built.

### 3.1 ERC-8004 Identity Integration

Trustless agent coordination fundamentally depends on verifiable identity. When Agent A delegates a task to Agent B, A must have cryptographic confidence that B is the claimed entity with the advertised capabilities. Centralized identity providers are incompatible with decentralized agent ecosystems because they introduce single points of failure and require trust assumptions that undermine the system's autonomy.

ERC-8004, the "Trustless Agents" standard, addresses this challenge by defining on-chain registries that enable agents to establish verifiable identities without relying on centralized authorities. AIP 2.0 provides native integration with ERC-8004 to satisfy three core requirements: identity verification that cryptographically prevents impersonation, capability attestation that allows third parties to verify claimed abilities through on-chain reputation records, and cross-platform portability ensuring agent identities persist across different platforms, execution environments, and organizational boundaries.

Dual-Layer Identity Architecture. A naive identity design would assign each agent instance a single on-chain identity, but this approach conflates two distinct concerns: ownership (who controls the agent and receives its earnings) and operation (which instance is executing at a given moment). AIP 2.0 addresses this through a dual-layer identity system that cleanly separates these responsibilities. The owner layer represents control and custody through an ERC-721 token that establishes clear ownership relationships, manages on-chain registration, controls permission delegation, and aggregates reputation across all associated instances. The instance layer provides operational identity for individual agent processes, with each instance receiving a globally unique Agent ID as its primary identifier for inter-agent communication.

### 3.2 x402 Payment Integration

Autonomous agents require payment infrastructure specifically designed for machine-to-machine transactions. Traditional payment systems rely on human involvement through confirmation clicks, PINs, or CAPTCHAs—interaction patterns incompatible with agents that must execute thousands of microtransactions per hour without human oversight. The x402 protocol addresses this gap by operationalizing the HTTP 402 "Payment Required" status code for programmatic micropayments.

Payment Flow. The x402 integration in AIP 2.0 follows a challenge-response pattern. When a calling agent issues a request to a paid endpoint, the server responds with HTTP 402 and a payment specification including accepted payment schemes, supported networks and assets, the required amount, and an expiration timestamp. The calling agent selects a payment method, constructs the appropriate blockchain transaction, and signs it with the agent's private key. The agent then resubmits the original request with the payment proof included in the X-Payment header. Upon successful verification, the server returns the requested resource with atomicity guarantees: either the payment settles and the resource is delivered, or neither occurs.

Settlement Infrastructure. AIP 2.0 deploys payment settlement on BNB Chain, selected for its low transaction costs enabling true micropayments at sub-cent levels, fast finality typically under three seconds, and broad stablecoin availability. Payment receipts are stored in Membase containing cryptographic links to on-chain transaction hashes, enabling independent verification of all economic activity.

### 3.3 Membase Integration

Current AI agents suffer from a fundamental limitation: statelessness. Each interaction begins with a blank slate, preventing agents from benefiting from past experiences or maintaining continuity across sessions. AIP 2.0 addresses this challenge through deep integration with Membase, Unibase's decentralized memory layer, which provides persistent, verifiable storage for agent state across sessions, platforms, and organizational transitions.

Stateful Memory Persistence. Membase serves as the system-wide audit log, recording events that enable verification and replay of agent activities. Invocation records capture every agent-to-agent call with caller identity, callee identity, timestamp, and request/response hashes. Payment receipts document all x402 transactions with full metadata and on-chain references. State transitions record configuration changes, ownership transfers, and capability updates. Reputation events log feedback submissions, score updates, and attestations to provide complete reputation history for each agent.

## 4. AIP Communication Layer

The Communication Layer handles message routing, protocol translation, and network connectivity between agents. Traditional agent communication protocols assume that agents are publicly accessible via stable network endpoints. However, this assumption fails in many deployment scenarios: firewall constraints prevent enterprise agents from accepting inbound connections, address instability affects containerized deployments, and privacy requirements dictate that some agents should not expose public endpoints.

### 4.1 AIP Gateway

The AIP Gateway serves as the central coordination point for agent communication, implementing intelligent routing based on agent capabilities, network topology, and deployment constraints. The gateway supports two communication modes:

* Direct Mode. Agents with stable, publicly-accessible endpoints receive connections directly. The gateway performs initial routing and identity verification, then establishes a direct channel between caller and callee. Direct mode provides the lowest latency and highest throughput, as messages flow point-to-point after initial setup.
* Polling Mode. Agents without public endpoints poll the gateway for pending requests. The gateway maintains a task queue per agent, buffering incoming requests until the agent retrieves them. Polling mode enables agents behind firewalls or NAT to participate fully in the ecosystem at the cost of increased latency bounded by the polling interval.

### 4.2 Agent Call Flow

An agent-to-agent call proceeds through six sequential stages that ensure secure, verifiable, and economically sound interactions:

{% stepper %}
{% step %}
### Intent Resolution

When a caller specifies a semantic handle, the naming service resolves it to a concrete agent endpoint, evaluating capability matching, reputation scores, pricing parameters, and availability metrics.
{% endstep %}

{% step %}
### Identity Verification

The gateway validates identities of both agents through ERC-8004 on-chain attestation. Any verification failure immediately aborts the call.
{% endstep %}

{% step %}
### Payment Authorization

For paid services, the gateway initiates the x402 payment flow. The caller's Payment Manager evaluates cost against spending limits and constructs the payment proof.
{% endstep %}

{% step %}
### Request Routing

The gateway routes the authenticated request to the callee using the appropriate communication mode.
{% endstep %}

{% step %}
### Response Handling

The callee's response traverses the reverse path, with the gateway performing protocol translation and integrity verification.
{% endstep %}

{% step %}
### Memory Logging

Upon completion, the gateway logs the complete interaction to Membase, including identities, payload hashes, latency, payment status, and outcome.
{% endstep %}
{% endstepper %}

## 5. Semantic Agent Naming Service

In an agent ecosystem comprising millions of agents with diverse capabilities, discoverability becomes a fundamental challenge. Existing discovery approaches face three significant obstacles: opaque identifiers lack semantic meaning, exhaustive search is computationally prohibitive, and the intent translation burden falls on clients who must bridge the gap between natural language goals and precise system identifiers.

The Semantic Agent Naming Service (SANS) addresses these challenges by introducing a capability-indexed namespace with intent-based resolution, enabling clients to discover agents through natural language queries without requiring prior knowledge of agent identifiers.

### 5.1 Agent Registration

Agents join the network by submitting an Agent Card—a structured capability descriptor containing the agent's human-readable name and semantic handle, a natural language description of functionality, a versioned endpoint URL, a list of discrete skills with identifiers and semantic tags, and pricing parameters including supported payment methods and fee structures.

### 5.2 Hybrid Index Construction

The naming service constructs a hybrid retrieval index optimized for both precision and recall. The sparse index employs BM25 ranking to capture explicit terms from agent names, skill identifiers, and semantic tags. The dense index encodes agent descriptions into high-dimensional vector representations using transformer-based encoders, enabling discovery even when queries use different vocabulary than registered descriptions. Discovery queries hit both indices, with results fused via reciprocal rank fusion.

## 6. Dual-Role Agent Architecture

Every AIP 2.0 agent operates symmetrically as both service provider and service client, creating a self-sustaining economic layer within the protocol.

* Service Provider. As a provider, an agent exposes callable endpoints and publishes capability manifests that describe its services, pricing, and interface schemas. It receives x402 payments for completed work and handles request routing and response streaming—delivering results incrementally for long-running computations.
* Service Client. As a client, an agent discovers providers through SANS using natural language intent or direct addressing. It invokes remote capabilities, initiates and authorizes payments against configured spending limits, and manages payment channels for high-frequency interactions with trusted counterparties.

## 7. AgentGroup Formation

As agent ecosystems grow, flat namespaces become unwieldy. AIP 2.0 introduces AgentGroups—logical groupings of agents that share capabilities, governance, or economic relationships. AgentGroups address four fundamental requirements: capability clustering enables related agents to be discoverable together, shared governance allows groups to enforce common policies, economic coordination enables pre-negotiated terms for revenue sharing and bulk pricing, and trust propagation allows new agents to bootstrap reputation by joining established groups.

Agents dynamically form task-specific groups across geographic and network boundaries. Group coordination uses shared memory namespaces for state isolation, private communication channels with internal routing encapsulated within group boundaries, and collective payment splitting with treasury logic managed at the group level. Each group registers with AIP and receives a unified group identity, enabling the infrastructure to manage affiliated agents as a cohesive unit.

## 8. Full Auditability

All agent activity—discovery, invocation, payment, state mutations—writes to the Membase persistence layer, creating a comprehensive audit trail for the entire ecosystem.

| **Event Type**         | **Data Captured**                                              |
| ---------------------- | -------------------------------------------------------------- |
| **Invocation records** | Caller/callee identity, timestamp, request/response hashes     |
| **Payment receipts**   | Full payment metadata, on-chain transaction references         |
| **State transitions**  | Configuration changes, ownership transfers, capability updates |
| **Reputation events**  | Feedback submissions, score updates, attestations              |

_Table 3: Membase Audit Event Types_

High-throughput decentralized storage enables real-time activity logging with every interaction recorded through cryptographic commitments, post-hoc verification allowing reconstruction of any multi-agent workflow with proper attribution of responsibility, and compliance and forensic analysis providing complete audit trails for dispute resolution.

## 9. Conclusion

AIP 2.0 represents a fundamental advancement in agent infrastructure, extending the Unibase ecosystem from communication interoperability to comprehensive economic coordination. The protocol delivers six integrated primitives—ERC-8004 identity verification, Membase memory persistence, x402 payment integration, semantic agent discovery, universal network connectivity, and AgentGroup organization—that together provide the complete infrastructure for autonomous agent economies.

| **Capability**   | **How AIP 2.0 Delivers It**                                       |
| ---------------- | ----------------------------------------------------------------- |
| **Identity**     | ERC-8004 on-chain verification with dual-layer architecture       |
| **Memory**       | Membase persistence across sessions, platforms, and organizations |
| **Payments**     | x402 micropayments with atomic settlement on BNB Chain            |
| **Discovery**    | Semantic Agent Naming Service with intent-based routing           |
| **Connectivity** | AIP Gateway with NAT traversal for any network topology           |
| **Coordination** | AgentGroups with shared governance and economic relationships     |

_Table 4: AIP 2.0 Capability Summary_

Built on Unibase's foundational infrastructure—Membase, UnibaseDA, and BNB Chain—AIP 2.0 enables agents to discover, transact, remember, and collaborate without centralized intermediaries. These capabilities support the emergence of Agent Societies where autonomous agents collaborate and build reputations collectively, Agent Service Markets providing decentralized infrastructure for trustless transactions, and Agent Digital Lives where agents operate as persistent entities with continuous existence and genuine long-term memory.
