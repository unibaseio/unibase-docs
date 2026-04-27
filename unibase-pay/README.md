# Unibase Pay

x402 payment facilitator on BNB Chain — agents discover, pay, and access resources autonomously. **Verify** and **settle** payments via API; **Privy** for agent custodial wallets.

### 30-Second Example

```bash
curl "https://api.x402.unibase.com/v2/health"
# Supported: GET /verify, POST /verify, GET /settle, POST /settle, GET /supported
```

### Why Unibase Pay

| Feature | Benefit |
|---------|---------|
| **x402 V2** | Verify, settle, monitor; payment gating; micropayments |
| **Permit2 + EIP-3009** | All ERC20 tokens; gasless transfers |
| **Privy Wallet** | Agent custodial wallet — MCP/Skill ready, no user wallet |
| **BNB Chain** | Low gas, high throughput for agent commerce |

### Flow

1. **Server** declares payment for a route (x402)
2. **Client** sends signed payment payload
3. **Unibase Pay** verifies and settles on-chain

### Next Steps

* [Quick Start](quick-start.md)
* [Privy Wallet](privy-wallet.md) — Agent payments without user wallet
* [API Reference](api-reference.md)

### Resources

* [API V2](https://api.x402.unibase.com/v2) · [x402 Protocol](https://x402.org)
