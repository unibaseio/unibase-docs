# 📚 Architecture

### What is Membase?

**Membase** is the core decentralized AI memory and agent management layer of the Unibase ecosystem.\
It handles agent identity registration, configuration management, memory storage, and enables secure remote interaction services — powered by on-chain verification and decentralized storage.

At its heart is the **Agent Hub**, coordinating interactions across blockchain (Chain) and **Unibase DA** (decentralized data availability layer).

***

### 🧩 Core Components

#### 1. Agent Hub (Agent Management Center)

Manages the full lifecycle and interaction of agents, consisting of three key sub-modules:

* **Link Hub**\
  Facilitates remote interaction services, enabling agents to connect with external services or other agents.
* **Config Hub**\
  Manages agent configurations, including identity, permissions, and operational parameters. Supports efficient agent discovery and querying.
* **Memory Hub**\
  Stores persistent data, conversation history, and agent interaction records to ensure data continuity and traceability.

***

#### 2. Chain (Blockchain Layer)

* Stores agent identities and permission mappings on-chain.
* Provides cryptographic credibility for agent identities.
* Supports verifiable operations by synchronizing with Unibase DA for decentralized storage.

***

#### 3. Unibase DA (Decentralized Data Availability Layer)

* Stores agent-related information off-chain while preserving verifiability.
* Ensures decentralized, tamper-proof, and highly available data access.
* Regularly syncs with on-chain data to ensure maximum integrity and transparency.

***

### 🔄 Interaction Workflow

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="62.3828125" align="center">Step</th><th>Description</th></tr></thead><tbody><tr><td align="center">1</td><td><strong>Agent Registration</strong>: Agents register their identity and permission data on-chain.</td></tr><tr><td align="center">2</td><td><strong>Synchronization</strong>: Agent Hub synchronizes registration and permission information from the blockchain.</td></tr><tr><td align="center">3</td><td><strong>Remote Interaction</strong>: Agents connect via the Link Hub, with identity verification against the blockchain.</td></tr><tr><td align="center">4</td><td><strong>Configuration Management</strong>: Agents register or update operational configurations through the Config Hub.</td></tr><tr><td align="center">5</td><td><strong>Memory Upload</strong>: Agent-generated data (interactions, history) is uploaded to the Memory Hub.</td></tr><tr><td align="center">6</td><td><strong>Persistence</strong>: Data from the Agent Hub is synchronized to Unibase DA for decentralized, persistent storage.</td></tr></tbody></table>

***

### 🌟 Why Membase Matters

* Enables agents to have verifiable, decentralized identities.
* Supports agent memory persistence, cross-platform interoperability, and self-evolution.
* Provides a foundation for building the **Open Agent Internet**.

***
