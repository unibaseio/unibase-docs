# Design

#### 1. Protocol Overview

The Agent Interoperability Protocol (AIP) is an open communication standard for distributed agent ecosystems.

It enables cross-platform multi-agent collaboration, building a trusted, decentralized agent network.

AIP defines communication mechanisms, trust guarantees, message persistence, and verification methods to ensure efficient, secure, and verifiable agent interactions across platforms.

#### 2. Protocol Scope

* Discovery and interoperability of heterogeneous agents.
* Hybrid communication modes (real-time and asynchronous).
* Trusted Execution Environment (TEE) construction.
* On-chain and off-chain collaborative verification.

#### 3. System Architecture

**3.1 Layered Model**

<table><thead><tr><th width="128.99609375">Layer</th><th width="131.375">Component</th><th>Description</th></tr></thead><tbody><tr><td>Application</td><td>AIP SDK</td><td>Protocol implementation and client tools</td></tr><tr><td>Service</td><td>Agent Hub</td><td>Agent discovery and message routing</td></tr><tr><td>Protocol</td><td>AIP</td><td>Message encoding/decoding, transmission control, verification</td></tr><tr><td>Basis</td><td>Unibase DA</td><td>Identity attestation, message persistence, traceability</td></tr><tr><td>Blockchain</td><td>Blockchain</td><td>Identity registration, role authorization, on-chain transactions</td></tr></tbody></table>

#### 4. Protocol Standards

**4.1 Message Format**

AIP messages are formatted in **JSON** with the following structure:

* **Header:**
  * `MessageType`: Type of the message (e.g., Request, Response, Event).
  * `Sender`: Unique identifier of the sender.
  * `Receiver`: Unique identifier of the receiver.
  * `Timestamp`: Message creation time.
  * `Auth`: Authorization metadata for verifying sender identity, integrity, and permissions.
* **Body:**
  * Message-specific payload (e.g., parameters, results, or event data).

**4.2 Communication Modes**

* **Request-Response**: Clients send a request, servers return a response.
* **Subscribe-Publish**: Clients subscribe to topics; servers push relevant updates.
* **Broadcast**: Servers send messages to all connected agents.

**4.3 Communication Security**

* **Authentication**: Validates sender identity using digital signatures.
* **Authorization**: Enforces access control via RBAC and custom validation.
* **Encryption**: Ensures confidentiality of communications.
* **Integrity Protection**: Safeguards message contents with hashing.

***

AIP provides a **complete agent communication framework** that integrates decentralized identity, verifiable messaging, and scalable interoperability, designed to support the next generation of multi-agent Web3 applications.
