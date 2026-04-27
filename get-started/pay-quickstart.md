# Unibase Pay Quick Start

Use the x402 API to verify and settle payments in 5 minutes.

### 1. API Base URL

```
https://api.x402.unibase.com/v2
```

### 2. Supported Networks

* BSC mainnet
* BSC testnet

### 3. Quick Verify (cURL)

```bash
curl "https://api.x402.unibase.com/v2/health"
```

### 4. Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/verify` | Verify payment |
| GET/POST | `/settle` | Settle payment |
| GET | `/health` | Health check |
| GET | `/supported` | Supported networks and schemes |

### 5. Protocol Reference

See [x402.org](https://x402.org) for the full protocol specification. Servers declare payment requirements; clients send signed payloads; facilitators verify and settle on-chain.

---

### Next Steps

* [API Reference](../unibase-pay/api-reference.md)
* [Privy Wallet](../unibase-pay/privy-wallet.md) — Agent custodial wallet via MCP/Skill
