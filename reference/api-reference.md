# API Overview

Where the programmable surface of each module lives. Most integration is through the **SDKs** — the HTTP endpoints below are the low-level surface for direct calls and tooling.

| Module | Primary interface | Reference |
|--------|-------------------|-----------|
| **Membase** | Python SDK (`unibase-membase-sdk`) + MCP tools | [SDK](sdk.md) · [Membase docs](../membase/README.md) |
| **AIP** | Python SDK (`unibase-aip-sdk`) + Go (`aip-go-sdk`) | [SDK](sdk.md) · [AIP docs](../aip/README.md) |
| **Unibase Pay** | HTTP API (x402) — see below | [Pay API Reference](../unibase-pay/api-reference.md) |
| **Unibase DA** | Go SDK + Hub HTTP — see below | [SDK](sdk.md) · [DA docs](../unibase-da/README.md) |

### Unibase Pay (x402)

Base URL: `https://api.x402.unibase.com/v2`. V1 is no longer served — every
path under `/v1` returns 404.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify` | Check a payment payload without settling it |
| POST | `/settle` | Settle a payment on-chain |
| GET | `/supported` | Scheme and network pairs served |
| GET | `/health` | Liveness probe |
| GET | `/stats` | Settled tx count and volume per network and asset |

`/verify` and `/settle` are POST only.

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
