# Architecture

<figure><img src="../.gitbook/assets/image (9).png" alt="Unibase layered architecture: Application, Middleware, Core, Infrastructure"><figcaption></figcaption></figure>

This layered architecture reflects the modular and decentralized nature of the Unibase ecosystem, where each layer builds upon the previous one to create a secure, scalable, and interoperable framework for AI agents.

### 1. Application Layer

The top layer consists of AI agents that users interact with directly:

* **Trader Agent** — Autonomous trading on BNBChain
* **Personal Agent** — Personalized assistance based on user data
* **Chess Agent** — Multi-agent games with decentralized memory

### 2. Middleware

The **Middleware** layer bridges the Application and Core layers:

* **Memory & Recall** — persistent, owned memory and recall-ready retrieval for agents across sessions (Membase)
* **Knowledge** — shared, decentralized knowledge accessible to agent groups
* **Discovery & Config** — agent/tool capability registration and lookup (AIP)

### 3. Core Layer

The **Core Layer** includes:

* **AIP** — Communication standards and interaction protocols between agents
* **Membase** — Decentralized memory, identity, and cooperation layer
* **Unibase DA** — Data availability and storage layer
* **Unibase Pay** — x402 payment facilitator for agent commerce

### 4. Infrastructure

The **Infrastructure Layer** provides:

* **Blockchain** — Identity verification and transaction security
* **Storage** — Distributed storage for data and models
* **LLM API** — Integration with large language models

***

### How the modules compose

The four core modules are independent but composable — each owns one concern, and an agent uses whichever it needs:

```
        Membase  ── memory, identity (wallet), cooperation
           │
   uses ▲  │ stores verifiable data on
        │  ▼
  AIP ──┤  Unibase DA  ── decentralized, erasure-coded storage
 (interop, │
  ERC-8004)│ settles / pays via
        │  ▼
        └─ Unibase Pay  ── x402 micropayments between agents
```

* **AIP** builds on **Membase** for agent identity and shared memory, and uses **Unibase Pay** (x402) to charge for agent calls.
* **Membase** persists verifiable memory on **Unibase DA** and can meter usage through on-chain settlement.
* Each module is usable on its own — you don't need the whole stack to add memory, payments, or storage.

### When to use which

| You want to… | Use |
|---|---|
| Give an agent long-term, owned memory + recall | **Membase** |
| Let agents from different vendors discover & call each other | **AIP** |
| Charge / pay per agent request or API call | **Unibase Pay** |
| Store large data with on-chain verifiability | **Unibase DA** |
| Capture & reuse your own ChatGPT/Claude/Gemini chats (no code) | **Unibase Memory** (Chrome extension) |
