# API Overview

Where the programmable surface of each module lives. Most integration is through the **SDKs** — the HTTP endpoints below are the low-level surface for direct calls and tooling.

| Module | Primary interface | Reference |
|--------|-------------------|-----------|
| **Membase** | Python SDK (`unibase-membase-sdk`) + MCP tools | [SDK](sdk.md) · [Membase docs](../membase/README.md) |
| **AIP** | Python SDK (`unibase-aip-sdk`) + Go (`aip-go-sdk`) | [SDK](sdk.md) · [AIP docs](../aip/README.md) |
| **Unibase Pay** | HTTP API (x402) — see below | [Pay API Reference](../unibase-pay/api-reference.md) |
| **Unibase DA** | Go SDK + Hub HTTP — see below | [SDK](sdk.md) · [DA docs](../unibase-da/README.md) |

### Unibase Pay (x402)

| Base URL | Version |
|----------|---------|
| `https://api.x402.unibase.com/v2` | V2 (recommended) |
| `https://api.x402.unibase.com/v1` | V1 |

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET · POST | `/verify` | Verify payment |
| GET · POST | `/settle` | Settle payment |
| GET | `/health` | Health check |
| GET | `/supported` | Supported networks and schemes |

See the [Unibase Pay API Reference](../unibase-pay/api-reference.md) for request/response details.

### Memory Hub (HTTP)

The Hub is a wallet-scoped key-value store. The SDK wraps these; call them directly only for tooling or debugging.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Store a value (`{owner, bucket, id, message}`) |
| `/api/download` | GET · POST | Fetch a value (`{owner, id}`) |
| `/api/conversation` | POST | List/get records under a prefix |

Base URL: `https://hub.membase.unibase.com` (mainnet) · `https://testnet.hub.membase.unibase.com` (testnet)

### Interactive API explorer (Swagger)

A Swagger UI for the Hub/SDK endpoints may be available at a development endpoint.

> ⚠️ The development Swagger URL is **not a stable endpoint** — its address can change and access may be restricted. For dependable integration use the SDKs and the documented endpoints above. Ask the team for the current Swagger URL if you need the interactive explorer.
