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

* **Config Hub** — Configuration management for agent/tool behavior
* **Memory Hub** — Persistent memory for agents across sessions
* **Knowledge Base** — Shared, decentralized knowledge repository

### 3. Core Layer

The **Core Layer** includes:

* **AIP** — Communication standards and interaction protocols between agents
* **Membase** — Decentralized memory and identity layer
* **Unibase DA** — Data availability and storage layer
* **Unibase Pay** — x402 payment facilitator for agent commerce

### 4. Infrastructure

The **Infrastructure Layer** provides:

* **Blockchain** — Identity verification and transaction security
* **Storage** — Distributed storage for data and models
* **LLM API** — Integration with large language models
