# API Reference

### Base URL

* **V2 (recommended):** `https://api.x402.unibase.com/v2`
* **V1:** `https://api.x402.unibase.com/v1`

### Supported Networks

* BSC mainnet
* BSC testnet

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/verify` | Verify payment |
| POST | `/verify` | Verify payment |
| GET | `/settle` | Settle payment |
| POST | `/settle` | Settle payment |
| GET | `/health` | Health check |
| GET | `/supported` | Supported networks and schemes |

### Payment Schemes

* **exact** — Supported on both V1 and V2

### Supported Assets (V2)

* All ERC20 tokens via Permit2
* EIP-3009 assets

### Permit2 Proxy (BNB Chain)

```
0x98D0E9d6DC5BCd6FBB75b49dCd0204E966732392
```
