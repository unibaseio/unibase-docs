# API Reference

The Unibase Pay facilitator implements the [x402](https://x402.org) verify/settle
interface. A resource server declares a price, the client signs a payment
payload, and the facilitator checks it and settles it on-chain.

### Base URL

```
https://api.x402.unibase.com/v2
```

The bare base URL returns 404 — it is a prefix you append an endpoint to.

> **V1 is no longer served.** `https://api.x402.unibase.com/v1` returns 404 on
> every path. Migrate to V2; the `exact` scheme behaves the same.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify` | Check a payment payload without settling it |
| POST | `/settle` | Settle a payment on-chain |
| GET | `/supported` | Scheme and network pairs this facilitator serves |
| GET | `/health` | Liveness probe — `{"status":"ok"}` |
| GET | `/stats` | Settled tx count and volume per network and asset |

`/verify` and `/settle` are POST only — a GET returns 405.

### GET /supported

Returns every scheme/network pair the facilitator accepts. This is the
authoritative list — prefer reading it at runtime over hardcoding the table
below.

```bash
curl https://api.x402.unibase.com/v2/supported
```

```json
{
  "kinds": [
    { "x402Version": 2, "scheme": "exact", "network": "eip155:56" },
    {
      "x402Version": 2,
      "scheme": "upto",
      "network": "eip155:56",
      "extra": { "facilitatorAddress": "0x2cFf062a030f148853aA1c8c12d680B9860Ef041" }
    },
    { "x402Version": 2, "scheme": "batch-settlement", "network": "eip155:56" }
  ]
}
```

Networks use [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) identifiers
(`eip155:<chainId>`).

### POST /verify and POST /settle

Both take the same envelope:

```json
{
  "paymentPayload": {
    "x402Version": 2,
    "scheme": "exact",
    "network": "eip155:56",
    "payload": { }
  },
  "paymentRequirements": {
    "scheme": "exact",
    "network": "eip155:56",
    "asset": "0x…",
    "payTo": "0x…",
    "maxAmountRequired": "1000000",
    "resource": "https://api.example.com/report",
    "maxTimeoutSeconds": 60
  }
}
```

Note that `x402Version` belongs **inside** `paymentPayload`; a top-level
`x402Version` is ignored and the request fails version detection (the error
says so explicitly). The facilitator routes on the `scheme` and `network` pair,
so both must appear in `GET /supported`. See [x402.org](https://x402.org) for
the payload field specification.

Errors come back as `{"error": "<code>: <detail>"}` with HTTP 400. The detail is
specific enough to debug against — an unroutable pair, for example, lists every
registered `scheme@network`.

### GET /stats

Settlement totals, keyed by network and then by asset contract address
(lowercased). Amounts are base units as decimal strings — divide by `decimals`
to display.

```bash
curl https://api.x402.unibase.com/v2/stats
```

```json
{
  "networks": {
    "eip155:56": {
      "0x55d398326f99059ff775485246999027b3197955": {
        "symbol": "USDT",
        "decimals": 18,
        "txCount": 42,
        "totalAmount": "1250000000000000000"
      }
    }
  }
}
```

Counts only settlements this facilitator submitted on-chain — it is Unibase Pay
volume, not all x402 volume. `/verify` calls are not counted, and a settlement
of zero still increments `txCount`. `symbol` falls back to the asset address if
the token's `symbol()` could not be read.

### Supported Networks

All six networks expose all three schemes.

| Network | CAIP-2 | Chain ID |
|---------|--------|----------|
| BNB Smart Chain | `eip155:56` | 56 |
| BSC Testnet | `eip155:97` | 97 |
| Base | `eip155:8453` | 8453 |
| Base Sepolia | `eip155:84532` | 84532 |
| Polygon | `eip155:137` | 137 |
| Arbitrum One | `eip155:42161` | 42161 |

### Payment Schemes

| Scheme | Since | What it does |
|--------|-------|--------------|
| `exact` | V1 | Charge a fixed, known amount. The server declares a price, the client signs for exactly that amount. |
| `upto` | V2 | Authorize a ceiling, settle actual usage. For metered billing — per-token LLM calls, per-second compute — where the final price is unknown when the request starts. |
| `batch-settlement` | V2 | Aggregate many micropayments into one on-chain transaction. Gas is paid once instead of per call, which is what makes sub-cent agent-to-agent payments economical. |

The `upto` scheme advertises the facilitator address that holds the
authorization in `extra.facilitatorAddress`:

```
0x2cFf062a030f148853aA1c8c12d680B9860Ef041
```

### Assets

* ERC-20 tokens via Permit2
* EIP-3009 assets (gasless `transferWithAuthorization`)

Permit2 proxy on BNB Smart Chain:

```
0x98D0E9d6DC5BCd6FBB75b49dCd0204E966732392
```
