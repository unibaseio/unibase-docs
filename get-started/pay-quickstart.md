# Unibase Pay Quick Start

Use the x402 API to verify and settle payments in 5 minutes.

### 1. API Base URL

```
https://api.x402.unibase.com/v2
```

### 2. Supported Networks

| Network | CAIP-2 |
|---------|--------|
| BNB Smart Chain | `eip155:56` |
| BSC Testnet | `eip155:97` |
| Base | `eip155:8453` |
| Base Sepolia | `eip155:84532` |
| Polygon | `eip155:137` |
| Arbitrum One | `eip155:42161` |

### 3. First call

```bash
curl https://api.x402.unibase.com/v2/health
# {"status":"ok"}
```

`GET /supported` needs no auth either and is the source of truth for what the
facilitator accepts.

### 4. Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify` | Check a payment payload without settling it |
| POST | `/settle` | Settle a payment on-chain |
| GET | `/supported` | Scheme and network pairs served |
| GET | `/health` | Liveness probe |
| GET | `/stats` | Settled tx count and volume per network and asset |

`/verify` and `/settle` are POST only — a GET returns 405.

### 5. Payment Schemes

* `exact` — fixed, known amount
* `upto` — authorize a ceiling, settle actual usage (metered billing)
* `batch-settlement` — many micropayments in one on-chain transaction

### 6. Protocol Reference

See [x402.org](https://x402.org) for the full protocol specification. Servers
declare payment requirements; clients send signed payloads; facilitators verify
and settle on-chain.

---

### Next Steps

* [API Reference](../unibase-pay/api-reference.md)
* [Privy Wallet](../unibase-pay/privy-wallet.md) — Agent custodial wallet via MCP/Skill
