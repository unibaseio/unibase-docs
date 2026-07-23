# Status & Maturity

What you can rely on today, per module. For chain IDs and explorers see [Supported Networks](supported-networks.md).

**Legend** — 🟢 **Live** (usable now) · 🧪 **Testnet** (testnet only) · 🔍 **In audit** (mainnet pending review) · 🗺️ **Roadmap** (planned)

| Module | Status | Live on | Interface | Notes |
|--------|--------|---------|-----------|-------|
| **Membase** | 🟢 Live | BNB Chain mainnet + testnet (Hub) | Python SDK (`unibase-membase-sdk`), MCP | 2.0 is current; 1.x frozen. Recall (LLM) features need the `recovery,runtime` extras. |
| **AIP** | 🟢 Live | Base + BNB Chain (BSC), mainnet + testnet | Python SDK (`unibase-aip-sdk`), Go SDK (`aip-go-sdk`) | ERC-8004 identity; x402 + ERC-8183 settlement. Endpoint: `api.aip.unibase.com`. |
| **Unibase Pay** | 🟢 Live | BSC mainnet + testnet | HTTP API (x402) | `api.x402.unibase.com/v2`. EIP-3009 / Permit2 gasless transfers. |
| **Unibase DA** | 🧪 Testnet / 🔍 In audit | Base Sepolia (testnet) | Go SDK + Hub | Base mainnet ZK contracts in audit; Ethereum on roadmap. DA anchors Ethereum + Base only (not BSC). Do not rely on testnet data persistence. |
| **Unibase Memory** | 🟢 Live | — (client app) | Chrome extension | Consumer product on the Chrome Web Store; syncs to Membase. |

### Stability notes

* **SDK versioning** — SDKs install from the `main` branch (HEAD). For reproducible/production builds, pin to a commit (and to a release tag once published). See [SDK](../reference/sdk.md).
* **Testnet vs mainnet** — develop on testnet first; testnet state (especially Unibase DA) may be reset and is not durability-guaranteed.
* **Unibase DA mainnet** — verifiable storage on Base/Ethereum mainnet is gated on ZK-contract audits; until then, DA is testnet-only (Base Sepolia).
* **Breaking changes** — pre-1.0 SDKs may change between commits; watch each repo's releases/CHANGELOG.

> This page reflects the current public state. For specifics, each module's section is the source of truth; if something here disagrees with a module page, the module page wins.
