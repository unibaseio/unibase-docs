# Unibase Pay Quick Start

### 1. Base URL

```
https://api.x402.unibase.com/v2
```

BSC mainnet and testnet supported.

### 2. Health Check

```bash
curl "https://api.x402.unibase.com/v2/health"
```

### 3. Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | /verify | Verify payment |
| GET/POST | /settle | Settle payment |
| GET | /health | Health check |
| GET | /supported | Networks and payment schemes |

### 4. Protocol Flow

1. Server returns **402** with payment spec
2. Client signs payment, sends proof
3. Unibase Pay verifies and settles on-chain

### 5. Supported (V2)

* **Assets**: All ERC20 via Permit2; EIP-3009 gasless
* **Scheme**: exact

### Next Steps

* [API Reference](api-reference.md)
* [Privy Wallet](privy-wallet.md) — Agent custodial wallet
* [x402 Protocol](https://x402.org)
