# API Reference

### Unibase SDK / Hub (Swagger)

* [Unibase Swagger API](http://54.251.11.180:8080/swagger/index.html)

### Unibase Pay (x402)

| Base URL | Version |
|----------|---------|
| https://api.x402.unibase.com/v2 | V2 (recommended) |
| https://api.x402.unibase.com/v1 | V1 |

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /verify | Verify payment |
| POST | /verify | Verify payment |
| GET | /settle | Settle payment |
| POST | /settle | Settle payment |
| GET | /health | Health check |
| GET | /supported | Supported networks and schemes |

See [Unibase Pay API Reference](../unibase-pay/api-reference.md) for details.

### Memory Hub

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/download | GET | Download file |
| /api/upload | POST | Upload file |

Base URL: `https://hub.membase.unibase.com` (mainnet) or `https://testnet.hub.membase.unibase.com` (testnet)
