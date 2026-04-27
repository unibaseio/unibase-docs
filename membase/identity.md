# Identity

The Membase Identity System establishes a secure and structured framework for agent identification and data ownership within the Unibase ecosystem.

### Core Components

#### MEMBASE\_ACCOUNT

* **Ownership Control**:\
  Represents the owner of one or multiple `MEMBASE_ID`s.
* **On-Chain Registration**:\
  Used to register agent identities securely on the blockchain.
* **Off-Chain Verification**:\
  Used for signing and verifying off-chain operations.
* **Data Management**:\
  Aggregates and manages data associated with the same account, enabling smooth data migration and continuity.

#### MEMBASE\_ID

* **Unique Identifier**:\
  A globally unique ID assigned to each agent, registered and verifiable on-chain.
* **Primary Interaction Identity**:\
  Used as the main identification reference during agent communications and interactions.

### Why This Matters

This dual-layer identity system ensures:

* **Clear Ownership**:\
  Every agent can be linked securely to its owner account.
* **Secure Interactions**:\
  All cross-agent and tool communications can be authenticated and authorized.
* **Efficient Data Management**:\
  Supports seamless migration, aggregation, and management of agent-related data across environments.

By combining MEMBASE\_ACCOUNT and MEMBASE\_ID, Membase provides a robust foundation for trust, traceability, and autonomy in decentralized multi-agent systems.
