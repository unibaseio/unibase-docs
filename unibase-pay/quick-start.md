# Unibase Pay Quick Start

### 1. Base URL

```
https://api.x402.unibase.com/v2
```

### 2. Check the facilitator is up

```bash
curl https://api.x402.unibase.com/v2/health
# {"status":"ok"}
```

`GET /supported` is the heavier call that tells you what the facilitator
currently accepts.

### 3. Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify` | Check a payment payload without settling it |
| POST | `/settle` | Settle a payment on-chain |
| GET | `/supported` | Scheme and network pairs served |
| GET | `/health` | Liveness probe |
| GET | `/stats` | Settled tx count and volume per network and asset |

`/verify` and `/settle` are POST only.

### 4. Protocol Flow

1. Server returns **402** with its payment requirements
2. Client signs a payment payload and retries
3. Server calls `/verify`, serves the resource, then calls `/settle`

### 5. What V2 supports

* **Networks** — BNB Smart Chain, BSC Testnet, Base, Base Sepolia, Polygon, Arbitrum One
* **Schemes** — `exact` (fixed amount), `upto` (metered, settle actual usage), `batch-settlement` (many micropayments, one transaction)
* **Assets** — ERC-20 via Permit2; EIP-3009 gasless transfers

Read `GET /supported` at runtime rather than hardcoding this list.

### Next Steps

* [API Reference](api-reference.md)
* [Privy Wallet](privy-wallet.md) — Agent custodial wallet
* [x402 Protocol](https://x402.org)
